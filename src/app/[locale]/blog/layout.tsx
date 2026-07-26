import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/data/site";
import { getContentDictionary } from "@/i18n/content";
import { isLocale, locales, type Locale } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dictionary = await getContentDictionary(locale);
  const description = dictionary.blog.metaDescription;

  return {
    title: {
      absolute: `${dictionary.blog.title} · ${siteConfig.name}`,
    },
    description,
    keywords: dictionary.meta.keywords,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        en: "/en/blog",
        fr: "/fr/blog",
        "x-default": "/en/blog",
      },
      types: {
        "application/rss+xml": `${siteConfig.url}/${locale}/feed.xml`,
      },
    },
    openGraph: {
      title: `${dictionary.blog.title} · ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/${locale}/blog`,
      type: "website",
      siteName: siteConfig.name,
      locale: locale === "fr" ? "fr_CA" : "en_CA",
    },
    twitter: {
      card: "summary_large_image",
      title: `${dictionary.blog.title} · ${siteConfig.name}`,
      description,
    },
  };
}

export default async function BlogLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  return children;
}
