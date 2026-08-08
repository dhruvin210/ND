"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import {
  categories,
  categoryAnchors,
  categoryBlurbs,
  categoryCounts,
  categoryIcons,
  services,
  type ServiceCategory,
  type ServiceItem,
} from "@/data/services";
import { trackCta } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Filter = ServiceCategory | "All";

/** Lowercased haystack per service, built once — the filter runs on keystroke. */
const SEARCH_INDEX = new Map<string, string>(
  services.map((s) => [
    s.slug,
    `${s.title} ${s.category} ${s.description}`.toLowerCase(),
  ]),
);

/** Discipline → its services, precomputed so filtering never re-groups. */
const GROUPED: { category: ServiceCategory; items: ServiceItem[] }[] =
  categories.map((category) => ({
    category,
    items: services.filter((s) => s.category === category),
  }));

function ServiceCard({ service }: { service: ServiceItem }) {
  const Icon = service.icon;

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
    <li>
      <Link
        href={`/services/${service.slug}/`}
        onPointerMove={handlePointerMove}
        onClick={() => trackCta(service.title, "services_catalog")}
        className="spotlight group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface bg-card-sheen p-6 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-brand/45 hover:bg-surface-elevated hover:shadow-lift"
      >
        <div className="relative flex items-start justify-between gap-4">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border-strong bg-surface-elevated text-brand transition-all duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:border-brand/40 group-hover:bg-brand/10">
            <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
          </span>

          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-muted-faint transition-all duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
          />
        </div>

        <h3 className="relative mt-5 text-base font-semibold tracking-[-0.01em] text-foreground">
          {service.title}
        </h3>
        <p className="relative mt-2.5 text-sm leading-relaxed text-muted">
          {service.description}
        </p>
      </Link>
    </li>
  );
}

/**
 * The catalog itself — 48 services across 8 disciplines, with live search and
 * discipline filtering. Grouping is preserved under every filter so the
 * information architecture stays legible rather than collapsing into one list.
 *
 * Cards deliberately carry no entrance animation: at 48 items, animating on
 * filter change costs more than it communicates.
 */
export function ServicesCatalog() {
  const [filter, setFilter] = React.useState<Filter>("All");
  const [query, setQuery] = React.useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const groups = React.useMemo(() => {
    return GROUPED.map((group) => {
      if (filter !== "All" && group.category !== filter) {
        return { ...group, items: [] };
      }
      if (!normalizedQuery) return group;

      return {
        ...group,
        items: group.items.filter((s) =>
          SEARCH_INDEX.get(s.slug)?.includes(normalizedQuery),
        ),
      };
    }).filter((group) => group.items.length > 0);
  }, [filter, normalizedQuery]);

  const resultCount = groups.reduce((n, g) => n + g.items.length, 0);
  const isFiltered = filter !== "All" || normalizedQuery.length > 0;

  function reset() {
    setFilter("All");
    setQuery("");
  }

  return (
    <div>
      {/* ------------------------------ Controls ----------------------------- */}
      {/* Negative margins cancel `site-container-wide`'s padding so the bar
          reads as a full-width rail once it sticks. */}
      <div className="sticky top-[calc(var(--header-h)+0.5rem)] z-30 -mx-6 mb-12 border-y border-border bg-background/85 px-6 py-4 backdrop-blur md:-mx-10 md:px-10 lg:mb-14 xl:-mx-14 xl:px-14">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          {/* Discipline chips */}
          <div
            role="group"
            aria-label="Filter by discipline"
            // Horizontal scroll below lg rather than a wrapping chip wall that
            // pushes the results off-screen on phones.
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:flex-wrap lg:overflow-visible lg:pb-0"
          >
            <FilterChip
              active={filter === "All"}
              onClick={() => setFilter("All")}
              label="All"
              count={services.length}
            />
            {categories.map((category) => (
              <FilterChip
                key={category}
                active={filter === category}
                onClick={() => setFilter(category)}
                label={category}
                count={categoryCounts[category]}
              />
            ))}
          </div>

          {/* Search */}
          <div className="relative shrink-0 lg:w-72">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-faint"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services…"
              aria-label="Search services"
              className="h-11 w-full rounded-xl border border-border-strong bg-surface pl-10 pr-10 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted-faint focus:border-brand/50 [&::-webkit-search-cancel-button]:appearance-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-muted-faint transition-colors hover:bg-surface-elevated hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Result count — announced, and visible only once a filter is on. */}
        <p
          aria-live="polite"
          className={cn(
            "mt-3 text-xs text-muted-faint",
            !isFiltered && "sr-only",
          )}
        >
          {resultCount} {resultCount === 1 ? "service" : "services"}
          {isFiltered ? " matching" : ""}
        </p>
      </div>

      {/* ------------------------------- Results ----------------------------- */}
      {groups.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border-strong bg-surface/50 px-8 py-16 text-center">
          <p className="text-base font-semibold text-foreground">
            No services match “{query}”.
          </p>
          <p className="mt-2 text-sm text-muted">
            Try a broader term, or tell us what you need — we build outside the
            catalog regularly.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-11 items-center rounded-xl border border-border-strong bg-surface px-6 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-brand/50 hover:bg-surface-elevated"
            >
              Clear filters
            </button>
            <Link
              href="#contact"
              className="inline-flex h-11 items-center rounded-xl bg-brand px-6 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-fierce"
            >
              Describe your project
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-14 lg:space-y-16">
          {groups.map((group) => {
            const Icon = categoryIcons[group.category];
            const anchor = categoryAnchors[group.category];

            return (
              <section
                key={group.category}
                id={anchor}
                aria-labelledby={`${anchor}-heading`}
                className="scroll-mt-[calc(var(--header-h)+7rem)]"
              >
                <div className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-start md:justify-between md:gap-10">
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand">
                      <Icon
                        aria-hidden="true"
                        className="h-5 w-5"
                        strokeWidth={1.6}
                      />
                    </span>
                    <div>
                      <h3
                        id={`${anchor}-heading`}
                        className="text-xl font-bold tracking-[-0.015em] text-foreground md:text-[1.375rem]"
                      >
                        {group.category}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                        {categoryBlurbs[group.category]}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 text-[11px] font-semibold uppercase tracking-eyebrow text-muted-faint md:pt-2">
                    {group.items.length} of {categoryCounts[group.category]}
                  </span>
                </div>

                <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {group.items.map((service) => (
                    <ServiceCard key={service.slug} service={service} />
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-300 ease-premium",
        active
          ? "border-brand/50 bg-brand/10 text-brand"
          : "border-border-strong bg-surface text-muted-strong hover:border-brand/30 hover:text-foreground",
      )}
    >
      {label}
      <span
        className={cn(
          "text-[11px] tabular-nums",
          active ? "text-brand/70" : "text-muted-faint",
        )}
      >
        {count}
      </span>
    </button>
  );
}
