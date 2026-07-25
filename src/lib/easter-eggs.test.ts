import { describe, expect, it, vi, afterEach } from "vitest";
import {
  announceEgg,
  getEggCopy,
  KONAMI_SEQUENCE,
  sparkPage,
} from "@/lib/easter-eggs";
import { announceToast, TOAST_EVENT } from "@/lib/toast";
import {
  buildConsoleEggScript,
  consoleEggScript,
} from "@/lib/console-egg-script";
import { getChromeCopy, getProjectsCopy } from "@/i18n/chrome";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { en } from "@/i18n/dictionaries/en";
import { fr } from "@/i18n/dictionaries/fr";

describe("easter eggs", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it("exposes the full Konami sequence", () => {
    expect(KONAMI_SEQUENCE).toHaveLength(10);
    expect(KONAMI_SEQUENCE[0]).toBe("ArrowUp");
    expect(KONAMI_SEQUENCE.at(-1)).toBe("a");
  });

  it("returns locale-specific egg copy", () => {
    const english = getEggCopy("en");
    const french = getEggCopy("fr");
    expect(english.consoleTitle).toMatch(/hood/i);
    expect(french.consoleTitle).toMatch(/capot/i);
    expect(english.cmdGroup).toBe("Secrets");
    expect(french.cmdHire.length).toBeGreaterThan(0);
  });

  it("announceEgg dispatches an egg-toned toast", () => {
    const dispatch = vi.fn();
    vi.stubGlobal("window", { dispatchEvent: dispatch });

    announceEgg({
      title: "Found",
      description: "Konami",
      spark: true,
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
    const event = dispatch.mock.calls[0]?.[0] as CustomEvent;
    expect(event.type).toBe(TOAST_EVENT);
    expect(event.detail.tone).toBe("egg");
    expect(event.detail.spark).toBe(true);
  });

  it("sparkPage is a no-op without window", () => {
    expect(() => sparkPage()).not.toThrow();
  });

  it("sparkPage mounts and removes an overlay", () => {
    vi.useFakeTimers();

    const overlay = {
      className: "",
      setAttribute: vi.fn(),
      remove: vi.fn(),
    };
    const body = { appendChild: vi.fn() };

    vi.stubGlobal("window", {
      matchMedia: vi.fn().mockReturnValue({ matches: false }),
      setTimeout: globalThis.setTimeout.bind(globalThis),
    });
    vi.stubGlobal("document", {
      querySelectorAll: vi.fn().mockReturnValue([]),
      createElement: vi.fn().mockReturnValue(overlay),
      body,
    });

    sparkPage();

    expect(document.createElement).toHaveBeenCalledWith("div");
    expect(overlay.className).toBe("egg-spark-overlay");
    expect(overlay.setAttribute).toHaveBeenCalledWith("aria-hidden", "true");
    expect(body.appendChild).toHaveBeenCalledWith(overlay);

    vi.advanceTimersByTime(900);
    expect(overlay.remove).toHaveBeenCalledTimes(1);
  });

  it("sparkPage uses the reduced-motion class when preferred", () => {
    vi.useFakeTimers();

    const overlay = {
      className: "",
      setAttribute: vi.fn(),
      remove: vi.fn(),
    };
    const body = { appendChild: vi.fn() };

    vi.stubGlobal("window", {
      matchMedia: vi.fn().mockReturnValue({ matches: true }),
      setTimeout: globalThis.setTimeout.bind(globalThis),
    });
    vi.stubGlobal("document", {
      querySelectorAll: vi.fn().mockReturnValue([{ remove: vi.fn() }]),
      createElement: vi.fn().mockReturnValue(overlay),
      body,
    });

    sparkPage();

    expect(overlay.className).toBe("egg-spark-overlay is-reduced");
    vi.advanceTimersByTime(450);
    expect(overlay.remove).toHaveBeenCalledTimes(1);
  });
});

describe("toast", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("is a no-op without window", () => {
    expect(() =>
      announceToast({
        title: "Message sent",
        description: "Thanks",
        tone: "success",
      }),
    ).not.toThrow();
  });

  it("dispatches a custom event when window exists", () => {
    const dispatch = vi.fn();
    vi.stubGlobal("window", {
      dispatchEvent: dispatch,
    });

    announceToast({
      title: "Coffee break",
      description: "Black, no sugar.",
      tone: "egg",
      spark: true,
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
    const event = dispatch.mock.calls[0]?.[0] as CustomEvent;
    expect(event.type).toBe(TOAST_EVENT);
    expect(event.detail).toEqual({
      title: "Coffee break",
      description: "Black, no sugar.",
      tone: "egg",
      spark: true,
    });
  });
});

describe("console egg script", () => {
  it("embeds both locale messages once", () => {
    const script = buildConsoleEggScript();
    expect(script).toContain("Under the hood?");
    expect(script).toContain("Sous le capot ?");
    expect(script).toBe(consoleEggScript);
    expect(script.match(/Under the hood\?/g)?.length).toBe(1);
  });
});

describe("chrome copy helpers", () => {
  it("builds chrome copy for a locale", () => {
    const chrome = getChromeCopy("en", en);
    expect(chrome.locale).toBe("en");
    expect(chrome.nav.home).toBe(en.site.nav.home);
    expect(chrome.contactForm.successTitle).toBe(en.contact.form.successTitle);
    expect(chrome.ui.command.hint).toBe(en.ui.command.hint);
  });

  it("builds projects copy", () => {
    const projects = getProjectsCopy(fr);
    expect(projects.title).toBe(fr.projects.title);
    expect(projects.categories.All).toBe(fr.projects.categories.All);
    expect(projects.githubStats.viewProfile).toBe(
      fr.projects.githubStats.viewProfile,
    );
  });
});

describe("getDictionary", () => {
  it("falls back to english for an unknown locale", () => {
    expect(getDictionary("de" as Locale)).toBe(en);
  });
});

describe("dictionary parity", () => {
  it("keeps the same project summary keys in en and fr", () => {
    expect(Object.keys(fr.projects.summaries).sort()).toEqual(
      Object.keys(en.projects.summaries).sort(),
    );
    expect(Object.keys(fr.projects.highlights).sort()).toEqual(
      Object.keys(en.projects.highlights).sort(),
    );
  });

  it("exposes contact success title and body in both locales", () => {
    expect(en.contact.form.successTitle.length).toBeGreaterThan(0);
    expect(fr.contact.form.successTitle.length).toBeGreaterThan(0);
    expect(en.contact.form.success.length).toBeGreaterThan(0);
    expect(fr.contact.form.success.length).toBeGreaterThan(0);
  });
});
