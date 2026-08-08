"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds. Use small increments (0.06–0.1) for staggered lists. */
  delay?: number;
  /** Travel distance in px. 0 gives a pure fade. */
  y?: number;
  /** Rendered element — use "li" inside a list so the markup stays valid. */
  as?: "div" | "li";
}

/**
 * Scroll-triggered entrance. Children are passed through from server
 * components, so the markup is present in the initial HTML — only the
 * animation is client-side. Fires once and never re-animates on scroll back.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  as = "div",
}: RevealProps) {
  const Motion = as === "li" ? motion.li : motion.div;

  return (
    <Motion
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Motion>
  );
}
