import { siteConfig } from "@/data/site";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getAllBlogPosts } from "@/lib/blog";
import { buildBlogRss } from "@/lib/rss";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ locale: string }> },
) {
  const { locale: raw } = await context.params;
  if (!isLocale(raw)) {
    return new Response("Not found", { status: 404 });
  }
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);
  const posts = getAllBlogPosts(locale);
  const xml = buildBlogRss({
    locale,
    title: `${dictionary.blog.title} · ${siteConfig.name}`,
    description: dictionary.blog.metaDescription,
    posts,
  });

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
