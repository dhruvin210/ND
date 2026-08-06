"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trackCta } from "@/lib/analytics";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#why-us", label: "Why Us" },
  { href: "/#process", label: "Process" },
  { href: "/#case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

/** Sticky navigation with backdrop blur on scroll — Design Review Phase 1 fix #4. */
export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-lg"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-18 max-w-site items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/"
          aria-label="NextDynamix home"
          className="shrink-0"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/logos/NextDynamix-Final-Logo-02.png"
            alt="NextDynamix"
            width={188}
            height={33}
            priority
          />
        </Link>

        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button asChild onClick={() => trackCta("Schedule Consultation", "header")}>
            <Link href="/#contact">Schedule Consultation</Link>
          </Button>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-foreground lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="border-t border-border bg-background lg:hidden"
        >
          <ul className="space-y-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-3 text-base text-muted hover:bg-surface hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Button asChild className="w-full" size="lg">
                <Link href="/#contact" onClick={() => setMobileOpen(false)}>
                  Schedule Consultation
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
