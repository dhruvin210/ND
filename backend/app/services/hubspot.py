import logging

import httpx

from app.core.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()

HUBSPOT_CONTACTS_URL = "https://api.hubapi.com/crm/v3/objects/contacts"


async def upsert_contact(
    *,
    email: str,
    name: str,
    company: str,
    phone: str | None = None,
    project_details: str | None = None,
    budget: str | None = None,
    timeline: str | None = None,
    source: str = "website",
) -> str | None:
    """Create (or update on conflict) a HubSpot contact. Returns the contact id.

    Failures are logged but never raised — losing the CRM sync must not lose
    the lead, which is already stored in Postgres.
    """
    if not settings.hubspot_access_token:
        logger.info("HubSpot token not configured; skipping CRM sync")
        return None

    first, _, last = name.partition(" ")
    properties: dict[str, str] = {
        "email": email,
        "firstname": first,
        "lastname": last or "",
        "company": company,
        "lifecyclestage": "lead",
        "hs_lead_status": "NEW",
        "lead_source": source,
    }
    if phone:
        properties["phone"] = phone
    if project_details:
        properties["project_details"] = project_details[:1000]
    if budget:
        properties["project_budget"] = budget
    if timeline:
        properties["project_timeline"] = timeline

    headers = {"Authorization": f"Bearer {settings.hubspot_access_token}"}

    async with httpx.AsyncClient(timeout=10) as client:
        try:
            res = await client.post(
                HUBSPOT_CONTACTS_URL, json={"properties": properties}, headers=headers
            )
            if res.status_code == 409:
                # Contact exists — patch it instead.
                existing_id = res.json().get("message", "").rsplit(" ", 1)[-1]
                res = await client.patch(
                    f"{HUBSPOT_CONTACTS_URL}/{existing_id}",
                    json={"properties": properties},
                    headers=headers,
                )
            res.raise_for_status()
            return res.json().get("id")
        except httpx.HTTPError:
            logger.exception("HubSpot sync failed for %s", email)
            return None
