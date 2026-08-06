import { Award, ShieldCheck, Lock, BadgeCheck } from "lucide-react";
import { certifications } from "@/data/clients";

const icons = [Award, ShieldCheck, BadgeCheck, Lock];

/** Certifications & partnerships trust bar — AWS, Microsoft, Google,
 *  OpenAI, Anthropic, Clutch, SSL, GDPR. */
export function Certifications() {
  return (
    <section
      aria-labelledby="certifications-heading"
      className="border-y border-border bg-surface/30 py-14"
    >
      <div className="site-container text-center">
        <h2
          id="certifications-heading"
          className="text-xs font-semibold uppercase tracking-[0.25em] text-muted"
        >
          Certifications &amp; Partnerships
        </h2>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {certifications.map((cert, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li
                key={cert.name}
                title={cert.description}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground transition-colors hover:border-brand/50"
              >
                <Icon className="h-4 w-4 text-brand" aria-hidden="true" />
                {cert.name}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
