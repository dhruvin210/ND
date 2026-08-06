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
        },
        background: "#0D0D0D",
        surface: {
          DEFAULT: "#1A1A1A",
          elevated: "#242424",
        },
        foreground: "#FFFFFF",
        muted: "#AAAAAA",
        border: "#2A2A2A",
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
      },
      maxWidth: {
        site: "1440px",
        content: "1280px",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #FF7C00 0%, #ED2F00 100%)",
        "hero-glow":
          "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,124,0,0.12), transparent)",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.4)",
        "brand-glow": "0 0 32px rgba(255,124,0,0.25)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.25s ease-out",
        "accordion-up": "accordion-up 0.25s ease-out",
        marquee: "marquee 40s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
