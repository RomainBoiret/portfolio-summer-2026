import "server-only";

import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import type { Locale } from "@/i18n/config";
import type { BlogPost, BlogPostMeta } from "@/lib/blog-types";

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
      html: compiled.html,
    };
  },
);
