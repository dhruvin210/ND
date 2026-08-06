import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { getArticles } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Blog — AI & Engineering Insights",
  description:
    "Insights on AI agents, generative AI, cloud engineering, and digital transformation from the NextDynamix team.",
  path: "/blog",
});

export const revalidate = 300;

interface BlogPageProps {
  searchParams: Promise<{ q?: string; category?: string; tag?: string; page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const { articles, totalPages } = await getArticles({
    page,
    search: params.q,
    category: params.category,
    tag: params.tag,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Blog", url: `${site.url}/blog` },
          ]),
        )}
      />
      <div className="site-container pt-32 pb-20">
        <span className="eyebrow">Insights</span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-h1">
          AI &amp; Engineering Insights
        </h1>
        <p className="section-subheading">
          Practical thinking on AI agents, platforms, and digital
          transformation.
        </p>

        <form action="/blog" method="get" role="search" className="mt-8 max-w-md">
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              id="blog-search"
              type="search"
              name="q"
              defaultValue={params.q}
              placeholder="Search articles…"
              className="h-11 w-full rounded-lg border border-border bg-surface pl-11 pr-4 text-sm text-foreground placeholder:text-muted/70 focus:border-brand focus:outline-none"
            />
          </div>
        </form>

        {articles.length === 0 ? (
          <p className="mt-16 rounded-2xl border border-border bg-surface p-10 text-center text-muted">
            {params.q
              ? `No articles match “${params.q}”. Try a different search.`
              : "Articles are coming soon. Connect the Strapi CMS and publish your first post to see it here."}
          </p>
        ) : (
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <li key={article.slug}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:-translate-y-1 hover:border-brand/60">
                  {article.coverUrl && (
                    <Image
                      src={article.coverUrl}
                      alt=""
                      width={640}
                      height={360}
                      className="aspect-video w-full object-cover"
                    />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    {article.category && (
                      <Link
                        href={`/blog?category=${article.category.slug}`}
                        className="text-xs font-semibold uppercase tracking-wider text-brand hover:underline"
                      >
                        {article.category.name}
                      </Link>
                    )}
                    <h2 className="mt-2 text-lg font-semibold text-foreground group-hover:text-brand">
                      <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {article.excerpt}
                    </p>
                    <p className="mt-4 text-xs text-muted">
                      {article.author.name} ·{" "}
                      <time dateTime={article.publishedAt}>
                        {new Date(article.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}

        {totalPages > 1 && (
          <nav aria-label="Blog pagination" className="mt-12 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/blog?page=${p}${params.q ? `&q=${params.q}` : ""}`}
                aria-current={p === page ? "page" : undefined}
                className={
                  p === page
                    ? "rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white"
                    : "rounded-lg border border-border bg-surface px-4 py-2 text-sm text-muted hover:border-brand/60"
                }
              >
                {p}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </>
  );
}
