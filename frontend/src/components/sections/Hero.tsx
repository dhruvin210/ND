"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Layers, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleField } from "@/components/sections/ParticleField";
import { heroStats } from "@/data/stats";
import { site } from "@/lib/site";
import { trackCta } from "@/lib/analytics";

const featureCards = [
  {
    icon: Layers,
    label: "Strategy to launch",
    detail: "Roadmap to shipped product",
  },
  {
    icon: ShieldCheck,
    label: "Secure and scalable",
    detail: "SOC 2 aligned architecture",
  },
  {
    icon: Sparkles,
    label: "Web, mobile, cloud, AI",
    detail: "One team, every layer",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-hero-glow pt-32 pb-20 lg:pt-40 lg:pb-24"
    >
      <ParticleField />
      <div className="site-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <motion.span
              {...fadeUp}
              transition={{ duration: 0.5 }}
              className="eyebrow"
            >
              AI-First Software Development
            </motion.span>

            <motion.h1
              id="hero-heading"
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 max-w-xl text-4xl font-bold leading-[1.1] tracking-tight md:text-h1 lg:text-display"
            >
              We built Charwaha and LaunchGrid. We can build{" "}
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                yours next
              </span>
              .
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg"
            >
              Real products shipped, not just client work. Web, mobile, cloud
              and AI — from strategy to launch.
            </motion.p>

            {/* Single primary CTA — "View Services" and "Free Audit" now live
             *  in the nav/footer instead of competing here (Design Review
             *  Phase 2 §2 CTA hierarchy). */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Button asChild size="lg" onClick={() => trackCta("Schedule Consultation", "hero")}>
                <Link href="#contact">Schedule Consultation →</Link>
              </Button>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-6 flex items-center gap-2 border-t border-border pt-6 text-sm text-muted"
            >
              <span>
                <span className="font-semibold text-foreground">4.9/5</span> on{" "}
                <a
                  href={site.clutchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-brand hover:underline"
                >
                  Clutch
                </a>{" "}
                · 47 verified reviews
              </span>
            </motion.div>

            <motion.dl
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 grid max-w-lg grid-cols-2 gap-px overflow-hidden rounded-2xl border border-brand/20 bg-border/50 sm:grid-cols-4"
            >
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-surface/80 px-4 py-5 text-center backdrop-blur"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-2xl font-bold text-foreground md:text-3xl">
                    {stat.value}
                  </dd>
                  <dd className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-brand">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* One connected panel, not three floating tiles — each capability is
           *  a row with a brand accent rail and a supporting line. */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden divide-y divide-border rounded-2xl border border-brand/50 bg-surface/90 p-6 shadow-brand-glow backdrop-blur lg:block"
            aria-hidden="true"
          >
            {featureCards.map(({ icon: Icon, label, detail }) => (
              <div
                key={label}
                className="flex items-start gap-4 border-l-2 border-l-brand py-5 pl-5 pr-1 first:pt-3 last:pb-3"
              >
                <Icon className="mt-0.5 h-6 w-6 shrink-0 text-brand" />
                <div>
                  <p className="text-base font-semibold leading-snug text-foreground">
                    {label}
                  </p>
                  <p className="mt-1.5 text-sm text-muted">{detail}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
