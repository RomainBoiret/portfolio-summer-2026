import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { StructuredData } from "@/components/structured-data";
import { getDictionary } from "@/i18n/get-dictionary";
import { getChromeCopy } from "@/i18n/chrome";
import { getContentDictionary } from "@/i18n/content";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getAllBlogPosts } from "@/lib/blog";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dictionary = await getContentDictionary(locale);
  const chrome = getChromeCopy(locale, getDictionary(locale));
  const posts = await getAllBlogPosts(locale);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--accent)]"
      >
        {dictionary.ui.skipToContent}
      </a>
      <StructuredData locale={locale} />
      <AppShell chrome={chrome} locale={locale} posts={posts}>
        {children}
      </AppShell>
    </>
  );
}
