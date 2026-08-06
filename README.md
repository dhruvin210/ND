# NextDynamix Website

AI-first marketing site + lead engine for **NextDynamix** — Custom Digital
Solutions & Technology Services That Transform Business.

Built per the brand guideline, homepage design v1-1, and the Expert Design
Review v2 (max-width container, sticky nav, no service carousels, inline
contact form, FAQ accordion + schema, zig-zag USPs, local-presence section).

## Stack

| Layer      | Tech |
| ---------- | ---- |
| Frontend   | Next.js 15 (App Router), TypeScript, Tailwind, ShadCN-style UI, Framer Motion, React Hook Form + Zod |
| Backend    | FastAPI (Python 3.12), PostgreSQL 16 + pgvector, Redis, SQLAlchemy + Alembic |
| CMS        | Strapi v5 (blog, case studies) |
| AI         | LangGraph agent + LlamaIndex chunking, OpenAI embeddings, Claude responses, pgvector RAG |
| Analytics  | GA4, Microsoft Clarity, HubSpot |
| Infra      | Docker Compose (local), Vercel (frontend), AWS ECS/RDS/ElastiCache (backend+CMS), Cloudflare (DNS/WAF), GitHub Actions (CI/CD) |

## Repository layout

```
frontend/        Next.js app (all homepage sections, blog, SEO, chatbot widget)
backend/         FastAPI app (contact, newsletter, RAG chat) + alembic + ingest
cms/             Strapi content-type schemas + setup guide
infrastructure/  Docker init, AWS task definitions, Cloudflare guide
.github/         CI + deploy workflows
docs/            Architecture, database schema, deployment guide
```

## Quick start (local)

```bash
# 1. Infra
docker compose up -d postgres redis

# 2. Backend
cd backend
cp .env.example .env           # add OPENAI_API_KEY + ANTHROPIC_API_KEY
pip install uv && uv pip install --system ".[dev]"
alembic upgrade head
uvicorn app.main:app --reload  # http://localhost:8000

# 3. Frontend
cd ../frontend
cp .env.example .env.local
npm install
npm run dev                    # http://localhost:3000

# 4. CMS (optional for blog/case studies)
cd ../cms && cat README.md

# 5. Chatbot knowledge base (after content exists)
cd ../backend && python -m scripts.ingest
```

Or run everything: `docker compose up --build`.

## Before launch — replace placeholder business data

- `frontend/src/lib/site.ts` — **office address, phone, geo coordinates**
  (currently sample values; NAP consistency matters for local SEO).
- `frontend/public/images/testimonials/` — real client headshots
  (referenced by `src/data/testimonials.ts`).
- `frontend/public/images/clients/` — real client logo SVGs
  (`src/data/clients.ts` falls back to wordmarks until then).
- Review stats/claims in `src/data/` (e.g. review counts, certifications)
  against what's verifiable.
- Set real analytics IDs and API keys in both `.env` files.

See `docs/` for architecture, database schema, and deployment details.
