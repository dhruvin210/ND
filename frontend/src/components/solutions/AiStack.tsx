import { SectionHeader } from "@/components/solutions/SectionHeader";
import { Reveal } from "@/components/ui/reveal";
import { capabilityGroups } from "@/data/solutions-page";

/**
 * Enterprise AI stack. Grouped by the role each layer plays and framed with a
 * one-line rationale, so it reads as capability rather than a logo wall.
 * Server component — no interactivity beyond hover.
 */
export function AiStack() {
  return (
    <section
      id="ai-stack"
      aria-labelledby="ai-stack-heading"
      className="section-shell border-b border-border"
    >
      {/* Faint grid keeps the section from reading as a flat slab */}
      <div
        aria-hidden="true"
        className="decor grid-texture fade-mask-b absolute inset-0 opacity-50"
      />

      <div className="site-container-wide relative">
        <SectionHeader
          id="ai-stack-heading"
          eyebrow="Enterprise AI Capabilities"
          title={
            <>
              Built on a Modern
              <br />
              Enterprise AI Stack
            </>
          }
          description="We are deliberately not tied to a single vendor. Each layer is chosen for the workload in front of us, and built so a component can be replaced without rewriting the solution around it."
        />

        <ul className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {capabilityGroups.map((group, i) => (
            <Reveal
              key={group.name}
              as="li"
              delay={Math.min(i, 3) * 0.07}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface bg-card-sheen p-7 transition-all duration-300 ease-premium hover:border-brand/35 hover:bg-surface-elevated hover:shadow-lift"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-base font-semibold tracking-[-0.01em] text-foreground">
                  {group.name}
                </h3>
                <span
                  aria-hidden="true"
                  className="text-[11px] font-semibold tabular-nums text-muted-faint"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted">
                {group.summary}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {group.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="tag-pill px-3 py-1.5 text-xs group-hover:border-brand/25 group-hover:text-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          {/* Balances the 5-item grid on 3-column layouts with a closing note */}
          <Reveal
            as="li"
            delay={0.28}
            className="relative flex flex-col justify-center overflow-hidden rounded-2xl border border-brand/25 bg-brand/[0.06] bg-brand-sheen p-7"
          >
            <p className="text-sm leading-relaxed text-muted-strong">
              Not sure which of these you actually need? That is what discovery
              is for — we recommend the smallest stack that meets the
              requirement.
            </p>
            <a
              href="#consultation"
              className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-soft"
            >
              Discuss your architecture
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
