import type { Config } from "tailwindcss";

/**
 * NextDynamix design tokens — derived from the brand guideline and
 * the Expert Design Review v2 token specification.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1440px" },
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: "#FF7C00", // Primary Orange
          fierce: "#ED2F00", // Secondary Orange ("Fierce")
          soft: "#FFA24D", // Tint for on-dark body copy that must stay legible
        },
        background: "#0A0A0A",
        surface: {
          DEFAULT: "#141414",
          elevated: "#1C1C1C",
          raised: "#242424",
        },
        foreground: "#FFFFFF",
        muted: {
          DEFAULT: "#A1A1A1",
          strong: "#C9C9C9", // Higher-contrast secondary text
          faint: "#6E6E6E", // Metadata / eyebrow support
        },
        border: {
          DEFAULT: "#232323",
          strong: "#2E2E2E",
        },
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Typography scale from the master spec
        "display": ["4rem", { lineHeight: "1.1", fontWeight: "700" }], // 64px
        "h1": ["3.5rem", { lineHeight: "1.1", fontWeight: "700" }], // 56px
        "h2": ["2.75rem", { lineHeight: "1.15", fontWeight: "700" }], // 44px
        "h3": ["1.875rem", { lineHeight: "1.25", fontWeight: "600" }], // 30px
        "h4": ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }], // 24px
        // Editorial display sizes for the redesigned marketing pages
        "display-xl": ["4.5rem", { lineHeight: "1.04", fontWeight: "700", letterSpacing: "-0.03em" }], // 72px
        "display-lg": ["3.75rem", { lineHeight: "1.06", fontWeight: "700", letterSpacing: "-0.025em" }], // 60px
      },
      letterSpacing: {
        eyebrow: "0.18em",
      },
      maxWidth: {
        site: "1440px",
        content: "1280px",
        wide: "1440px",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #FF7C00 0%, #ED2F00 100%)",
        "hero-glow":
          "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,124,0,0.12), transparent)",
        // Wide, low-intensity aurora used behind AI-themed sections.
        "ai-aurora":
          "radial-gradient(ellipse 70% 60% at 15% 0%, rgba(255,124,0,0.10), transparent 60%), radial-gradient(ellipse 60% 55% at 85% 10%, rgba(56,120,255,0.08), transparent 60%)",
        // Subtle top-lit sheen for elevated cards.
        "card-sheen":
          "linear-gradient(160deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0) 42%)",
        "brand-sheen":
          "linear-gradient(160deg, rgba(255,124,0,0.10) 0%, rgba(255,124,0,0) 46%)",
        "hairline-x":
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.10) 18%, rgba(255,255,255,0.10) 82%, transparent)",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.4)",
        "brand-glow": "0 0 32px rgba(255,124,0,0.25)",
        // Restrained elevation for hover states — depth without heaviness.
        lift: "0 18px 40px -18px rgba(0,0,0,0.75), 0 2px 8px -2px rgba(0,0,0,0.5)",
        "lift-brand":
          "0 18px 44px -20px rgba(255,124,0,0.28), 0 0 0 1px rgba(255,124,0,0.16)",
        inset: "inset 0 1px 0 0 rgba(255,255,255,0.05)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        /* Signal travelling along a connector line in the process timeline. */
        "trace-x": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(400%)" },
        },
        /* Slow node breathing for the hero AI graph. */
        breathe: {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.18)" },
        },
        /* Very slow aurora drift — 1 transform property only. */
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(-2%, 1.5%, 0)" },
        },
        /* Data flowing along the SVG connectors in the hero graph. */
        flow: {
          from: { strokeDashoffset: "180" },
          to: { strokeDashoffset: "0" },
        },
        /* CSS-only entrance for above-the-fold content (no JS, no CLS). */
        "reveal-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "none" },
        },
        "reveal-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.25s ease-out",
        "accordion-up": "accordion-up 0.25s ease-out",
        marquee: "marquee 40s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "trace-x": "trace-x 3.2s ease-in-out infinite",
        breathe: "breathe 4s ease-in-out infinite",
        drift: "drift 24s ease-in-out infinite",
        flow: "flow 3.4s linear infinite",
        "spin-slow": "spin 52s linear infinite",
        "reveal-up": "reveal-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "reveal-in": "reveal-in 1.1s ease-out both",
      },
      transitionTimingFunction: {
        // Linear-style easing: fast out, settled landing.
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
