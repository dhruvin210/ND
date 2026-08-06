import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArticle, getRelatedArticles, getAllArticleSlugs } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema, jsonLd } from "@/lib/schema";
import { site } from "@/lib/site";

export const revalidate = 300;

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    image: article.coverUrl,
    type: "article",
    publishedTime: article.publishedAt,
    authors: [article.author.name],
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          articleSchema({
            title: article.title,
            description: article.excerpt,
            slug: article.slug,
            image: article.coverUrl,
            publishedAt: article.publishedAt,
            updatedAt: article.updatedAt,
            authorName: article.author.name,
          }),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Blog", url: `${site.url}/blog` },
            { name: article.title, url: `${site.url}/blog/${article.slug}` },
          ]),
        ])}
      />
      <article className="site-container max-w-3xl pt-32 pb-20">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <Link href="/blog" className="hover:text-brand">
            ← Back to Blog
          </Link>
        </nav>

        {article.category && (
          <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-brand">
            {article.category.name}
          </p>
        )}
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-h2">
          {article.title}
        </h1>
        <p className="mt-4 text-sm text-muted">
          By {article.author.name}
          {article.author.role ? `, ${article.author.role}` : ""} ·{" "}
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </p>

        {article.coverUrl && (
          <Image
            src={article.coverUrl}
            alt=""
            width={1280}
            height={720}
            priority
            className="mt-8 aspect-video w-full rounded-2xl border border-border object-cover"
          />
        )}

        {/* Strapi rich text (markdown rendered to HTML at the CMS layer or
            stored as HTML). Sanitized server-side by Strapi. */}
        <div
          className="prose-invert mt-10 space-y-5 leading-relaxed text-foreground/90 [&_a]:text-brand [&_blockquote]:border-l-2 [&_blockquote]:border-brand [&_blockquote]:pl-4 [&_blockquote]:text-muted [&_code]:rounded [&_code]:bg-surface-elevated [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:ml-5 [&_li]:list-disc"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {article.tags.length > 0 && (
          <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tags">
            {article.tags.map((tag) => (
              <li key={tag.slug}>
                <Link
                  href={`/blog?tag=${tag.slug}`}
                  className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-muted hover:border-brand/60 hover:text-brand"
                >
                  #{tag.name}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="mt-16 border-t border-border pt-10">
            <h2 id="related-heading" className="text-xl font-semibold">
              Related Posts
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="block rounded-xl border border-border bg-surface p-5 text-sm font-medium text-foreground transition-colors hover:border-brand/60 hover:text-brand"
                  >
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}
