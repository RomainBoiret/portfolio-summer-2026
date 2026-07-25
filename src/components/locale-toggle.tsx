"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

function switchLocalePath(pathname: string, next: Locale) {
  const segments = pathname.split("/");
  if (locales.includes(segments[1] as Locale)) {
    segments[1] = next;
    return segments.join("/") || `/${next}`;
  }
  return `/${next}${pathname === "/" ? "" : pathname}`;
}

export function LocaleToggle({
  locale,
  label,
  className,
}: {
  locale: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname() || "/";
  const nextLocale: Locale = locale === "en" ? "fr" : "en";

  return (
    <Link
      href={switchLocalePath(pathname, nextLocale)}
      prefetch={false}
      className={cn(
        "icon-btn inline-flex text-[0.7rem] font-semibold uppercase tracking-[0.14em]",
        className,
      )}
      aria-label={`${label}: ${nextLocale.toUpperCase()}`}
      hrefLang={nextLocale}
      onClick={() => {
        try {
          document.cookie = `locale=${nextLocale};path=/;max-age=31536000;samesite=lax`;
        } catch {
          /* ignore */
        }
      }}
    >
      {nextLocale}
    </Link>
  );
}
