import { afterEach, describe, expect, it, vi } from "vitest";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import {
  getContactBlurb,
  getFooterLine,
  getLocalizedProjects,
  getLocalizedSocial,
} from "@/i18n/content";
import * as dictionary from "@/i18n/get-dictionary";
import { en } from "@/i18n/dictionaries/en";

describe("i18n config", () => {
  it("exposes en and fr locales", () => {
    expect(locales).toEqual(["en", "fr"]);
    expect(defaultLocale).toBe("en");
  });

  it("validates locale strings", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(true);
    expect(isLocale("de")).toBe(false);
    expect(isLocale("")).toBe(false);
  });
});

describe("i18n content helpers", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("localizes project summaries for both locales", async () => {
    const english = await getLocalizedProjects("en");
    const french = await getLocalizedProjects("fr");
    expect(english.length).toBeGreaterThan(0);
    expect(english.length).toBe(french.length);
    expect(english[0]?.summary.length).toBeGreaterThan(0);
    expect(french[0]?.summary.length).toBeGreaterThan(0);
    expect(english[0]?.slug).toBe(french[0]?.slug);
  });

  it("falls back when project copy is missing", async () => {
    vi.spyOn(dictionary, "getDictionary").mockReturnValue({
      ...en,
      projects: {
        ...en.projects,
        summaries: {},
        highlights: undefined as unknown as typeof en.projects.highlights,
      },
    });

    const projects = await getLocalizedProjects("en");
    expect(projects.length).toBeGreaterThan(0);
    expect(projects.every((project) => project.summary === "")).toBe(true);
    expect(projects.every((project) => project.highlights === undefined)).toBe(
      true,
    );
  });

  it("localizes social labels", async () => {
    const english = await getLocalizedSocial("en");
    const french = await getLocalizedSocial("fr");
    expect(english.some((item) => item.icon === "github")).toBe(true);
    expect(
      french.find((item) => item.icon === "github")?.label,
    ).toMatch(/GitHub/i);
  });

  it("builds contact blurbs with location", async () => {
    expect(await getContactBlurb("en")).toMatch(/Montréal|Montreal/i);
    expect((await getContactBlurb("fr")).length).toBeGreaterThan(10);
  });

  it("builds a footer line with year and name", async () => {
    const line = await getFooterLine("en", 2026, "Romain Boiret");
    expect(line).toContain("© 2026");
    expect(line).toContain("Romain Boiret");
  });
});
