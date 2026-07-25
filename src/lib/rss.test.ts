import { describe, expect, it } from "vitest";
import { buildBlogRss } from "@/lib/rss";

describe("buildBlogRss", () => {
  it("emits a valid rss channel with escaped content", () => {
    const xml = buildBlogRss({
      locale: "en",
      title: "Notes · Romain & Co",
      description: "A <blog> feed",
      posts: [
        {
          slug: "hello",
          title: "Hello & welcome",
          description: 'Less than <three> "quotes"',
          date: "2026-07-22",
          tags: ["perf"],
          readingMinutes: 2,
        },
      ],
    });

    expect(xml).toContain("<rss version=\"2.0\"");
    expect(xml).toContain("<title>Notes · Romain &amp; Co</title>");
    expect(xml).toContain("<description>A &lt;blog&gt; feed</description>");
    expect(xml).toContain("<title>Hello &amp; welcome</title>");
    expect(xml).toContain("Less than &lt;three&gt; &quot;quotes&quot;");
    expect(xml).toContain("/en/blog/hello");
    expect(xml).toContain('atom:link href="https://romainboiret.com/en/feed.xml"');
    expect(xml).toContain("<language>en-ca</language>");
  });

  it("uses fr-ca for french feeds", () => {
    const xml = buildBlogRss({
      locale: "fr",
      title: "Notes",
      description: "Fil",
      posts: [],
    });

    expect(xml).toContain("<language>fr-ca</language>");
    expect(xml).toContain("/fr/blog");
    expect(xml).toContain('atom:link href="https://romainboiret.com/fr/feed.xml"');
  });
});
