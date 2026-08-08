import { SectionHeader } from "@/components/solutions/SectionHeader";
import { UseCaseExplorer } from "@/components/solutions/UseCaseExplorer";

/** Featured enterprise use cases — header server-rendered, tabs hydrate. */
export function UseCasesSection() {
  return (
    <section
      id="use-cases"
      aria-labelledby="use-cases-heading"
      className="section-shell border-b border-border"
    >
      <div className="site-container-wide">
        <SectionHeader
          id="use-cases-heading"
          eyebrow="Featured Use Cases"
          title={
            <>
              Where AI Earns
              <br />
              Its Place
            </>
          }
          description="The problems enterprises actually bring us, and what a working solution looks like in each case."
        />

        <div className="mt-16">
          <UseCaseExplorer />
        </div>
      </div>
    </section>
  );
}
