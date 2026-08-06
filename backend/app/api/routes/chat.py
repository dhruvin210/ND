import logging

from fastapi import APIRouter, Depends, Request
from fastapi.responses import StreamingResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.core.database import SessionLocal, get_db
from app.core.limiter import limiter
from app.models.chat import ChatMessage, ChatSession
from app.schemas.chat import ChatRequest
from app.services.rag.agent import stream_reply

logger = logging.getLogger(__name__)
settings = get_settings()
router = APIRouter(tags=["chat"])

MAX_HISTORY = 12


@router.post("/chat")
@limiter.limit(settings.rate_limit_chat)
async def chat(
    request: Request,
    payload: ChatRequest,
    db: AsyncSession = Depends(get_db),
) -> StreamingResponse:
    """Streamed RAG chat endpoint. Plain-text chunked response consumed by
    the website widget."""
    session = await db.get(ChatSession, payload.session_id)
    if session is None:
        session = ChatSession(id=payload.session_id)
        db.add(session)
        await db.flush()

    history_rows = await db.execute(
        select(ChatMessage)
        .where(ChatMessage.session_id == session.id)
        .order_by(ChatMessage.created_at.desc())
        .limit(MAX_HISTORY)
    )
    history = [
        {"role": m.role, "content": m.content}
        for m in reversed(list(history_rows.scalars()))
    ]

    db.add(ChatMessage(session_id=session.id, role="user", content=payload.message))
    await db.commit()

    async def generate():
        chunks: list[str] = []
        try:
            async with SessionLocal() as stream_db:
                stream_session = await stream_db.get(ChatSession, payload.session_id)
                async for chunk in stream_reply(
                    stream_db, stream_session, history, payload.message
                ):
                    chunks.append(chunk)
                    yield chunk
                stream_db.add(
                    ChatMessage(
                        session_id=payload.session_id,
                        role="assistant",
                        content="".join(chunks),
                    )
                )
                await stream_db.commit()
        except Exception:
            logger.exception("Chat stream failed for session %s", payload.session_id)
            yield (
                "Sorry — I ran into a problem answering that. "
                "Please try again, or reach the team at hello@nextdynamix.com."
            )

    return StreamingResponse(generate(), media_type="text/plain; charset=utf-8")
