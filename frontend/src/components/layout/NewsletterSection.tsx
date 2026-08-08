import { NewsletterForm } from "@/components/layout/NewsletterForm";

/**
 * Newsletter band that sits directly above the footer on every page.
 * Server component — only the form itself hydrates.
 */
export function NewsletterSection() {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative overflow-hidden border-t border-border"
    >
      {/* Subtle warm/cool wash + grid, consistent with the AI sections */}
      <div
        aria-hidden="true"
        className="decor absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_50%_120%,rgba(255,124,0,0.10),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="decor grid-texture absolute inset-0 opacity-40"
      />

      <div className="site-container-wide relative py-16 md:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <p className="eyebrow-plain">
              <span aria-hidden="true" className="h-px w-6 bg-brand/60" />
              Newsletter
            </p>
            <h2
              id="newsletter-heading"
              className="mt-5 text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] text-foreground md:text-[2.125rem]"
            >
              Stay ahead of the AI curve
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-strong md:text-base">
              Weekly insights on AI engineering, product strategy, automation,
              and enterprise technology. No spam.
            </p>
          </div>

          <div className="lg:justify-self-end">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
