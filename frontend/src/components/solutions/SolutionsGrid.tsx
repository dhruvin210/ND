"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getSolutionIcon, type Solution, type SolutionTier } from "@/data/solutions";
import { trackCta } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/* Bento spans. The default six solutions are ordered 2 × flagship, 3 ×
 * standard, 1 × wide so every row fills exactly; `grid-flow-dense` keeps the
 * layout tidy if an editor changes the mix in the CMS. */
const tierSpan: Record<SolutionTier, string> = {
  flagship: "md:col-span-1 lg:col-span-3",
  standard: "md:col-span-1 lg:col-span-2",
  wide: "md:col-span-2 lg:col-span-6",
};

/** Corner motif for the larger cards — echoes the hero graph. */
function CardMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      aria-hidden="true"
      className={cn(
        "decor absolute -right-6 -top-6 h-40 w-40 text-brand opacity-[0.14] transition-opacity duration-500 ease-premium group-hover:opacity-25",
        className,
      )}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="112" cy="48" r="14" />
        <circle cx="112" cy="48" r="30" strokeDasharray="3 6" />
        <circle cx="112" cy="48" r="46" strokeOpacity="0.5" />
        <path d="M112 62 L112 104 M112 104 L68 132 M112 104 L150 132" />
      </g>
      <circle cx="112" cy="48" r="3.5" fill="currentColor" />
      <circle cx="68" cy="132" r="3" fill="currentColor" />
      <circle cx="150" cy="132" r="3" fill="currentColor" />
    </svg>
  );
}

function SolutionCard({
  solution,
  index,
}: {
  solution: Solution;
  index: number;
}) {
  const Icon = getSolutionIcon(solution.icon);
  const isWide = solution.tier === "wide";
  const isLarge = solution.tier !== "standard";

  /** Writes pointer position straight to CSS vars — no state, no re-render. */
  const handlePointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLAnchorElement>) => {
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      el.style.setProperty("--my", `${event.clientY - rect.top}px`);
    },
    [],
  );

  return (
    <motion.li
      className={cn("col-span-1", tierSpan[solution.tier])}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{
        duration: 0.5,
        // Capped so later cards never feel like they are lagging behind.
        delay: Math.min(index, 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/solutions/${solution.slug}`}
        onPointerMove={handlePointerMove}
        onClick={() => trackCta(`Explore ${solution.title}`, "solutions_grid")}
        className={cn(
          "spotlight group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface p-7 transition-all duration-300 ease-premium",
          "hover:-translate-y-1 hover:border-brand/45 hover:bg-surface-elevated hover:shadow-lift",
          isLarge ? "bg-brand-sheen md:p-8" : "bg-card-sheen",
          isWide && "lg:flex-row lg:items-center lg:gap-12 xl:gap-16",
        )}
      >
        {isLarge && <CardMotif />}

        <div className={cn("relative", isWide && "lg:flex-1")}>
          {/* Icon — subtle lift and tint on hover */}
          <span
            className={cn(
              "inline-flex items-center justify-center rounded-2xl border border-border-strong bg-surface-elevated text-brand transition-all duration-300 ease-premium",
              "group-hover:-translate-y-0.5 group-hover:border-brand/40 group-hover:bg-brand/10 group-hover:shadow-brand-glow",
              isLarge ? "h-14 w-14" : "h-12 w-12",
            )}
          >
            <Icon
              aria-hidden="true"
              className={cn(
                "transition-transform duration-300 ease-premium group-hover:scale-110",
                isLarge ? "h-6 w-6" : "h-5 w-5",
              )}
              strokeWidth={1.6}
            />
          </span>

          <h3
            className={cn(
              "mt-6 font-semibold tracking-[-0.01em] text-foreground",
              isLarge ? "text-xl md:text-[1.375rem]" : "text-lg",
            )}
          >
            {solution.title}
          </h3>

          <p
            className={cn(
              "mt-3 leading-relaxed text-muted",
              isLarge ? "text-[0.9375rem]" : "text-sm",
            )}
          >
            {solution.description}
          </p>
        </div>

        <div
          className={cn(
            "relative mt-7 flex flex-col gap-6",
            isWide
              ? // Hairline rule makes the split read as intentional rather than
                // as leftover space in a stretched card.
                "shrink-0 lg:mt-0 lg:w-[22rem] lg:border-l lg:border-border lg:pl-12 xl:pl-16"
              : "flex-1 justify-end",
          )}
        >
          <ul className="flex flex-wrap gap-2" aria-label="Technologies">
            {solution.tags.map((tag) => (
              <li
                key={tag}
                className="tag-pill group-hover:border-brand/25 group-hover:text-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>

          <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted-strong transition-colors duration-300 ease-premium group-hover:text-brand">
            {solution.ctaLabel}
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1.5"
            />
          </span>
        </div>
      </Link>
    </motion.li>
  );
}

export function SolutionsGrid({ solutions }: { solutions: Solution[] }) {
  return (
    <ul className="grid grid-flow-row-dense grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6 lg:gap-6">
      {solutions.map((solution, i) => (
        <SolutionCard key={solution.slug} solution={solution} index={i} />
      ))}
    </ul>
  );
}
