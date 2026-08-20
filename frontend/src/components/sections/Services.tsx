import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { getServices } from "@/lib/cms";
import { resolveServiceIcon } from "@/lib/service-icons";
import { cn } from "@/lib/utils";

/** Solution-area preview grid — CMS-driven, straight from the `Service`
 *  collection. Full set lives on /services. Never a carousel: hidden
 *  slider content is not reliably indexed by Google (Design Review SEO
 *  Risk #1). */

/** The first two entries carry the "AI-first" positioning, so they get the
 *  only accent treatment — keep this at two, a third badge flattens the
 *  hierarchy it creates. */
const CORE_COUNT = 2;

export async function Services() {
  const services = await getServices();
  const featured = services.slice(0, 8);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section-padding"
    >
      <div className="site-container">
        <span className="eyebrow">Our Digital Solutions</span>
        <h2 id="services-heading" className="section-heading mt-5">
          AI-First Services Built for Growth
        </h2>
        <p className="section-subheading">
          End-to-end technology services — from intelligent agents to
          enterprise platforms — engineered for measurable outcomes.
        </p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((service, i) => {
            const Icon = resolveServiceIcon(service.icon);
            const isCore = i < CORE_COUNT;
            return (
              <Reveal key={service.slug} as="li" delay={(i % 4) * 0.08}>
                <Link
                  href={`/services/${service.slug}/`}
                  className={cn(
                    "group relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-brand-glow",
                    isCore
                      ? "border-brand/70 bg-brand/[0.06]"
                      : "border-border bg-surface",
                  )}
                >
                  {isCore && (
                    <span className="absolute right-4 top-4 rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#3A1E02]">
                      Core
                    </span>
                  )}
                  <span
                    className={cn(
                      "inline-flex w-fit rounded-xl p-3 transition-colors group-hover:bg-brand group-hover:text-white",
                      isCore
                        ? "bg-brand/15 text-brand"
                        : "bg-surface-elevated text-muted-faint",
                    )}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {service.shortDescription}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Learn more
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-brand px-6 py-3 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
          >
            View All Services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
