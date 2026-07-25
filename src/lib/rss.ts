import { siteConfig } from "@/data/site";
import type { Locale } from "@/i18n/config";
import type { BlogPostMeta } from "@/lib/blog-types";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function buildBlogRss({
  locale,
  title,
  description,
  posts,
}: {
  locale: Locale;
  title: string;
  description: string;
  posts: BlogPostMeta[];
}) {
  const feedUrl = `${siteConfig.url}/${locale}/feed.xml`;
  const blogUrl = `${siteConfig.url}/${locale}/blog`;
  const items = posts
    .map((post) => {
      const link = `${siteConfig.url}/${locale}/blog/${post.slug}`;
      const pubDate = new Date(`${post.date}T12:00:00Z`).toUTCString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${blogUrl}</link>
    <description>${escapeXml(description)}</description>
    <language>${locale === "fr" ? "fr-ca" : "en-ca"}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}
