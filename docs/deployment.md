# Deployment Guide

## Environments

| Env | Frontend | Backend/CMS | Data |
| --- | -------- | ----------- | ---- |
| Local | `npm run dev` :3000 | uvicorn :8000 / strapi :1337 | docker compose postgres+redis |
| Production | Vercel | AWS ECS Fargate | RDS PG16 + ElastiCache |

## 1. Frontend → Vercel

1. Import the repo, set **Root Directory** = `frontend`.
2. Environment variables (Production): everything in `frontend/.env.example`
   with real values (`NEXT_PUBLIC_API_URL=https://api.nextdynamix.com`,
   GA4/Clarity/HubSpot IDs, `STRAPI_API_TOKEN`,
   `CMS_INTERNAL_URL=https://cms.nextdynamix.com`).
3. Add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` repo secrets —
   `.github/workflows/deploy.yml` then deploys on every push to `main`.
4. Domains: `www.nextdynamix.com` (+ apex redirect).

## 2. Backend + CMS → AWS

Follow `infrastructure/aws/README.md` (ECR, RDS with pgvector, ElastiCache,
Secrets Manager, ECS services behind an ALB). The deploy workflow pushes the
image and forces a new ECS deployment; migrations run on container boot.

## 3. Cloudflare

Follow `infrastructure/cloudflare/README.md` (DNS records, Full-strict TLS,
WAF + edge rate limit on the contact endpoint, cache purge hook).

## 4. Post-deploy checklist

- [ ] `https://www.nextdynamix.com/sitemap.xml` + `robots.txt` resolve
- [ ] Rich Results Test passes: Organization, FAQPage, LocalBusiness, Service
- [ ] Lighthouse ≥ 95 (mobile) — LCP < 2.5s, CLS < 0.1
- [ ] Contact form submission appears in Postgres `leads` **and** HubSpot
- [ ] Chatbot answers a service question with grounded content
      (`python -m scripts.ingest` has been run)
- [ ] GA4 DebugView shows `cta_click`, `form_submit`, `chatbot_open`
- [ ] Clarity session recording appears
- [ ] Search Console: submit sitemap, verify domain
- [ ] Google Business Profile address matches `lib/site.ts` (NAP consistency)

## Rollback

- **Frontend:** Vercel → Deployments → Promote previous.
- **Backend:** `aws ecs update-service --task-definition <previous-rev>`;
  alembic migrations are additive — use `alembic downgrade -1` only if a
  release explicitly requires it.
