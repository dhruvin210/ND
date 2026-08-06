"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
/** Digital Solutions grid — a curated preview of 8 services on the homepage.
 *  Full catalog lives on /services. Never a carousel: hidden slider content
 *  is not reliably indexed by Google (Design Review SEO Risk #1). */
export function Services() {
  const featured = services.slice(0, 8);
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section-padding"
    >
      <div className="site-container">
        <span className="eyebrow">Our Digital Solutions</span>
        <h2 id="services-heading" className="section-heading mt-5">
          AI-First Services Built for Growth
        </h2>
        <p className="section-subheading">
          End-to-end technology services — from intelligent agents to
          enterprise platforms — engineered for measurable outcomes.
        </p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.li
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-brand-glow"
                >
                  <span className="inline-flex w-fit rounded-xl bg-surface-elevated p-3 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Learn more
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-brand px-6 py-3 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
          >
            View All Services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}