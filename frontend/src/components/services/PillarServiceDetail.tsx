import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/solutions/SectionHeader";
import { Reveal } from "@/components/ui/reveal";
import { ServiceLeadForm } from "@/components/services/ServiceLeadForm";
import type { PillarService } from "@/lib/cms";

/**
 * Full-content template for the 11 CMS-authored pillar service pages
 * (Generative AI, Cloud Consulting, ServiceNow, etc). Every section is
 * driven entirely by CMS data — hero, trust metrics, offerings,
 * capabilities, why-choose-us, and FAQs — so editors can update the page
 * without a code change.
 */
export function PillarServiceDetail({ service }: { service: PillarService }) {
  const {
    title,
    heroEyebrow,
    heroHeading,
    heroDescription,
    heroPrimaryCtaLabel,
    heroPrimaryCtaHref,
    heroSecondaryCtaLabel,
    heroSecondaryCtaHref,
    trustMetrics,
    offerings,
    capabilities,
    whyChooseUs,
    faqs,
    category,
  } = service;

  return (
    <>
      {/* ------------------------------- HERO -------------------------------- */}
      <section
        aria-labelledby="pillar-hero-heading"
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

        <div className="site-container-wide relative pb-16 pt-28 md:pb-20 md:pt-32 lg:pt-36">
          <nav aria-label="Breadcrumb" className="animate-reveal-up text-[13px] text-muted-faint">
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
                <Link href="/services/" className="transition-colors hover:text-foreground">
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
            <div>
              {heroEyebrow && (
                <p
                  className="animate-reveal-up eyebrow-plain"
                  style={{ animationDelay: "0.05s" }}
                >
                  <span aria-hidden="true" className="h-px w-6 bg-brand/60" />
                  {heroEyebrow}
                </p>
              )}

              <h1
                id="pillar-hero-heading"
                className="animate-reveal-up mt-6 text-[2.25rem] font-bold leading-[1.06] tracking-[-0.03em] sm:text-[2.75rem] lg:text-[3.125rem]"
                style={{ animationDelay: "0.12s" }}
              >
                {heroHeading}
              </h1>

              <p
                className="animate-reveal-up mt-7 max-w-xl text-base leading-relaxed text-muted-strong md:text-lg"
                style={{ animationDelay: "0.2s" }}
              >
                {heroDescription}
              </p>

              <div
                className="animate-reveal-up mt-9 flex flex-wrap items-center gap-4"
                style={{ animationDelay: "0.26s" }}
              >
                <Link
                  href="#lead-form"
                  className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-7 text-sm font-semibold text-white transition-all duration-300 ease-premium hover:bg-brand-fierce hover:shadow-lift-brand"
                >
                  {heroPrimaryCtaLabel}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
                  />
                </Link>
                {heroSecondaryCtaLabel && (
                  <Link
                    href={heroSecondaryCtaHref || "#contact"}
                    className="text-sm font-semibold text-brand transition-colors hover:text-brand-soft"
                  >
                    {heroSecondaryCtaLabel}
                  </Link>
                )}
              </div>

              {trustMetrics.length > 0 && (
                <dl
                  className="animate-reveal-up mt-10 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4"
                  style={{ animationDelay: "0.32s" }}
                >
                  {trustMetrics.map((metric) => (
                    <div key={metric.label} className="bg-surface px-4 py-5">
                      <dt className="text-lg font-bold tracking-[-0.02em] text-brand">
                        {metric.value}
                      </dt>
                      <dd className="mt-1 text-xs leading-snug text-muted">
                        {metric.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

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

      {/* ----------------------------- OFFERINGS ------------------------------ */}
      {offerings.length > 0 && (
        <section aria-labelledby="pillar-offerings-heading" className="section-shell border-b border-border">
          <div className="site-container-wide">
            <SectionHeader
              id="pillar-offerings-heading"
              eyebrow={category}
              title={`${title} We Offer`}
              description={`A closer look at what's included in ${title.toLowerCase()}.`}
            />

            <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16">
              {offerings.map((item, i) => (
                <Reveal
                  key={item.title}
                  as="li"
                  delay={Math.min(i, 5) * 0.06}
                  className="group flex flex-col rounded-2xl border border-border bg-surface bg-card-sheen p-7 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-brand/40 hover:bg-surface-elevated hover:shadow-lift"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-strong bg-surface-elevated text-xs font-bold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-base font-semibold tracking-[-0.01em] text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* --------------------------- CAPABILITIES ----------------------------- */}
      {capabilities.length > 0 && (
        <section aria-labelledby="pillar-capabilities-heading" className="section-shell border-b border-border">
          <div className="site-container-wide">
            <SectionHeader
              id="pillar-capabilities-heading"
              eyebrow="Technologies & Capabilities"
              title={`What Our ${category} Expertise Covers`}
            />

            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16">
              {capabilities.map((group) => (
                <div
                  key={group.groupLabel}
                  className="rounded-2xl border border-border bg-surface p-6"
                >
                  <h3 className="text-sm font-semibold tracking-[-0.01em] text-foreground">
                    {group.groupLabel}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm leading-relaxed text-muted"
                      >
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --------------------------- WHY CHOOSE US ----------------------------- */}
      {whyChooseUs.length > 0 && (
        <section aria-labelledby="pillar-why-heading" className="section-shell border-b border-border">
          <div className="site-container-wide">
            <SectionHeader
              id="pillar-why-heading"
              eyebrow="Why Choose Us"
              title={`Why NextDynamix for ${title}`}
            />

            <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16">
              {whyChooseUs.map((reason, i) => (
                <Reveal
                  key={reason.title}
                  as="li"
                  delay={Math.min(i, 5) * 0.06}
                  className="rounded-2xl border border-border bg-surface bg-card-sheen p-7"
                >
                  <h3 className="text-base font-semibold tracking-[-0.01em] text-foreground">
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {reason.description}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* -------------------------------- FAQ -------------------------------- */}
      {faqs.length > 0 && (
        <section aria-labelledby="pillar-faq-heading" className="section-shell border-b border-border">
          <div className="site-container-wide">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <SectionHeader
                  id="pillar-faq-heading"
                  eyebrow="FAQ"
                  title={`${title}: The Usual Questions`}
                  className="max-w-none"
                />
              </div>

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
      )}
    </>
  );
}
