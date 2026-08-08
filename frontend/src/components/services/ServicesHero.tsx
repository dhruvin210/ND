import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { CapabilityOrbit } from "@/components/services/CapabilityOrbit";

/**
 * Services catalog hero. Fully server-rendered — the entrance is CSS-only, so
 * there is no hydration cost or layout shift above the fold.
 */
export function ServicesHero() {
  return (
    <section
      aria-labelledby="services-hero-heading"
      className="relative overflow-hidden border-b border-border"
    >
      <div
        aria-hidden="true"
        className="decor absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_18%_-10%,rgba(255,124,0,0.13),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="decor grid-texture fade-mask-b absolute inset-0 opacity-70"
      />

      <div className="site-container-wide relative pb-20 pt-28 md:pb-24 md:pt-32 lg:pb-28 lg:pt-36">
        <nav
          aria-label="Breadcrumb"
          className="animate-reveal-up text-[13px] text-muted-faint"
        >
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="flex items-center">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li aria-current="page" className="text-muted-strong">
              Services
            </li>
          </ol>
        </nav>

        <div className="mt-10 grid items-center gap-14 lg:mt-14 lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)] lg:gap-14 xl:gap-16">
          {/* ------------------------------- Copy ------------------------------ */}
          <div>
            <p
              className="eyebrow-plain animate-reveal-up"
              style={{ animationDelay: "0.05s" }}
            >
              <span aria-hidden="true" className="h-px w-6 bg-brand/60" />
              The Full Service Catalog
            </p>

            <h1
              id="services-hero-heading"
              className="animate-reveal-up mt-6 text-[2.375rem] font-bold leading-[1.06] tracking-[-0.03em] sm:text-[3rem] lg:text-[3.25rem] xl:text-[3.625rem]"
              style={{ animationDelay: "0.12s" }}
            >
              Every Service.
              <br />
              <span className="text-brand-gradient">One Delivery Team.</span>
            </h1>

            <p
              className="animate-reveal-up mt-7 max-w-xl text-base leading-relaxed text-muted-strong md:text-lg"
              style={{ animationDelay: "0.2s" }}
            >
              Forty-eight services across eight disciplines — security, AI,
              cloud, engineering, commerce, mobile, marketing, and design — run
              by one team under one delivery standard.
            </p>

            <p
              className="animate-reveal-up mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-[0.9375rem]"
              style={{ animationDelay: "0.26s" }}
            >
              Engage us for one of them or for the whole stack. Either way, the
              integration work between them stops being your problem.
            </p>

            <div
              className="animate-reveal-up mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              style={{ animationDelay: "0.32s" }}
            >
              <Link
                href="#catalog"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-7 text-sm font-semibold text-white transition-all duration-300 ease-premium hover:bg-brand-fierce hover:shadow-lift-brand"
              >
                Browse the catalog
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="#contact"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border-strong bg-surface/70 px-7 text-sm font-semibold text-foreground backdrop-blur transition-all duration-300 ease-premium hover:border-brand/50 hover:bg-surface-elevated"
              >
                Book a free evaluation
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 text-brand transition-transform duration-300 ease-premium group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* --------------------------- Visualization ------------------------- */}
          <div
            className="animate-reveal-in relative mx-auto w-full max-w-[30rem] lg:max-w-none"
            style={{ animationDelay: "0.25s" }}
          >
            <CapabilityOrbit />
          </div>
        </div>
      </div>
    </section>
  );
}
