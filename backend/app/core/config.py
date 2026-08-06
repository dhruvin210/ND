from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings, loaded from environment / .env."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # App
    app_name: str = "NextDynamix API"
    environment: str = "development"
    debug: bool = False
    api_prefix: str = "/api/v1"

    # CORS — comma-separated origins
    cors_origins: str = "http://localhost:3000"

    # Database
    database_url: str = "postgresql+asyncpg://nextdynamix:nextdynamix@localhost:5432/nextdynamix"

    # Redis (rate limiting + caching)
    redis_url: str = "redis://localhost:6379/0"

    # Rate limits
    rate_limit_contact: str = "5/minute"
    rate_limit_chat: str = "20/minute"
    rate_limit_newsletter: str = "5/minute"

    # HubSpot
    hubspot_access_token: str = ""
    hubspot_portal_id: str = ""

    # AI providers
    openai_api_key: str = ""
    anthropic_api_key: str = ""
    chat_model: str = "claude-sonnet-4-6"
    embedding_model: str = "text-embedding-3-small"
    embedding_dimensions: int = 1536

    # RAG
    rag_top_k: int = 5
    site_base_url: str = "https://www.nextdynamix.com"
    cms_base_url: str = "http://localhost:1337"
    cms_api_token: str = ""

    # Email notifications for new leads
    notification_email: str = "hello@nextdynamix.com"

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
