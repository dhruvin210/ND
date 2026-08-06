from slowapi import Limiter
from slowapi.util import get_remote_address

from app.core.config import get_settings

settings = get_settings()

# Redis-backed rate limiter shared by all routes.
limiter = Limiter(
    key_func=get_remote_address,
    storage_uri=settings.redis_url,
    headers_enabled=True,
)
