import type { Metadata } from "next";
import { site } from "@/lib/site";

interface PageSeo {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
}

/** Builds consistent, complete metadata: canonical, OpenGraph, Twitter cards. */
export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  authors,
}: PageSeo): Metadata {
  const url = `${site.url}${path}`;
  const ogImage = image ?? `${site.url}/opengraph-image.png`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(type === "article" && { publishedTime, authors }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      site: "@nextdynamix",
    },
  };
}
