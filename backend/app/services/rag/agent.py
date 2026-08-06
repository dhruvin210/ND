"""LangGraph conversation agent for the website assistant.

Graph:  retrieve → detect_intent → respond
                                  ↘ capture_lead (when the visitor shares
                                     contact details or asks to book)

The agent answers questions grounded in retrieved website/blog/case-study
content, recommends services, and captures leads to Postgres + HubSpot.
"""

import logging
import re
import uuid
from collections.abc import AsyncGenerator
from typing import Annotated, TypedDict

from anthropic import AsyncAnthropic
from langgraph.graph import END, StateGraph
from langgraph.graph.message import add_messages
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.models.chat import ChatSession
from app.services import hubspot
from app.services.rag.retriever import format_context, retrieve

logger = logging.getLogger(__name__)
settings = get_settings()

_anthropic = AsyncAnthropic(api_key=settings.anthropic_api_key)

EMAIL_RE = re.compile(r"[\w.+-]+@[\w-]+\.[\w.-]+")

SYSTEM_PROMPT = """\
You are the NextDynamix website assistant. NextDynamix is an AI-first software
development and technology consulting company offering: AI agent development,
generative AI solutions, enterprise AI transformation, custom software
development, cloud engineering, DevOps, data engineering, product engineering,
digital transformation, RAG systems, enterprise search, and workflow automation.

Rules:
- Answer ONLY using the provided context plus the service list above. If the
  context doesn't cover a question, say so and offer to connect the visitor
  with the team.
- Be concise (2-4 sentences), friendly, and concrete.
- When a visitor describes a project, recommend the most relevant service and
  invite them to schedule a free consultation via the contact form on the page
  or by sharing their email here.
- If the visitor shares an email address, confirm that the team will reach out
  within one business day.
- Never invent pricing beyond: discovery from ~$10k, MVPs typically $40k-$120k,
  enterprise scoped individually.

Context from the NextDynamix knowledge base:
{context}
"""


class AgentState(TypedDict):
    messages: Annotated[list[dict], add_messages]
    context: str
    visitor_email: str | None


def _build_graph(db: AsyncSession, session: ChatSession):
    async def retrieve_node(state: AgentState) -> dict:
        query = state["messages"][-1].content
        docs = await retrieve(db, query)
        return {"context": format_context(docs)}

    async def capture_lead_node(state: AgentState) -> dict:
        email_match = EMAIL_RE.search(state["messages"][-1].content)
        if not email_match:
            return {}
        email = email_match.group(0)
        session.visitor_email = email
        session.lead_captured = True
        transcript = "\n".join(
            f"{m.type}: {m.content}" for m in state["messages"][-6:]
        )
        await hubspot.upsert_contact(
            email=email,
            name="Chatbot Visitor",
            company="Unknown",
            project_details=f"Captured by AI assistant.\n\n{transcript}",
            source="website_chatbot",
        )
        logger.info("Chatbot lead captured: %s", email)
        return {"visitor_email": email}

    builder = StateGraph(AgentState)
    builder.add_node("retrieve", retrieve_node)
    builder.add_node("capture_lead", capture_lead_node)
    builder.set_entry_point("retrieve")
    builder.add_edge("retrieve", "capture_lead")
    builder.add_edge("capture_lead", END)
    return builder.compile()


async def stream_reply(
    db: AsyncSession,
    session: ChatSession,
    history: list[dict[str, str]],
    user_message: str,
) -> AsyncGenerator[str, None]:
    """Run the graph for retrieval + lead capture, then stream the model reply."""
    graph = _build_graph(db, session)
    state = await graph.ainvoke(
        {
            "messages": [
                *[{"role": m["role"], "content": m["content"]} for m in history],
                {"role": "user", "content": user_message},
            ],
            "context": "",
            "visitor_email": session.visitor_email,
        }
    )

    messages = [
        {"role": m["role"], "content": m["content"]}
        for m in [*history, {"role": "user", "content": user_message}]
    ]

    async with _anthropic.messages.stream(
        model=settings.chat_model,
        max_tokens=600,
        system=SYSTEM_PROMPT.format(context=state["context"]),
        messages=messages,
    ) as stream:
        async for text in stream.text_stream:
            yield text


def new_session_id() -> uuid.UUID:
    return uuid.uuid4()
