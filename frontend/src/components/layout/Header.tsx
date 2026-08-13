"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  Phone,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  categories,
  categoryAnchors,
  categoryBlurbs,
  categoryCounts,
  categoryIcons,
  services,
  servicesByCategory,
  type ServiceCategory,
} from "@/data/services";
import { solutionIcons, solutions } from "@/data/solutions";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { trackCta } from "@/lib/analytics";

interface NavLink {
  href: string;
  label: string;
  /** Route prefix that marks this item active. */
  match?: string;
  /** Two-pane discipline → service panel. Mutually exclusive with `children`. */
  mega?: boolean;
  children?: {
    href: string;
    label: string;
    description?: string;
    icon?: LucideIcon;
  }[];
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home", match: "/" },
  { href: "/services", label: "Services", match: "/services", mega: true },
  {
    href: "/solutions",
    label: "Solutions",
    match: "/solutions",
    children: solutions.map((s) => ({
      href: `/solutions/${s.slug}`,
      label: s.title,
      description: s.tags.slice(0, 2).join(" · "),
      icon: solutionIcons[s.icon],
    })),
  },
  { href: "/#case-studies", label: "Industries" },
  { href: "/#case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog", match: "/blog" },
  { href: "/#why-us", label: "About" },
];

/**
 * Sticky navigation. Transparent at the top of the page, glass with a hairline
 * border once scrolled. The active top-level route is marked in brand orange.
 */
