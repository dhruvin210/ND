import * as React from "react";
import { cn } from "@/lib/utils";

/** Chevron applied as an inline style rather than an arbitrary Tailwind
 *  background-image utility: tailwind-merge treats such a class as conflicting
 *  with the background colour and drops it, which left the control rendering
 *  UA-default white on a dark form. Inline styles are immune to that merge.
 *
 *  Note: do not write the arbitrary-utility form in a comment here either —
 *  Tailwind's scanner would treat it as a real class and emit an unresolvable
 *  url() into the stylesheet. */
export const selectChevronStyle: React.CSSProperties = {
  backgroundImage:
    "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23A1A1A1' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
  backgroundSize: "16px",
  backgroundPosition: "right 1rem center",
  backgroundRepeat: "no-repeat",
};

/** Native select styled to match the design system — accessible by default. */
const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, style, ...props }, ref) => (
  <select
    ref={ref}
    style={{ ...selectChevronStyle, ...style }}
    className={cn(
      "flex h-11 w-full cursor-pointer appearance-none rounded-lg border border-border bg-surface px-4 py-2 pr-10 text-sm text-foreground transition-colors focus:border-brand focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
      // Keeps the popup list dark instead of inheriting the UA light palette.
      "[&>option]:bg-surface [&>option]:text-foreground",
      className,
    )}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";

export { Select };
