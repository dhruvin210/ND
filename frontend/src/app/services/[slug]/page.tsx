import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ChevronRight,
  Check,
  BadgeDollarSign,
  Expand,
  Globe2,
  Lightbulb,
  LifeBuoy,
  Puzzle,
  ServerCog,
  ShieldCheck,
} from "lucide-react";
import { ContactSection } from "@/components/sections/ContactSection";
import { SectionHeader } from "@/components/solutions/SectionHeader";
import { ServiceLeadForm } from "@/components/services/ServiceLeadForm";
import { Reveal } from "@/components/ui/reveal";
import {
  categoryAnchors,
  getServiceBySlug,
  getServicesByCategory,
  services,
} from "@/data/services";
import { engagementSteps } from "@/data/services-page";
import {
  breadcrumbSchema,
  faqSchemaFrom,
  jsonLd,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return buildMetadata({
    title: `${service.title} Services — NextDynamix`,
    description: `${service.description} NextDynamix delivers ${service.title} with a fixed scope, a named team, and support that continues past launch.`,
    path: `/services/${service.slug}`,
  });
}

/** What we commit to on every engagement, regardless of discipline. */
const commitments = [
  {
    title: "Scoped To You",
    description:
      "The proposal is written against your estate and your constraints — never a packaged tier you have to grow into.",
    icon: Puzzle,
  },
  {
    title: "Senior Delivery",
    description:
      "The engineers in the kickoff are the engineers on the work. No bait-and-switch between pitch and delivery.",
    icon: ShieldCheck,
  },
  {
    title: "Built To Scale",
    description:
      "Architected for the load you expect in two years, not just the one you have this quarter.",
    icon: Expand,
  },
  {
    title: "Evidence, Not Opinion",
    description:
      "Recommendations come with the measurements behind them, so you can challenge the reasoning rather than trust the conclusion.",
    icon: Lightbulb,
  },
];

/** Focus areas — the eight things we hold every engagement against. */
const focusAreas = [
  { title: "Security", desc: "Threat modelling and hardening built into delivery, not bolted on at review.", icon: ShieldCheck },
  { title: "Scalability", desc: "Headroom designed in, so growth is a config change rather than a rebuild.", icon: Expand },
  { title: "Cost Control", desc: "Fixed scope, quoted changes, and infrastructure sized to real usage.", icon: BadgeDollarSign },
  { title: "Flexibility", desc: "We work to your stack, your standards, and your review process.", icon: Puzzle },
  { title: "Reliability", desc: "Redundancy, monitoring, and rollback paths specified before launch.", icon: ServerCog },
  { title: "Global Reach", desc: "Delivery and on-call coverage across time zones and regulatory regions.", icon: Globe2 },
  { title: "Innovation", desc: "Newer tooling where it measurably wins — proven tooling everywhere else.", icon: Lightbulb },
  { title: "Long-Term Support", desc: "Runbooks, documentation, and an ongoing option you can decline.", icon: LifeBuoy },
];

