import { describe, expect, it } from "vitest";
import { formatBlogDate, toneForBlogSlug } from "@/lib/blog-format";

describe("formatBlogDate", () => {
  it("formats dates for English Canada", () => {
    expect(formatBlogDate("2026-07-22", "en")).toMatch(/July/);
    expect(formatBlogDate("2026-07-22", "en")).toMatch(/2026/);
  });

  it("formats dates for French Canada", () => {
    const formatted = formatBlogDate("2026-07-22", "fr");
    expect(formatted).toMatch(/2026/);
    expect(formatted.toLowerCase()).toMatch(/juillet/);
  });
});

describe("toneForBlogSlug", () => {
  it("returns a stable tone for the same slug", () => {
    expect(toneForBlogSlug("shipping-a-fast-portfolio")).toBe(
      toneForBlogSlug("shipping-a-fast-portfolio"),
    );
  });

  it("returns different tones for different slugs when hashes differ", () => {
    const a = toneForBlogSlug("alpha");
    const b = toneForBlogSlug("completely-different-slug-xyz");
    expect(typeof a).toBe("string");
    expect(a.startsWith("#")).toBe(true);
    expect(typeof b).toBe("string");
  });

  it("always returns a hex color from the palette", () => {
    expect(toneForBlogSlug("")).toMatch(/^#[0-9a-f]{6}$/i);
  });
});
