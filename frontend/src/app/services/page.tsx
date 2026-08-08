import { ContactSection } from "@/components/sections/ContactSection";
import { ServicesCatalogSection } from "@/components/services/ServicesCatalogSection";
import { ServicesFaq } from "@/components/services/ServicesFaq";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesProcess } from "@/components/services/ServicesProcess";
import { ServicesStats } from "@/components/services/ServicesStats";
import { WhyServices } from "@/components/services/WhyServices";
import { servicesFaqs } from "@/data/services-page";
import {
  breadcrumbSchema,
  faqSchemaFrom,
  jsonLd,
  servicesItemListSchema,
  servicesSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

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
        dangerouslySetInnerHTML={jsonLd([
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Services", url: `${site.url}/services` },
          ]),
          servicesItemListSchema(),
          faqSchemaFrom(servicesFaqs),
          ...servicesSchema(),
        ])}
      />

      {/* Positioning → scale → the catalog itself → how we engage → why one
          partner → objections → contact. */}
      <ServicesHero />
      <ServicesStats />
      <ServicesCatalogSection />
      <ServicesProcess />
      <WhyServices />
      <ServicesFaq />
      <ContactSection />
    </>
  );
}
