# AWS Deployment (Backend + CMS)

The frontend lives on Vercel; the FastAPI backend, Strapi CMS, Postgres, and
Redis run on AWS.

## Architecture

```
Cloudflare (api.* / cms.*)
        │
   ALB (HTTPS, ACM cert)
   ├── ECS Fargate service: nextdynamix-backend  (2× 0.5 vCPU / 1 GB)
   └── ECS Fargate service: nextdynamix-cms      (1× 0.5 vCPU / 1 GB)
        │
   RDS PostgreSQL 16 (db.t4g.small, pgvector extension enabled)
   ElastiCache Redis 7 (cache.t4g.micro)
   S3: nextdynamix-cms-media (Strapi uploads)
   ECR: nextdynamix-backend, nextdynamix-cms
```

## Provisioning checklist

1. **ECR** — create `nextdynamix-backend` and `nextdynamix-cms` repositories.
2. **RDS** — PostgreSQL 16, enable the `vector` extension
   (`CREATE EXTENSION vector;` — the alembic migration also does this).
   Create databases `nextdynamix` and `nextdynamix_cms`.
3. **ElastiCache** — Redis 7 cluster, same VPC/subnets as ECS.
4. **Secrets Manager** — store `DATABASE_URL`, `REDIS_URL`,
   `HUBSPOT_ACCESS_TOKEN`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`,
   `CMS_API_TOKEN`; reference them in the task definitions.
5. **ECS** — cluster `nextdynamix`; services per the task definition in
   `task-definition-backend.json`. Health check path: `/health`.
6. **ALB** — HTTPS :443 with an ACM certificate for `api.nextdynamix.com`
   and `cms.nextdynamix.com`; host-header routing to the two target groups.
7. **GitHub OIDC role** — `AWS_DEPLOY_ROLE_ARN` secret used by
   `.github/workflows/deploy.yml` (permissions: ECR push, ECS update-service).
8. **Migrations** — the backend container runs `alembic upgrade head` on
   boot (see docker-compose; replicate via ECS task command or an init task).
9. **RAG ingestion** — schedule `python -m scripts.ingest` as an ECS
   scheduled task (EventBridge, daily) so the chatbot stays current.
