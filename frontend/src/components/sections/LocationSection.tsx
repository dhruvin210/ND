import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { site } from "@/lib/site";

/** Local presence section — NAP data (Name, Address, Phone) matching the
 *  LocalBusiness JSON-LD schema, plus an embedded map. Design Review #12. */
export function LocationSection() {
  const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;
  const mapsQuery = encodeURIComponent(`${site.name}, ${fullAddress}`);

  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="section-padding"
    >
      <div className="site-container">
        <span className="eyebrow">Where We Work</span>
        <h2 id="location-heading" className="section-heading mt-5">
          Our Local Presence
        </h2>
        <p className="section-subheading">
          Headquartered in {site.address.city} — partnering with clients
          worldwide.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <address className="space-y-5 not-italic">
            {[
              { Icon: MapPin, label: "Address", value: fullAddress },
              { Icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/[^+\d]/g, "")}` },
              { Icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
              { Icon: Clock, label: "Business Hours", value: site.hours },
            ].map(({ Icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5"
              >
                <span className="rounded-xl bg-surface-elevated p-2.5 text-brand">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{label}</p>
                  {href ? (
                    <a href={href} className="mt-0.5 block text-sm text-muted hover:text-brand">
                      {value}
                    </a>
                  ) : (
                    <p className="mt-0.5 text-sm text-muted">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </address>

          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe
              title={`Map showing the ${site.name} office location`}
              src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
              width="100%"
              height="100%"
              className="min-h-[320px] w-full grayscale-[40%] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
