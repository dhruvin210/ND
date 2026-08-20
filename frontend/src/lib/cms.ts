import { site } from "@/lib/site";
import {
  solutions as fallbackSolutions,
  type Solution,
  type SolutionIconKey,
  type SolutionTier,
} from "@/data/solutions";
import {
  consultationContent as fallbackConsultation,
  impactStats as fallbackImpactStats,
  solutionFaqs as fallbackSolutionFaqs,
  solutionsHero as fallbackHero,
  type ConsultationContent,
  type ImpactStat,
  type SolutionFaq,
  type SolutionsHeroContent,
} from "@/data/solutions-page";

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

/** Single-type variant — Strapi returns `data` as an object, not an array. */
async function strapiFetchSingle<T>(
  path: string,
  params: Record<string, string> = {},
  revalidate = 300,
): Promise<T | null> {
  try {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${CMS_URL}/api/${path}${qs ? `?${qs}` : ""}`, {
      headers: CMS_TOKEN ? { Authorization: `Bearer ${CMS_TOKEN}` } : {},
      next: { revalidate },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { data: T | null };
    return json.data ?? null;
  } catch {
    return null;
  }
}

/** Resolves a Strapi media URL, which may be relative in local deployments. */
function mediaUrl(url?: string): string | undefined {
  if (!url) return undefined;
  return url.startsWith("http") ? url : `${site.cmsUrl}${url}`;
}

/* ------------------------------- Case studies ------------------------------ */

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  /** Headline numbers rendered as the proof figure on the card. */
  metrics: CaseStudyMetric[];
  imageUrl?: string;
}

interface StrapiCaseStudy {
  slug: string;
  title: string;
  industry: string;
  challenge: string;
  solution: string;
  /** The `case-study` content type stores these as `{ label }` components;
   *  older entries and hand-written API payloads may use `{ metric }` or a
   *  plain string, so all three are accepted. */
  results: ({ label?: string; metric?: string } | string)[];
  metrics?: { value: string; label: string }[];
  featured?: boolean;
  image?: { url: string };
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
    metrics: [{ value: "12×", label: "Faster release cadence" }],
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
    metrics: [{ value: "<5s", label: "End-to-end data latency" }],
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
    metrics: [{ value: "85%", label: "Faster time to an answer" }],
  },
];

/** Proof cards for /solutions — outcome-led, one headline metric each. */
const fallbackSolutionCaseStudies: CaseStudy[] = [
  {
    slug: "support-automation-workload-reduction",
    title: "Conversational AI for a High-Volume Support Desk",
    industry: "SaaS",
    challenge:
      "Tier-1 agents spent most of their day re-answering the same onboarding and billing questions, pushing first-response times past SLA during peak hours.",
    solution:
      "A support assistant grounded in the help centre and three years of resolved tickets, with confidence thresholds and context-preserving escalation into the existing ticketing system.",
    results: [
      "40% reduction in repetitive ticket volume",
      "First-response time inside SLA at peak",
      "Zero increase in reopened tickets",
    ],
    metrics: [{ value: "40%", label: "Reduction in support workload" }],
  },
  {
    slug: "document-intelligence-throughput",
    title: "Invoice and Contract Processing at Scale",
    industry: "Logistics",
    challenge:
      "Every invoice and rate contract was keyed in by hand, capping throughput and making month-end close dependent on overtime.",
    solution:
      "Layout-aware extraction into a validated schema with confidence-based routing, so clean documents post straight to the ERP and only genuine exceptions reach a reviewer.",
    results: [
      "3× faster document processing",
      "Straight-through processing on the majority of volume",
      "Predictable month-end close",
    ],
    metrics: [{ value: "3×", label: "Faster document processing" }],
  },
  {
    slug: "sales-intelligence-qualified-leads",
    title: "Pipeline Intelligence for a Mid-Market Sales Team",
    industry: "Professional Services",
    challenge:
      "Reps prioritised by instinct, so strong inbound leads went cold while forecasts consistently overstated the quarter.",
    solution:
      "Lead scoring trained on the company's own win/loss history, with account-context outreach drafting and pipeline risk signals surfaced directly inside the CRM.",
    results: [
      "25% improvement in qualified leads",
      "Forecast variance materially reduced",
      "Adopted by the full sales team in one quarter",
    ],
    metrics: [{ value: "25%", label: "Improvement in qualified leads" }],
  },
];

function mapCaseStudy(cs: StrapiCaseStudy): CaseStudy {
  const results = (cs.results ?? [])
    .map((r) => (typeof r === "string" ? r : (r.label ?? r.metric)))
    .filter((r): r is string => Boolean(r));
  return {
    slug: cs.slug,
    title: cs.title,
    industry: cs.industry,
    challenge: cs.challenge,
    solution: cs.solution,
    results,
    metrics: cs.metrics?.length
      ? cs.metrics
      : // Derive a headline figure from the first result so a card always has one.
        results.slice(0, 1).map((r) => ({ value: r, label: "" })),
    imageUrl: mediaUrl(cs.image?.url),
  };
}

export async function getCaseStudies(limit = 3): Promise<CaseStudy[]> {
  const res = await strapiFetch<StrapiCaseStudy>("case-studies", {
    "pagination[pageSize]": String(limit),
    sort: "publishedAt:desc",
    populate: "*",
  });
  if (!res || res.data.length === 0) return fallbackCaseStudies.slice(0, limit);
  return res.data.map(mapCaseStudy);
}

/** Featured case studies for the /solutions proof section. Falls back to
 *  solution-specific examples rather than the generic homepage set. */
export async function getFeaturedCaseStudies(limit = 3): Promise<CaseStudy[]> {
  const res = await strapiFetch<StrapiCaseStudy>("case-studies", {
    "filters[featured][$eq]": "true",
    "pagination[pageSize]": String(limit),
    sort: "publishedAt:desc",
    populate: "*",
  });
  if (!res || res.data.length === 0)
    return fallbackSolutionCaseStudies.slice(0, limit);
  return res.data.map(mapCaseStudy);
}

/* -------------------------------- Solutions -------------------------------- */

interface StrapiSolution {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  icon?: SolutionIconKey;
  tier?: SolutionTier;
  ctaLabel?: string;
  tags?: { label: string }[];
  features?: { label: string }[];
  technologies?: { label: string }[];
  seo?: { metaTitle?: string; metaDescription?: string };
}

/** Flattens a Strapi repeatable component of `{ label }` into a string list,
 *  tolerating an admin who typed plain strings via the API instead. */
function labels(items?: ({ label: string } | string)[]): string[] {
  if (!items?.length) return [];
  return items
    .map((i) => (typeof i === "string" ? i : i.label))
    .filter((l): l is string => Boolean(l));
}

export async function getSolutions(): Promise<Solution[]> {
  const res = await strapiFetch<StrapiSolution>("solutions", {
    "pagination[pageSize]": "24",
    sort: "order:asc",
    populate: "*",
  });
  if (!res || res.data.length === 0) return fallbackSolutions;

  return res.data.map((s) => {
    // Preserve local defaults for any field an editor left empty.
    const local = fallbackSolutions.find((f) => f.slug === s.slug);
    return {
      slug: s.slug,
      title: s.title,
      description: s.shortDescription,
      fullDescription: s.fullDescription ?? local?.fullDescription ?? "",
      icon: s.icon ?? local?.icon ?? "agent",
      tier: s.tier ?? local?.tier ?? "standard",
      tags: labels(s.tags).length ? labels(s.tags) : (local?.tags ?? []),
      features: labels(s.features).length
        ? labels(s.features)
        : (local?.features ?? []),
      technologies: labels(s.technologies).length
        ? labels(s.technologies)
        : (local?.technologies ?? []),
      ctaLabel: s.ctaLabel ?? local?.ctaLabel ?? "Explore Solution",
      seo: {
        title: s.seo?.metaTitle ?? local?.seo.title ?? s.title,
        description: s.seo?.metaDescription ?? local?.seo.description ?? s.shortDescription,
      },
    };
  });
}

export async function getSolution(slug: string): Promise<Solution | undefined> {
  const all = await getSolutions();
  return all.find((s) => s.slug === slug);
}

/* ----------------------------------- FAQs ---------------------------------- */

interface StrapiFaq {
  question: string;
  answer: string;
  page?: string;
}

/** FAQs for a given page key, ordered by the CMS `order` field. */
export async function getFaqs(page = "solutions"): Promise<SolutionFaq[]> {
  const res = await strapiFetch<StrapiFaq>("faqs", {
    "filters[page][$eq]": page,
    "pagination[pageSize]": "50",
    sort: "order:asc",
  });
  if (!res || res.data.length === 0) return fallbackSolutionFaqs;
  return res.data.map((f) => ({ question: f.question, answer: f.answer }));
}

/* ------------------------------ Solutions page ----------------------------- */

export interface SolutionsPageContent {
  hero: SolutionsHeroContent;
  stats: ImpactStat[];
  consultation: ConsultationContent;
}

interface StrapiSolutionsPage {
  heroEyebrow?: string;
  heroHeadingLead?: string;
  heroHeadingHighlight?: string;
  heroDescription?: string;
  heroSupportingLine?: string;
  heroPrimaryCtaLabel?: string;
  heroPrimaryCtaHref?: string;
  heroSecondaryCtaLabel?: string;
  heroSecondaryCtaHref?: string;
  stats?: { value: number; prefix?: string; suffix?: string; label: string }[];
  consultationEyebrow?: string;
  consultationHeadingLead?: string;
  consultationHeadingHighlight?: string;
  consultationDescription?: string;
  consultationBenefits?: { label: string }[];
  trustBadges?: { label: string }[];
  privacyNote?: string;
}

/** Page-level copy for /solutions. Every field falls back individually so a
 *  partially-filled CMS entry never blanks out the page. */
export async function getSolutionsPageContent(): Promise<SolutionsPageContent> {
  const data = await strapiFetchSingle<StrapiSolutionsPage>("solutions-page", {
    populate: "*",
  });
  if (!data) {
    return {
      hero: fallbackHero,
      stats: fallbackImpactStats,
      consultation: fallbackConsultation,
    };
  }

  return {
    hero: {
      eyebrow: data.heroEyebrow ?? fallbackHero.eyebrow,
      headingLead: data.heroHeadingLead ?? fallbackHero.headingLead,
      headingHighlight:
        data.heroHeadingHighlight ?? fallbackHero.headingHighlight,
      description: data.heroDescription ?? fallbackHero.description,
      supportingLine: data.heroSupportingLine ?? fallbackHero.supportingLine,
      primaryCta: {
        label: data.heroPrimaryCtaLabel ?? fallbackHero.primaryCta.label,
        href: data.heroPrimaryCtaHref ?? fallbackHero.primaryCta.href,
      },
      secondaryCta: {
        label: data.heroSecondaryCtaLabel ?? fallbackHero.secondaryCta.label,
        href: data.heroSecondaryCtaHref ?? fallbackHero.secondaryCta.href,
      },
    },
    stats: data.stats?.length ? data.stats : fallbackImpactStats,
    consultation: {
      eyebrow: data.consultationEyebrow ?? fallbackConsultation.eyebrow,
      headingLead:
        data.consultationHeadingLead ?? fallbackConsultation.headingLead,
      headingHighlight:
        data.consultationHeadingHighlight ??
        fallbackConsultation.headingHighlight,
      description:
        data.consultationDescription ?? fallbackConsultation.description,
      benefits: labels(data.consultationBenefits).length
        ? labels(data.consultationBenefits)
        : fallbackConsultation.benefits,
      trustBadges: labels(data.trustBadges).length
        ? labels(data.trustBadges)
        : fallbackConsultation.trustBadges,
      privacyNote: data.privacyNote ?? fallbackConsultation.privacyNote,
    },
  };
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

/* ------------------------- Services (pillar pages) ------------------------- */
/** The 11 CMS-authored service landing pages (Generative AI, Cloud
 *  Consulting, etc). Distinct from the 48-item static catalog in
 *  `data/services.ts` — these have their own rich hero, offerings,
 *  capabilities, why-choose-us, and FAQ content straight from the CMS. */

export interface ServiceMetric {
  value: string;
  label: string;
}

export interface ServiceOffering {
  title: string;
  description: string;
}

export interface ServiceCapabilityGroup {
  groupLabel: string;
  items: string[];
}

export interface ServiceReason {
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface PillarService {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  icon?: string;
  order: number;
  heroEyebrow?: string;
  heroHeading: string;
  heroDescription: string;
  heroPrimaryCtaLabel: string;
  heroPrimaryCtaHref: string;
  heroSecondaryCtaLabel?: string;
  heroSecondaryCtaHref?: string;
  trustMetrics: ServiceMetric[];
  offerings: ServiceOffering[];
  capabilities: ServiceCapabilityGroup[];
  whyChooseUs: ServiceReason[];
  faqs: ServiceFaq[];
}

interface StrapiService {
  documentId?: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  icon?: string;
  order?: number;
  heroEyebrow?: string;
  heroHeading: string;
  heroDescription: string;
  heroPrimaryCtaLabel?: string;
  heroPrimaryCtaHref?: string;
  heroSecondaryCtaLabel?: string;
  heroSecondaryCtaHref?: string;
  trustMetrics?: { value: string; label: string }[];
  offerings?: { title: string; description: string }[];
  capabilities?: { groupLabel: string; item: string }[];
  whyChooseUs?: { title: string; description: string }[];
  faqs?: { question: string; answer: string; order?: number }[];
}

/** Groups the flat `{ groupLabel, item }` repeatable component into
 *  `{ groupLabel, items[] }` for easier rendering. */
function groupCapabilities(
  items?: { groupLabel: string; item: string }[],
): ServiceCapabilityGroup[] {
  if (!items?.length) return [];
  const groups = new Map<string, string[]>();
  for (const { groupLabel, item } of items) {
    if (!groups.has(groupLabel)) groups.set(groupLabel, []);
    groups.get(groupLabel)!.push(item);
  }
  return Array.from(groups.entries()).map(([groupLabel, groupItems]) => ({
    groupLabel,
    items: groupItems,
  }));
}

function mapService(s: StrapiService): PillarService {
  return {
    slug: s.slug,
    title: s.title,
    category: s.category,
    shortDescription: s.shortDescription,
    icon: s.icon,
    order: s.order ?? 0,
    heroEyebrow: s.heroEyebrow,
    heroHeading: s.heroHeading,
    heroDescription: s.heroDescription,
    heroPrimaryCtaLabel: s.heroPrimaryCtaLabel ?? "Book a Free Consultation",
    heroPrimaryCtaHref: s.heroPrimaryCtaHref ?? "#lead-form",
    heroSecondaryCtaLabel: s.heroSecondaryCtaLabel,
    heroSecondaryCtaHref: s.heroSecondaryCtaHref,
    trustMetrics: s.trustMetrics ?? [],
    offerings: s.offerings ?? [],
    capabilities: groupCapabilities(s.capabilities),
    whyChooseUs: s.whyChooseUs ?? [],
    faqs: (s.faqs ?? [])
      .slice()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((f) => ({ question: f.question, answer: f.answer })),
  };
}

/** All 11 pillar service pages, ordered for the catalog. Returns an empty
 *  array (never throws) if the CMS is unreachable or nothing is published
 *  yet — callers should treat an empty list as "fall back to the static
 *  48-item catalog". */
export async function getServices(): Promise<PillarService[]> {
  const res = await strapiFetch<StrapiService>("services", {
    "pagination[pageSize]": "50",
    sort: "order:asc",
    populate: "*",
  });
  if (!res) return [];
  return res.data.map(mapService);
}

export async function getServiceBySlug(
  slug: string,
): Promise<PillarService | null> {
  const res = await strapiFetch<StrapiService>("services", {
    "filters[slug][$eq]": slug,
    populate: "*",
  });
  if (!res || res.data.length === 0) return null;
  return mapService(res.data[0]);
}

export async function getAllPillarServiceSlugs(): Promise<string[]> {
  const res = await strapiFetch<StrapiService>("services", {
    "pagination[pageSize]": "50",
    fields: "slug",
  });
  return res ? res.data.map((s) => s.slug) : [];
}

