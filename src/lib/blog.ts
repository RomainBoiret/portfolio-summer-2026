import "server-only";

import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import type { Locale } from "@/i18n/config";
import type { BlogPost, BlogPostMeta } from "@/lib/blog-types";
import { pickRelatedPosts } from "@/lib/blog-related";
import { getSeriesTitle } from "@/data/blog-series";
import { isCmsEnabled } from "@/lib/cms/config";
import { fetchWpPost, fetchWpPosts } from "@/lib/cms/posts";

const GENERATED_DIR = path.join(process.cwd(), "generated", "blog");

function readJson<T>(filePath: string): T | null {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function enrichMeta(meta: BlogPostMeta, locale: Locale): BlogPostMeta {
  if (!meta.series || meta.seriesTitle) return meta;
  return { ...meta, seriesTitle: getSeriesTitle(meta.series, locale) };
}

function localeIndex(locale: Locale): BlogPostMeta[] {
  const posts =
    readJson<BlogPostMeta[]>(path.join(GENERATED_DIR, locale, "_index.json")) ??
    [];
  return posts.map((post) => enrichMeta(post, locale));
}

type CompiledPost = BlogPost & { locale: string };

function readLocalPost(slug: string, locale: Locale): BlogPost | null {
  const compiled = readJson<CompiledPost>(
    path.join(GENERATED_DIR, locale, `${slug}.json`),
  );
  if (!compiled) return null;
  const meta = enrichMeta(
    {
      slug: compiled.slug,
      title: compiled.title,
      description: compiled.description,
      date: compiled.date,
      tags: compiled.tags,
      readingMinutes: compiled.readingMinutes,
      ...(compiled.series ? { series: compiled.series } : {}),
      ...(compiled.seriesOrder ? { seriesOrder: compiled.seriesOrder } : {}),
    },
    locale,
  );
  return {
    ...meta,
    html: compiled.html,
    toc: Array.isArray(compiled.toc) ? compiled.toc : [],
  };
}

/** All published post metas — WordPress when WP_URL is set, else local JSON. */
export async function getAllBlogPosts(locale: Locale): Promise<BlogPostMeta[]> {
  if (isCmsEnabled()) return fetchWpPosts(locale);
  return localeIndex(locale);
}

export async function getLatestBlogPosts(
  locale: Locale,
  limit: number,
): Promise<BlogPostMeta[]> {
  const posts = await getAllBlogPosts(locale);
  return posts.slice(0, limit);
}

export async function getBlogSlugs(locale: Locale): Promise<string[]> {
  const posts = await getAllBlogPosts(locale);
  return posts.map((post) => post.slug);
}

/** Full post including HTML — cached per request/build. */
export const getBlogPost = cache(
  async (slug: string, locale: Locale): Promise<BlogPost | null> => {
    if (isCmsEnabled()) return fetchWpPost(slug, locale);
    return readLocalPost(slug, locale);
  },
);

/** Related posts by shared series, then tags, then latest. */
export async function getRelatedBlogPosts(
  slug: string,
  locale: Locale,
  limit = 3,
): Promise<BlogPostMeta[]> {
  const current = await getBlogPost(slug, locale);
  if (!current) return [];
  const all = await getAllBlogPosts(locale);
  return pickRelatedPosts(current, all, limit);
}

/** All posts in a series, ordered by seriesOrder then date. */
export async function getSeriesPosts(
  seriesId: string,
  locale: Locale,
): Promise<BlogPostMeta[]> {
  const posts = await getAllBlogPosts(locale);
  return posts
    .filter((post) => post.series === seriesId)
    .sort((a, b) => {
      const ao = a.seriesOrder ?? Number.MAX_SAFE_INTEGER;
      const bo = b.seriesOrder ?? Number.MAX_SAFE_INTEGER;
      if (ao !== bo) return ao - bo;
      return a.date.localeCompare(b.date);
    });
}
