import "server-only";

import { cache } from "react";
import type { Locale } from "@/i18n/config";
import type { BlogPost, BlogPostMeta } from "@/lib/blog-types";
import { cmsFetch } from "@/lib/cms/client";
import { CMS_TAGS } from "@/lib/cms/config";
import { enhancePostHtml, estimateReadingMinutes } from "@/lib/cms/html";
import { pickLocale, type WpPostDto } from "@/lib/cms/types";
import { fetchWpSite } from "@/lib/cms/site";

function toMeta(
  dto: WpPostDto,
  locale: Locale,
  seriesMap?: Record<string, { en: string; fr: string }>,
): BlogPostMeta {
  const title = pickLocale(dto.title, locale);
  const description = pickLocale(dto.description, locale);
  const content = pickLocale(dto.content, locale);
  const seriesTitle = dto.series
    ? seriesMap?.[dto.series]?.[locale]
    : undefined;
  return {
    slug: dto.slug,
    title,
    description,
    date: dto.date,
    tags: dto.tags ?? [],
    readingMinutes: estimateReadingMinutes(content),
    ...(dto.series ? { series: dto.series } : {}),
    ...(dto.seriesOrder ? { seriesOrder: dto.seriesOrder } : {}),
    ...(seriesTitle ? { seriesTitle } : {}),
  };
}

function toPost(
  dto: WpPostDto,
  locale: Locale,
  seriesMap?: Record<string, { en: string; fr: string }>,
): BlogPost {
  const meta = toMeta(dto, locale, seriesMap);
  const rawHtml = pickLocale(dto.content, locale);
  const { html, toc } = enhancePostHtml(rawHtml);
  return { ...meta, html, toc };
}

export const fetchWpPosts = cache(async (locale: Locale): Promise<BlogPostMeta[]> => {
  const [posts, site] = await Promise.all([
    cmsFetch<WpPostDto[]>({
      path: `/posts?locale=${locale}`,
      tags: [CMS_TAGS.all, CMS_TAGS.posts],
    }),
    fetchWpSite().catch(() => null),
  ]);
  return posts
    .map((post) => toMeta(post, locale, site?.series))
    .sort((a, b) => b.date.localeCompare(a.date));
});

export const fetchWpPost = cache(
  async (slug: string, locale: Locale): Promise<BlogPost | null> => {
    try {
      const [post, site] = await Promise.all([
        cmsFetch<WpPostDto>({
          path: `/posts/${encodeURIComponent(slug)}?locale=${locale}`,
          tags: [CMS_TAGS.all, CMS_TAGS.posts],
        }),
        fetchWpSite().catch(() => null),
      ]);
      return toPost(post, locale, site?.series);
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "status" in error &&
        (error as { status: number }).status === 404
      ) {
        return null;
      }
      throw error;
    }
  },
);
