import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/home/home-page";
import { siteConfig } from "@/data/site";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dictionary = getDictionary(locale);

  return {
    title: {
      absolute: `${siteConfig.name} - ${dictionary.meta.role}`,
    },
    description: dictionary.meta.description,
    keywords: dictionary.meta.keywords,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fr: "/fr",
        "x-default": "/en",
      },
    },
    openGraph: {
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      alternateLocale: locale === "fr" ? ["en_CA"] : ["fr_CA"],
      url: `${siteConfig.url}/${locale}`,
      title: `${siteConfig.name} - ${dictionary.meta.role}`,
      description: dictionary.meta.description,
      siteName: siteConfig.name,
    },
    twitter: {
      title: `${siteConfig.name} - ${dictionary.meta.role}`,
      description: dictionary.meta.description,
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  return <HomePage locale={raw} />;
}
