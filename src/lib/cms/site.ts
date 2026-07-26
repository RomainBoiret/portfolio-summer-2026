import "server-only";

import { cache } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { cmsFetch } from "@/lib/cms/client";
import { CMS_TAGS } from "@/lib/cms/config";
import type { WpSiteDto } from "@/lib/cms/types";

export const fetchWpSite = cache(async (): Promise<WpSiteDto> => {
  return cmsFetch<WpSiteDto>({
    path: "/site",
    tags: [CMS_TAGS.all, CMS_TAGS.site],
  });
});

export function mergeEditorial(
  base: Dictionary,
  site: WpSiteDto,
  locale: Locale,
): Dictionary {
  const editorial = site.editorial[locale];
  return {
    ...base,
    meta: {
      ...base.meta,
      ...editorial.meta,
    },
    site: {
      ...base.site,
      tagline: editorial.site.tagline,
      roleLine: editorial.site.roleLine,
      location: editorial.site.location,
    },
    about: {
      ...base.about,
      ...editorial.about,
    },
    projects: {
      ...base.projects,
      title: editorial.projects.title,
      selectedWork: editorial.projects.selectedWork,
      moreWork: editorial.projects.moreWork,
      githubStats: {
        ...base.projects.githubStats,
        label: editorial.projects.githubStats.label,
        blurb: editorial.projects.githubStats.blurb,
      },
    },
    contact: {
      ...base.contact,
      title: editorial.contact.title,
      blurb: editorial.contact.blurb,
    },
    footer: {
      ...base.footer,
      ...editorial.footer,
    },
    blog: {
      ...base.blog,
      title: editorial.blog.title,
      blurb: editorial.blog.blurb,
      homeTeaser: editorial.blog.homeTeaser,
      metaDescription: editorial.blog.metaDescription,
      empty: editorial.blog.empty,
    },
  };
}
