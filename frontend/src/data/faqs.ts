export interface Faq {
  question: string;
  answer: string;
}

/** SEO-optimized FAQ — rendered as an accordion with FAQPage JSON-LD schema. */
export const faqs: Faq[] = [
  {
    question: "What digital services does NextDynamix offer?",
    answer:
      "NextDynamix offers AI agent development, generative AI solutions, custom software development, cloud engineering, DevOps, data engineering, RAG systems and enterprise search, workflow automation, and end-to-end digital transformation. Every engagement is custom-built — we don't resell templates.",
  },
  {
    question: "How long does a custom software development project take?",
    answer:
      "Most projects follow our five-phase process: 1–2 weeks of discovery, about 2 weeks of design, 4–8 weeks of agile build sprints, and roughly 1 week for launch. A typical MVP ships in 8–12 weeks; larger enterprise platforms run 4–6 months with phased releases.",
  },
  {
    question: "What industries does NextDynamix serve?",
    answer:
      "We serve 12+ industries including fintech, healthcare, retail and e-commerce, logistics, manufacturing, and professional services. Our clients range from growth-stage startups to mid-market companies and enterprises.",
  },
  {
    question: "What technologies does NextDynamix use?",
    answer:
      "Our core stack is Next.js, React, and TypeScript on the frontend; Python, FastAPI, PostgreSQL, and Redis on the backend; AWS, Vercel, Cloudflare, and Docker for infrastructure; and OpenAI, Anthropic, Gemini, LangGraph, and LlamaIndex for AI systems.",
  },
  {
    question: "How much does custom software development cost?",
    answer:
      "Pricing depends on scope and complexity. Discovery engagements start around $10k, MVPs typically range from $40k–$120k, and enterprise platforms are scoped individually. After a free consultation we provide a fixed, milestone-based proposal — no surprise invoices.",
  },
  {
    question: "Can NextDynamix build AI agents for my business?",
    answer:
      "Yes. We design and deploy production AI agents that handle real workflows — customer support, document processing, research, and operations automation — built on LangGraph with human-in-the-loop controls, evaluation suites, and guardrails.",
  },
  {
    question: "Can NextDynamix help with cloud infrastructure?",
    answer:
      "Absolutely. We design AWS-native architectures, migrate legacy workloads, implement infrastructure as code, and set up CI/CD, monitoring, and cost optimization. We also support hybrid Vercel + AWS deployments for modern web products.",
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer:
      "Yes. Every launch includes a stabilization period, and most clients continue with an SLA-backed support plan covering monitoring, security updates, dependency upgrades, and a prioritized improvement backlog with quarterly roadmap reviews.",
  },
  {
    question: "Do you work with startups as well as enterprises?",
    answer:
      "Both. Growth-stage startups use us as a senior product engineering team to ship fast without technical debt. Enterprises and mid-market companies engage us for AI transformation, system modernization, and dedicated delivery squads.",
  },
  {
    question: "What is RAG and do I need it?",
    answer:
      "RAG (retrieval-augmented generation) grounds AI answers in your own documents and data instead of the model's general knowledge. If your teams search wikis, PDFs, tickets, or policies to answer questions, a RAG system gives them accurate, cited answers in seconds.",
  },
  {
    question: "How do we start a project with NextDynamix?",
    answer:
      "Schedule a free consultation through the form on this page. Within 48 hours we'll review your goals, and within a week you'll have a proposal with scope, timeline, and fixed milestone pricing. From signature to kickoff is typically under two weeks.",
  },
];
