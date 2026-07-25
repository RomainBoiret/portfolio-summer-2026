"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/i18n/config";

/**
 * Warm the blog RSC cache after first paint so Notes / article clicks feel instant.
 * Does not embed article HTML in the home document - only prefetches routes.
 */
export function BlogPrefetch({
  locale,
  slugs,
}: {
  locale: Locale;
  slugs: string[];
}) {
  const router = useRouter();

  React.useEffect(() => {
    let cancelled = false;
    let idleId = 0;
    let timeoutId = 0;

    const run = () => {
      if (cancelled) return;
      router.prefetch(`/${locale}/blog`);
      for (const slug of slugs) {
        router.prefetch(`/${locale}/blog/${slug}`);
      }
    };

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(run, { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(run, 250);
    }

    return () => {
      cancelled = true;
      if (idleId && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [locale, router, slugs.join("|")]);

  return null;
}
