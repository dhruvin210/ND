"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Layers, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleField } from "@/components/sections/ParticleField";
import { heroStats } from "@/data/stats";
import { trackCta } from "@/lib/analytics";

const featureCards = [
  { icon: Layers, label: "Strategy to Launch" },
  { icon: ShieldCheck, label: "Secure & Scalable Systems" },
  { icon: Sparkles, label: "Web, Mobile, Cloud & AI" },
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
              Custom Digital Solutions &amp; Technology Services That{" "}
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                Transform
              </span>{" "}
              Business
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg"
            >
              We design, build, and scale web, mobile, cloud, and AI-powered
              solutions for forward-thinking companies — from strategy to
              launch.
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button asChild size="lg" onClick={() => trackCta("Schedule Consultation", "hero")}>
                <Link href="#contact">Schedule Consultation →</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                onClick={() => trackCta("View Services", "hero")}
              >
                <Link href="#services">View Services</Link>
              </Button>
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

          <div className="hidden flex-col gap-5 lg:flex" aria-hidden="true">
            {featureCards.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface/90 p-6 shadow-card backdrop-blur transition-colors hover:border-brand/40"
              >
                <span className="rounded-xl bg-surface-elevated p-3 text-brand">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="font-semibold">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
