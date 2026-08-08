import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { solutions } from "@/data/solutions";
import { site } from "@/lib/site";

const columns = [
  {
    heading: "Services",
    links: [
      { label: "AI Strategy Consulting", href: "/services/ai-strategy-consulting" },
      { label: "AI Development", href: "/services/ai-development" },
      { label: "AI Integration", href: "/services/ai-integration" },
      { label: "Cloud Services", href: "/services" },
      { label: "Web Development", href: "/services" },
      { label: "Cyber Security", href: "/services" },
      { label: "All Services", href: "/services" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      ...solutions.map((s) => ({
        label: s.title,
        href: `/solutions/${s.slug}`,
      })),
      { label: "All Solutions", href: "/solutions" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/#why-us" },
      { label: "Case Studies", href: "/#case-studies" },
      { label: "Our Process", href: "/#process" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contact", href: "/solutions#consultation" },
    ],
  },
];

const socials = [
  { href: site.social.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: site.social.twitter, label: "X (Twitter)", Icon: Twitter },
  { href: site.social.github, label: "GitHub", Icon: Github },
];

export function Footer() {
  const telHref = `tel:${site.phone.replace(/[^+\d]/g, "")}`;
  const { street, city, region, postalCode } = site.address;

  return (
    <footer className="border-t border-border bg-background">
      <div className="site-container-wide py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))] lg:gap-10 xl:gap-16">
          {/* ------------------------- Brand + contact ------------------------- */}
          <div>
            <Link
              href="/"
              aria-label="NextDynamix home"
              className="inline-block transition-opacity duration-200 hover:opacity-80"
            >
              <Image
                src="/logos/NextDynamix-Final-Logo-02.png"
                alt="NextDynamix"
                width={170}
                height={30}
              />
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              {site.description}
            </p>

            <address className="mt-8 space-y-3.5 text-sm not-italic">
              <div className="flex items-start gap-3">
                <Mail
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                />
                <a
                  href={`mailto:${site.email}`}
                  className="text-muted transition-colors hover:text-brand"
                >
                  {site.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                />
                <a
                  href={telHref}
                  className="text-muted transition-colors hover:text-brand"
                >
                  {site.phone}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                />
                <span className="text-muted">
                  {street}
                  <br />
                  {city}, {region} {postalCode}
                </span>
              </div>
            </address>

            <ul className="mt-8 flex gap-2.5" aria-label="Social media">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex rounded-xl border border-border bg-surface p-2.5 text-muted transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:border-brand/50 hover:bg-surface-elevated hover:text-brand"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ------------------------------ Columns ---------------------------- */}
          {/* Two columns on mobile keeps the footer from becoming a long stack. */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-3 lg:gap-10 xl:gap-16">
            {columns.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <h2 className="text-[11px] font-semibold uppercase tracking-eyebrow text-muted-faint">
                  {col.heading}
                </h2>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={`${col.heading}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors duration-200 hover:text-brand"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* ------------------------------- Legal ------------------------------- */}
        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 text-sm text-muted-faint md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            <li>
              <Link href="/privacy" className="transition-colors hover:text-brand">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors hover:text-brand">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="transition-colors hover:text-brand">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
