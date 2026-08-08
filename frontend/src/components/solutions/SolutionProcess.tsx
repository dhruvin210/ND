import { SectionHeader } from "@/components/solutions/SectionHeader";
import { Reveal } from "@/components/ui/reveal";
import { solutionProcess } from "@/data/solutions-page";

/**
 * Four-step delivery process. Horizontal timeline from `lg` up, vertical
 * below. The connector is CSS-only (a travelling highlight) so the section
 * stays a server component; only the step reveal is client-side.
 */
export function SolutionProcess() {
  return (
    <section
      id="process"
      aria-labelledby="solutions-process-heading"
      className="section-shell border-b border-border"
    >
      <div className="site-container-wide">
        <SectionHeader
          id="solutions-process-heading"
          eyebrow="How Our AI Solutions Work"
          title={
            <>
              From Business Challenge
              <br />
              to Production AI
            </>
          }
          description="A structured path from objective to deployed system — each stage ends with something you can review, not a status update."
        />

        <div className="relative mt-16 lg:mt-20">
          {/* Horizontal connector (desktop) */}
          <div
            aria-hidden="true"
            className="decor absolute left-0 right-0 top-7 hidden h-px overflow-hidden lg:block"
          >
            <div className="h-px w-full bg-gradient-to-r from-brand/50 via-border-strong to-transparent" />
            <div className="absolute inset-y-0 w-1/4 animate-trace-x bg-gradient-to-r from-transparent via-brand to-transparent" />
          </div>

          {/* Vertical connector (mobile / tablet) */}
          <div
            aria-hidden="true"
            className="decor absolute bottom-6 left-7 top-6 w-px overflow-hidden lg:hidden"
          >
            <div className="h-full w-px bg-gradient-to-b from-brand/50 via-border-strong to-transparent" />
          </div>

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
            {solutionProcess.map((step, i) => (
              <Reveal
                key={step.number}
                as="li"
                delay={i * 0.09}
                className="group flex gap-6 lg:block"
              >
                {/* Numbered node — opaque so it masks the connector line */}
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
  );
}
