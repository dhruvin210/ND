import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCaseStudies } from "@/lib/cms";

/** CMS-driven case studies — Challenge / Solution / Results format.
 *  Server component: fetches from Strapi with ISR, falls back to
 *  bundled examples when the CMS is unreachable. */
export async function CaseStudies() {
  const caseStudies = await getCaseStudies(3);

  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-heading"
      className="section-padding bg-surface/30"
    >
      <div className="site-container">
        <span className="eyebrow">Case Studies</span>
        <h2 id="case-studies-heading" className="section-heading mt-5">
          Results That Speak for Themselves
        </h2>
        <p className="section-subheading">
          Real challenges, engineered solutions, measurable outcomes.
        </p>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <li key={cs.slug}>
              <article className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/60">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                  {cs.industry}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-foreground">
                  {cs.title}
                </h3>

                <dl className="mt-5 flex-1 space-y-4 text-sm">
                  <div>
                    <dt className="font-semibold text-foreground">Challenge</dt>
                    <dd className="mt-1 leading-relaxed text-muted">
                      {cs.challenge}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">Solution</dt>
                    <dd className="mt-1 leading-relaxed text-muted">
                      {cs.solution}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">Results</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {cs.results.map((r) => (
                        <span
                          key={r}
                          className="rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-medium text-success"
                        >
                          {r}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>

                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand group-hover:underline"
                >
                  View full case study
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
