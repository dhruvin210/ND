export interface ProcessStep {
  number: string;
  duration: string;
  title: string;
  summary: string;
  /** Full detail content — always present in the HTML so Google indexes it
   *  (Design Review: CSS reveal, not JS fetch). */
  details: string[];
  deliverables: string[];
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    duration: "1–2 weeks",
    title: "Discover",
    summary: "Stakeholder interviews, competitor audit, and KPI definition.",
    details: [
      "We align on business goals, success metrics, and constraints before a single screen is designed.",
      "Workshops with stakeholders surface the workflows, risks, and integrations that shape the build.",
    ],
    deliverables: [
      "Product requirements document",
      "Technical architecture proposal",
      "Project roadmap & KPI baseline",
    ],
  },
  {
    number: "02",
    duration: "~2 weeks",
    title: "Design",
    summary: "Wireframes, UX flows, and high-fidelity Figma prototypes.",
    details: [
      "Information architecture and user flows are validated with clickable prototypes before development begins.",
      "A design token system keeps every screen consistent with your brand.",
    ],
    deliverables: [
      "UX flows & wireframes",
      "High-fidelity Figma prototype",
      "Design system & tokens",
    ],
  },
  {
    number: "03",
    duration: "4–8 weeks",
    title: "Build",
    summary: "Agile development sprints with weekly reviews.",
    details: [
      "Two-week sprints with demos every Friday — you see working software, not status reports.",
      "Automated testing, code review, and CI/CD keep quality high while velocity stays predictable.",
    ],
    deliverables: [
      "Production-ready codebase",
      "Automated test suite & CI/CD",
      "Sprint demos & changelogs",
    ],
  },
  {
    number: "04",
    duration: "~1 week",
    title: "Launch",
    summary: "QA testing, staging review, and production deployment.",
    details: [
      "Load testing, security review, and accessibility checks gate every release.",
      "Zero-downtime deployment with monitoring and rollback plans in place from day one.",
    ],
    deliverables: [
      "Security & performance audit",
      "Production deployment",
      "Monitoring & alerting setup",
    ],
  },
  {
    number: "05",
    duration: "Ongoing",
    title: "Evolve",
    summary: "Monitoring, updates, and continuous improvement.",
    details: [
      "Post-launch analytics drive a prioritized improvement backlog — not guesswork.",
      "SLA-backed support, dependency updates, and quarterly roadmap reviews keep the product moving.",
    ],
    deliverables: [
      "SLA-backed support",
      "Quarterly roadmap reviews",
      "Continuous optimization",
    ],
  },
];