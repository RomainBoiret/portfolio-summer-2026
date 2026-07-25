import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { interpolate } from "@/lib/interpolate";
import { siteConfig } from "@/data/site";
import { projects as projectBase } from "@/data/projects";
import type { Project } from "@/types";

export function getLocalizedProjects(locale: Locale): Project[] {
  const dictionary = getDictionary(locale);
  return projectBase.map((project) => ({
    ...project,
    summary: dictionary.projects.summaries[project.slug] ?? "",
    highlights: dictionary.projects.highlights?.[project.slug],
  }));
}

export function getLocalizedSocial(locale: Locale) {
  const dictionary = getDictionary(locale);
  return siteConfig.social.map((item) => ({
    ...item,
    label: dictionary.site.social[item.labelKey],
  }));
}

export function getContactBlurb(locale: Locale) {
  const dictionary = getDictionary(locale);
  return interpolate(dictionary.contact.blurb, {
    location: dictionary.site.location,
  });
}

export function getFooterLine(locale: Locale, year: number, name: string) {
  const dictionary = getDictionary(locale);
  const city = dictionary.site.location.split(",")[0];
  return `© ${year} ${name} · ${interpolate(dictionary.footer.builtWithCare, { city })}`;
}
