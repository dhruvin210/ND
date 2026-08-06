import Image from "next/image";
import { Star } from "lucide-react";
import { clients } from "@/data/clients";
import { reviewSummary } from "@/data/testimonials";

/** Client trust bar — grayscale logos that gain colour on hover
 *  (Design Review 5b). Falls back to styled wordmarks until real
 *  logo files are added to /public/images/clients. */
export function TrustedBy() {
  return (
    <section aria-labelledby="trusted-heading" className="border-y border-border bg-surface/30 py-12">
      <div className="site-container">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <h2
              id="trusted-heading"
              className="text-xs font-semibold uppercase tracking-[0.25em] text-muted"
            >
              Trusted by innovative companies
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs text-foreground">
              <Star className="h-3.5 w-3.5 fill-brand text-brand" aria-hidden="true" />
              {reviewSummary.rating}★ rated · {reviewSummary.count} reviews
            </span>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {clients.map((client) => (
              <li key={client.name}>
                {client.logo ? (
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={120}
                    height={32}
                    className="logo-hover h-8 w-auto"
                  />
                ) : (
                  <span className="logo-hover cursor-default text-sm font-bold uppercase tracking-widest text-foreground">
                    {client.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
