import type { Locale } from "@/i18n/config";

export function formatBlogDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

const blogCardTones = [
  "#1a2744",
  "#7a1f3d",
  "#0e6b6d",
  "#c45c26",
  "#2a1f4d",
  "#1f4d3a",
  "#163a5f",
  "#8a2e1f",
] as const;

export function toneForBlogSlug(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash + slug.charCodeAt(i) * (i + 1)) % blogCardTones.length;
  }
  return blogCardTones[hash];
}
