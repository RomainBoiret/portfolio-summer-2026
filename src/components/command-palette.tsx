"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import { useContact } from "@/components/contact/contact-context";
import { IconSearch } from "@/components/ui/icons";
import type { ChromeCopy } from "@/i18n/chrome";
import type { BlogPostMeta } from "@/lib/blog-types";
import { announceEgg, getEggCopy } from "@/lib/easter-eggs";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type CommandItem = {
  id: string;
  label: string;
  group: "navigation" | "notes" | "actions" | "secrets";
  hint?: string;
  secret?: boolean;
  triggers?: string[];
  run: () => void;
};

type CommandContextValue = {
  open: boolean;
  openCommand: () => void;
  closeCommand: () => void;
  copy: ChromeCopy["ui"]["command"];
};

const CommandContext = React.createContext<CommandContextValue | null>(null);

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

function matchesQuery(item: CommandItem, query: string) {
  if (item.secret) {
    if (query.length < 3) return false;
    return (item.triggers ?? []).some((trigger) => {
      const needle = normalize(trigger);
      return (
        query === needle ||
        needle.startsWith(query) ||
        query.startsWith(needle)
      );
    });
  }
  if (!query) return true;
  const haystack = normalize(`${item.label} ${item.hint ?? ""}`);
  return query
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => haystack.includes(token));
}

export function useCommand() {
  const ctx = React.useContext(CommandContext);
  if (!ctx) {
    throw new Error("useCommand must be used within CommandProvider");
  }
  return ctx;
}

export function CommandTrigger({ className }: { className?: string }) {
  const { openCommand, copy } = useCommand();
  const [shortcut, setShortcut] = React.useState("⌘K");

  React.useEffect(() => {
    const isApple = /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent);
    setShortcut(isApple ? "⌘K" : "Ctrl K");
  }, []);

  return (
    <button
      type="button"
      className={cn("command-trigger", className)}
      aria-label={copy.open}
      onClick={openCommand}
    >
      <IconSearch className="command-trigger-icon" />
      <span className="command-trigger-label">{copy.hint}</span>
      <kbd className="command-kbd">{shortcut}</kbd>
    </button>
  );
}

