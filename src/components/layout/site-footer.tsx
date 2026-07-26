import Link from "next/link";
import type { Locale } from "@/i18n/config";
import {
  getFooterLine,
  getLocalizedSocial,
  getSiteIdentity,
} from "@/i18n/content";
import { getDictionary } from "@/i18n/get-dictionary";
import { ContactTrigger } from "@/components/contact/contact-trigger";
import { FooterEgg } from "@/components/easter-eggs";

export async function SiteFooter({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const year = new Date().getFullYear();
  const identity = await getSiteIdentity(locale);
  const [social, footerLine] = await Promise.all([
    getLocalizedSocial(locale),
    getFooterLine(locale, year, identity.name),
  ]);

  return (
    <footer className="border-t border-border pb-10 pt-8">
      <div className="mx-auto flex w-full max-w-shell flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <FooterEgg locale={locale}>{footerLine}</FooterEgg>

        <nav
          aria-label={dictionary.ui.footerSocial}
          className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8125rem]"
        >
          <ContactTrigger variant="link">
            {dictionary.site.social.email}
          </ContactTrigger>
          {social
            .filter((item) => item.icon !== "email")
            .map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-accent-text"
              >
                {item.label}
              </a>
            ))}
          <Link
            href={`/${locale}/blog`}
            className="text-muted transition-colors hover:text-accent-text"
          >
            {dictionary.site.nav.blog}
          </Link>
          <a
            href={`/${locale}/feed.xml`}
            className="text-muted transition-colors hover:text-accent-text"
          >
            {dictionary.ui.rss}
          </a>
        </nav>
      </div>
    </footer>
  );
}
