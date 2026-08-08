import {
  Blocks,
  Plug,
  ShieldCheck,
  Target,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- *
 * Editable content for /solutions.
 *
 * Everything here is CMS-shaped: the Strapi `solutions-page` single type and
 * `faq` collection mirror these interfaces, and `lib/cms.ts` falls back to
 * these values when the CMS is unavailable. Copy lives here rather than inline
 * in components so an administrator can own it.
 * -------------------------------------------------------------------------- */

/* --------------------------------- Hero ---------------------------------- */

export interface SolutionsHeroContent {
  eyebrow: string;
  headingLead: string;
  /** Rendered in the brand orange. */
  headingHighlight: string;
  description: string;
  supportingLine: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export const solutionsHero: SolutionsHeroContent = {
  eyebrow: "Our Solutions",
  headingLead: "AI Solutions Built for",
  headingHighlight: "Business Outcomes",
  description:
    "Production-ready AI solutions designed to automate operations, improve decision-making, unlock enterprise knowledge, and create measurable business impact.",
  supportingLine:
    "Architected for the systems you already run — and accountable to the KPIs you already report on.",
  primaryCta: { label: "Explore Solutions", href: "#solutions-grid" },
  secondaryCta: { label: "Talk to an AI Expert", href: "#consultation" },
};

/* --------------------------- Business impact ----------------------------- */

export interface ImpactStat {
  /** Numeric portion, animated on scroll into view. */
  value: number;
  /** Rendered before the number, e.g. a currency symbol. */
  prefix?: string;
  /** Rendered after the number, e.g. "+", "%", " hrs". */
  suffix?: string;
  label: string;
}

export const impactStats: ImpactStat[] = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 50, suffix: "+", label: "Enterprise Clients" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 4, suffix: " hrs", label: "Average Response Time" },
];

/* ------------------------------- Process --------------------------------- */

export interface SolutionProcessStep {
  number: string;
  title: string;
  description: string;
}

export const solutionProcess: SolutionProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "Understand business objectives, processes, data, and measurable KPIs.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Define the AI architecture, model strategy, security requirements, and system integrations.",
  },
  {
    number: "03",
    title: "Build & Integrate",
    description:
      "Develop production-ready AI solutions connected to existing enterprise systems.",
  },
  {
    number: "04",
    title: "Deploy & Optimize",
    description:
      "Deploy securely, monitor performance, measure outcomes, and continuously improve the solution.",
  },
];

/* ---------------------------- Capabilities ------------------------------- */

export interface CapabilityGroup {
  name: string;
  /** Short framing so the section reads as capability, not a logo wall. */
  summary: string;
  technologies: string[];
}

export const capabilityGroups: CapabilityGroup[] = [
  {
    name: "AI & Models",
    summary:
      "Model selection driven by task, latency, and cost — not by vendor preference.",
    technologies: ["OpenAI", "Anthropic", "Gemini", "Llama", "Hugging Face"],
  },
  {
    name: "AI Orchestration",
    summary:
      "Graph-based control flow, tool routing, and retrieval pipelines you can trace.",
    technologies: ["LangChain", "LangGraph", "LlamaIndex"],
  },
  {
    name: "Data",
    summary:
      "Relational, vector, and search layers chosen to fit the retrieval pattern.",
    technologies: ["PostgreSQL", "Pinecone", "Weaviate", "Elasticsearch", "Redis"],
  },
  {
    name: "Cloud",
    summary:
      "Deployed into your account and region, including private and hybrid setups.",
    technologies: ["AWS", "Azure", "Google Cloud"],
  },
  {
    name: "Engineering",
    summary:
      "The application and platform layer that turns a model into a product.",
    technologies: [
      "Python",
      "FastAPI",
      "Node.js",
      "Next.js",
      "Docker",
      "Kubernetes",
    ],
  },
];

/* --------------------------- Why NextDynamix ----------------------------- */

