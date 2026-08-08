import {
  categories,
  categoryCounts,
  categoryIcons,
  services,
} from "@/data/services";

/**
 * Hero visual for /services — the eight disciplines orbiting a single delivery
 * team. Server-rendered: the ring and connectors are static SVG, the only
 * motion is CSS keyframes already in the design system.
 *
 * Node coordinates are the eight points of a circle at r = 38%, starting at
 * 12 o'clock and stepping 45°. Precomputed rather than derived at render time
 * so the markup is identical on server and client.
 */
const NODES: { x: number; y: number }[] = [
  { x: 50, y: 12 },
  { x: 76.87, y: 23.13 },
  { x: 88, y: 50 },
  { x: 76.87, y: 76.87 },
  { x: 50, y: 88 },
  { x: 23.13, y: 76.87 },
  { x: 12, y: 50 },
  { x: 23.13, y: 23.13 },
];

export function CapabilityOrbit() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
      {/* Ambient wash behind the ring */}
      <div
        aria-hidden="true"
        className="decor absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,124,0,0.14),transparent_62%)] blur-xl"
      />

      {/* Rings + spokes */}
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="decor absolute inset-0 h-full w-full text-brand"
      >
        <g fill="none" stroke="currentColor">
          <circle cx="50" cy="50" r="38" strokeOpacity="0.28" strokeWidth="0.4" />
          <circle
            cx="50"
            cy="50"
            r="27"
            strokeOpacity="0.18"
            strokeWidth="0.4"
            strokeDasharray="1.5 3"
            className="origin-center animate-spin-slow"
          />
          <circle cx="50" cy="50" r="46" strokeOpacity="0.1" strokeWidth="0.4" />
        </g>

        {/* Spokes from the hub to each discipline */}
        <g stroke="currentColor" strokeOpacity="0.22" strokeWidth="0.35">
          {NODES.map((node) => (
            <line
              key={`${node.x}-${node.y}`}
              x1="50"
              y1="50"
              x2={node.x}
              y2={node.y}
            />
          ))}
        </g>

        {/* Signal travelling out along the ring */}
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeDasharray="18 220"
          className="animate-flow"
        />
      </svg>

      {/* Hub */}
      <div className="absolute left-1/2 top-1/2 flex h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-brand/30 bg-surface-elevated bg-brand-sheen text-center shadow-brand-glow">
        <span className="text-[clamp(1.25rem,4.2vw,1.75rem)] font-bold leading-none tracking-[-0.02em] text-foreground">
          {services.length}
        </span>
        <span className="mt-1.5 text-[9px] font-semibold uppercase tracking-eyebrow text-muted-faint">
          Services
        </span>
      </div>

      {/* Discipline nodes */}
      <ul className="absolute inset-0 list-none">
        {categories.map((category, i) => {
          const Icon = categoryIcons[category];
          const node = NODES[i];

          return (
            <li
              key={category}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <span
                title={`${category} — ${categoryCounts[category]} services`}
                className="flex h-[clamp(2.75rem,9vw,3.25rem)] w-[clamp(2.75rem,9vw,3.25rem)] items-center justify-center rounded-2xl border border-border-strong bg-surface shadow-inset"
              >
                <Icon
                  aria-hidden="true"
                  className="h-5 w-5 text-brand"
                  strokeWidth={1.6}
                />
                <span className="sr-only">
                  {category}: {categoryCounts[category]} services
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
