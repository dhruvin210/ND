import { SectionHeader } from "@/components/solutions/SectionHeader";
import { SolutionsGrid } from "@/components/solutions/SolutionsGrid";
import type { Solution } from "@/data/solutions";

/** Solutions grid section — header is server-rendered, only the cards hydrate. */
export function SolutionsShowcase({ solutions }: { solutions: Solution[] }) {
  return (
    <section
      id="solutions-grid"
      aria-labelledby="solutions-grid-heading"
      className="section-shell border-b border-border"
    >
      <div className="site-container-wide">
        <SectionHeader
          id="solutions-grid-heading"
          eyebrow="What We Build"
          title={
            <>
              Six Solutions, One
              <br />
              Engineering Standard
            </>
          }
          description="Each of these is a system we have taken to production — grounded in your data, integrated with your stack, and measured against a KPI you already report on."
        />

        <div className="mt-16">
          <SolutionsGrid solutions={solutions} />
        </div>
      </div>
    </section>
  );
}