const buildFaqs = (title: string) => [
  {
    question: `What does a ${title} engagement include?`,
    answer: `Evaluation, a scoped plan, design, implementation, tuning, and ongoing monitoring. You get a fixed scope and a fixed price for the ${title.toLowerCase()} work before anything starts, and the deliverables are yours in full from the first commit.`,
  },
  {
    question: `How do I choose a ${title} partner?`,
    answer: `Ask for delivery history you can verify, a written scope before invoicing begins, and named engineers rather than an account team. We start every ${title.toLowerCase()} conversation with a free evaluation so you can judge the reasoning before committing to anything.`,
  },
  {
    question: `How long does ${title} work usually take?`,
    answer: `Most ${title.toLowerCase()} engagements run in two-week increments, each ending with something you can review. Scope determines total length — the evaluation gives you a dated plan rather than an estimate range.`,
  },
  {
    question: `Can you work alongside our in-house team?`,
    answer: `Yes. We regularly embed with internal engineering on ${title.toLowerCase()}, working inside your repositories and your review process, and hand over cleanly when the engagement ends.`,
  },
];

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const { title, category, description } = service;
  const Icon = service.icon;
  const faqs = buildFaqs(title);

  // Sibling services in the same discipline — the most useful onward path.
  const related = getServicesByCategory(category)
    .filter((s) => s.slug !== service.slug)
    .slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Services", url: `${site.url}/services` },
            { name: title, url: `${site.url}/services/${service.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: title,
            description,
            url: `${site.url}/services/${service.slug}`,
            provider: { "@id": `${site.url}/#organization` },
            areaServed: "Worldwide",
            serviceType: title,
            category,
          },
          faqSchemaFrom(faqs),
        ])}
      />

      {/* ------------------------------- HERO -------------------------------- */}
      <section
        aria-labelledby="service-hero-heading"
        className="relative overflow-hidden border-b border-border"
      >
        <div
          aria-hidden="true"
          className="decor absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_18%_-10%,rgba(255,124,0,0.13),transparent_65%)]"
        />
        <div
          aria-hidden="true"
          className="decor grid-texture fade-mask-b absolute inset-0 opacity-70"
        />

        <div className="site-container-wide relative pb-20 pt-28 md:pb-24 md:pt-32 lg:pb-28 lg:pt-36">
          <nav
            aria-label="Breadcrumb"
            className="animate-reveal-up text-[13px] text-muted-faint"
          >
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="flex items-center">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li>
                <Link
                  href="/services/"
                  className="transition-colors hover:text-foreground"
                >
                  Services
                </Link>
              </li>
              <li aria-hidden="true" className="flex items-center">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li aria-current="page" className="text-muted-strong">
                {title}
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-14 lg:mt-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-14 xl:gap-16">
            {/* ------------------------------ Copy ----------------------------- */}
            <div>
              <div
                className="animate-reveal-up flex items-center gap-3"
                style={{ animationDelay: "0.05s" }}
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand">
                  <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <Link
                  href={`/services/#${categoryAnchors[category]}`}
                  className="eyebrow-plain transition-colors hover:text-brand-soft"
                >
                  {category}
                </Link>
              </div>

              <h1
                id="service-hero-heading"
                className="animate-reveal-up mt-6 text-[2.25rem] font-bold leading-[1.06] tracking-[-0.03em] sm:text-[2.75rem] lg:text-[3.125rem]"
                style={{ animationDelay: "0.12s" }}
              >
                {title}
              </h1>

              <p
                className="animate-reveal-up mt-7 max-w-xl text-base leading-relaxed text-muted-strong md:text-lg"
                style={{ animationDelay: "0.2s" }}
              >
                {description}
              </p>

              <p
                className="animate-reveal-up mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-[0.9375rem]"
                style={{ animationDelay: "0.26s" }}
              >
                We scope {title.toLowerCase()} against what you already run —
                then deliver it with a named team, a fixed price, and support
                that continues after go-live.
              </p>

              {/* Quick facts */}
              <dl
                className="animate-reveal-up mt-10 grid max-w-lg grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3"
                style={{ animationDelay: "0.32s" }}
              >
                {[
                  { term: "Engagement", detail: "Fixed scope or retainer" },
                  { term: "First step", detail: "Free evaluation" },
                  { term: "Typical start", detail: "Within 2 weeks" },
                ].map((fact) => (
                  <div key={fact.term} className="bg-surface px-5 py-5">
                    <dt className="text-[11px] font-semibold uppercase tracking-eyebrow text-muted-faint">
                      {fact.term}
                    </dt>
                    <dd className="mt-2 text-sm font-medium text-foreground">
                      {fact.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* ------------------------------ Form ----------------------------- */}
            <div
              id="lead-form"
              className="animate-reveal-in scroll-mt-[calc(var(--header-h)+2rem)]"
              style={{ animationDelay: "0.25s" }}
            >
              <ServiceLeadForm serviceTitle={title} />
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- WHAT YOU GET ---------------------------- */}
      <section
        aria-labelledby="service-commitments-heading"
        className="section-shell border-b border-border"
      >
        <div className="site-container-wide">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeader
                id="service-commitments-heading"
                eyebrow={`Why NextDynamix for ${category}`}
                title={
                  <>
                    What You Get,
                    <br />
                    Not What We Sell
                  </>
                }
                description={`Sound technology is the baseline. What makes ${title.toLowerCase()} work in practice is how the engagement is run — and that is the part most suppliers leave undefined.`}
                className="max-w-none"
              />

              <Link
                href="#lead-form"
                className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-soft"
              >
                Get a {title} scope
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
                />
              </Link>
            </div>

            <ul className="grid gap-5 sm:grid-cols-2">
              {commitments.map((item, i) => {
                const ItemIcon = item.icon;
                return (
                  <Reveal
                    key={item.title}
                    as="li"
                    delay={Math.min(i, 3) * 0.08}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface bg-card-sheen p-7 transition-all duration-300 ease-premium hover:border-brand/40 hover:bg-surface-elevated hover:shadow-lift"
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border-strong bg-surface-elevated text-brand transition-all duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:border-brand/40 group-hover:bg-brand/10">
                      <ItemIcon
                        aria-hidden="true"
                        className="h-5 w-5 transition-transform duration-300 ease-premium group-hover:scale-110"
                        strokeWidth={1.6}
                      />
                    </span>
                    <h3 className="mt-6 text-base font-semibold tracking-[-0.01em] text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------ PROCESS ------------------------------ */}
      <section
        id="process"
        aria-labelledby="service-process-heading"
        className="section-shell border-b border-border"
      >
        <div className="site-container-wide">
          <SectionHeader
            id="service-process-heading"
            eyebrow="How It Runs"
            title={
              <>
                From First Call to
                <br />
                Live {category}
              </>
            }
            description={`The same four steps run every ${title.toLowerCase()} engagement. Each one ends in something you can review — not a status update.`}
          />

          <div className="relative mt-16 lg:mt-20">
            <div
              aria-hidden="true"
              className="decor absolute left-0 right-0 top-7 hidden h-px overflow-hidden lg:block"
            >
              <div className="h-px w-full bg-gradient-to-r from-brand/50 via-border-strong to-transparent" />
              <div className="absolute inset-y-0 w-1/4 animate-trace-x bg-gradient-to-r from-transparent via-brand to-transparent" />
            </div>
            <div
              aria-hidden="true"
              className="decor absolute bottom-6 left-7 top-6 w-px overflow-hidden lg:hidden"
            >
              <div className="h-full w-px bg-gradient-to-b from-brand/50 via-border-strong to-transparent" />
            </div>

            <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
              {engagementSteps.map((step, i) => (
                <Reveal
                  key={step.number}
                  as="li"
                  delay={i * 0.09}
                  className="group flex gap-6 lg:block"
                >
                  <span
                    aria-hidden="true"
                    className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border-strong bg-surface text-sm font-bold tracking-tight text-brand shadow-inset transition-all duration-300 ease-premium group-hover:border-brand/50 group-hover:bg-brand/10"
                  >
                    {step.number}
                  </span>
                  <div className="pb-2 lg:mt-7">
                    <h3 className="text-lg font-semibold tracking-[-0.01em] text-foreground">
                      <span className="sr-only">{`Step ${step.number}: `}</span>
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted lg:max-w-none">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------------------------- FOCUS AREAS ---------------------------- */}
      <section
        aria-labelledby="service-focus-heading"
        className="section-shell border-b border-border"
      >
        <div className="site-container-wide">
          <SectionHeader
            id="service-focus-heading"
            eyebrow="Key Focus Areas"
            title={`What We Hold ${title} Against`}
            description="Eight checks applied to every engagement. If a decision fails one of them, it does not ship without you knowing why."
          />

          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:mt-16">
            {focusAreas.map((area, i) => {
              const AreaIcon = area.icon;
              return (
                <Reveal
                  key={area.title}
                  as="li"
                  delay={Math.min(i, 3) * 0.07}
                  className="group flex flex-col rounded-2xl border border-border bg-surface bg-card-sheen p-6 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-brand/40 hover:bg-surface-elevated hover:shadow-lift"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border-strong bg-surface-elevated text-brand transition-all duration-300 ease-premium group-hover:border-brand/40 group-hover:bg-brand/10">
                    <AreaIcon
                      aria-hidden="true"
                      className="h-[1.125rem] w-[1.125rem]"
                      strokeWidth={1.6}
                    />
                  </span>
                  <h3 className="mt-5 text-[0.9375rem] font-semibold tracking-[-0.01em] text-foreground">
                    {area.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {area.desc}
                  </p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ------------------------------ CTA BAND ----------------------------- */}
      <section aria-labelledby="service-cta-heading" className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="decor absolute inset-0 bg-[radial-gradient(ellipse_60%_120%_at_20%_50%,rgba(255,124,0,0.14),transparent_65%)]"
        />
        <div className="site-container-wide relative py-16 md:py-20">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center lg:gap-16">
            <div>
              <h2
                id="service-cta-heading"
                className="text-2xl font-bold tracking-[-0.02em] text-foreground md:text-[2rem]"
              >
                Ready to scope your {title.toLowerCase()}?
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-strong md:text-base">
                The first conversation is an evaluation, not a pitch. You leave
                with a written read on the problem whether or not you hire us.
              </p>

              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5">
                {["No obligation", "Reply within 1 business day", "Fixed price before work starts"].map(
                  (point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-sm text-muted-strong"
                    >
                      <Check
                        aria-hidden="true"
                        className="h-3.5 w-3.5 shrink-0 text-brand"
                        strokeWidth={2.5}
                      />
                      {point}
                    </li>
                  ),
                )}
              </ul>
            </div>

            <Link
              href="#lead-form"
              className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-7 text-sm font-semibold text-white transition-all duration-300 ease-premium hover:bg-brand-fierce hover:shadow-lift-brand"
            >
              Book a free evaluation
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------- FAQ -------------------------------- */}
      <section
        aria-labelledby="service-faq-heading"
        className="section-shell border-b border-border"
      >
        <div className="site-container-wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeader
                id="service-faq-heading"
                eyebrow="FAQ"
                title={`${title}: The Usual Questions`}
                description="Answers stay the same whether you are evaluating us or a competitor — they are how we would tell a friend to run the selection."
                className="max-w-none"
              />
            </div>

            {/* Details/summary keeps this a server component: the answers are
                always in the HTML, and there is no JS on the page for it. */}
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-border bg-surface bg-card-sheen transition-colors duration-300 open:border-brand/30 open:bg-surface-elevated hover:border-border-strong"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-[0.9375rem] font-semibold text-foreground transition-colors hover:text-brand md:px-7 [&::-webkit-details-marker]:hidden">
                    <span className="flex items-baseline gap-4 text-left">
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-xs font-bold tabular-nums text-muted-faint"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {faq.question}
                    </span>
                    <ChevronRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-brand transition-transform duration-200 group-open:rotate-90"
                    />
                  </summary>
                  <p className="px-6 pb-6 pl-[3.25rem] text-sm leading-relaxed text-muted md:px-7 md:pl-[3.75rem]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------- RELATED ------------------------------- */}
      {related.length > 0 && (
        <section
          aria-labelledby="service-related-heading"
          className="section-shell border-b border-border"
        >
          <div className="site-container-wide">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeader
                id="service-related-heading"
                eyebrow="Also in this discipline"
                title={`More ${category}`}
                className="max-w-2xl"
              />
              <Link
                href="/services/"
                className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-soft"
              >
                All 48 services
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
                />
              </Link>
            </div>

            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => {
                const RelatedIcon = item.icon;
                return (
                  <li key={item.slug}>
                    <Link
                      href={`/services/${item.slug}/`}
                      className="group flex h-full flex-col rounded-2xl border border-border bg-surface bg-card-sheen p-6 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-brand/45 hover:bg-surface-elevated hover:shadow-lift"
                    >
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border-strong bg-surface-elevated text-brand transition-all duration-300 ease-premium group-hover:border-brand/40 group-hover:bg-brand/10">
                        <RelatedIcon
                          aria-hidden="true"
                          className="h-[1.125rem] w-[1.125rem]"
                          strokeWidth={1.6}
                        />
                      </span>
                      <h3 className="mt-5 text-[0.9375rem] font-semibold tracking-[-0.01em] text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      <ContactSection />
    </>
  );
}
