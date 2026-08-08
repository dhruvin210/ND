import { SectionHeader } from "@/components/solutions/SectionHeader";
import { Reveal } from "@/components/ui/reveal";
import { differentiators, impactStats } from "@/data/solutions-page";

/**
 * Why enterprises choose NextDynamix — split layout: sticky positioning
 * statement on the left, four differentiator cards on the right.
 */
export function WhyNextDynamix() {
  return (
    <section
      id="why-nextdynamix"
      aria-labelledby="why-nd-heading"
      className="section-shell border-b border-border"
    >
      <div className="site-container-wide">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-20">
          {/* ------------------------------ Left ------------------------------ */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              id="why-nd-heading"
              eyebrow="Why NextDynamix"
              title={
                <>
                  Why Enterprises
                  <br />
                  Choose NextDynamix
                </>
              }
              description="Most AI work stalls between the prototype that impressed the room and the system the business can actually depend on. We are built for the second half of that journey."
              className="max-w-none"
            />

            <dl className="mt-10 grid max-w-md grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
              {impactStats.slice(0, 2).map((stat) => (
                <div key={stat.label} className="bg-surface px-5 py-6">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-2xl font-bold tracking-tight text-foreground">
                    {stat.prefix}
                    {stat.value}
                    <span className="text-brand">{stat.suffix}</span>
                  </dd>
                  <dd className="mt-2 text-[11px] font-semibold uppercase tracking-eyebrow text-muted-faint">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ------------------------------ Right ----------------------------- */}
          <ul className="grid gap-5 sm:grid-cols-2">
            {differentiators.map((item, i) => {
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
