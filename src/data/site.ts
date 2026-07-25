import type { SocialLink } from "@/types";

/** Shared, locale-agnostic site constants. */
export const siteConfig = {
  name: "Romain Boiret",
  email: "romain.boiret.1@ens.etsmtl.ca",
  url: "https://romainboiret.com",
  social: [
    {
      labelKey: "email",
      href: "mailto:romain.boiret.1@ens.etsmtl.ca",
      icon: "email",
    },
    {
      labelKey: "github",
      href: "https://github.com/RomainBoiret",
      icon: "github",
    },
    {
      labelKey: "linkedin",
      href: "https://www.linkedin.com/in/romain-boiret",
      icon: "linkedin",
    },
    {
      labelKey: "instagram",
      href: "https://www.instagram.com/roma.brt",
      icon: "instagram",
    },
  ] as const satisfies ReadonlyArray<{
    labelKey: keyof import("@/i18n/dictionaries/en").Dictionary["site"]["social"];
    href: string;
    icon: SocialLink["icon"];
  }>,
};
