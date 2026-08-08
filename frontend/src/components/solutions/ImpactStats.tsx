"use client";

import * as React from "react";
import { useInView } from "framer-motion";
import type { ImpactStat } from "@/data/solutions-page";

const DURATION = 1400;

/**
 * Eased count-up. Seeded with the final value so the real number is what gets
 * server-rendered — the page is correct without JS, and for search engines.
 * The animation only runs once the band is in view, and because the element is
 * off-screen until then the reset to 0 is never visible.
 */
function useCountUp(target: number, active: boolean) {
  const [value, setValue] = React.useState(target);

  React.useEffect(() => {
    if (!active) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(target);
      return;
    }

    let raf = 0;
    let start: number | null = null;

    setValue(0);

    const tick = (now: number) => {
      if (start === null) start = now;
      const t = Math.min((now - start) / DURATION, 1);
      // easeOutExpo — fast start, gentle settle.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    // Backstop: if frames are throttled (background tab, heavy main thread)
    // the figure must still end up correct rather than stranded mid-count.
    const settle = setTimeout(() => setValue(target), DURATION + 500);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settle);
    };
  }, [active, target]);

  return value;
}

function StatFigure({ stat, active }: { stat: ImpactStat; active: boolean }) {
  const value = useCountUp(stat.value, active);

  return (
    <div className="px-5 py-8 text-center md:px-6 lg:py-10">
      <dt className="sr-only">{stat.label}</dt>
      <dd className="text-[2.125rem] font-bold leading-none tracking-[-0.02em] text-foreground tabular-nums md:text-[2.5rem]">
        {stat.prefix}
        {value}
        <span className="text-brand">{stat.suffix}</span>
      </dd>
      <dd className="mt-3 text-[11px] font-semibold uppercase tracking-eyebrow text-muted-faint">
        {stat.label}
      </dd>
    </div>
  );
}

/**
 * Compact trust band directly below the hero. Numbers animate once when the
 * band scrolls into view; hairline separators keep it quiet.
 */
export function ImpactStats({ stats }: { stats: ImpactStat[] }) {
  const ref = React.useRef<HTMLDListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section aria-label="Business impact" className="border-b border-border">
      <div className="site-container-wide">
        <dl
          ref={ref}
          className="grid grid-cols-2 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0"
        >
          {stats.map((stat) => (
            <StatFigure key={stat.label} stat={stat} active={inView} />
          ))}
        </dl>
      </div>
    </section>
  );
}
