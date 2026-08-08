import logging

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.limiter import limiter
from app.core.config import get_settings
from app.models.lead import Lead, NewsletterSubscriber
from app.schemas.contact import (
    ConsultationRequest,
    ContactRequest,
    ContactResponse,
    NewsletterRequest,
)
from app.services import hubspot

logger = logging.getLogger(__name__)
settings = get_settings()
router = APIRouter(tags=["leads"])


@router.post("/contact", response_model=ContactResponse)
@limiter.limit(settings.rate_limit_contact)
async def submit_contact(
    request: Request,
    payload: ContactRequest,
    db: AsyncSession = Depends(get_db),
) -> ContactResponse:
    # Honeypot tripped — pretend success, store nothing.
    if payload.website:
        return ContactResponse()

    lead = Lead(
        name=payload.name,
        company=payload.company,
        email=payload.email,
        phone=payload.phone or None,
        project_details=payload.projectDetails,
        budget=payload.budget,
        timeline=payload.timeline,
    )
    db.add(lead)
    await db.flush()

    contact_id = await hubspot.upsert_contact(
        email=payload.email,
        name=payload.name,
        company=payload.company,
        phone=payload.phone or None,
        project_details=payload.projectDetails,
        budget=payload.budget,
        timeline=payload.timeline,
        source="website_contact_form",
    )
    lead.hubspot_contact_id = contact_id
    await db.commit()

    logger.info("New lead stored: %s (%s)", payload.email, payload.company)
    return ContactResponse()


@router.post("/consultation", response_model=ContactResponse)
@limiter.limit(settings.rate_limit_contact)
async def submit_consultation(
    request: Request,
    payload: ConsultationRequest,
    db: AsyncSession = Depends(get_db),
) -> ContactResponse:
    """Lead from the /solutions consultation form."""
    # Honeypot tripped — pretend success, store nothing.
    if payload.website:
        return ContactResponse()

    lead = Lead(
        name=payload.name,
        email=payload.email,
        phone=payload.phone or None,
        project_details=payload.projectDetails or None,
        interest=payload.interest,
        source=payload.source,
    )
    db.add(lead)
    await db.flush()

    contact_id = await hubspot.upsert_contact(
        email=payload.email,
        name=payload.name,
        phone=payload.phone or None,
        project_details=payload.projectDetails or None,
        interest=payload.interest,
        source=payload.source,
    )
    lead.hubspot_contact_id = contact_id
    await db.commit()

    logger.info(
        "New consultation lead stored: %s (interest=%s)", payload.email, payload.interest
    )
    return ContactResponse()


@router.post("/newsletter", response_model=ContactResponse)
@limiter.limit(settings.rate_limit_newsletter)
async def subscribe_newsletter(
    request: Request,
    payload: NewsletterRequest,
    db: AsyncSession = Depends(get_db),
) -> ContactResponse:
    existing = await db.execute(
        select(NewsletterSubscriber).where(NewsletterSubscriber.email == payload.email)
    )
    if existing.scalar_one_or_none():
        return ContactResponse()  # idempotent

    db.add(NewsletterSubscriber(email=payload.email))
    try:
        await db.commit()
    except Exception as exc:  # race on unique constraint
        await db.rollback()
        logger.warning("Newsletter subscribe failed: %s", exc)
        raise HTTPException(status_code=500, detail="subscription failed") from exc

    await hubspot.upsert_contact(
        email=payload.email,
        name="Newsletter Subscriber",
        company="Unknown",
        source="website_newsletter",
    )
    return ContactResponse()
