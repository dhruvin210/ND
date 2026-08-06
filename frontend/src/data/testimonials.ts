export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  /** Path under /public — client headshot (60px circle per design review).
   *  When absent, the component renders the on-design initials avatar. */
  photo?: string;
  caseStudySlug?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "NextDynamix transformed our digital infrastructure with precision and care. Their team delivered beyond expectations.",
    name: "Sarah Chen",
    role: "CTO",
    company: "TechVentures Inc",
    rating: 5,
    caseStudySlug: "techventures-platform-modernization",
  },
  {
    quote:
      "Working with NextDynamix felt like having an extension of our own team. Exceptional communication and technical excellence.",
    name: "Michael Rodriguez",
    role: "VP of Engineering",
    company: "DataFlow Systems",
    rating: 5,
    caseStudySlug: "dataflow-realtime-analytics",
  },
  {
    quote:
      "They brought clarity to a complex modernization project and executed flawlessly. A true partner in digital transformation.",
    name: "Emily Thompson",
    role: "Head of Digital",
    company: "Enterprise Solutions Co",
    rating: 5,
    caseStudySlug: "enterprise-solutions-ai-transformation",
  },
];

export const reviewSummary = {
  rating: 4.9,
  count: 47,
  sources: "Google · Clutch Top Agency 2025",
};
