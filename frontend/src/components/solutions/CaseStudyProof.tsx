import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/solutions/SectionHeader";
import { Reveal } from "@/components/ui/reveal";
import type { CaseStudy } from "@/lib/cms";

/**
 * Case study proof. Content comes from the Strapi `case-studies` collection
 * (featured entries) with solution-specific fallbacks in `lib/cms.ts`.
 */
export function CaseStudyProof({ caseStudies }: { caseStudies: CaseStudy[] }) {
  if (caseStudies.length === 0) return null;

  return (
    <section
      id="case-studies"
      aria-labelledby="case-proof-heading"
      className="section-shell border-b border-border"
    >
      <div className="site-container-wide">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            id="case-proof-heading"
            eyebrow="Proof"
            title={
              <>
                AI That Creates
                <br />
                Measurable Results
              </>
            }
            description="Outcomes from production deployments — the numbers the business tracked, not the demo that impressed the room."
          />

          <Link
            href="/#case-studies"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-soft"
          >
            View all case studies
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
            />
          </Link>
        </div>

        <ul className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {caseStudies.map((study, i) => {
            const metric = study.metrics[0];
            return (
              <Reveal
                key={study.slug}
                as="li"
                delay={Math.min(i, 3) * 0.08}
                className="group"
              >
                <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface bg-card-sheen p-7 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-brand/40 hover:bg-surface-elevated hover:shadow-lift">
                  <p className="inline-flex w-fit rounded-md border border-border-strong bg-surface-elevated px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-strong">
                    {study.industry}
                  </p>

                  {/* Headline proof figure */}
                  {metric && (
                    <div className="mt-7">
                      <p className="text-[2.75rem] font-bold leading-none tracking-[-0.03em] text-brand">
                        {metric.value}
                      </p>
                      {metric.label && (
                        <p className="mt-2.5 text-sm font-medium text-muted-strong">
                          {metric.label}
                        </p>
                      )}
                    </div>
                  )}

                  <h3 className="mt-7 text-base font-semibold leading-snug tracking-[-0.01em] text-foreground">
                    {study.title}
                  </h3>

                  <dl className="mt-6 flex-1 space-y-5">
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-eyebrow text-muted-faint">
                        Challenge
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-muted">
                        {study.challenge}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-eyebrow text-muted-faint">
                        Solution
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-muted">
                        {study.solution}
                      </dd>
                    </div>
                    {study.results.length > 0 && (
                      <div>
                        <dt className="text-[11px] font-semibold uppercase tracking-eyebrow text-muted-faint">
                          Results
                        </dt>
                        <dd className="mt-2">
                          <ul className="space-y-1.5">
                            {study.results.map((result) => (
                              <li
                                key={result}
                                className="flex gap-2.5 text-sm leading-relaxed text-muted"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-[0.4375rem] h-1 w-1 shrink-0 rounded-full bg-brand"
                                />
                                {result}
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    )}
                  </dl>

                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-strong transition-colors duration-300 ease-premium group-hover:text-brand"
                  >
                    Read the case study
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1.5"
                    />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
