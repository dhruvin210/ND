# NextDynamix CMS (Strapi v5)

Headless CMS powering the blog and case studies.

## Setup

```bash
# Scaffold Strapi (once) into this folder, keeping the provided src/:
npx create-strapi-app@latest . --no-run \
  --dbclient=postgres \
  --dbhost=localhost --dbport=5432 \
  --dbname=nextdynamix_cms --dbusername=nextdynamix --dbpassword=nextdynamix

# The content-type schemas in src/api/ and src/components/ are picked up
# automatically on first start:
npm run develop
```

## Content models

| Model       | Purpose                                          |
| ----------- | ------------------------------------------------ |
| Article     | Blog posts — title, slug, excerpt, rich content, cover, SEO fields |
| Author      | Writer profiles with avatar and role             |
| Category    | One per article; drives related-post lookups     |
| Tag         | Many-to-many topic tags                          |
| Case Study  | Challenge / Solution / repeatable result Metrics |

## Post-install checklist

1. **API token** — Settings → API Tokens → create a *Read-only* token; put it
   in the frontend (`STRAPI_API_TOKEN`) and backend (`CMS_API_TOKEN`) env.
2. **Public role** — leave all collections private; the frontend reads with
   the token server-side only.
3. **Webhook** — Settings → Webhooks → on publish/unpublish, POST to the
   frontend revalidate URL and trigger `scripts/ingest.py` (keeps the RAG
   knowledge base fresh).
4. **Media** — for production configure the AWS S3 upload provider
   (`@strapi/provider-upload-aws-s3`).
