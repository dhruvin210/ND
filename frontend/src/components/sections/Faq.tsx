"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";
import { trackEvent } from "@/lib/analytics";

/** FAQ — accordion structure preserved exactly (Design Review SEO Risk #2:
 *  the accordion is Google's preferred extractable format; never tabs/cards).
 *  FAQPage JSON-LD is emitted from the page head. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="section-padding">
      <div className="site-container max-w-3xl">
        <div className="text-center">
          <h2 id="faq-heading" className="section-heading">
            Frequently Asked Questions
          </h2>
          <p className="section-subheading mx-auto">
            Everything you need to know about working with NextDynamix.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="mt-12 space-y-4"
          onValueChange={(value) => {
            if (value) trackEvent("faq_open", { question: value });
          }}
        >
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>
                <span>
                  <span className="mr-3 text-brand">{String(i + 1).padStart(2, "0")}</span>
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="mt-10 text-center text-sm text-muted">
          Have more questions?{" "}
          <Link href="#contact" className="font-semibold text-brand hover:underline">
            Contact us
          </Link>{" "}
          — we reply within one business day.
        </p>
      </div>
    </section>
  );
}
