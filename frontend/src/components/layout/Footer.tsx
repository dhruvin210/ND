import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Github, Mail } from "lucide-react";
import { site } from "@/lib/site";
import { NewsletterForm } from "@/components/layout/NewsletterForm";

const columns = [
  {
    heading: "Services",
    links: [
      { label: "AI Development", href: "/#services" },
      { label: "AI Agents", href: "/#services" },
      { label: "Enterprise Software", href: "/#services" },
      { label: "Cloud Engineering", href: "/#services" },
      { label: "DevOps", href: "/#services" },
      { label: "Data Engineering", href: "/#services" },
      { label: "RAG Solutions", href: "/#services" },
      { label: "Digital Transformation", href: "/#services" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Enterprise AI Transformation", href: "/#services" },
      { label: "Workflow Automation", href: "/#services" },
      { label: "Enterprise Search", href: "/#services" },
      { label: "Product Engineering", href: "/#services" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { label: "Fintech", href: "/#case-studies" },
      { label: "Healthcare", href: "/#case-studies" },
      { label: "Retail & E-commerce", href: "/#case-studies" },
      { label: "Logistics", href: "/#case-studies" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/#case-studies" },
      { label: "FAQ", href: "/#faq" },
      { label: "Development Process", href: "/#process" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="site-container py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Link href="/" aria-label="NextDynamix home">
              <Image
                src="/logos/NextDynamix-Final-Logo-02.png"
                alt="NextDynamix"
                width={170}
                height={30}
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {site.description}
            </p>
            <ul className="mt-6 flex gap-3" aria-label="Social media">
              {[
                { href: site.social.linkedin, label: "LinkedIn", Icon: Linkedin },
                { href: site.social.twitter, label: "X (Twitter)", Icon: Twitter },
                { href: site.social.github, label: "GitHub", Icon: Github },
                { href: `mailto:${site.email}`, label: "Email", Icon: Mail },
              ].map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex rounded-lg border border-border bg-surface p-2.5 text-muted transition-colors hover:border-brand/60 hover:text-brand"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="text-sm font-semibold text-foreground">
                {col.heading}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-brand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 grid gap-8 border-t border-border pt-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Stay Updated</h2>
            <p className="mt-2 text-sm text-muted">
              Subscribe to our newsletter for AI and engineering insights.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className="hover:text-brand">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-brand">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-brand">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
