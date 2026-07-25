import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { locales } from "@/i18n/config";
import { getAllBlogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const homeEntries = locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteConfig.url}/${l}`]),
      ),
    },
  }));

  const blogIndexEntries = locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}/blog`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${siteConfig.url}/${l}/blog`]),
      ),
    },
  }));

  const postEntries = locales.flatMap((locale) =>
    getAllBlogPosts(locale).map((post) => ({
      url: `${siteConfig.url}/${locale}/blog/${post.slug}`,
      lastModified: new Date(`${post.date}T12:00:00`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [
            l,
            `${siteConfig.url}/${l}/blog/${post.slug}`,
          ]),
        ),
      },
    })),
  );

  return [...homeEntries, ...blogIndexEntries, ...postEntries];
}
