import type { Dictionary } from "@/i18n/dictionaries/en";
import type { Locale } from "@/i18n/config";
import type { ProjectCategory } from "@/types";

/** Slim copy shipped to client chrome (header / toggles). */
export type ChromeCopy = {
  locale: Locale;
  nav: Dictionary["site"]["nav"];
  ui: Pick<
    Dictionary["ui"],
    | "sayHi"
    | "emailMe"
    | "navigate"
    | "openNav"
    | "closeNav"
    | "navMenu"
    | "goTo"
    | "primaryNav"
    | "sectionProgress"
    | "mobileNav"
    | "switchToLight"
    | "switchToDark"
    | "switchLocale"
    | "rss"
  > & {
    command: Dictionary["ui"]["command"];
  };
  socialGithub: string;
  contactForm: ContactFormCopy;
};

export type ContactFormCopy = Dictionary["contact"]["form"];

export type ProjectsCopy = {
  title: string;
  filterLabel: string;
  selectedWork: string;
  moreWork: string;
  carouselPrev: string;
  carouselNext: string;
  github: string;
  liveSite: string;
  githubAria: string;
  liveAria: string;
  githubStats: Dictionary["projects"]["githubStats"];
  categories: Record<ProjectCategory | "All", string>;
};

export function getChromeCopy(
  locale: Locale,
  dictionary: Dictionary,
): ChromeCopy {
  return {
    locale,
    nav: dictionary.site.nav,
    ui: {
      sayHi: dictionary.ui.sayHi,
      emailMe: dictionary.ui.emailMe,
      navigate: dictionary.ui.navigate,
      openNav: dictionary.ui.openNav,
      closeNav: dictionary.ui.closeNav,
      navMenu: dictionary.ui.navMenu,
      goTo: dictionary.ui.goTo,
      primaryNav: dictionary.ui.primaryNav,
      sectionProgress: dictionary.ui.sectionProgress,
      mobileNav: dictionary.ui.mobileNav,
      switchToLight: dictionary.ui.switchToLight,
      switchToDark: dictionary.ui.switchToDark,
      switchLocale: dictionary.ui.switchLocale,
      rss: dictionary.ui.rss,
      command: dictionary.ui.command,
    },
    socialGithub: dictionary.site.social.github,
    contactForm: dictionary.contact.form,
  };
}

export function getProjectsCopy(dictionary: Dictionary): ProjectsCopy {
  return {
    title: dictionary.projects.title,
    filterLabel: dictionary.projects.filterLabel,
    selectedWork: dictionary.projects.selectedWork,
    moreWork: dictionary.projects.moreWork,
    carouselPrev: dictionary.projects.carouselPrev,
    carouselNext: dictionary.projects.carouselNext,
    github: dictionary.projects.github,
    liveSite: dictionary.projects.liveSite,
    githubAria: dictionary.projects.githubAria,
    liveAria: dictionary.projects.liveAria,
    githubStats: dictionary.projects.githubStats,
    categories: dictionary.projects.categories,
  };
}
