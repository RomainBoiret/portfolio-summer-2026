import { describe, expect, it } from "vitest";
import { pickRelatedPosts } from "@/lib/blog-related";
import type { BlogPostMeta } from "@/lib/blog-types";

function meta(
  partial: Partial<BlogPostMeta> & Pick<BlogPostMeta, "slug">,
): BlogPostMeta {
  return {
    title: partial.slug,
    description: "",
    date: partial.date ?? "2026-01-01",
    tags: partial.tags ?? [],
    readingMinutes: 3,
    ...partial,
  };
}

describe("pickRelatedPosts", () => {
  const posts = [
    meta({
      slug: "a",
      tags: ["perf", "nextjs"],
      series: "fidelio",
      date: "2026-07-01",
    }),
    meta({ slug: "b", tags: ["perf"], date: "2026-06-01" }),
    meta({
      slug: "c",
      tags: ["design"],
      series: "fidelio",
      seriesOrder: 2,
      date: "2026-05-01",
    }),
    meta({ slug: "d", tags: ["nextjs", "perf"], date: "2026-04-01" }),
  ];

  it("prefers posts in the same series", () => {
    const related = pickRelatedPosts(posts[0]!, posts, 2);
    expect(related[0]?.slug).toBe("c");
  });

  it("falls back to shared tags", () => {
    const related = pickRelatedPosts(
      meta({ slug: "solo", tags: ["perf"] }),
      posts,
      2,
    );
    expect(related[0]?.tags.includes("perf")).toBe(true);
  });

  it("excludes the current slug", () => {
    const related = pickRelatedPosts(posts[0]!, posts, 5);
    expect(related.every((post) => post.slug !== "a")).toBe(true);
  });

  it("skips zero-score posts then fills from the rest", () => {
    const related = pickRelatedPosts(
      meta({ slug: "solo", tags: ["unrelated"] }),
      posts,
      2,
    );
    expect(related).toHaveLength(2);
    expect(related.every((post) => post.slug !== "solo")).toBe(true);
  });

  it("stops once the limit is reached among scored posts", () => {
    const related = pickRelatedPosts(posts[0]!, posts, 1);
    expect(related).toHaveLength(1);
    expect(related[0]?.slug).toBe("c");
  });

  it("does not duplicate posts already picked by score", () => {
    const related = pickRelatedPosts(posts[0]!, posts, 3);
    const slugs = related.map((post) => post.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(related[0]?.slug).toBe("c");
  });
});
