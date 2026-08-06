import logging

from openai import AsyncOpenAI
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.models.document import Document

logger = logging.getLogger(__name__)
settings = get_settings()

_openai = AsyncOpenAI(api_key=settings.openai_api_key)


async def embed_text(text: str) -> list[float]:
    """Embed a single string with the configured OpenAI embedding model."""
    res = await _openai.embeddings.create(
        model=settings.embedding_model,
        input=text,
        dimensions=settings.embedding_dimensions,
    )
    return res.data[0].embedding


async def retrieve(
    db: AsyncSession, query: str, top_k: int | None = None
) -> list[Document]:
    """Cosine-similarity search over the pgvector knowledge base."""
    embedding = await embed_text(query)
    stmt = (
        select(Document)
        .order_by(Document.embedding.cosine_distance(embedding))
        .limit(top_k or settings.rag_top_k)
    )
    result = await db.execute(stmt)
    return list(result.scalars())


def format_context(documents: list[Document]) -> str:
    if not documents:
        return "No relevant documents found."
    blocks = [
        f"[Source: {doc.title} — {doc.source_url}]\n{doc.content}" for doc in documents
    ]
    return "\n\n---\n\n".join(blocks)
