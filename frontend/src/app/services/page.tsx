import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { site } from "@/lib/site";
import { categories, getServicesByCategory } from "@/data/services";

export const metadata = buildMetadata({
  title: "Services — Cyber Security, AI, Cloud, Development & More",
  description:
    "Explore NextDynamix's full range of services across Cyber Security, Generative AI, Cloud, Web & App Development, CMS, Digital Marketing, and Design.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Services", url: `${site.url}/services` },
          ]),
        )}
      />
      <div className="site-container pt-32 pb-20">
        <span className="eyebrow">Our Digital Solutions</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-h1">
          Every Service, One Team
        </h1>
        <p className="section-subheading">
          From cybersecurity to AI, cloud, development, and design — explore
          the full NextDynamix service catalog.
        </p>

        <div className="mt-14 space-y-14">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="text-xl font-bold text-brand">{category}</h2>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {getServicesByCategory(category).map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}/`}
                      className="block rounded-xl border border-border bg-surface px-5 py-4 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-brand/60 hover:text-brand"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}