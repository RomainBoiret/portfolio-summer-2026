import "server-only";

import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import type { Locale } from "@/i18n/config";
import type { BlogPost, BlogPostMeta } from "@/lib/blog-types";
import { pickRelatedPosts } from "@/lib/blog-related";

const GENERATED_DIR = path.join(process.cwd(), "generated", "blog");

function readJson<T>(filePath: string): T | null {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function localeIndex(locale: Locale): BlogPostMeta[] {
  return (
    readJson<BlogPostMeta[]>(path.join(GENERATED_DIR, locale, "_index.json")) ??
    []
  );
}

/** All published post metas - from precompiled JSON (no markdown parse). */
export function getAllBlogPosts(locale: Locale): BlogPostMeta[] {
  return localeIndex(locale);
}

export function getLatestBlogPosts(
  locale: Locale,
  limit: number,
): BlogPostMeta[] {
  return getAllBlogPosts(locale).slice(0, limit);
}

export function getBlogSlugs(locale: Locale): string[] {
  return getAllBlogPosts(locale).map((post) => post.slug);
}

type CompiledPost = BlogPost & { locale: string };

/** Full post including HTML - cached per request/build. */
export const getBlogPost = cache(
  (slug: string, locale: Locale): BlogPost | null => {
    const compiled = readJson<CompiledPost>(
      path.join(GENERATED_DIR, locale, `${slug}.json`),
    );
    if (!compiled) return null;
    return {
      slug: compiled.slug,
      title: compiled.title,
      description: compiled.description,
      date: compiled.date,
      tags: compiled.tags,
      readingMinutes: compiled.readingMinutes,
      ...(compiled.series ? { series: compiled.series } : {}),
      ...(compiled.seriesOrder ? { seriesOrder: compiled.seriesOrder } : {}),
      html: compiled.html,
      toc: Array.isArray(compiled.toc) ? compiled.toc : [],
    };
  },
);

/** Related posts by shared series, then tags, then latest. */
export function getRelatedBlogPosts(
  slug: string,
  locale: Locale,
  limit = 3,
): BlogPostMeta[] {
  const current = getBlogPost(slug, locale);
  if (!current) return [];
  return pickRelatedPosts(current, getAllBlogPosts(locale), limit);
}

/** All posts in a series, ordered by seriesOrder then date. */
export function getSeriesPosts(
  seriesId: string,
  locale: Locale,
): BlogPostMeta[] {
  return getAllBlogPosts(locale)
    .filter((post) => post.series === seriesId)
    .sort((a, b) => {
      const ao = a.seriesOrder ?? Number.MAX_SAFE_INTEGER;
      const bo = b.seriesOrder ?? Number.MAX_SAFE_INTEGER;
      if (ao !== bo) return ao - bo;
      return a.date.localeCompare(b.date);
    });
}
