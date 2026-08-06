import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudies } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";

export const revalidate = 300;

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const cs = (await getCaseStudies(50)).find((c) => c.slug === slug);
  if (!cs) return {};
  return buildMetadata({
    title: cs.title,
    description: cs.challenge,
    path: `/case-studies/${cs.slug}`,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const cs = (await getCaseStudies(50)).find((c) => c.slug === slug);
  if (!cs) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Case Studies", url: `${site.url}/#case-studies` },
            { name: cs.title, url: `${site.url}/case-studies/${cs.slug}` },
          ]),
        )}
      />
      <article className="site-container max-w-3xl pt-32 pb-20">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand">
          {cs.industry}
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-h2">
          {cs.title}
        </h1>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-foreground">The Challenge</h2>
            <p className="mt-3 leading-relaxed text-muted">{cs.challenge}</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">Our Solution</h2>
            <p className="mt-3 leading-relaxed text-muted">{cs.solution}</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-foreground">The Results</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {cs.results.map((r) => (
                <li
                  key={r}
                  className="rounded-full border border-success/30 bg-success/10 px-4 py-2 text-sm font-medium text-success"
                >
                  {r}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-14 rounded-2xl border border-border bg-surface p-8 text-center">
          <h2 className="text-xl font-semibold">Facing a similar challenge?</h2>
          <p className="mt-2 text-sm text-muted">
            Tell us about your project — we&apos;ll reply within one business day.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/#contact">Schedule Consultation →</Link>
          </Button>
        </div>
      </article>
    </>
  );
}
