"""Knowledge-base ingestion for the RAG chatbot.

Pulls content from three sources, chunks it with LlamaIndex, embeds with
OpenAI, and upserts into the pgvector-backed `documents` table:

  1. Website pages   — crawled from the sitemap
  2. Blog articles   — Strapi /api/articles
  3. Case studies    — Strapi /api/case-studies

Run:  python -m scripts.ingest
"""

import asyncio
import logging
import sys
from xml.etree import ElementTree

import httpx
from bs4 import BeautifulSoup
from llama_index.core.node_parser import SentenceSplitter
from sqlalchemy import delete

from app.core.config import get_settings
from app.core.database import SessionLocal
from app.models.document import Document
from app.services.rag.retriever import embed_text

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
logger = logging.getLogger("ingest")
settings = get_settings()

splitter = SentenceSplitter(chunk_size=512, chunk_overlap=64)


async def fetch_sitemap_urls(client: httpx.AsyncClient) -> list[str]:
    res = await client.get(f"{settings.site_base_url}/sitemap.xml")
    res.raise_for_status()
    root = ElementTree.fromstring(res.text)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    return [el.text for el in root.findall(".//sm:loc", ns) if el.text]


async def scrape_page(client: httpx.AsyncClient, url: str) -> tuple[str, str] | None:
    try:
        res = await client.get(url, follow_redirects=True)
        res.raise_for_status()
    except httpx.HTTPError:
        logger.warning("skip %s (fetch failed)", url)
        return None
    soup = BeautifulSoup(res.text, "html.parser")
    for tag in soup(["script", "style", "nav", "footer", "iframe"]):
        tag.decompose()
    title = soup.title.string.strip() if soup.title and soup.title.string else url
    main = soup.find("main") or soup.body
    if not main:
        return None
    text = " ".join(main.get_text(separator=" ").split())
    return title, text


async def fetch_strapi(
    client: httpx.AsyncClient, collection: str
) -> list[dict]:
    headers = (
        {"Authorization": f"Bearer {settings.cms_api_token}"}
        if settings.cms_api_token
        else {}
    )
    try:
        res = await client.get(
            f"{settings.cms_base_url}/api/{collection}",
            params={"pagination[pageSize]": 100, "populate": "*"},
            headers=headers,
        )
        res.raise_for_status()
        return res.json().get("data", [])
    except httpx.HTTPError:
        logger.warning("skip strapi collection %s (fetch failed)", collection)
        return []


async def upsert_chunks(
    source_type: str, source_url: str, title: str, text: str
) -> int:
    chunks = splitter.split_text(text)
    async with SessionLocal() as db:
        await db.execute(delete(Document).where(Document.source_url == source_url))
        for chunk in chunks:
            embedding = await embed_text(chunk)
            db.add(
                Document(
                    source_type=source_type,
                    source_url=source_url,
                    title=title[:300],
                    content=chunk,
                    embedding=embedding,
                )
            )
        await db.commit()
    return len(chunks)


async def main() -> None:
    total = 0
    async with httpx.AsyncClient(timeout=20) as client:
        # 1. Website pages
        try:
            urls = await fetch_sitemap_urls(client)
        except Exception:
            logger.warning("sitemap unavailable; skipping website crawl")
            urls = []
        for url in urls:
            page = await scrape_page(client, url)
            if page:
                n = await upsert_chunks("website", url, page[0], page[1])
                logger.info("website %s → %d chunks", url, n)
                total += n

        # 2. Blog articles
        for article in await fetch_strapi(client, "articles"):
            url = f"{settings.site_base_url}/blog/{article.get('slug')}"
            soup = BeautifulSoup(article.get("content") or "", "html.parser")
            body = f"{article.get('excerpt') or ''}\n{soup.get_text(separator=' ')}"
            n = await upsert_chunks("blog", url, article.get("title", url), body)
            logger.info("blog %s → %d chunks", url, n)
            total += n

        # 3. Case studies
        for cs in await fetch_strapi(client, "case-studies"):
            url = f"{settings.site_base_url}/case-studies/{cs.get('slug')}"
            body = (
                f"Industry: {cs.get('industry')}\n"
                f"Challenge: {cs.get('challenge')}\n"
                f"Solution: {cs.get('solution')}"
            )
            n = await upsert_chunks("case_study", url, cs.get("title", url), body)
            logger.info("case study %s → %d chunks", url, n)
            total += n

    logger.info("done — %d chunks embedded", total)


if __name__ == "__main__":
    if not settings.openai_api_key:
        sys.exit("OPENAI_API_KEY is required for ingestion")
    asyncio.run(main())
