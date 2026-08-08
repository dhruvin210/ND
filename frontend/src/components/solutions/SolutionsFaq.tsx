"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "@/components/solutions/SectionHeader";
import type { SolutionFaq } from "@/data/solutions-page";
import { trackEvent } from "@/lib/analytics";

/**
 * FAQ accordion. Answers stay in the HTML at all times (Radix renders the
 * content and hides it) so they remain extractable for FAQPage rich results.
 * Split layout keeps the reading column comfortable on wide monitors.
 */
export function SolutionsFaq({ faqs }: { faqs: SolutionFaq[] }) {
  if (faqs.length === 0) return null;

  return (
    <section
      id="faq"
      aria-labelledby="solutions-faq-heading"
      className="section-shell border-b border-border"
    >
      <div className="site-container-wide">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              id="solutions-faq-heading"
              eyebrow="FAQ"
              // No forced break — `text-wrap: balance` splits this more
              // reliably than a <br /> across the sticky column's widths.
              title="Common Questions About Our AI Solutions"
              description="If your question is not covered here, ask it directly — a solutions architect answers, not a chatbot."
              className="max-w-none"
            />

            <Link
              href="#consultation"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-soft"
            >
              Ask a solutions architect
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
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.question}
                value={faq.question}
                className="rounded-2xl border-border bg-surface bg-card-sheen transition-colors duration-300 data-[state=open]:border-brand/30 data-[state=open]:bg-surface-elevated hover:border-border-strong data-[state=open]:border-l"
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
