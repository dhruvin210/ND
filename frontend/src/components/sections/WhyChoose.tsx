"use client";

import { motion } from "framer-motion";
import { usps } from "@/data/usps";
import { cn } from "@/lib/utils";

/** Zig-zag "Why Choose NextDynamix" — alternating stat/content blocks.
 *  Each block carries a keyword-rich H3 so Google reads distinct,
 *  indexable content (Design Review recommendation #6). */
export function WhyChoose() {
  return (
    <section
      id="why-us"
      aria-labelledby="why-heading"
      className="section-padding bg-surface/30"
    >
      <div className="site-container">
        <span className="eyebrow">Why Us</span>
        <h2 id="why-heading" className="section-heading mt-5">
          Why Choose{" "}
          <span className="text-brand">NextDynamix</span>?
        </h2>
        <p className="section-subheading">
          An AI-first technology partner known for transforming how global
          businesses build, ship, and scale software.
        </p>

        <div className="mt-16 space-y-16 lg:space-y-20">
          {usps.map((usp, i) => {
            const Icon = usp.icon;
            const reversed = i % 2 === 1;
            return (
              <motion.article
                key={usp.heading}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "grid items-center gap-8 lg:grid-cols-2 lg:gap-16",
                )}
              >
                <div
                  className={cn(
                    "flex justify-center",
                    reversed && "lg:order-2",
                  )}
                >
                  <div className="relative flex h-56 w-full max-w-sm items-center justify-center rounded-3xl border border-border bg-surface shadow-card">
                    <div
                      className="absolute inset-0 rounded-3xl bg-hero-glow"
                      aria-hidden="true"
                    />
                    <div className="relative text-center">
                      <Icon
                        className="mx-auto h-10 w-10 text-brand"
                        aria-hidden="true"
                      />
                      <p className="mt-4 text-5xl font-bold text-foreground">
                        {usp.stat}
                      </p>
                      <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-brand">
                        {usp.statLabel}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={cn(reversed && "lg:order-1")}>
                  <h3 className="text-2xl font-semibold text-foreground md:text-h3">
                    {usp.heading}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted">
                    {usp.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
