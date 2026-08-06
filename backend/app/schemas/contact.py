from pydantic import BaseModel, EmailStr, Field, field_validator

ALLOWED_BUDGETS = {"Under $25k", "$25k – $50k", "$50k – $100k", "$100k – $250k", "$250k+"}
ALLOWED_TIMELINES = {"ASAP", "Within 1 month", "1–3 months", "3–6 months", "Flexible"}


class ContactRequest(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    company: str = Field(min_length=1, max_length=160)
    email: EmailStr
    phone: str = Field(default="", max_length=32)
    projectDetails: str = Field(min_length=20, max_length=5000)
    budget: str
    timeline: str
    # Honeypot — bots fill this; humans never see it.
    website: str | None = Field(default=None, max_length=0)

    @field_validator("budget")
    @classmethod
    def validate_budget(cls, v: str) -> str:
        if v not in ALLOWED_BUDGETS:
            raise ValueError("invalid budget range")
        return v

    @field_validator("timeline")
    @classmethod
    def validate_timeline(cls, v: str) -> str:
        if v not in ALLOWED_TIMELINES:
            raise ValueError("invalid timeline")
        return v


class ContactResponse(BaseModel):
    status: str = "ok"


class NewsletterRequest(BaseModel):
    email: EmailStr
