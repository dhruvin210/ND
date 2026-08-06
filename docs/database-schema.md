# Database Schema

Two PostgreSQL 16 databases on one RDS instance:

- **`nextdynamix`** — application database (FastAPI, alembic-managed)
- **`nextdynamix_cms`** — Strapi-managed (tables created by Strapi)

## Application database

### leads
| Column | Type | Notes |
| ------ | ---- | ----- |
| id | uuid PK | |
| name | varchar(120) | |
| company | varchar(160) | |
| email | varchar(254) | indexed |
| phone | varchar(32) | nullable |
| project_details | text | |
| budget | varchar(40) | validated enum |
| timeline | varchar(40) | validated enum |
| source | varchar(40) | `website_contact_form` \| `website_chatbot` \| `website_newsletter` |
| hubspot_contact_id | varchar(64) | nullable — CRM sync result |
| created_at | timestamptz | default now() |

### newsletter_subscribers
| Column | Type | Notes |
| ------ | ---- | ----- |
| id | uuid PK | |
| email | varchar(254) | unique, indexed |
| created_at | timestamptz | |

### chat_sessions
| Column | Type | Notes |
| ------ | ---- | ----- |
| id | uuid PK | client-generated session id |
| visitor_email | varchar(254) | nullable — set on lead capture |
| lead_captured | boolean | default false |
| created_at | timestamptz | |

### chat_messages
| Column | Type | Notes |
| ------ | ---- | ----- |
| id | uuid PK | |
| session_id | uuid FK → chat_sessions (CASCADE) | indexed |
| role | varchar(16) | `user` \| `assistant` |
| content | text | |
| created_at | timestamptz | |

### documents (RAG knowledge base)
| Column | Type | Notes |
| ------ | ---- | ----- |
| id | uuid PK | |
| source_type | varchar(32) | `website` \| `blog` \| `case_study` (indexed) |
| source_url | varchar(500) | delete+reinsert key on re-ingestion |
| title | varchar(300) | |
| content | text | ~512-token chunk |
| embedding | vector(1536) | OpenAI text-embedding-3-small |
| updated_at | timestamptz | |

Index: `ix_documents_embedding_hnsw` — HNSW, `vector_cosine_ops`.

## Migrations

```bash
cd backend
alembic upgrade head                      # apply
alembic revision --autogenerate -m "..."  # create new
```

Migration `0001_initial` also runs `CREATE EXTENSION IF NOT EXISTS vector`.
