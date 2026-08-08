import { Check, Clock, Mail, Phone } from "lucide-react";
import { ConsultationForm } from "@/components/solutions/ConsultationForm";
import type { ConsultationContent } from "@/data/solutions-page";
import { site } from "@/lib/site";

/**
 * Consultation CTA. Copy and badges are CMS-driven; the form is the only
 * client component in this section.
 */
export function ConsultationSection({
  content,
}: {
  content: ConsultationContent;
}) {
  const telHref = `tel:${site.phone.replace(/[^+\d]/g, "")}`;

  return (
    <section
      id="consultation"
      aria-labelledby="consultation-heading"
      className="section-shell border-b border-border"
    >
      {/* Warm wash anchored to the left column, behind the copy */}
      <div
        aria-hidden="true"
        className="decor absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_12%_45%,rgba(255,124,0,0.10),transparent_65%)]"
      />

      <div className="site-container-wide relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-20">
          {/* ------------------------------- Copy ------------------------------ */}
          <div className="lg:pt-2">
            <p className="eyebrow-plain">
              <span aria-hidden="true" className="h-px w-6 bg-brand/60" />
              {content.eyebrow}
            </p>

            <h2
              id="consultation-heading"
              className="display-heading mt-5"
            >
              {content.headingLead}
              <br />
              <span className="text-brand-gradient">
                {content.headingHighlight}
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-strong">
              {content.description}
            </p>

            {/* Benefits */}
            <ul className="mt-9 grid gap-3 sm:grid-cols-2">
              {content.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-3 text-sm text-muted-strong"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand/30 bg-brand/10 text-brand"
                  >
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            {/* Direct contact */}
            <dl className="mt-10 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:gap-10">
              <div className="flex items-start gap-3">
                <Mail
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                />
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-eyebrow text-muted-faint">
                    Email
                  </dt>
                  <dd className="mt-1 text-sm">
                    <a
                      href={`mailto:${site.email}`}
                      className="text-muted-strong transition-colors hover:text-brand"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                />
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-eyebrow text-muted-faint">
                    Phone
                  </dt>
                  <dd className="mt-1 text-sm">
                    <a
                      href={telHref}
                      className="text-muted-strong transition-colors hover:text-brand"
                    >
                      {site.phone}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                />
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-eyebrow text-muted-faint">
                    Hours
                  </dt>
                  <dd className="mt-1 text-sm text-muted-strong">{site.hours}</dd>
                </div>
              </div>
            </dl>

            {/* Trust badges */}
            <div className="mt-10">
              <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-muted-faint">
                Partnerships &amp; compliance
              </p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {content.trustBadges.map((badge) => (
                  <li
                    key={badge}
                    className="inline-flex items-center gap-2 rounded-lg border border-border-strong bg-surface px-3.5 py-2 text-xs font-medium text-muted-strong transition-colors duration-300 hover:border-brand/30 hover:text-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-brand/70"
                    />
                    {badge}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ------------------------------- Form ------------------------------ */}
          <div>
            <ConsultationForm privacyNote={content.privacyNote} />
          </div>
        </div>
      </div>
    </section>
  );
}