export function CommandProvider({
  chrome,
  posts,
  children,
}: {
  chrome: ChromeCopy;
  posts: BlogPostMeta[];
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const { openContact } = useContact();
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [leaving, setLeaving] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  const locale = chrome.locale;
  const copy = chrome.ui.command;
  const eggs = React.useMemo(() => getEggCopy(locale), [locale]);
  const homePath = `/${locale}`;
  const onHome = pathname === homePath || pathname === `${homePath}/`;

  const openCommand = React.useCallback(() => {
    setLeaving(false);
    setOpen(true);
  }, []);

  const closeCommandImmediate = React.useCallback(() => {
    setLeaving(false);
    setOpen(false);
  }, []);

  const closeCommand = React.useCallback(() => {
    if (!open || leaving) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setOpen(false);
      return;
    }
    setLeaving(true);
  }, [leaving, open]);

  React.useEffect(() => {
    if (open) setLeaving(false);
  }, [open]);

  React.useEffect(() => {
    if (!leaving) return;
    const id = window.setTimeout(() => {
      setOpen(false);
      setLeaving(false);
    }, 320);
    return () => window.clearTimeout(id);
  }, [leaving]);

  const goHomeSection = React.useCallback(
    (hash: string) => {
      closeCommand();
      if (onHome) {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${hash}`);
        return;
      }
      router.push(`${homePath}#${hash}`);
    },
    [closeCommand, homePath, onHome, router],
  );

  const items = React.useMemo<CommandItem[]>(() => {
    const navigation: CommandItem[] = [
      {
        id: "nav-home",
        label: chrome.nav.home,
        group: "navigation",
        run: () => {
          closeCommand();
          router.push(homePath);
        },
      },
      {
        id: "nav-about",
        label: chrome.nav.about,
        group: "navigation",
        run: () => goHomeSection("about"),
      },
      {
        id: "nav-projects",
        label: chrome.nav.projects,
        group: "navigation",
        run: () => goHomeSection("projects"),
      },
      {
        id: "nav-contact",
        label: chrome.nav.contact,
        group: "navigation",
        run: () => goHomeSection("contact"),
      },
      {
        id: "nav-blog",
        label: chrome.nav.blog,
        group: "navigation",
        run: () => {
          closeCommand();
          router.push(`/${locale}/blog`);
        },
      },
    ];

    const notes: CommandItem[] = posts.map((post) => ({
      id: `note-${post.slug}`,
      label: post.title,
      hint: post.description,
      group: "notes",
      run: () => {
        closeCommand();
        router.push(`/${locale}/blog/${post.slug}`);
      },
    }));

    const actions: CommandItem[] = [
      {
        id: "action-contact",
        label: copy.openContact,
        group: "actions",
        run: () => {
          closeCommandImmediate();
          openContact();
        },
      },
      {
        id: "action-theme",
        label: copy.toggleTheme,
        group: "actions",
        run: () => {
          const next = !document.documentElement.classList.contains("dark");
          document.documentElement.classList.toggle("dark", next);
          try {
            localStorage.setItem("theme", next ? "dark" : "light");
          } catch {
            /* ignore */
          }
          closeCommand();
        },
      },
    ];

    const secrets: CommandItem[] = [
      {
        id: "egg-hire",
        label: eggs.cmdHire,
        hint: eggs.cmdHireHint,
        group: "secrets",
        secret: true,
        triggers: ["hire", "hire me", "embaucher", "stage", "internship"],
        run: () => {
          closeCommandImmediate();
          openContact();
          announceEgg({
            title: eggs.toastHireTitle,
            description: eggs.toastHireBody,
          });
        },
      },
      {
        id: "egg-coffee",
        label: eggs.cmdCoffee,
        hint: eggs.cmdCoffeeHint,
        group: "secrets",
        secret: true,
        triggers: ["coffee", "cafe", "café", "espresso"],
        run: () => {
          closeCommand();
          announceEgg({
            title: eggs.toastCoffeeTitle,
            description: eggs.toastCoffeeBody,
            spark: true,
          });
        },
      },
      {
        id: "egg-source",
        label: eggs.cmdSource,
        hint: eggs.cmdSourceHint,
        group: "secrets",
        secret: true,
        triggers: ["source", "repo", "github.com"],
        run: () => {
          closeCommand();
          announceEgg({
            title: eggs.toastSourceTitle,
            description: eggs.toastSourceBody,
          });
          window.open(
            siteConfig.social.find((item) => item.icon === "github")?.href ??
              "https://github.com/RomainBoiret",
            "_blank",
            "noopener,noreferrer",
          );
        },
      },
    ];

    return [...navigation, ...notes, ...actions, ...secrets];
  }, [
    chrome.nav,
    closeCommand,
    closeCommandImmediate,
    copy.openContact,
    copy.toggleTheme,
    eggs,
    goHomeSection,
    homePath,
    locale,
    openContact,
    posts,
    router,
  ]);

  const normalizedQuery = normalize(query.trim());
  const filtered = React.useMemo(
    () => items.filter((item) => matchesQuery(item, normalizedQuery)),
    [items, normalizedQuery],
  );

  const groups = React.useMemo(() => {
    const order: Array<CommandItem["group"]> = [
      "secrets",
      "navigation",
      "notes",
      "actions",
    ];
    return order
      .map((group) => ({
        group,
        label:
          group === "navigation"
            ? copy.navigation
            : group === "notes"
              ? copy.notes
              : group === "secrets"
                ? eggs.cmdGroup
                : copy.actions,
        items: filtered.filter((item) => item.group === group),
      }))
      .filter((entry) => entry.items.length > 0);
  }, [copy.actions, copy.navigation, copy.notes, eggs.cmdGroup, filtered]);

  const flat = groups.flatMap((entry) => entry.items);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    const t = window.setTimeout(() => inputRef.current?.focus(), 20);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      window.clearTimeout(t);
    };
  }, [open]);

  React.useEffect(() => {
    setActive(0);
  }, [normalizedQuery]);

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const meta = event.metaKey || event.ctrlKey;
      if (meta && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open && !leaving) closeCommand();
        else if (!open) openCommand();
        return;
      }
      if (!open || leaving) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeCommand();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive((value) =>
          flat.length === 0 ? 0 : (value + 1) % flat.length,
        );
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive((value) =>
          flat.length === 0
            ? 0
            : (value - 1 + flat.length) % flat.length,
        );
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        flat[active]?.run();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, closeCommand, flat, leaving, open, openCommand]);

  React.useEffect(() => {
    if (!open) return;
    const activeEl = listRef.current?.querySelector<HTMLElement>(
      `[data-command-index="${active}"]`,
    );
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const ctx = React.useMemo<CommandContextValue>(
    () => ({ open, openCommand, closeCommand, copy }),
    [closeCommand, copy, open, openCommand],
  );

  let runningIndex = -1;

  return (
    <CommandContext.Provider value={ctx}>
      {children}
      {mounted && open
        ? createPortal(
            <div
              className={cn(
                "site-popup site-popup--command",
                leaving && "is-leaving",
              )}
              role="presentation"
            >
              <button
                type="button"
                className="site-popup-backdrop"
                aria-label={chrome.ui.closeNav}
                onClick={closeCommand}
              />
              <div
                role="dialog"
                aria-modal="true"
                aria-label={copy.open}
                className="site-popup-panel"
              >
                <div className="command-palette-input-wrap">
                  <IconSearch className="command-palette-search-icon" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={copy.placeholder}
                    className="command-palette-input"
                    aria-autocomplete="list"
                    aria-controls="command-palette-list"
                    enterKeyHint="search"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                  />
                  <kbd className="command-kbd command-kbd-esc">esc</kbd>
                </div>

                <div
                  id="command-palette-list"
                  ref={listRef}
                  className="command-palette-list"
                  role="listbox"
                >
                  {groups.length === 0 ? (
                    <p className="command-palette-empty">{copy.empty}</p>
                  ) : (
                    groups.map((group) => (
                      <div key={group.group} className="command-palette-group">
                        <p className="command-palette-group-label">
                          {group.label}
                        </p>
                        <ul className="command-palette-group-items">
                          {group.items.map((item) => {
                            runningIndex += 1;
                            const index = runningIndex;
                            const selected = index === active;
                            return (
                              <li key={item.id}>
                                <button
                                  type="button"
                                  role="option"
                                  aria-selected={selected}
                                  data-command-index={index}
                                  className={cn(
                                    "command-palette-item",
                                    selected && "is-active",
                                  )}
                                  onMouseEnter={() => setActive(index)}
                                  onClick={() => item.run()}
                                >
                                  <span className="command-palette-item-label">
                                    {item.label}
                                  </span>
                                  {item.hint ? (
                                    <span className="command-palette-item-hint">
                                      {item.hint}
                                    </span>
                                  ) : null}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </CommandContext.Provider>
  );
}
