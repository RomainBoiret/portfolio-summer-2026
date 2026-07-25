"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/data/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleToggle } from "@/components/locale-toggle";
import { ContactTrigger } from "@/components/contact/contact-trigger";
import { CommandTrigger } from "@/components/command-palette";
import { Button } from "@/components/ui/button";
import type { ChromeCopy } from "@/i18n/chrome";
import { cn } from "@/lib/utils";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-4 w-4 items-center justify-center" aria-hidden>
      <span
        className={cn(
          "absolute left-0 h-px w-4 origin-center bg-current transition-transform duration-300",
          open ? "translate-y-0 rotate-45" : "-translate-y-[5px]",
        )}
      />
      <span
        className={cn(
          "absolute left-0 h-px w-4 bg-current transition-opacity duration-200",
          open ? "opacity-0" : "opacity-100",
        )}
      />
      <span
        className={cn(
          "absolute left-0 h-px w-4 origin-center bg-current transition-transform duration-300",
          open ? "translate-y-0 -rotate-45" : "translate-y-[5px]",
        )}
      />
    </span>
  );
}

type NavItem = {
  id: string;
  label: string;
  href: string;
  kind: "hash" | "route";
};

export function SiteHeader({ chrome }: { chrome: ChromeCopy }) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const locale = chrome.locale;
  const onHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const onBlog = pathname.startsWith(`/${locale}/blog`);

  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(onBlog ? "blog" : "home");
  const [scrolled, setScrolled] = React.useState(false);
  const reducedRef = React.useRef(false);

  const sections = React.useMemo<NavItem[]>(
    () => [
      { id: "home", label: chrome.nav.home, href: "#home", kind: "hash" },
      { id: "about", label: chrome.nav.about, href: "#about", kind: "hash" },
      {
        id: "projects",
        label: chrome.nav.projects,
        href: "#projects",
        kind: "hash",
      },
      {
        id: "contact",
        label: chrome.nav.contact,
        href: "#contact",
        kind: "hash",
      },
      {
        id: "blog",
        label: chrome.nav.blog,
        href: `/${locale}/blog`,
        kind: "route",
      },
    ],
    [chrome.nav, locale],
  );

  const desktopNav = sections.filter((section) => section.id !== "home");

  React.useEffect(() => {
    if (onBlog) setActive("blog");
    else if (onHome) setActive("home");
  }, [onBlog, onHome, pathname]);

  React.useEffect(() => {
    if (!onHome) return;
    router.prefetch(`/${locale}/blog`);
  }, [onHome, locale, router]);

  React.useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;
    let last = false;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = window.scrollY > 24;
        if (next === last) return;
        last = next;
        setScrolled(next);
      });
    };

    last = window.scrollY > 24;
    setScrolled(last);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  React.useEffect(() => {
    if (!onHome) return;

    let observer: IntersectionObserver | null = null;
    let cancelled = false;
    let idleId = 0;

    const start = () => {
      if (cancelled) return;

      const elements = sections
        .filter((section) => section.kind === "hash")
        .map((section) => document.getElementById(section.id))
        .filter((el): el is HTMLElement => Boolean(el));

      if (!elements.length) return;

      const ratios = new Map<string, number>();

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            ratios.set(
              entry.target.id,
              entry.isIntersecting ? entry.intersectionRatio : 0,
            );
          }

          let bestId = "home";
          let bestRatio = -1;
          for (const section of sections) {
            if (section.kind !== "hash") continue;
            const ratio = ratios.get(section.id) ?? 0;
            if (ratio > bestRatio) {
              bestRatio = ratio;
              bestId = section.id;
            }
          }

          if (bestRatio > 0) {
            setActive((prev) => (prev === bestId ? prev : bestId));
          }
        },
        {
          rootMargin: "-35% 0px -45% 0px",
          threshold: [0, 0.15, 0.35, 0.55, 0.75],
        },
      );

      elements.forEach((el) => observer?.observe(el));
    };

    const ric =
      window.requestIdleCallback?.bind(window) ??
      ((cb: IdleRequestCallback) =>
        window.setTimeout(
          () => cb({ didTimeout: false, timeRemaining: () => 0 } as IdleDeadline),
          180,
        ));

    idleId = ric(start, { timeout: 900 }) as number;

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      observer?.disconnect();
    };
  }, [sections, onHome]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const goTo = (item: NavItem) => {
    setOpen(false);

    if (item.kind === "route") {
      setActive(item.id);
      router.push(item.href);
      return;
    }

    const id = item.href.replace("#", "");

    if (!onHome) {
      setActive(id);
      router.push(`/${locale}${item.href}`);
      return;
    }

    setActive(id);

    requestAnimationFrame(() => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({
          behavior: reducedRef.current ? "auto" : "smooth",
          block: "start",
        });
        history.replaceState(null, "", `#${id}`);
      });
    });
  };

  const railSections = sections.filter((section) => section.kind === "hash");

  return (
    <>
      <header
        className={cn(
          "site-header fixed inset-x-0 top-0 z-[70]",
          (scrolled || open) && "is-scrolled",
        )}
      >
        <div className="mx-auto flex w-full max-w-shell items-center justify-between gap-3 px-4 sm:gap-4 sm:px-8">
          <div className="flex min-w-0 items-center gap-1 sm:gap-2">
            <button
              type="button"
              aria-label={open ? chrome.ui.closeNav : chrome.ui.openNav}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="icon-btn inline-flex lg:hidden"
            >
              <MenuIcon open={open} />
            </button>

            <nav
              aria-label={chrome.ui.primaryNav}
              className="hidden items-center gap-0.5 lg:flex"
            >
              {desktopNav.map((item) => {
                const isActive = active === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(item)}
                    className={cn(
                      "relative cursor-pointer rounded-full px-3.5 py-2 text-[0.8125rem] font-medium tracking-wide transition-colors duration-300",
                      isActive
                        ? "text-foreground"
                        : "text-muted hover:text-foreground",
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "nav-underline absolute inset-x-3.5 bottom-1 h-px bg-accent",
                        isActive && "is-active",
                      )}
                    />
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5">
            <CommandTrigger />
            {!onHome ? (
              <Link
                href={`/${locale}`}
                prefetch={false}
                className="hidden rounded-full px-3.5 py-2 text-[0.8125rem] font-medium tracking-wide text-muted transition-colors duration-300 hover:text-foreground sm:inline-flex"
              >
                {chrome.nav.home}
              </Link>
            ) : (
              <ContactTrigger
                variant="text"
                className="hidden rounded-full px-3.5 py-2 text-[0.8125rem] font-medium normal-case tracking-wide text-muted transition-colors duration-300 hover:text-foreground sm:inline-flex"
              >
                {chrome.ui.sayHi}
              </ContactTrigger>
            )}
            <LocaleToggle
              locale={chrome.locale}
              label={chrome.ui.switchLocale}
            />
            <ThemeToggle
              labelLight={chrome.ui.switchToLight}
              labelDark={chrome.ui.switchToDark}
            />
          </div>
        </div>
      </header>

      {onHome ? (
        <nav
          aria-label={chrome.ui.sectionProgress}
          className="section-rail fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:flex lg:right-7"
        >
          <span aria-hidden className="section-rail-track" />
          <ul className="relative flex flex-col">
            {railSections.map((section) => {
              const isActive = active === section.id;
              return (
                <li key={section.id}>
                  <button
                    type="button"
                    aria-label={`${chrome.ui.goTo} ${section.label}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => goTo(section)}
                    className="section-rail-btn group relative -my-2 flex h-11 w-11 cursor-pointer items-center justify-center"
                  >
                    <span
                      className={cn(
                        "section-rail-label pointer-events-none absolute right-full mr-3 whitespace-nowrap text-[0.65rem] font-medium uppercase tracking-[0.18em] transition-all duration-300",
                        isActive
                          ? "translate-x-0 text-accent-text opacity-100"
                          : "translate-x-1 text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                      )}
                    >
                      {section.label}
                    </span>
                    <span
                      className={cn(
                        "section-rail-dot block rounded-full transition-all duration-300",
                        isActive
                          ? "size-2.5 bg-accent"
                          : "size-1.5 bg-border-strong group-hover:size-2 group-hover:bg-accent/70",
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}

      {open ? (
        <div
          className="mobile-menu mobile-menu-open fixed inset-0 z-[60] bg-background lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={chrome.ui.navMenu}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-8 top-24 h-32 w-32 rounded-full border border-accent/30"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-28 left-8 h-14 w-14 rotate-12 border-2 border-accent-rose/40"
          />

          <nav
            aria-label={chrome.ui.mobileNav}
            className="mobile-menu-panel mx-auto flex h-full max-w-shell flex-col justify-center overflow-y-auto px-6 pb-16 pt-24 sm:px-8"
          >
            <p className="mobile-menu-item mb-6 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-accent-text">
              {chrome.ui.navigate}
            </p>
            <ul className="space-y-1">
              {sections.map((item, index) => {
                const isActive = active === item.id;
                return (
                  <li
                    key={item.id}
                    className="mobile-menu-item"
                    style={{ animationDelay: `${80 + index * 55}ms` }}
                  >
                    <button
                      type="button"
                      onClick={() => goTo(item)}
                      className={cn(
                        "group flex w-full cursor-pointer items-center gap-3 border-b border-border/70 py-3.5 text-left transition-colors duration-300",
                        isActive
                          ? "text-foreground"
                          : "text-foreground/40 hover:text-accent",
                      )}
                    >
                      <span className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-accent-text">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-3xl font-extrabold tracking-tight sm:text-5xl">
                        {item.label}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "size-2.5 shrink-0 rounded-full transition-colors",
                          isActive
                            ? "bg-accent"
                            : "bg-transparent ring-1 ring-border group-hover:ring-accent",
                        )}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div
              className="mobile-menu-item mt-8 flex flex-wrap gap-3 text-sm"
              style={{ animationDelay: `${80 + sections.length * 55}ms` }}
            >
              <ContactTrigger className="!px-4 !py-2.5">
                {chrome.ui.emailMe}
              </ContactTrigger>
              <Button
                href={
                  siteConfig.social.find((item) => item.icon === "github")
                    ?.href ?? "https://github.com/RomainBoiret"
                }
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
                className="!px-4 !py-2.5"
              >
                {chrome.socialGithub}
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
