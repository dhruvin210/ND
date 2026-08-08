import {
  Blocks,
  GaugeCircle,
  Handshake,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";

/**
 * Static content for the /services catalog page. Kept beside the service list
 * rather than in the CMS — this copy is positioning, not editorial, and it
 * changes on the same cadence as the service catalogue itself.
 */

export interface ServicesStat {
  value: string;
  label: string;
}

export const servicesStats: ServicesStat[] = [
  { value: "48", label: "Services" },
  { value: "8", label: "Disciplines" },
  { value: "150+", label: "Projects Delivered" },
  { value: "9+", label: "Years Building" },
];

export interface EngagementStep {
  number: string;
  title: string;
  description: string;
}

export const engagementSteps: EngagementStep[] = [
  {
    number: "01",
    title: "Free Evaluation",
    description:
      "We look at what you already run before recommending anything. You leave the first call with a written read on the problem, whether or not you hire us.",
  },
  {
    number: "02",
    title: "Scoped Proposal",
    description:
      "A fixed scope, a named team, and a delivery date — priced against the outcome rather than an open-ended hourly rate.",
  },
  {
    number: "03",
    title: "Build & Review",
    description:
      "Two-week increments, each ending in something you can click, test, or run against real data. No status-update-only checkpoints.",
  },
  {
    number: "04",
    title: "Handover & Support",
    description:
      "Documentation, access, and runbooks transfer to your team. Ongoing support is a choice you make afterwards, never a dependency we engineer in.",
  },
];

export interface ServiceDifferentiator {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const serviceDifferentiators: ServiceDifferentiator[] = [
  {
    title: "One Team, Eight Disciplines",
    description:
      "Security, AI, cloud, engineering, and design sit in the same delivery org — so integration work does not become your problem to project-manage.",
    icon: Blocks,
  },
  {
    title: "Priced Against Outcomes",
    description:
      "Fixed scope and a fixed number before work starts. Change requests are quoted, not absorbed into a growing invoice.",
    icon: GaugeCircle,
  },
  {
    title: "Senior People On The Work",
    description:
      "The engineers in your kickoff are the engineers who write the code. We do not staff a pitch with one team and deliver with another.",
    icon: Handshake,
  },
  {
    title: "Support That Outlasts Launch",
    description:
      "Monitoring, patching, and optimisation continue after go-live — because the first month in production is where most of the real issues surface.",
    icon: LifeBuoy,
  },
];

export interface ServicesFaqItem {
  question: string;
  answer: string;
}

export const servicesFaqs: ServicesFaqItem[] = [
  {
    question: "Can I engage NextDynamix for a single service?",
    answer:
      "Yes. Most engagements start with one service — a penetration test, a Next.js build, a cloud migration. Nothing in the catalogue is bundled or gated behind a larger contract.",
  },
  {
    question: "How quickly can a project start?",
    answer:
      "The free evaluation is usually booked within two business days. From a signed scope, most engagements have a team assigned and running inside two weeks.",
  },
  {
    question: "Do you work with our existing in-house team?",
    answer:
      "Routinely. We embed alongside internal engineering, work to your standards and review process, and hand over cleanly. Several clients use us purely to add a discipline they do not staff internally.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Fixed scope, fixed price for defined projects; a monthly retainer for ongoing security, cloud, or marketing operations. You get the number before work begins, not after.",
  },
  {
    question: "Which industries do you work in?",
    answer:
      "Financial services, healthcare, manufacturing, retail, and SaaS make up most of our delivery history. The engagement model does not change by sector — the compliance requirements around it do.",
  },
  {
    question: "Who owns the code and infrastructure you build?",
    answer:
      "You do, in full, from the first commit. Repositories, cloud accounts, and credentials are yours throughout — we work inside your estate, not a separate one you have to migrate out of later.",
  },
];
