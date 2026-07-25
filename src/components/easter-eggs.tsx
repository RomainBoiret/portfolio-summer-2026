"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import {
  announceEgg,
  getEggCopy,
  KONAMI_SEQUENCE,
  sparkPage,
} from "@/lib/easter-eggs";
import { TOAST_EVENT, type ToastDetail, type ToastTone } from "@/lib/toast";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

function ToastIcon({ tone }: { tone: ToastTone }) {
  if (tone === "success") {
    return (
      <span className="site-toast-icon site-toast-icon--success" aria-hidden>
        <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
          <path
            d="M3.5 8.5 6.5 11.5 12.5 4.5"
            stroke="currentColor"
            strokeWidth="1.85"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }

  if (tone === "egg") {
    return (
      <span className="site-toast-icon site-toast-icon--egg" aria-hidden>
        <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
          <path
            d="M8 2.75 9.05 6.1 12.5 6.35 9.9 8.55 10.65 11.9 8 10.2 5.35 11.9 6.1 8.55 3.5 6.35 6.95 6.1 8 2.75Z"
            fill="currentColor"
          />
        </svg>
      </span>
    );
  }

  return (
    <span className="site-toast-icon site-toast-icon--default" aria-hidden>
      <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
        <circle cx="8" cy="8" r="5.25" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M8 5.4v3.1"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="8" cy="11" r="0.7" fill="currentColor" />
      </svg>
    </span>
  );
}

/** Shared toast host used by contact success and easter eggs. */
export function ToastHost() {
  const [mounted, setMounted] = React.useState(false);
  const [toast, setToast] = React.useState<{
    title: string;
    description: string;
    tone: ToastTone;
  } | null>(null);
  const [leaving, setLeaving] = React.useState(false);
  const [toastKey, setToastKey] = React.useState(0);
  const showTimer = React.useRef<number | null>(null);
  const leaveTimer = React.useRef<number | null>(null);

  const clearTimers = React.useCallback(() => {
    if (showTimer.current) window.clearTimeout(showTimer.current);
    if (leaveTimer.current) window.clearTimeout(leaveTimer.current);
    showTimer.current = null;
    leaveTimer.current = null;
  }, []);

  const dismiss = React.useCallback(() => {
    if (!toast || leaving) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    clearTimers();
    if (reduced) {
      setToast(null);
      setLeaving(false);
      return;
    }
    setLeaving(true);
    leaveTimer.current = window.setTimeout(() => {
      setToast(null);
      setLeaving(false);
    }, 320);
  }, [clearTimers, leaving, toast]);

  const showToast = React.useCallback(
    (title: string, description: string, tone: ToastTone = "default") => {
      clearTimers();
      setLeaving(false);
      setToast({ title, description, tone });
      setToastKey((value) => value + 1);
      showTimer.current = window.setTimeout(() => {
        const reduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        if (reduced) {
          setToast(null);
          return;
        }
        setLeaving(true);
        leaveTimer.current = window.setTimeout(() => {
          setToast(null);
          setLeaving(false);
        }, 320);
      }, 4800);
    },
    [clearTimers],
  );

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    const onToast = (event: Event) => {
      const detail = (event as CustomEvent<ToastDetail>).detail;
      if (!detail?.title) return;
      if (detail.spark) sparkPage();
      showToast(detail.title, detail.description, detail.tone ?? "default");
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => window.removeEventListener(TOAST_EVENT, onToast);
  }, [showToast]);

  React.useEffect(() => clearTimers, [clearTimers]);

  if (!mounted || !toast) return null;

  return createPortal(
    <div className="site-toast-root" role="status" aria-live="polite">
      <div
        key={toastKey}
        className={cn(
          "site-toast",
          `site-toast--${toast.tone}`,
          leaving && "is-leaving",
        )}
      >
        <ToastIcon tone={toast.tone} />
        <div className="site-toast-copy">
          <p className="site-toast-title">{toast.title}</p>
          <p className="site-toast-description">{toast.description}</p>
        </div>
        <button
          type="button"
          className="site-toast-close"
          aria-label="Close"
          onClick={dismiss}
        >
          <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden>
            <path
              d="M4.5 4.5 11.5 11.5M11.5 4.5 4.5 11.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>,
    document.body,
  );
}

export function EasterEggs({ locale }: { locale: Locale }) {
  const copy = React.useMemo(() => getEggCopy(locale), [locale]);
  const konamiIndex = React.useRef(0);

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) {
        konamiIndex.current = 0;
        return;
      }

      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        konamiIndex.current = 0;
        return;
      }

      const expected = KONAMI_SEQUENCE[konamiIndex.current];
      const pressed =
        event.key.length === 1 ? event.key.toLowerCase() : event.key;

      if (pressed === expected || pressed === expected?.toLowerCase()) {
        konamiIndex.current += 1;
        if (konamiIndex.current === KONAMI_SEQUENCE.length) {
          konamiIndex.current = 0;
          announceEgg({
            title: copy.toastKonamiTitle,
            description: copy.toastKonamiBody,
            spark: true,
          });
        }
        return;
      }

      konamiIndex.current =
        pressed === KONAMI_SEQUENCE[0] ||
        pressed === KONAMI_SEQUENCE[0]?.toLowerCase()
          ? 1
          : 0;
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [copy.toastKonamiBody, copy.toastKonamiTitle]);

  return null;
}

export function FooterEgg({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const copy = React.useMemo(() => getEggCopy(locale), [locale]);
  const clicks = React.useRef(0);
  const resetTimer = React.useRef<number | null>(null);

  const onClick = () => {
    clicks.current += 1;
    if (resetTimer.current) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => {
      clicks.current = 0;
    }, 1600);

    if (clicks.current >= 5) {
      clicks.current = 0;
      announceEgg({
        title: copy.toastFooterTitle,
        description: copy.toastFooterBody,
        spark: true,
      });
    }
  };

  return (
    <span className="egg-footer-credit" onClick={onClick}>
      {children}
    </span>
  );
}
