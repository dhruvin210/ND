# NextDynamix CMS (Strapi v5)

Headless CMS powering the blog, case studies, and the `/solutions` page.

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
| Case Study  | Challenge / Solution / repeatable result Metrics; `featured` drives the `/solutions` proof section |
| Solution    | The six AI solutions on `/solutions` — short + full description, icon, tier, tags, features, technologies, SEO |
| FAQ         | Question / answer with `page` (which page renders it) and `order` |
| Solutions Page | Single type: hero copy, CTA labels, impact statistics, consultation copy, trust badges |

### Solution field notes

- **`icon`** — enumeration mapped to a Lucide component in
  `frontend/src/data/solutions.ts` (`solutionIcons`). Adding a new key requires
  a matching entry there.
- **`tier`** — layout weight in the solutions bento grid. The defaults are two
  `flagship` (half width), three `standard` (third width) and one `wide` (full
  width), which makes every row fill exactly. Changing the mix still renders,
  but rows may leave a gap.
- **`order`** — ascending; controls grid order.
- Any field left empty falls back to the matching entry in
  `frontend/src/data/solutions.ts`, so a partially-filled entry never blanks
  out the page.

## Post-install checklist

1. **API token** — Settings → API Tokens → create a *Read-only* token; put it
   in the frontend (`STRAPI_API_TOKEN`) and backend (`CMS_API_TOKEN`) env.
2. **Public role** — leave all collections private; the frontend reads with
   the token server-side only. The token must include `find` (and `findOne`)
   on **Solution, Case Study, FAQ, and Solutions Page** — without it those
   requests 401 and the frontend silently renders its built-in fallback copy,
   which looks like "the CMS is being ignored".
3. **Seed the Solutions Page single type** — it is a single type with
   `draftAndPublish` disabled, so it returns `null` until saved once. Until
   then `/solutions` uses the fallback copy in
   `frontend/src/data/solutions-page.ts`.
4. **Webhook** — Settings → Webhooks → on publish/unpublish, POST to the
   frontend revalidate URL and trigger `scripts/ingest.py` (keeps the RAG
   knowledge base fresh).
5. **Media** — for production configure the AWS S3 upload provider
   (`@strapi/provider-upload-aws-s3`).
