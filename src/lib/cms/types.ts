import type { Locale } from "@/i18n/config";
import type { ProjectCategory } from "@/types";

/** REST payloads from the portfolio-cms WordPress plugin. */

export type WpLocaleFields<T> = {
  en: T;
  fr: T;
};

export type WpPostDto = {
  slug: string;
  date: string;
  tags: string[];
  series?: string;
  seriesOrder?: number;
  title: WpLocaleFields<string>;
  description: WpLocaleFields<string>;
  content: WpLocaleFields<string>;
};

export type WpProjectDto = {
  slug: string;
  title: string;
  year: string;
  category: ProjectCategory;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  accentColor: string;
  summary: WpLocaleFields<string>;
  highlights: WpLocaleFields<string[]>;
};

export type WpSiteDto = {
  identity: {
    name: string;
    email: string;
    url: string;
    social: Array<{
      labelKey: "email" | "github" | "linkedin" | "instagram";
      href: string;
      icon: "email" | "github" | "linkedin" | "instagram";
    }>;
  };
  about: {
    education: Array<{ id: string; school: string; startDate: string }>;
    club: { name: string; url: string };
    skills: string[];
  };
  series: Record<string, WpLocaleFields<string>>;
  /** Editorial copy keyed by locale — overlay on the static dictionary. */
  editorial: {
    en: WpEditorial;
    fr: WpEditorial;
  };
};

export type WpEditorial = {
  meta: {
    role: string;
    description: string;
    keywords: string[];
  };
  site: {
    tagline: string;
    roleLine: string;
    location: string;
  };
  about: {
    title: string;
    headline: string;
    paragraphs: [string, string];
    focusTitle: string;
    focus: string[];
    education: string;
    involvement: string;
    clubRole: string;
    clubBlurb: string;
    skills: string;
    degree: string;
    present: string;
  };
  projects: {
    title: string;
    selectedWork: string;
    moreWork: string;
    githubStats: {
      label: string;
      blurb: string;
    };
  };
  contact: {
    title: string;
    blurb: string;
  };
  footer: {
    availability: string;
    builtWithCare: string;
  };
  blog: {
    title: string;
    blurb: string;
    homeTeaser: string;
    metaDescription: string;
    empty: string;
  };
};

export function pickLocale<T>(fields: WpLocaleFields<T>, locale: Locale): T {
  return fields[locale];
}
