import "server-only";

import type { BlogTocItem } from "@/lib/blog-types";

function slugifyHeading(text: string) {
  const base = text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || "section";
}

/** Ensure h2/h3 have ids, wrap pre blocks, and build a TOC (mirrors compile-blog). */
export function enhancePostHtml(html: string): {
  html: string;
  toc: BlogTocItem[];
} {
  const used = new Map<string, number>();
  const toc: BlogTocItem[] = [];

  let next = html.replace(
    /<(h[23])(\s[^>]*)?>([\s\S]*?)<\/\1>/gi,
    (_, tag: string, attrs = "", inner: string) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      const existing = /\sid=["']([^"']+)["']/i.exec(attrs);
      let id = existing?.[1] ?? slugifyHeading(text);
      if (!existing) {
        const count = (used.get(id) ?? 0) + 1;
        used.set(id, count);
        if (count > 1) id = `${id}-${count}`;
      }
      toc.push({
        id,
        text,
        level: tag.toLowerCase() === "h2" ? 2 : 3,
      });
      const cleaned = attrs.replace(/\s*id=["'][^"']*["']/i, "");
      return `<${tag}${cleaned} id="${id}">${inner}</${tag}>`;
    },
  );

  next = next.replace(/<pre>([\s\S]*?)<\/pre>/gi, (_, inner: string) => {
    if (inner.includes('class="blog-code"') || /blog-code/.test(next)) {
      return `<pre>${inner}</pre>`;
    }
    return `<div class="blog-code"><pre>${inner}</pre></div>`;
  });

  // Avoid double-wrapping already enhanced pre blocks
  next = next.replace(
    /<div class="blog-code"><div class="blog-code">([\s\S]*?)<\/div><\/div>/gi,
    `<div class="blog-code">$1</div>`,
  );

  return { html: next, toc };
}

export function estimateReadingMinutes(text: string) {
  const words = text
    .replace(/<[^>]+>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
