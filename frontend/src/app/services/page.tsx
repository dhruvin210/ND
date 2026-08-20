import { ContactSection } from "@/components/sections/ContactSection";
import { ServicesFaq } from "@/components/services/ServicesFaq";
import { ServicesHero } from "@/components/services/ServicesHero";
import { PillarServicesShowcase } from "@/components/services/PillarServicesShowcase";
import { ServicesProcess } from "@/components/services/ServicesProcess";
import { ServicesStats } from "@/components/services/ServicesStats";
import { WhyServices } from "@/components/services/WhyServices";
import { getServices } from "@/lib/cms";
import {
  breadcrumbSchema,
  jsonLd,
  pillarServicesItemListSchema,
  pillarServicesSchema,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Services — Generative AI, Cloud, Enterprise Software & More",
  description:
    "Explore NextDynamix's solution areas across Generative AI, Cloud Consulting, Enterprise Software, Mobile, Digital Marketing, and more — every page CMS-managed.",
  path: "/services",
});

export default async function ServicesPage() {
  const pillarServices = await getServices();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Services", url: `${site.url}/services` },
          ]),
          pillarServicesItemListSchema(pillarServices),
          ...pillarServicesSchema(pillarServices),
        ])}
      />

      {/* Positioning → scale → the solution areas → how we engage → why one
          partner → objections → contact. Every section below the hero is
          CMS-driven — nothing here is a hardcoded catalog anymore. */}
      <ServicesHero />
      <ServicesStats />
      <PillarServicesShowcase />
      <ServicesProcess />
      <WhyServices />
      <ServicesFaq />
      <ContactSection />
    </>
  );
}
