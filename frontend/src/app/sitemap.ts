import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/data/services";
import { getAllArticleSlugs } from "@/lib/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${site.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const articles = await getAllArticleSlugs();
  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${site.url}/blog/${a.slug}`,
    lastModified: a.updatedAt ? new Date(a.updatedAt) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...articlePages];
}
