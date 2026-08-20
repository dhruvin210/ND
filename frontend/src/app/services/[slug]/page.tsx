import { notFound } from "next/navigation";
import { ContactSection } from "@/components/sections/ContactSection";
import { PillarServiceDetail } from "@/components/services/PillarServiceDetail";
import {
  getAllPillarServiceSlugs,
  getServiceBySlug,
} from "@/lib/cms";
import { breadcrumbSchema, faqSchemaFrom, jsonLd } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const slugs = await getAllPillarServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};

  return buildMetadata({
    title: `${service.title} — NextDynamix`,
    description: service.shortDescription,
    path: `/services/${service.slug}`,
  });
}

/** Every /services/[slug] page is CMS-driven — content comes straight from
 *  the `Service` collection in Strapi. A slug with no matching, published
 *  entry 404s. */
export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;

  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Services", url: `${site.url}/services` },
            { name: service.title, url: `${site.url}/services/${service.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.shortDescription,
            url: `${site.url}/services/${service.slug}`,
            provider: { "@id": `${site.url}/#organization` },
            areaServed: "Worldwide",
            serviceType: service.title,
            category: service.category,
          },
          ...(service.faqs.length ? [faqSchemaFrom(service.faqs)] : []),
        ])}
      />
      <PillarServiceDetail service={service} />
      <ContactSection />
    </>
  );
}
