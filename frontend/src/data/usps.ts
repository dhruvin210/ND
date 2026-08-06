import {
  Target,
  PackageCheck,
  ShieldCheck,
  Layers,
  type LucideIcon,
} from "lucide-react";

export interface Usp {
  icon: LucideIcon;
  stat: string;
  statLabel: string;
  /** Keyword-rich H3 per Design Review recommendation #6 */
  heading: string;
  description: string;
}

/** Zig-zag "Why Choose NextDynamix" blocks — alternating layout. */
export const usps: Usp[] = [
  {
    icon: Target,
    stat: "98%",
    statLabel: "Project Success Rate",
    heading: "Agile Software Development Methodology",
    description:
      "Iterative delivery so you see real progress fast and can adapt as priorities evolve. Reliable execution across every sprint, milestone, and release — 98% of our projects ship on time and on scope.",
  },
  {
    icon: PackageCheck,
    stat: "150+",
    statLabel: "Projects Delivered",
    heading: "Custom Technology Solutions, Never Templates",
    description:
      "Every solution is tailored to your specific goals — no templates, no shortcuts. Across 150+ engagements we have built platforms, products, and AI systems that fit the way your business actually operates.",
  },
  {
    icon: ShieldCheck,
    stat: "SOC 2",
    statLabel: "Aligned Practices",
    heading: "Enterprise-Grade Security by Default",
    description:
      "Security is engineered in from day one: encrypted data flows, least-privilege access, dependency scanning, and infrastructure hardening aligned with SOC 2 and GDPR expectations.",
  },
  {
    icon: Layers,
    stat: "12+",
    statLabel: "Industries Served",
    heading: "Cross-Industry Product Engineering Experience",
    description:
      "From fintech and healthcare to retail and logistics, our teams bring patterns that work across 12+ industries — and the judgment to know which ones apply to yours.",
  },
];
