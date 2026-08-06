# Architecture

## System overview

```
                    ┌─────────────────────────────┐
   Visitors ──────► │  Cloudflare (DNS, WAF, CDN) │
                    └──────┬──────────────┬───────┘
                           │              │
              www.nextdynamix.com   api.nextdynamix.com / cms.*
                           │              │
                    ┌──────▼─────┐  ┌─────▼──────────────────────┐
                    │   Vercel   │  │  AWS ALB → ECS Fargate     │
                    │  Next.js 15│  │  ├ FastAPI backend         │
                    │  (ISR+SSG) │  │  └ Strapi CMS              │
                    └──────┬─────┘  └─────┬──────────┬───────────┘
                           │              │          │
                           │        ┌─────▼───┐ ┌────▼─────┐
                           └───────►│ RDS PG16│ │ Redis 7  │
                            (build- │ +pgvector│ │(rate-lim)│
                             time   └─────────┘ └──────────┘
                             CMS fetch)
```

## Frontend (Next.js 15 App Router)

- **Rendering:** homepage is static with ISR (case studies revalidate every
  5 min); blog pages are SSG via `generateStaticParams` + ISR; service pages
  fully static.
- **Design tokens:** single source in `tailwind.config.ts` + CSS variables in
  `globals.css` (brand orange `#FF7C00`, fierce `#ED2F00`, surfaces
  `#0D0D0D/#1A1A1A/#242424`, Inter, 56–64px H1 scale, 1280px content width).
- **SEO:** per-page metadata via `lib/seo.ts`; JSON-LD (Organization,
  LocalBusiness, WebSite, FAQPage, Service×8, Article, Breadcrumb) via
  `lib/schema.ts`; `sitemap.ts` + `robots.ts` route handlers; canonical URLs,
  OpenGraph, Twitter cards everywhere.
- **Performance:** no carousels for indexable content, lazy map iframe,
  canvas particles pause off-screen and respect `prefers-reduced-motion`,
  analytics load `afterInteractive`, images via `next/image` (AVIF/WebP).
  Target Lighthouse > 95.
- **Accessibility (WCAG AA):** skip link, focus-visible rings, aria-labelled
  sections/tabs/accordions, form errors with `role=alert`, color contrast
  ≥ 4.5:1 on text.

## Backend (FastAPI)

Routes (prefix `/api/v1`):

| Route         | Purpose | Protection |
| ------------- | ------- | ---------- |
| `POST /contact`    | Store lead → HubSpot upsert | 5/min/IP, Zod+Pydantic dual validation, honeypot |
| `POST /newsletter` | Subscribe → HubSpot         | 5/min/IP, idempotent |
| `POST /chat`       | Streamed RAG chat           | 20/min/IP |
| `GET /health`      | LB health check             | — |

Security: Redis-backed rate limiting (slowapi), strict CORS allowlist,
security headers middleware, no cookie auth (CSRF-safe by construction),
honeypot anti-spam + Cloudflare Bot Fight/Turnstile at the edge, secrets via
AWS Secrets Manager.

## AI chatbot (RAG)

1. `scripts/ingest.py` crawls the sitemap, Strapi articles, and case studies;
   chunks with LlamaIndex `SentenceSplitter` (512/64); embeds with OpenAI
   `text-embedding-3-small`; upserts into `documents` (pgvector, HNSW index).
2. `POST /chat` runs a LangGraph graph: **retrieve** (cosine top-5) →
   **capture_lead** (email detection → HubSpot) → streamed Claude response
   grounded in retrieved context.
3. Conversations persist in `chat_sessions` / `chat_messages` for analytics
   and lead follow-up.

## CMS (Strapi v5)

Collection types: Article, Author, Category, Tag, Case Study (+ shared
Metric component). Read-only API token consumed server-side by Next.js;
publish webhook triggers frontend revalidation + RAG re-ingestion.

## Analytics

GA4 (page views + custom events: `cta_click`, `form_submit`, `chatbot_*`,
`faq_open`, `newsletter_subscribe`), Microsoft Clarity (session replay),
HubSpot tracking script (visitor → contact identity stitching).