export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [megaCategory, setMegaCategory] = React.useState<ServiceCategory>(
    categories[0],
  );
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet on navigation.
  React.useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  // Lock body scroll while the mobile sheet is open.
  React.useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  React.useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  const isActive = (link: NavLink) =>
    Boolean(link.match) &&
    (pathname === link.match || pathname.startsWith(`${link.match}/`));

  /** Small delay on close so the pointer can travel into the dropdown. */
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const telHref = `tel:${site.phone.replace(/[^+\d]/g, "")}`;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[60] transition-all duration-300 ease-premium",
        scrolled || mobileOpen
          ? "border-b border-border bg-background/70 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-18 max-w-wide items-center gap-6 px-6 md:px-10 xl:px-14">
        <Link
          href="/"
          aria-label="NextDynamix home"
          className="shrink-0 transition-opacity duration-200 hover:opacity-80"
        >
          <Image
            src="/logos/NextDynamix-Final-Logo-02.png"
            alt="NextDynamix"
            width={172}
            height={30}
            priority
          />
        </Link>

        {/* ----------------------------- Desktop nav ----------------------------- */}
        <nav aria-label="Main navigation" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link);
              const hasMenu = Boolean(link.children?.length) || Boolean(link.mega);
              const menuOpen = openMenu === link.label;

              return (
                <li
                  key={link.label}
                  // The mega panel is far wider than its trigger, so it anchors
                  // to the fixed header instead of the item.
                  className={cn(!link.mega && "relative")}
                  onMouseEnter={() => {
                    cancelClose();
                    if (link.mega) setMegaCategory(categories[0]);
                    if (hasMenu) setOpenMenu(link.label);
                  }}
                  onMouseLeave={hasMenu ? scheduleClose : undefined}
                >
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    aria-expanded={hasMenu ? menuOpen : undefined}
                    className={cn(
                      "group relative inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors duration-200",
                      active
                        ? "text-brand"
                        : "text-muted hover:text-foreground",
                    )}
                  >
                    {link.label}
                    {hasMenu && (
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          menuOpen && "rotate-180",
                        )}
                      />
                    )}
                    {/* Active underline */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3 -bottom-px h-px origin-center bg-brand transition-transform duration-300 ease-premium",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>

                  {/* Services mega menu — disciplines on the left, the
                      hovered discipline's services on the right. */}
                  {link.mega && menuOpen && (
                    <div
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                      className="absolute left-1/2 top-full w-[min(64rem,calc(100vw-3rem))] -translate-x-1/2 pt-3"
                    >
                      {/* The reveal animation lives on the inner panel: its
                          keyframes end at `transform: none`, which would wipe
                          out the centring translate if applied out here. */}
                      <div className="animate-reveal-up overflow-hidden rounded-2xl border border-border-strong bg-surface/95 shadow-lift backdrop-blur-xl">
                        <div className="grid grid-cols-[16rem_1fr]">
                          {/* Discipline rail */}
                          <ul className="border-r border-border bg-surface-elevated/40 p-2">
                            {categories.map((category) => {
                              const Icon = categoryIcons[category];
                              const current = megaCategory === category;

                              return (
                                <li key={category}>
                                  <Link
                                    href={`/services/#${categoryAnchors[category]}`}
                                    onMouseEnter={() => setMegaCategory(category)}
                                    onFocus={() => setMegaCategory(category)}
                                    onClick={() => setOpenMenu(null)}
                                    className={cn(
                                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-200",
                                      current
                                        ? "bg-surface text-foreground"
                                        : "text-muted hover:text-foreground",
                                    )}
                                  >
                                    <Icon
                                      aria-hidden="true"
                                      strokeWidth={1.6}
                                      className={cn(
                                        "h-4 w-4 shrink-0 transition-colors duration-200",
                                        current ? "text-brand" : "text-muted-faint",
                                      )}
                                    />
                                    <span className="min-w-0 flex-1 truncate font-medium">
                                      {category}
                                    </span>
                                    <span className="text-[11px] tabular-nums text-muted-faint">
                                      {categoryCounts[category]}
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>

                          {/* Services in the active discipline */}
                          <div className="p-5">
                            <Link
                              href={`/services/#${categoryAnchors[megaCategory]}`}
                              onClick={() => setOpenMenu(null)}
                              className="group block"
                            >
                              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-eyebrow text-brand">
                                {megaCategory}
                                <ArrowUpRight
                                  aria-hidden="true"
                                  className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                              </span>
                              <span className="mt-2 block max-w-xl text-sm leading-relaxed text-muted">
                                {categoryBlurbs[megaCategory]}
                              </span>
                            </Link>

                            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-1">
                              {servicesByCategory[megaCategory].map((service) => (
                                <li key={service.slug}>
                                  <Link
                                    href={`/services/${service.slug}/`}
                                    onClick={() => {
                                      trackCta(service.title, "header_mega");
                                      setOpenMenu(null);
                                    }}
                                    className="group flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-muted-strong transition-colors duration-200 hover:bg-surface-elevated hover:text-foreground"
                                  >
                                    <span className="min-w-0 flex-1 truncate">
                                      {service.title}
                                    </span>
                                    <ArrowRight
                                      aria-hidden="true"
                                      className="h-3.5 w-3.5 shrink-0 text-muted-faint opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-brand group-hover:opacity-100"
                                    />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Panel footer */}
                        <div className="flex items-center justify-between gap-6 border-t border-border bg-surface-elevated/40 px-5 py-3.5">
                          <p className="text-xs text-muted-faint">
                            {services.length} services across {categories.length}{" "}
                            disciplines.
                          </p>
                          <div className="flex items-center gap-2">
                            <Link
                              href="/services"
                              onClick={() => setOpenMenu(null)}
                              className="inline-flex h-9 items-center rounded-lg px-3 text-[13px] font-medium text-muted transition-colors duration-200 hover:text-foreground"
                            >
                              Browse all
                            </Link>
                            <Link
                              href="/solutions#consultation"
                              onClick={() => {
                                trackCta("Get Free Consultation", "header_mega");
                                setOpenMenu(null);
                              }}
                              className="group inline-flex h-9 items-center gap-1.5 rounded-lg bg-brand px-4 text-[13px] font-semibold text-white transition-all duration-300 ease-premium hover:bg-brand-fierce"
                            >
                              Talk to an expert
                              <ArrowRight
                                aria-hidden="true"
                                className="h-3.5 w-3.5 transition-transform duration-300 ease-premium group-hover:translate-x-0.5"
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dropdown */}
                  {Boolean(link.children?.length) && menuOpen && (
                    <div
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                      className="absolute left-1/2 top-full w-[min(40rem,calc(100vw-3rem))] -translate-x-1/2 pt-3"
                    >
                      {/* Two columns keep the panel three rows tall instead of
                          six, so it clears the hero headline. */}
                      <div className="animate-reveal-up overflow-hidden rounded-2xl border border-border-strong bg-surface/95 shadow-lift backdrop-blur-xl">
                        <ul className="grid grid-cols-2 gap-1 p-2.5">
                          {link.children?.map((child) => {
                            const Icon = child.icon;

                            return (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setOpenMenu(null)}
                                  className="group flex h-full items-start gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-surface-elevated"
                                >
                                  {Icon && (
                                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-elevated/60 transition-colors duration-200 group-hover:border-brand/40">
                                      <Icon
                                        aria-hidden="true"
                                        strokeWidth={1.6}
                                        className="h-4 w-4 text-muted-faint transition-colors duration-200 group-hover:text-brand"
                                      />
                                    </span>
                                  )}
                                  <span className="min-w-0 flex-1">
                                    <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                                      <span className="min-w-0 truncate">
                                        {child.label}
                                      </span>
                                      <ArrowRight
                                        aria-hidden="true"
                                        className="h-3.5 w-3.5 shrink-0 text-brand opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                                      />
                                    </span>
                                    {child.description && (
                                      <span className="mt-0.5 block truncate text-xs text-muted-faint">
                                        {child.description}
                                      </span>
                                    )}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>

                        {/* Panel footer — mirrors the services mega menu. */}
                        <div className="flex items-center justify-between gap-6 border-t border-border bg-surface-elevated/40 px-5 py-3.5">
                          <p className="text-xs text-muted-faint">
                            Production AI, shipped end to end.
                          </p>
                          <Link
                            href={link.href}
                            onClick={() => setOpenMenu(null)}
                            className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-muted transition-colors duration-200 hover:text-foreground"
                          >
                            View all {link.label.toLowerCase()}
                            <ArrowUpRight
                              aria-hidden="true"
                              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* --------------------------- Desktop actions --------------------------- */}
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={telHref}
            aria-label={`Call ${site.phone}`}
            onClick={() => trackCta("Phone", "header")}
            className="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-[13.5px] font-medium text-muted transition-colors duration-200 hover:text-foreground"
          >
            <Phone aria-hidden="true" className="h-3.5 w-3.5 text-brand" />
            <span className="hidden xl:inline">{site.phone}</span>
          </a>

          <Link
            href="/solutions#consultation"
            onClick={() => trackCta("Get Free Consultation", "header")}
            className="group inline-flex h-10 items-center gap-2 rounded-lg bg-brand px-5 text-[13.5px] font-semibold text-white transition-all duration-300 ease-premium hover:bg-brand-fierce hover:shadow-brand-glow"
          >
            Get Free Consultation
            <ArrowRight
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-300 ease-premium group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* ---------------------------- Mobile toggle ---------------------------- */}
        <button
          type="button"
          className="ml-auto rounded-lg p-2 text-foreground transition-colors hover:bg-surface lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* ------------------------------ Mobile nav ------------------------------ */}
      {mobileOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="min-h-[calc(100vh-4.5rem)] max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-border bg-background lg:hidden"
        >
          <ul className="px-6 py-4">
            {navLinks.map((link) => {
              const active = isActive(link);
              // 48 services is too many for a phone sheet — the mega menu
              // collapses to its disciplines, which deep-link into the catalog.
              const subLinks =
                link.children ??
                (link.mega
                  ? categories.map((category) => ({
                      href: `/services/#${categoryAnchors[category]}`,
                      label: category,
                    }))
                  : undefined);

              return (
                <li key={link.label} className="border-b border-border/60 last:border-0">
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between py-3.5 text-[15px] font-medium transition-colors",
                      active ? "text-brand" : "text-muted-strong",
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                    <ChevronDown
                      aria-hidden="true"
                      className="h-4 w-4 -rotate-90 text-muted-faint"
                    />
                  </Link>

                  {/* Sub-navigation, indented under its parent */}
                  {subLinks && (
                    <ul className="pb-3 pl-4">
                      {subLinks.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block py-2 text-sm text-muted transition-colors hover:text-foreground"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="space-y-3 px-6 pb-8 pt-2">
            <Link
              href="/solutions#consultation"
              onClick={() => {
                trackCta("Get Free Consultation", "header_mobile");
                setMobileOpen(false);
              }}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand text-sm font-semibold text-white transition-colors hover:bg-brand-fierce"
            >
              Get Free Consultation
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <a
              href={telHref}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border-strong bg-surface text-sm font-semibold text-foreground"
            >
              <Phone aria-hidden="true" className="h-4 w-4 text-brand" />
              {site.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
