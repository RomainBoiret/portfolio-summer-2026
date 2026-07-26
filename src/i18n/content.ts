import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { interpolate } from "@/lib/interpolate";
import { siteConfig } from "@/data/site";
import { projects as projectBase } from "@/data/projects";
import { club, education, skills } from "@/data/about";
import type { Project } from "@/types";
import { isCmsEnabled } from "@/lib/cms/config";

/** Dictionary with CMS editorial overlay when WP_URL is set. */
export async function getContentDictionary(
  locale: Locale,
): Promise<Dictionary> {
  const base = getDictionary(locale);
  if (!isCmsEnabled()) return base;
  const { fetchWpSite, mergeEditorial } = await import("@/lib/cms/site");
  const site = await fetchWpSite();
  return mergeEditorial(base, site, locale);
}

export async function getLocalizedProjects(
  locale: Locale,
): Promise<Project[]> {
  if (isCmsEnabled()) {
    const { fetchWpProjects } = await import("@/lib/cms/projects");
    return fetchWpProjects(locale);
  }

  const dictionary = getDictionary(locale);
  return projectBase.map((project) => ({
    ...project,
    summary: dictionary.projects.summaries[project.slug] ?? "",
    highlights: dictionary.projects.highlights?.[project.slug],
  }));
}

export async function getSiteIdentity(locale: Locale) {
  if (isCmsEnabled()) {
    const { fetchWpSite } = await import("@/lib/cms/site");
    const site = await fetchWpSite();
    const dictionary = await getContentDictionary(locale);
    return {
      name: site.identity.name,
      email: site.identity.email,
      url: site.identity.url,
      social: site.identity.social.map((item) => ({
        ...item,
        label: dictionary.site.social[item.labelKey],
      })),
    };
  }

  const dictionary = getDictionary(locale);
  return {
    name: siteConfig.name,
    email: siteConfig.email,
    url: siteConfig.url,
    social: siteConfig.social.map((item) => ({
      ...item,
      label: dictionary.site.social[item.labelKey],
    })),
  };
}

export async function getAboutContent() {
  if (isCmsEnabled()) {
    const { fetchWpSite } = await import("@/lib/cms/site");
    const site = await fetchWpSite();
    return site.about;
  }
  return { education, club, skills };
}

export async function getLocalizedSocial(locale: Locale) {
  const identity = await getSiteIdentity(locale);
  return identity.social;
}

export async function getContactBlurb(locale: Locale) {
  const dictionary = await getContentDictionary(locale);
  return interpolate(dictionary.contact.blurb, {
    location: dictionary.site.location,
  });
}

export async function getFooterLine(
  locale: Locale,
  year: number,
  name: string,
) {
  const dictionary = await getContentDictionary(locale);
  const city = dictionary.site.location.split(",")[0];
  return `© ${year} ${name} · ${interpolate(dictionary.footer.builtWithCare, { city })}`;
}
