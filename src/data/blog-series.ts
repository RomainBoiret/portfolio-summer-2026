import type { Locale } from "@/i18n/config";

/** Display titles for blog series. Add an entry when you start a new series. */
export const blogSeries = {
  "portfolio-notes": {
    en: "Shipping this site",
    fr: "Livrer ce site",
  },
} as const;

export type BlogSeriesId = keyof typeof blogSeries;

export function isBlogSeriesId(value: string): value is BlogSeriesId {
  return value in blogSeries;
}

export function getSeriesTitle(seriesId: string, locale: Locale): string {
  if (isBlogSeriesId(seriesId)) {
    return blogSeries[seriesId][locale];
  }
  return seriesId
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
