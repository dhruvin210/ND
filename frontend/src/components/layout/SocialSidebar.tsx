import { Linkedin, Twitter, Facebook } from "lucide-react";
import { site } from "@/lib/site";

const links = [
  { href: site.social.linkedin, label: "NextDynamix on LinkedIn", Icon: Linkedin },
  { href: site.social.twitter, label: "NextDynamix on X (Twitter)", Icon: Twitter },
  { href: site.social.facebook, label: "NextDynamix on Facebook", Icon: Facebook },
];

/** Fixed left social rail — desktop only, per the homepage design.
 *  Shown from 2xl rather than xl: the 1440px page container leaves too little
 *  side gutter below that width and the rail would overlap body copy. */
export function SocialSidebar() {
  return (
    <aside
      aria-label="Social media links"
      className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 2xl:flex"
    >
      {links.map(({ href, label, Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="rounded-lg border border-border bg-surface p-2.5 text-muted transition-all hover:border-brand/60 hover:text-brand"
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </a>
      ))}
    </aside>
  );
}
