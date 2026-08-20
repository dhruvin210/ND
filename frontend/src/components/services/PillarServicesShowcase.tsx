import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  Cloud,
  Layers,
  Megaphone,
  Smartphone,
  Sparkles,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "@/components/solutions/SectionHeader";
import { Reveal } from "@/components/ui/reveal";
import { getServices } from "@/lib/cms";

const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  bot: Bot,
  "building-2": Building2,
  layers: Layers,
  cloud: Cloud,
  "bar-chart-3": BarChart3,
  megaphone: Megaphone,
  workflow: Workflow,
  smartphone: Smartphone,
  zap: Zap,
  users: Users,
};

/** Featured grid of the 11 CMS-authored pillar service pages (Generative AI,
 *  Cloud Consulting, ServiceNow, etc). Server component — renders nothing if
 *  the CMS has no published services yet, so the page degrades gracefully. */
export async function PillarServicesShowcase() {
  const pillarServices = await getServices();
  if (pillarServices.length === 0) return null;

  return (
    <section
      id="solution-areas"
      aria-labelledby="pillar-services-heading"
      className="section-shell border-b border-border"
    >
      <div className="site-container-wide">
        <SectionHeader
          id="pillar-services-heading"
          eyebrow="Explore by Solution Area"
          title={
            <>
              Deep Expertise Across
              <br />
              Our Core Disciplines
            </>
          }
          description="Every solution area below has its own dedicated page — offerings, capabilities, why teams choose us, and answers to the questions that come up most."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16">
          {pillarServices.map((service, i) => {
            const Icon = (service.icon && iconMap[service.icon]) || Sparkles;
            return (
              <Reveal
                key={service.slug}
                as="li"
                delay={Math.min(i, 5) * 0.06}
              >
                <Link
                  href={`/services/${service.slug}/`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface bg-card-sheen p-7 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-brand/45 hover:bg-surface-elevated hover:shadow-lift"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border-strong bg-surface-elevated text-brand transition-all duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:border-brand/40 group-hover:bg-brand/10">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-6 text-base font-semibold tracking-[-0.01em] text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {service.shortDescription}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                    Explore
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
