import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllArticleSlugs, getServices, getSolutions } from "@/lib/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/solutions`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${site.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const pillarServices = await getServices();
  const servicePages: MetadataRoute.Sitemap = pillarServices.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const solutions = await getSolutions();
  const solutionPages: MetadataRoute.Sitemap = solutions.map((s) => ({
    url: `${site.url}/solutions/${s.slug}`,
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

  return [...staticPages, ...solutionPages, ...servicePages, ...articlePages];
}