export interface Differentiator {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const differentiators: Differentiator[] = [
  {
    icon: Blocks,
    title: "Production-Ready AI",
    description:
      "We design solutions for real-world enterprise environments, not experimental demos.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Design",
    description:
      "Security, access control, data privacy, and compliance are considered throughout the architecture.",
  },
  {
    icon: Plug,
    title: "Built Around Your Systems",
    description:
      "Our solutions integrate with your existing APIs, databases, CRMs, ERPs, cloud infrastructure, and internal workflows.",
  },
  {
    icon: Target,
    title: "Business Outcomes First",
    description:
      "Every solution is tied to measurable KPIs such as cost reduction, faster operations, better conversion, or increased productivity.",
  },
];

/* ---------------------------- Featured use cases -------------------------- */

export interface UseCase {
  id: string;
  label: string;
  summary: string;
  challenge: string;
  solution: string;
  technologies: string[];
  outcome: string;
}

export const useCases: UseCase[] = [
  {
    id: "customer-support",
    label: "Customer Support Automation",
    summary: "Reduce repetitive support workloads using conversational AI.",
    challenge:
      "Support teams spend most of their capacity re-answering the same questions, so response times slip and genuinely complex tickets sit in the queue behind routine ones.",
    solution:
      "A conversational assistant grounded in your help centre, policies, and historical tickets, with confidence thresholds that route anything ambiguous to a human agent along with the full conversation context.",
    technologies: ["LLM", "RAG", "Omnichannel", "Zendesk / Intercom"],
    outcome:
      "Routine ticket volume absorbed by automation, freeing senior agents for the cases that need judgement — measured as deflection rate and first-response time.",
  },
  {
    id: "knowledge-management",
    label: "Knowledge Management",
    summary:
      "Allow teams to search internal company knowledge using natural language.",
    challenge:
      "Institutional knowledge is scattered across wikis, drives, and ticketing systems. New staff take months to become productive and experienced staff become bottlenecks.",
    solution:
      "Permission-aware semantic search across every internal source, returning direct answers with citations that link back to the originating document and paragraph.",
    technologies: ["RAG", "Vector DB", "Hybrid Retrieval", "SSO"],
    outcome:
      "Answers in seconds rather than hours, with measurable reduction in time-to-productivity for new hires.",
  },
  {
    id: "document-processing",
    label: "Document Processing",
    summary:
      "Automatically process contracts, invoices, reports, and forms.",
    challenge:
      "High-volume document intake is handled manually, which caps throughput, introduces transcription errors, and makes month-end close unpredictable.",
    solution:
      "Layout-aware extraction into a validated schema, with confidence-based routing so clean documents flow straight through and only genuine exceptions reach a reviewer.",
    technologies: ["OCR", "IDP", "Schema Validation", "ERP Integration"],
    outcome:
      "Multiples more throughput per reviewer with a measurable drop in downstream correction work.",
  },
  {
    id: "sales-intelligence",
    label: "Sales Intelligence",
    summary:
      "Improve lead qualification, forecasting, outreach, and pipeline visibility.",
    challenge:
      "Reps prioritise by instinct and CRM hygiene is inconsistent, so good leads go cold while forecasts are built on optimism rather than signal.",
    solution:
      "Scoring models trained on your own win/loss history, outreach drafted from real account context, and pipeline risk surfaced inside the CRM your team already uses.",
    technologies: ["Lead Scoring", "CRM Integration", "Forecasting", "LLM"],
    outcome:
      "Higher qualified-lead conversion and forecasts that hold up against actual close rates.",
  },
  {
    id: "operations-automation",
    label: "Operations Automation",
    summary:
      "Automate repetitive workflows across departments and systems.",
    challenge:
      "Cross-system processes are stitched together by people copying data between tools, which is slow, error-prone, and impossible to audit.",
    solution:
      "Process mapping to find the highest-value steps, then automation built against your real APIs with idempotent retries, alerting, and a full audit trail.",
    technologies: ["Process Mining", "API Integration", "Orchestration", "Monitoring"],
    outcome:
      "Recurring manual hours removed per month, with error rates and cycle times tracked per process.",
  },
];

/* ------------------------------ Consultation ----------------------------- */

export interface ConsultationContent {
  eyebrow: string;
  headingLead: string;
  headingHighlight: string;
  description: string;
  benefits: string[];
  trustBadges: string[];
  privacyNote: string;
}

export const consultationContent: ConsultationContent = {
  eyebrow: "Get Started",
  headingLead: "Ready to Build Something",
  headingHighlight: "Exceptional?",
  description:
    "Tell us about your project and a senior solutions architect will get back to you within 4 business hours with a personalised response — not a generic sales pitch.",
  benefits: [
    "150+ projects delivered",
    "98% client satisfaction",
    "Free 30-minute consultation",
    "Response within 4 hours",
  ],
  trustBadges: ["AWS Partner", "Google Cloud", "ISO 27001", "SOC 2"],
  privacyNote:
    "Your information is secure. We never share your data with third parties.",
};

/* ---------------------------------- FAQ ---------------------------------- */

export interface SolutionFaq {
  question: string;
  answer: string;
}

export const solutionFaqs: SolutionFaq[] = [
  {
    question: "How long does an AI project typically take?",
    answer:
      "A focused solution — a support assistant or a document extraction pipeline — usually reaches production in 8 to 12 weeks. Broader programmes involving several systems run 4 to 6 months with phased releases, so value lands early rather than all at the end. Discovery alone takes one to two weeks and ends with a scoped plan and a KPI baseline.",
  },
  {
    question: "Can you integrate AI into our existing software?",
    answer:
      "Yes — that is the normal case rather than the exception. We build against your existing APIs, databases, CRMs, ERPs, and internal services, and we work within your authentication and access-control model. Most engagements add capability to systems you already run instead of replacing them.",
  },
  {
    question: "Do you build custom AI solutions?",
    answer:
      "We do. Every engagement is architected around your processes, data, and constraints. Where an off-the-shelf component is genuinely the better answer we will say so, but we do not resell a fixed product and then bend your workflow to fit it.",
  },
  {
    question: "How do you handle enterprise data security?",
    answer:
      "Security is designed in from the architecture stage: least-privilege access, encryption in transit and at rest, tenant isolation, audit logging, and retrieval that honours your existing per-user permissions so the AI never surfaces something a user could not already open. We align to SOC 2 and GDPR expectations and can work under your own security review process.",
  },
  {
    question: "Can AI solutions be deployed on our private cloud?",
    answer:
      "Yes. We deploy into your AWS, Azure, or Google Cloud account and region, including VPC-isolated and hybrid setups. Where data residency or policy requires it, we can run open-weight models on your infrastructure so no prompt or document leaves your environment.",
  },
  {
    question: "Which AI models do you work with?",
    answer:
      "We work with OpenAI, Anthropic, Google Gemini, Llama, and Hugging Face models, and we select per task based on quality, latency, and cost rather than vendor preference. Systems are built so a model can be swapped without rewriting the application, and evaluation suites tell us whether a swap is actually an improvement.",
  },
  {
    question: "Do you provide ongoing AI maintenance and optimization?",
    answer:
      "Yes. AI systems drift as models, data, and usage change. Ongoing engagements cover monitoring and alerting, evaluation runs against a maintained test set, prompt and retrieval tuning, cost optimisation, model upgrades, and a quarterly review against the KPIs the solution was built to move.",
  },
];
