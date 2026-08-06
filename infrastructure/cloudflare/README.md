# Cloudflare Setup

Cloudflare sits in front of both the Vercel-hosted frontend and the
AWS-hosted API.

## DNS

| Record | Type  | Target                        | Proxy |
| ------ | ----- | ----------------------------- | ----- |
| `www`  | CNAME | `cname.vercel-dns.com`        | DNS only (Vercel manages TLS) |
| `@`    | CNAME | `cname.vercel-dns.com` (flattened) | DNS only |
| `api`  | CNAME | ALB DNS name (ECS backend)    | Proxied |
| `cms`  | CNAME | ALB DNS name (Strapi)         | Proxied |

## Security

- **SSL/TLS mode:** Full (strict)
- **WAF:** enable managed ruleset; add a rate-limiting rule on
  `api.nextdynamix.com/api/v1/contact` (10 req/min/IP) as an outer layer in
  front of the app-level limiter.
- **Bot Fight Mode:** on. Combined with the form honeypot this replaces an
  interactive CAPTCHA without hurting conversion. If abuse persists, enable
  **Turnstile** (managed challenge) on `/api/v1/contact` — invisible to most
  users, WCAG-friendly.

## Caching

- `api.*` and `cms.*`: bypass cache.
- Static assets are cached by Vercel's CDN; Cloudflare adds an edge layer for
  the proxied API subdomains only.

## Deploy hook

The `purge-cloudflare-cache` job in `.github/workflows/deploy.yml` purges the
zone after each production deploy (needs `CLOUDFLARE_ZONE_ID` +
`CLOUDFLARE_API_TOKEN` repo secrets).
