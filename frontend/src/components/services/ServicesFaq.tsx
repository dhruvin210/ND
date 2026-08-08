"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "@/components/solutions/SectionHeader";
import { servicesFaqs } from "@/data/services-page";
import { trackEvent } from "@/lib/analytics";

/**
 * Answers stay in the HTML at all times (Radix renders the content and hides
 * it) so they remain extractable for FAQPage rich results.
 */
export function ServicesFaq() {
  return (
    <section
      id="faq"
      aria-labelledby="services-faq-heading"
      className="section-shell border-b border-border"
    >
      <div className="site-container-wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              id="services-faq-heading"
              eyebrow="FAQ"
              title="Questions We Get Before The First Call"
              description="If yours is not here, ask it directly — an engineer answers, and the first evaluation costs nothing either way."
              className="max-w-none"
            />

            <Link
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-soft"
            >
              Ask us directly
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <Accordion
            type="single"
            collapsible
            className="space-y-3"
            onValueChange={(value) => {
              if (value) trackEvent("faq_open", { question: value });
            }}
          >
            {servicesFaqs.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                value={faq.question}
                className="rounded-2xl border-border bg-surface bg-card-sheen transition-colors duration-300 hover:border-border-strong data-[state=open]:border-l data-[state=open]:border-brand/30 data-[state=open]:bg-surface-elevated"
              >
                <AccordionTrigger className="gap-6 px-6 py-5 text-[0.9375rem] font-semibold md:px-7">
                  <span className="flex items-baseline gap-4 text-left">
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-xs font-bold tabular-nums text-muted-faint"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pl-[3.25rem] text-sm leading-relaxed text-muted md:px-7 md:pl-[3.75rem]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
