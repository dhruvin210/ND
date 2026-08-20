import { getServices } from "@/lib/cms";

/**
 * Compact trust band under the hero. Async server component — service and
 * solution-area counts come straight from the CMS, so the figures never
 * drift out of sync with what is actually published.
 */
export async function ServicesStats() {
  const services = await getServices();
  const solutionAreas = new Set(services.map((s) => s.category)).size;

  const stats = [
    { value: String(services.length || 11), label: "Solution Areas" },
    { value: String(solutionAreas || 8), label: "Disciplines Covered" },
    { value: "150+", label: "Projects Delivered" },
    { value: "9+", label: "Years Building" },
  ];

  return (
    <section aria-label="Catalog at a glance" className="border-b border-border">
      <div className="site-container-wide">
        <dl className="grid grid-cols-2 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0">
          {stats.map((stat) => (
            <div key={stat.label} className="px-5 py-8 text-center md:px-6 lg:py-10">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-[2.125rem] font-bold leading-none tracking-[-0.02em] text-foreground tabular-nums md:text-[2.5rem]">
                {stat.value}
              </dd>
              <dd className="mt-3 text-[11px] font-semibold uppercase tracking-eyebrow text-muted-faint">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
