"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useCases } from "@/data/solutions-page";
import { cn } from "@/lib/utils";

/**
 * Featured use cases. Every panel is rendered into the HTML and hidden with
 * the `hidden` attribute rather than fetched on demand, so all of the copy is
 * indexable. The active tab indicator animates via a shared layout id.
 */
export function UseCaseExplorer() {
  const [active, setActive] = React.useState(0);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  /** Roving focus: arrows move between tabs, Home/End jump to the ends. */
  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = useCases.length - 1;
    let next: number | null = null;

    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        next = active === last ? 0 : active + 1;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        next = active === 0 ? last : active - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }

    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-8">
      {/* -------------------------------- Tabs -------------------------------- */}
      <div
        role="tablist"
        aria-label="Featured use cases"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {useCases.map((useCase, i) => {
          const selected = active === i;
          return (
            <button
              key={useCase.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`usecase-tab-${useCase.id}`}
              aria-selected={selected}
              aria-controls={`usecase-panel-${useCase.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "group relative shrink-0 rounded-xl px-5 py-4 text-left transition-colors duration-300 ease-premium lg:w-full lg:shrink",
                selected
                  ? "text-foreground"
                  : "text-muted hover:text-foreground",
              )}
            >
              {selected && (
                <motion.span
                  layoutId="usecase-indicator"
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 rounded-xl border border-brand/35 bg-brand/[0.07]"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              )}

              <span className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300",
                    selected
                      ? "bg-brand"
                      : "bg-border-strong group-hover:bg-muted-faint",
                  )}
                />
                <span className="whitespace-nowrap text-sm font-semibold lg:whitespace-normal">
                  {useCase.label}
                </span>
              </span>

              <span className="mt-1.5 hidden pl-[1.125rem] text-xs leading-relaxed text-muted-faint lg:block">
                {useCase.summary}
              </span>
            </button>
          );
        })}
      </div>

      {/* ------------------------------- Panels ------------------------------- */}
      <div>
        {useCases.map((useCase, i) => (
          <div
            key={useCase.id}
            role="tabpanel"
            id={`usecase-panel-${useCase.id}`}
            aria-labelledby={`usecase-tab-${useCase.id}`}
            hidden={active !== i}
            tabIndex={0}
            className="panel h-full p-7 md:p-9"
          >
            <h3 className="text-xl font-semibold tracking-[-0.01em] text-foreground md:text-[1.375rem]">
              {useCase.label}
            </h3>
            <p className="mt-2 text-sm text-muted">{useCase.summary}</p>

            <dl className="mt-8 grid gap-7 sm:grid-cols-2">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-eyebrow text-muted-faint">
                  Challenge
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-muted-strong">
                  {useCase.challenge}
                </dd>
              </div>

              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-eyebrow text-brand">
                  Solution
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-muted-strong">
                  {useCase.solution}
                </dd>
              </div>

              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-eyebrow text-muted-faint">
                  Technologies
                </dt>
                <dd className="mt-3">
                  <ul className="flex flex-wrap gap-2">
                    {useCase.technologies.map((tech) => (
                      <li key={tech} className="tag-pill">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>

              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-eyebrow text-muted-faint">
                  Expected business outcome
                </dt>
                <dd className="mt-3 flex gap-2.5 text-sm leading-relaxed text-muted-strong">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-success"
                  />
                  <span>{useCase.outcome}</span>
                </dd>
              </div>
            </dl>

            <Link
              href="#consultation"
              className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-soft"
            >
              Discuss this use case
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
