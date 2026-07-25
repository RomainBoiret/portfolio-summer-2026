"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v1.5M12 19.5V21M4.93 4.93l1.06 1.06M18.01 18.01l1.06 1.06M3 12h1.5M19.5 12H21M4.93 19.07l1.06-1.06M18.01 5.99l1.06-1.06" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M21 14.3A9 9 0 1 1 9.7 3a7 7 0 0 0 11.3 11.3z" />
    </svg>
  );
}

function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getIsDark() {
  return document.documentElement.classList.contains("dark");
}

export function ThemeToggle({
  className,
  labelLight,
  labelDark,
}: {
  className?: string;
  labelLight: string;
  labelDark: string;
}) {
  const isDark = React.useSyncExternalStore(subscribe, getIsDark, () => false);

  return (
    <button
      type="button"
      className={cn("icon-btn relative z-50 inline-flex", className)}
      aria-label={isDark ? labelLight : labelDark}
      onClick={() => {
        const next = !getIsDark();
        document.documentElement.classList.toggle("dark", next);
        try {
          localStorage.setItem("theme", next ? "dark" : "light");
        } catch {
          /* ignore */
        }
      }}
    >
      <span className="relative size-[1.05rem]">
        <SunIcon
          className={cn(
            "absolute inset-0 size-[1.05rem] transition-opacity duration-200",
            isDark ? "opacity-100" : "opacity-0",
          )}
        />
        <MoonIcon
          className={cn(
            "absolute inset-0 size-[1.05rem] transition-opacity duration-200",
            isDark ? "opacity-0" : "opacity-100",
          )}
        />
      </span>
    </button>
  );
}
