import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ContactProvider } from "@/components/contact/contact-context";
import { ContactModal } from "@/components/contact/contact-modal";
import { CommandProvider } from "@/components/command-palette";
import { EasterEggs, ToastHost } from "@/components/easter-eggs";
import type { ChromeCopy } from "@/i18n/chrome";
import type { Locale } from "@/i18n/config";
import type { BlogPostMeta } from "@/lib/blog-types";

export function AppShell({
  children,
  chrome,
  locale,
  posts,
}: {
  children: React.ReactNode;
  chrome: ChromeCopy;
  locale: Locale;
  posts: BlogPostMeta[];
}) {
  return (
    <ContactProvider copy={chrome.contactForm}>
      <CommandProvider chrome={chrome} posts={posts}>
        <SiteHeader chrome={chrome} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter locale={locale} />
        <ContactModal />
        <EasterEggs locale={locale} />
        <ToastHost />
      </CommandProvider>
    </ContactProvider>
  );
}
