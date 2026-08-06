import { site } from "@/lib/site";

/** Strapi v5 REST client with ISR caching and graceful fallbacks so the
 *  homepage never hard-fails if the CMS is down. */

const CMS_URL = process.env.CMS_INTERNAL_URL ?? site.cmsUrl;
const CMS_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiResponse<T> {
  data: T[];
  meta: { pagination: { page: number; pageCount: number; total: number } };
}

async function strapiFetch<T>(
  path: string,
  params: Record<string, string> = {},
  revalidate = 300,
): Promise<StrapiResponse<T> | null> {
  try {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${CMS_URL}/api/${path}${qs ? `?${qs}` : ""}`, {
      headers: CMS_TOKEN ? { Authorization: `Bearer ${CMS_TOKEN}` } : {},
      next: { revalidate },
    });
    if (!res.ok) return null;
    return (await res.json()) as StrapiResponse<T>;
  } catch {
    return null;
  }
}

/* ------------------------------- Case studies ------------------------------ */

export interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
}

interface StrapiCaseStudy {
  slug: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  results: { metric: string }[] | string[];
}

const fallbackCaseStudies: CaseStudy[] = [
  {
    slug: "techventures-platform-modernization",
    title: "Legacy Platform Modernization for TechVentures",
    industry: "Fintech",
    challenge:
      "A decade-old monolith slowed releases to once a quarter and couldn't support new AI-driven product lines.",
    solution:
      "Incremental migration to a Next.js + FastAPI architecture on AWS, with CI/CD and automated testing from sprint one.",
    results: ["12x faster releases", "38% lower infra cost", "99.95% uptime"],
  },
  {
    slug: "dataflow-realtime-analytics",
    title: "Real-Time Analytics Pipeline for DataFlow Systems",
    industry: "Data & SaaS",
    challenge:
      "Customer dashboards lagged hours behind events, eroding trust in the product's core value proposition.",
    solution:
      "Kafka-based streaming pipeline with a pgvector-backed semantic search layer and rebuilt React dashboards.",
    results: ["<5s data latency", "3x dashboard engagement", "40% churn reduction"],
  },
  {
    slug: "enterprise-solutions-ai-transformation",
    title: "Enterprise AI Transformation for Enterprise Solutions Co",
    industry: "Professional Services",
    challenge:
      "Knowledge trapped in 40,000+ documents meant consultants spent 30% of billable time searching for answers.",
    solution:
      "RAG-powered enterprise search with LlamaIndex and LangGraph agents, integrated into Slack and the intranet.",
    results: ["85% faster answers", "Search adoption 92%", "$1.2M annual savings"],
  },
];

export async function getCaseStudies(limit = 3): Promise<CaseStudy[]> {
  const res = await strapiFetch<StrapiCaseStudy>("case-studies", {
    "pagination[pageSize]": String(limit),
    sort: "publishedAt:desc",
    populate: "*",
  });
  if (!res || res.data.length === 0) return fallbackCaseStudies.slice(0, limit);
  return res.data.map((cs) => ({
    slug: cs.slug,
    title: cs.title,
    industry: cs.industry,
    challenge: cs.challenge,
    solution: cs.solution,
    results: (cs.results ?? []).map((r) =>
      typeof r === "string" ? r : r.metric,
    ),
  }));
}

/* ---------------------------------- Blog ---------------------------------- */

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverUrl?: string;
  publishedAt: string;
  updatedAt?: string;
  author: { name: string; role?: string };
  category?: { name: string; slug: string };
  tags: { name: string; slug: string }[];
}

interface StrapiArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  cover?: { url: string };
  author?: { name: string; role?: string };
  category?: { name: string; slug: string };
  tags?: { name: string; slug: string }[];
}

function mapArticle(a: StrapiArticle): Article {
  return {
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    content: a.content,
    coverUrl: a.cover?.url
      ? a.cover.url.startsWith("http")
        ? a.cover.url
        : `${site.cmsUrl}${a.cover.url}`
      : undefined,
    publishedAt: a.publishedAt,
    updatedAt: a.updatedAt,
    author: a.author ?? { name: "NextDynamix Team" },
    category: a.category,
    tags: a.tags ?? [],
  };
}

export async function getArticles(options: {
  page?: number;
  pageSize?: number;
  category?: string;
  tag?: string;
  search?: string;
} = {}): Promise<{ articles: Article[]; totalPages: number }> {
  const params: Record<string, string> = {
    "pagination[page]": String(options.page ?? 1),
    "pagination[pageSize]": String(options.pageSize ?? 9),
    sort: "publishedAt:desc",
    populate: "*",
  };
  if (options.category) params["filters[category][slug][$eq]"] = options.category;
  if (options.tag) params["filters[tags][slug][$eq]"] = options.tag;
  if (options.search) params["filters[title][$containsi]"] = options.search;

  const res = await strapiFetch<StrapiArticle>("articles", params);
  if (!res) return { articles: [], totalPages: 0 };
  return {
    articles: res.data.map(mapArticle),
    totalPages: res.meta.pagination.pageCount,
  };
}

export async function getArticle(slug: string): Promise<Article | null> {
  const res = await strapiFetch<StrapiArticle>("articles", {
    "filters[slug][$eq]": slug,
    populate: "*",
  });
  if (!res || res.data.length === 0) return null;
  return mapArticle(res.data[0]);
}

export async function getRelatedArticles(
  article: Article,
  limit = 3,
): Promise<Article[]> {
  if (!article.category) return [];
  const res = await strapiFetch<StrapiArticle>("articles", {
    "filters[category][slug][$eq]": article.category.slug,
    "filters[slug][$ne]": article.slug,
    "pagination[pageSize]": String(limit),
    sort: "publishedAt:desc",
    populate: "*",
  });
  return res ? res.data.map(mapArticle) : [];
}

export async function getAllArticleSlugs(): Promise<
  { slug: string; updatedAt?: string }[]
> {
  const res = await strapiFetch<StrapiArticle>("articles", {
    "pagination[pageSize]": "100",
    fields: "slug,updatedAt",
  });
  return res
    ? res.data.map((a) => ({ slug: a.slug, updatedAt: a.updatedAt }))
    : [];
}
