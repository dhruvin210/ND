import {
  BrainCircuit,
  FileSearch,
  MessagesSquare,
  ScanSearch,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- *
 * Solutions — the six production AI solutions offered on /solutions.
 *
 * This module is the single source of truth for shape + default content. The
 * same shapes are returned by the Strapi fetchers in `lib/cms.ts`, which fall
 * back to the values here whenever the CMS is unreachable or empty. Icons are
 * referenced by a string key (`icon`) so an administrator can pick one in
 * Strapi without shipping a component.
 * -------------------------------------------------------------------------- */

export type SolutionIconKey =
  | "chatbot"
  | "agent"
  | "search"
  | "document"
  | "workflow"
  | "sales";

/** Layout weight in the bento grid. Chosen per solution so rows always fill:
 *  2 × flagship (half) + 3 × standard (third) + 1 × wide (full). */
export type SolutionTier = "flagship" | "standard" | "wide";

export interface Solution {
  slug: string;
  title: string;
  /** One or two sentences — used on the solution card. */
  description: string;
  /** Longer positioning copy — used on the solution detail page. */
  fullDescription: string;
  icon: SolutionIconKey;
  tier: SolutionTier;
  /** Short technology/capability labels shown as pills on the card. */
  tags: string[];
  /** What the solution actually does — detail page bullets. */
  features: string[];
  /** Concrete stack used to build it. */
  technologies: string[];
  ctaLabel: string;
  seo: { title: string; description: string };
}

/** Maps the CMS-safe icon key to a Lucide component. */
export const solutionIcons: Record<SolutionIconKey, LucideIcon> = {
  chatbot: MessagesSquare,
  agent: BrainCircuit,
  search: ScanSearch,
  document: FileSearch,
  workflow: Workflow,
  sales: TrendingUp,
};

export function getSolutionIcon(key: SolutionIconKey): LucideIcon {
  return solutionIcons[key] ?? BrainCircuit;
}

export const solutions: Solution[] = [
  {
    slug: "ai-chatbots",
    title: "AI Chatbots",
    description:
      "Conversational AI assistants that resolve customer queries around the clock, reduce support costs, and seamlessly hand off complex cases to human teams.",
    fullDescription:
      "We build conversational assistants that are grounded in your own product documentation, policies, and ticket history — so answers are accurate rather than plausible. Every deployment includes intent coverage analysis, confidence thresholds, and a clean escalation path to human agents with the full conversation context attached.",
    icon: "chatbot",
    tier: "flagship",
    tags: ["NLP", "LLM", "Omnichannel", "24/7 Support"],
    features: [
      "Answers grounded in your documentation with confidence scoring",
      "Human handoff that carries full conversation context to the agent",
      "Deployed across web, WhatsApp, Slack, and in-product surfaces",
      "Containment and deflection reporting tied to support cost per ticket",
    ],
    technologies: ["OpenAI", "Anthropic", "LangGraph", "Pinecone", "FastAPI"],
    ctaLabel: "Explore Solution",
    seo: {
      title: "AI Chatbot Development — 24/7 Customer Support Automation",
      description:
        "Enterprise AI chatbots grounded in your own knowledge base. Resolve customer queries around the clock, cut support costs, and escalate complex cases to human teams with full context.",
    },
  },
  {
    slug: "agentic-ai",
    title: "Agentic AI",
    description:
      "Autonomous multi-agent systems capable of planning, reasoning, using tools, and executing complex business workflows end-to-end.",
    fullDescription:
      "Agentic systems are only useful in production when they are observable and bounded. We design multi-agent architectures with explicit state machines, tool permissions, retry and fallback policies, evaluation suites, and human-in-the-loop approval gates on any action that touches money, customers, or production data.",
    icon: "agent",
    tier: "flagship",
    tags: ["LangGraph", "Multi-Agent", "Tool Use", "Orchestration"],
    features: [
      "Explicit graph-based state machines instead of opaque agent loops",
      "Scoped tool permissions with approval gates on high-impact actions",
      "Evaluation suites and regression tests that run on every model change",
      "Full step-level tracing so every decision can be audited after the fact",
    ],
    technologies: ["LangGraph", "LangChain", "Anthropic", "Python", "Redis"],
    ctaLabel: "Explore Solution",
    seo: {
      title: "Agentic AI Development — Autonomous Multi-Agent Systems",
      description:
        "Production agentic AI: multi-agent systems that plan, reason, and use tools to execute business workflows end-to-end, with tracing, evaluations, and human-in-the-loop controls.",
    },
  },
  {
    slug: "enterprise-search",
    title: "Enterprise Search",
    description:
      "Semantic search across documents, knowledge bases, internal systems, and databases with grounded answers and verifiable citations.",
    fullDescription:
      "Enterprise knowledge is usually spread across wikis, drives, ticketing systems, and databases that no single search box covers. We build retrieval pipelines that unify those sources, respect existing access controls per user, and return answers with citations that link straight back to the source paragraph.",
    icon: "search",
    tier: "standard",
    tags: ["RAG", "Vector DB", "Semantic Search", "Citations"],
    features: [
      "Unified retrieval across wikis, drives, ticketing systems, and databases",
      "Permission-aware results that honour existing per-user access controls",
      "Answers with inline citations linking back to the source paragraph",
      "Hybrid keyword plus vector retrieval with re-ranking for precision",
    ],
    technologies: ["LlamaIndex", "Weaviate", "Elasticsearch", "PostgreSQL", "OpenAI"],
    ctaLabel: "Explore Solution",
    seo: {
      title: "Enterprise Search & RAG Systems — Grounded Answers with Citations",
      description:
        "Semantic enterprise search across documents, knowledge bases, and internal systems. Permission-aware retrieval with grounded, verifiable answers and citations.",
    },
  },
  {
    slug: "document-intelligence",
    title: "Document Intelligence",
    description:
      "Extract, classify, understand, and process information from contracts, invoices, forms, reports, and enterprise documents at scale.",
    fullDescription:
      "Document workflows fail on the edge cases — scanned faxes, multi-page tables, inconsistent templates. We build extraction pipelines with layout-aware parsing, schema validation, and confidence-based routing, so clean documents flow straight through and only genuine exceptions reach a human reviewer.",
    icon: "document",
    tier: "standard",
    tags: ["OCR", "IDP", "Extraction", "Classification"],
    features: [
      "Layout-aware parsing that survives scans, tables, and mixed templates",
      "Schema-validated structured output ready for your downstream systems",
      "Confidence-based routing so only true exceptions need human review",
      "Straight-through processing rates measured and reported per document type",
    ],
    technologies: ["Python", "FastAPI", "OpenAI", "PostgreSQL", "Docker"],
    ctaLabel: "Explore Solution",
    seo: {
      title: "Document Intelligence & IDP — Automated Document Processing",
      description:
        "Extract, classify, and process contracts, invoices, forms, and reports at scale with layout-aware AI, schema validation, and exception-only human review.",
    },
  },
  {
    slug: "workflow-automation",
    title: "Workflow Automation",
    description:
      "AI-driven automation connecting enterprise systems and removing repetitive, error-prone manual processes.",
    fullDescription:
      "We start by mapping how work actually moves through your organisation, then automate the steps where judgement is repeatable and hand the rest to people. Integrations are built against your real systems — CRMs, ERPs, ticketing, internal APIs — with idempotent retries and alerting so a failed run never silently disappears.",
    icon: "workflow",
    tier: "standard",
    tags: ["RPA", "Integrations", "Process Mining", "Low-Code"],
    features: [
      "Process mapping that identifies which steps are worth automating first",
      "Native integrations with your CRM, ERP, ticketing, and internal APIs",
      "Idempotent retries, dead-letter handling, and alerting on failed runs",
      "Hours-saved and error-rate tracking per automated process",
    ],
    technologies: ["Python", "FastAPI", "Node.js", "Redis", "Kubernetes"],
    ctaLabel: "Explore Solution",
    seo: {
      title: "AI Workflow Automation — Connect Systems, Remove Manual Work",
      description:
        "AI-driven workflow automation that connects enterprise systems and removes repetitive, error-prone manual processes, with monitoring and measurable hours saved.",
    },
  },
  {
    slug: "sales-ai",
    title: "Sales AI",
    description:
      "AI-powered lead scoring, personalised outreach, forecasting, and pipeline intelligence designed to improve sales performance.",
    fullDescription:
      "Sales AI works when it is wired into the CRM your team already lives in. We build scoring models on your own closed-won history, generate outreach that references real account context, and surface pipeline risk early — inside the CRM, not in a separate dashboard nobody opens.",
    icon: "sales",
    tier: "wide",
    tags: ["Lead Scoring", "CRM", "Personalisation", "Forecasting"],
    features: [
      "Lead scoring trained on your own closed-won and closed-lost history",
      "Outreach drafted from real account context, not generic templates",
      "Pipeline risk and forecast signals surfaced directly inside the CRM",
      "Attribution back to conversion rate and average deal cycle length",
    ],
    technologies: ["Python", "PostgreSQL", "OpenAI", "Next.js", "AWS"],
    ctaLabel: "Explore Solution",
    seo: {
      title: "Sales AI — Lead Scoring, Forecasting & Pipeline Intelligence",
      description:
        "AI-powered lead scoring, personalised outreach, and forecasting wired into your existing CRM to improve qualified pipeline and sales performance.",
    },
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

/** Options for the "I need help with" field on the consultation form. */
export const consultationInterests: string[] = [
  ...solutions.map((s) => s.title),
  "Custom AI Solution",
  "Other",
];
