import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ChevronRight } from "lucide-react";
import { ConsultationSection } from "@/components/solutions/ConsultationSection";
import { Reveal } from "@/components/ui/reveal";
import { getSolutionIcon } from "@/data/solutions";
import { getSolutions, getSolutionsPageContent } from "@/lib/cms";
import { breadcrumbSchema, jsonLd, solutionsSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export async function generateStaticParams() {
  const solutions = await getSolutions();
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const solutions = await getSolutions();
  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) return {};

  return buildMetadata({
    title: solution.seo.title,
    description: solution.seo.description,
    path: `/solutions/${solution.slug}`,
  });
}

export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [solutions, pageContent] = await Promise.all([
    getSolutions(),
    getSolutionsPageContent(),
  ]);

  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) notFound();

  const Icon = getSolutionIcon(solution.icon);
  const related = solutions.filter((s) => s.slug !== solution.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Solutions", url: `${site.url}/solutions` },
            {
              name: solution.title,
              url: `${site.url}/solutions/${solution.slug}`,
            },
          ]),
          ...solutionsSchema([solution]),
        ])}
      />

      {/* --------------------------------- Hero --------------------------------- */}
      <section
        aria-labelledby="solution-heading"
        className="relative overflow-hidden border-b border-border"
      >
        <div
          aria-hidden="true"
          className="decor absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_15%_-10%,rgba(255,124,0,0.12),transparent_65%)]"
        />
        <div
          aria-hidden="true"
          className="decor grid-texture fade-mask-b absolute inset-0 opacity-60"
        />

        <div className="site-container-wide relative pb-20 pt-28 md:pt-32 lg:pb-24 lg:pt-36">
          <nav
            aria-label="Breadcrumb"
            className="text-[13px] text-muted-faint"
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
                  href="/solutions"
                  className="transition-colors hover:text-foreground"
                >
                  Solutions
                </Link>
              </li>
              <li aria-hidden="true" className="flex items-center">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li aria-current="page" className="text-muted-strong">
                {solution.title}
              </li>
            </ol>
          </nav>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <div>
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-brand/30 bg-brand/10 text-brand">
                <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.6} />
              </span>

              <h1
                id="solution-heading"
                className="mt-7 text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[2.75rem] lg:text-[3.25rem]"
              >
                {solution.title}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-strong md:text-lg">
                {solution.description}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Link
                  href="#consultation"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-7 text-sm font-semibold text-white transition-all duration-300 ease-premium hover:bg-brand-fierce hover:shadow-lift-brand"
                >
                  Discuss this solution
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/solutions"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border-strong bg-surface/70 px-7 text-sm font-semibold text-foreground transition-all duration-300 ease-premium hover:border-brand/50 hover:bg-surface-elevated"
                >
                  <ArrowLeft
                    aria-hidden="true"
                    className="h-4 w-4 text-brand transition-transform duration-300 ease-premium group-hover:-translate-x-1"
                  />
                  All solutions
                </Link>
              </div>
            </div>

            {/* Overview panel */}
            <div className="panel p-7 md:p-8">
              <h2 className="text-[11px] font-semibold uppercase tracking-eyebrow text-muted-faint">
                Overview
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-strong">
                {solution.fullDescription}
              </p>

              <h2 className="mt-8 text-[11px] font-semibold uppercase tracking-eyebrow text-muted-faint">
                Capabilities
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {solution.tags.map((tag) => (
                  <li key={tag} className="tag-pill">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------- Features + technologies ------------------------ */}
      <section
        aria-labelledby="solution-features-heading"
        className="section-shell border-b border-border"
      >
        <div className="site-container-wide">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
            <div>
              <h2
                id="solution-features-heading"
                className="display-heading"
              >
                What you get
              </h2>

              <ul className="mt-10 space-y-4">
                {solution.features.map((feature, i) => (
                  <Reveal
                    key={feature}
                    as="li"
                    delay={Math.min(i, 3) * 0.07}
                    className="flex gap-4 rounded-2xl border border-border bg-surface bg-card-sheen p-5 transition-colors duration-300 hover:border-brand/30"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand/30 bg-brand/10 text-brand"
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    <span className="text-sm leading-relaxed text-muted-strong">
                      {feature}
                    </span>
                  </Reveal>
                ))}
              </ul>
            </div>

            <div className="lg:pt-2">
              <h2 className="text-[11px] font-semibold uppercase tracking-eyebrow text-muted-faint">
                Typical stack
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {solution.technologies.map((tech) => (
                  <li key={tech} className="tag-pill px-3 py-1.5 text-xs">
                    {tech}
                  </li>
                ))}
              </ul>

              {related.length > 0 && (
                <>
                  <h2 className="mt-12 text-[11px] font-semibold uppercase tracking-eyebrow text-muted-faint">
                    Related solutions
                  </h2>
                  <ul className="mt-5 space-y-2.5">
                    {related.map((item) => {
                      const RelatedIcon = getSolutionIcon(item.icon);
                      return (
                        <li key={item.slug}>
                          <Link
                            href={`/solutions/${item.slug}`}
                            className="group flex items-center gap-4 rounded-xl border border-border bg-surface px-5 py-4 transition-all duration-300 ease-premium hover:border-brand/40 hover:bg-surface-elevated"
                          >
                            <RelatedIcon
                              aria-hidden="true"
                              className="h-4 w-4 shrink-0 text-brand"
                              strokeWidth={1.7}
                            />
                            <span className="flex-1 text-sm font-medium text-foreground">
                              {item.title}
                            </span>
                            <ArrowRight
                              aria-hidden="true"
                              className="h-4 w-4 text-muted-faint transition-all duration-300 ease-premium group-hover:translate-x-1 group-hover:text-brand"
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <ConsultationSection content={pageContent.consultation} />
    </>
  );
}
