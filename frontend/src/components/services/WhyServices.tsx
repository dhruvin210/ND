import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/solutions/SectionHeader";
import { Reveal } from "@/components/ui/reveal";
import { serviceDifferentiators } from "@/data/services-page";

/**
 * Why buy the catalog from one supplier — sticky positioning statement on the
 * left, four differentiator cards on the right.
 */
export function WhyServices() {
  return (
    <section
      id="why-us"
      aria-labelledby="why-services-heading"
      className="section-shell border-b border-border"
    >
      <div className="site-container-wide">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-20">
          {/* ------------------------------ Left ------------------------------ */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              id="why-services-heading"
              eyebrow="Why One Partner"
              title={
                <>
                  Fewer Vendors,
                  <br />
                  Fewer Handoffs
                </>
              }
              description="Most delivery risk lives in the seams — between the security review and the release, between the design file and the build. Consolidating disciplines under one team removes the seams instead of managing them."
              className="max-w-none"
            />

            <Link
              href="#contact"
              className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-soft"
            >
              Start with a free evaluation
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* ------------------------------ Right ----------------------------- */}
          <ul className="grid gap-5 sm:grid-cols-2">
            {serviceDifferentiators.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal
                  key={item.title}
                  as="li"
                  delay={Math.min(i, 3) * 0.08}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface bg-card-sheen p-7 transition-all duration-300 ease-premium hover:border-brand/40 hover:bg-surface-elevated hover:shadow-lift"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border-strong bg-surface-elevated text-brand transition-all duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:border-brand/40 group-hover:bg-brand/10">
                    <Icon
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
  );
}
