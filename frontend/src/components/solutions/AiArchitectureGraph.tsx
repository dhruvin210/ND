import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- *
 * Enterprise AI architecture graph.
 *
 * Deliberately server-rendered SVG with CSS-only animation: no client
 * component, no hydration cost, no layout shift, and it inherits the global
 * prefers-reduced-motion override. Sources feed an orchestration core which
 * produces grounded outcomes — the same story the page tells in copy.
 * -------------------------------------------------------------------------- */

const sources = [
  { y: 96, label: "Docs" },
  { y: 184, label: "Data" },
  { y: 272, label: "APIs" },
  { y: 360, label: "Chat" },
];

const outcomes = [
  { y: 140, label: "Answers" },
  { y: 240, label: "Actions" },
  { y: 340, label: "Insights" },
];

/** Source → core connectors, curved so the graph reads as flow not a starburst. */
const inEdges = [
  "M 84 96 C 152 96, 162 240, 222 240",
  "M 84 184 C 152 184, 172 240, 222 240",
  "M 84 272 C 152 272, 172 240, 222 240",
  "M 84 360 C 152 360, 162 240, 222 240",
];

/** Core → outcome connectors. */
const outEdges = [
  "M 338 240 C 398 240, 412 140, 476 140",
  "M 338 240 L 476 240",
  "M 338 240 C 398 240, 412 340, 476 340",
];

export function AiArchitectureGraph({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)} aria-hidden="true">
      {/* Ambient orange/blue wash behind the graph — the only blurred layer. */}
      <div className="decor absolute -inset-8 animate-drift bg-ai-aurora blur-2xl" />

      <svg
        viewBox="0 0 560 480"
        className="decor relative h-auto w-full"
        role="presentation"
        focusable="false"
      >
        <defs>
          <linearGradient id="ndEdgeFlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FF7C00" stopOpacity="0" />
            <stop offset="50%" stopColor="#FF7C00" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FF7C00" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="ndCoreStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFA24D" />
            <stop offset="55%" stopColor="#FF7C00" />
            <stop offset="100%" stopColor="#ED2F00" />
          </linearGradient>

          <radialGradient id="ndCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF7C00" stopOpacity="0.40" />
            <stop offset="70%" stopColor="#FF7C00" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#FF7C00" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="ndCoolGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3878FF" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#3878FF" stopOpacity="0" />
          </radialGradient>

          <pattern
            id="ndGraphGrid"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.09)" />
          </pattern>

          {/* Fades the grid out towards the edges so it has no hard boundary. */}
          <radialGradient id="ndGridFade" cx="50%" cy="50%" r="52%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="ndGridMask">
            <rect width="560" height="480" fill="url(#ndGridFade)" />
          </mask>
        </defs>

        <rect
          width="560"
          height="480"
          fill="url(#ndGraphGrid)"
          mask="url(#ndGridMask)"
        />

        {/* Column labels — small caps, reads as an architecture diagram. */}
        <g
          fill="#8E8E8E"
          fontSize="9.5"
          fontWeight="600"
          letterSpacing="2.4"
          textAnchor="middle"
        >
          <text x="84" y="44">
            SOURCES
          </text>
          <text x="280" y="44">
            ORCHESTRATION
          </text>
          <text x="476" y="44">
            OUTCOMES
          </text>
        </g>

        {/* Static connector tracks */}
        <g
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1"
          strokeLinecap="round"
        >
          {[...inEdges, ...outEdges].map((d) => (
            <path key={d} d={d} />
          ))}
        </g>

        {/* Travelling signal on each connector — one dash per path. */}
        <g
          fill="none"
          stroke="url(#ndEdgeFlow)"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeDasharray="14 166"
        >
          {[...inEdges, ...outEdges].map((d, i) => (
            <path
              key={d}
              d={d}
              className="animate-flow"
              style={{ animationDelay: `${i * 0.42}s` }}
            />
          ))}
        </g>

        {/* Cool counter-glow keeps the palette from reading as pure orange. */}
        <circle cx="476" cy="240" r="110" fill="url(#ndCoolGlow)" />

        {/* Orchestration core */}
        <g>
          <circle cx="280" cy="240" r="104" fill="url(#ndCoreGlow)" />
          <circle
            cx="280"
            cy="240"
            r="66"
            fill="none"
            stroke="rgba(255,124,0,0.26)"
            strokeWidth="1"
            strokeDasharray="3 7"
            className="origin-center animate-spin-slow"
          />
          <circle
            cx="280"
            cy="240"
            r="50"
            fill="none"
            stroke="rgba(255,255,255,0.13)"
            strokeWidth="1"
          />
          <rect
            x="252"
            y="212"
            width="56"
            height="56"
            rx="16"
            fill="#141414"
            stroke="url(#ndCoreStroke)"
            strokeWidth="1.5"
            transform="rotate(45 280 240)"
          />
          <circle cx="280" cy="240" r="6" fill="#FF7C00" className="animate-breathe" />
        </g>

        {/* Source nodes */}
        {sources.map((node, i) => (
          <g key={node.label}>
            <circle
              cx="84"
              cy={node.y}
              r="15"
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1"
            />
            <circle cx="84" cy={node.y} r="5.5" fill="#6E6E6E" />
            <circle
              cx="84"
              cy={node.y}
              r="5.5"
              fill="#FF7C00"
              className="animate-breathe"
              style={{ animationDelay: `${i * 0.55}s` }}
            />
            <text
              x="84"
              y={node.y + 34}
              fill="#8E8E8E"
              fontSize="10"
              fontWeight="500"
              textAnchor="middle"
            >
              {node.label}
            </text>
          </g>
        ))}

        {/* Outcome nodes — brighter, they are the point of the diagram. */}
        {outcomes.map((node, i) => (
          <g key={node.label}>
            <circle
              cx="476"
              cy={node.y}
              r="18"
              fill="none"
              stroke="rgba(255,124,0,0.34)"
              strokeWidth="1"
            />
            <circle cx="476" cy={node.y} r="7" fill="#FF7C00" />
            <circle
              cx="476"
              cy={node.y}
              r="7"
              fill="#FFA24D"
              className="animate-breathe"
              style={{ animationDelay: `${0.9 + i * 0.5}s` }}
            />
            <text
              x="476"
              y={node.y + 38}
              fill="#C9C9C9"
              fontSize="10"
              fontWeight="500"
              textAnchor="middle"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
