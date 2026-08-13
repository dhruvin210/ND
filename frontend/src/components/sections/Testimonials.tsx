"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { testimonials, reviewSummary } from "@/data/testimonials";
import { cn } from "@/lib/utils";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-1"
      role="img"
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating ? "fill-brand text-brand" : "text-border",
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/** Testimonials with client photos, roles, companies, ratings, and case-study
 *  links. Slider behaviour is allowed here (social proof, not primary SEO
 *  content) but all cards remain in the DOM. */
export function Testimonials() {
  const [page, setPage] = React.useState(0);
  const pages = testimonials.length;

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setPage((p) => (p + 1) % pages), 6000);
    return () => clearInterval(id);
  }, [pages]);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="section-padding"
    >
      <div className="site-container">
        <div className="text-center">
          <h2 id="testimonials-heading" className="section-heading">
            Trusted By Growing Businesses
          </h2>
          <p className="section-subheading mx-auto">
            We build long-term partnerships through reliable delivery and
            thoughtful execution.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2 text-sm text-foreground">
            <Stars rating={5} />
            Rated {reviewSummary.rating}/5 based on {reviewSummary.count}{" "}
            reviews · {reviewSummary.sources}
          </div>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <li
              key={t.name}
              className={cn(
                "flex flex-col rounded-2xl border border-border border-l-2 border-l-brand bg-surface p-7 transition-all duration-500",
                // Mobile slider behaviour: only active card visible
                i === page ? "block" : "hidden md:flex",
              )}
            >
              <Stars rating={t.rating} />
              <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-foreground">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                {t.photo ? (
                  <Image
                    src={t.photo}
                    alt={`${t.name}, ${t.role} at ${t.company}`}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full border border-border object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white"
                  >
                    {t.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                )}
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted">
                    {t.role} · {t.company}
                  </p>
                </div>
              </figcaption>
              {t.caseStudySlug && (
                <Link
                  href={`/case-studies/${t.caseStudySlug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
                >
                  Read Case Study
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center gap-2 md:hidden" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              role="tab"
              aria-selected={page === i}
              aria-label={`Show testimonial from ${t.name}`}
              onClick={() => setPage(i)}
              className={cn(
                "h-2.5 rounded-full transition-all",
                page === i ? "w-8 bg-brand" : "w-2.5 bg-border",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
