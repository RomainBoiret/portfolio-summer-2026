import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog/blog-article";
import { BlogPostingData } from "@/components/structured-data";
import { siteConfig } from "@/data/site";
import {
  getBlogPost,
  getBlogSlugs,
  getRelatedBlogPosts,
  getSeriesPosts,
} from "@/lib/blog";
import { getContentDictionary } from "@/i18n/content";
import { isLocale, locales, type Locale } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of locales) {
    const slugs = await getBlogSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const post = await getBlogPost(slug, locale);
  if (!post) return {};

  const languages: Record<string, string> = { "x-default": `/en/blog/${slug}` };
  for (const l of locales) {
    if (await getBlogPost(slug, l)) {
      languages[l] = `/${l}/blog/${slug}`;
    }
  }

  return {
    title: {
      absolute: `${post.title} · ${siteConfig.name}`,
    },
    description: post.description,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages,
    },
    openGraph: {
      type: "article",
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      alternateLocale: locale === "fr" ? ["en_CA"] : ["fr_CA"],
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/${locale}/blog/${slug}`,
      publishedTime: post.date,
      tags: post.tags,
      siteName: siteConfig.name,
      authors: [siteConfig.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const post = await getBlogPost(slug, locale);
  if (!post) notFound();

  const dictionary = await getContentDictionary(locale);
  const related = await getRelatedBlogPosts(slug, locale, 3);
  const seriesPosts = post.series
    ? await getSeriesPosts(post.series, locale)
    : [];

  return (
    <>
      <BlogPostingData locale={locale} post={post} />
      <BlogArticle
        locale={locale}
        post={post}
        related={related}
        seriesPosts={seriesPosts}
        copy={{
          backToBlog: dictionary.blog.backToBlog,
          readingTime: dictionary.blog.readingTime,
          keepReading: dictionary.blog.keepReading,
          onThisPage: dictionary.blog.onThisPage,
          relatedPosts: dictionary.blog.relatedPosts,
          copyCode: dictionary.blog.copyCode,
          copiedCode: dictionary.blog.copiedCode,
          seriesLabel: dictionary.blog.seriesLabel,
          seriesProgress: dictionary.blog.seriesProgress,
          seriesPrevious: dictionary.blog.seriesPrevious,
          seriesNext: dictionary.blog.seriesNext,
        }}
      />
    </>
  );
}
