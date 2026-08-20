import { site } from "@/lib/site";
import { faqs } from "@/data/faqs";
import { reviewSummary } from "@/data/testimonials";

/** JSON-LD builders — Organization, LocalBusiness, WebSite, FAQPage, Service,
 *  Article, BreadcrumbList. Validated against schema.org / Google Rich Results. */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/logos/NextDynamix-Final-Logo-01.png`,
    description: site.description,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    sameAs: Object.values(site.social),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: reviewSummary.rating,
      reviewCount: reviewSummary.count,
      bestRating: 5,
    },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#localbusiness`,
    name: site.name,
    image: `${site.url}/logos/NextDynamix-Final-Logo-01.png`,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": `${site.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function faqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** FAQPage built from an arbitrary FAQ list — used by /solutions. */
export function faqSchemaFrom(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Service entities for the six AI solutions, linked to their detail pages. */
export function solutionsSchema(
  items: { slug: string; title: string; description: string }[],
) {
  return items.map((solution) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.title,
    description: solution.description,
    url: `${site.url}/solutions/${solution.slug}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: "Worldwide",
    serviceType: solution.title,
    category: "Artificial Intelligence",
  }));
}

/** ItemList so the solutions grid is understood as a collection. */
export function solutionsItemListSchema(
  items: { slug: string; title: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "NextDynamix AI Solutions",
    itemListElement: items.map((solution, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: solution.title,
      url: `${site.url}/solutions/${solution.slug}`,
    })),
  };
}

/** Service + ItemList schema for the CMS-driven /services page. Takes
 *  already-fetched pillar services rather than fetching again, so callers
 *  should pass the result of `getServices()`. */
export function pillarServicesSchema(
  pillarServices: { title: string; shortDescription: string; slug: string }[],
) {
  return pillarServices.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    url: `${site.url}/services/${service.slug}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: "Worldwide",
    serviceType: service.title,
  }));
}

/** ItemList so the /services catalog is understood as a single collection. */
export function pillarServicesItemListSchema(
  pillarServices: { title: string; slug: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "NextDynamix Services",
    numberOfItems: pillarServices.length,
    itemListElement: pillarServices.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: service.title,
      url: `${site.url}/services/${service.slug}`,
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleSchema(article: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  publishedAt: string;
  updatedAt?: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.image ?? `${site.url}/icons/ms-icon-310x310.png`,
    url: `${site.url}/blog/${article.slug}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { "@type": "Person", name: article.authorName },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: `${site.url}/blog/${article.slug}`,
  };
}

/** Renders schema objects as a script tag string-safe payload. */
export function jsonLd(data: object | object[]) {
  return { __html: JSON.stringify(data) };
}
