"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { processSteps } from "@/data/process";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/** Interactive development process timeline. All step content is present in
 *  the HTML at load (CSS show/hide only) so Google indexes everything —
 *  Design Review SEO Opportunity #1. */
export function Process() {
  const [active, setActive] = React.useState(0);

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="section-padding bg-surface/30"
    >
      <div className="site-container">
        <span className="eyebrow">How We Work</span>
        <h2 id="process-heading" className="section-heading mt-5">
          Our Proven Development Process
        </h2>
        <p className="section-subheading">
          A structured, collaborative approach to design and development —
          ensuring clarity, efficiency, and scalable outcomes at every stage.
        </p>

        {/* Animated process line + numbered steps */}
        <div
          role="tablist"
          aria-label="Development process steps"
          className="relative mt-16 grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5"
        >
          <motion.div
            aria-hidden="true"
            className="absolute left-0 top-9 hidden h-px w-full origin-left bg-gradient-to-r from-brand via-brand/50 to-border lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          {processSteps.map((step, i) => (
            <button
              key={step.number}
              role="tab"
              id={`process-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`process-panel-${i}`}
              onClick={() => {
                setActive(i);
                trackEvent("process_step_open", { step: step.title });
              }}
              className="group relative flex flex-col items-center gap-3 text-center"
            >
              <span
                className={cn(
                  "flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 bg-background text-xl font-bold transition-all duration-300",
                  active === i
                    ? "border-brand text-brand shadow-brand-glow"
                    : "border-border text-muted group-hover:border-brand/50 group-hover:text-foreground",
                )}
              >
                {step.number}
              </span>
              <span className="rounded-full border border-brand/40 bg-brand/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand">
                {step.duration}
              </span>
              <span className="text-base font-semibold text-foreground">
                {step.title}
              </span>
              <span className="max-w-[180px] text-xs leading-relaxed text-muted">
                {step.summary}
              </span>
            </button>
          ))}
        </div>

        {/* Detail panels — all rendered, CSS-hidden when inactive */}
        <div className="mt-12">
          {processSteps.map((step, i) => (
            <div
              key={step.number}
              role="tabpanel"
              id={`process-panel-${i}`}
              aria-labelledby={`process-tab-${i}`}
              hidden={active !== i}
              className="rounded-2xl border border-border bg-surface p-8"
            >
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {step.number} · {step.title}
                  </h3>
                  {step.details.map((d) => (
                    <p key={d} className="mt-3 text-sm leading-relaxed text-muted">
                      {d}
                    </p>
                  ))}
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-brand">
                    Key Deliverables
                  </h4>
                  <ul className="mt-4 space-y-3">
                    {step.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
