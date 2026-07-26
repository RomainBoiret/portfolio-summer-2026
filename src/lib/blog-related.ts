import type { BlogPostMeta } from "@/lib/blog-types";

/** Pure related-post ranking used by the blog page. */
export function pickRelatedPosts(
  current: Pick<BlogPostMeta, "slug" | "tags" | "series">,
  others: BlogPostMeta[],
  limit = 3,
): BlogPostMeta[] {
  const candidates = others.filter((post) => post.slug !== current.slug);
  const scored = candidates
    .map((post) => {
      const sameSeries =
        Boolean(current.series) && post.series === current.series ? 10 : 0;
      const sharedTags = post.tags.filter((tag) =>
        current.tags.includes(tag),
      ).length;
      return {
        post,
        score: sameSeries + sharedTags,
      };
    })
    .sort(
      (a, b) =>
        b.score - a.score || b.post.date.localeCompare(a.post.date),
    );

  const related: BlogPostMeta[] = [];
  for (const entry of scored) {
    if (related.length >= limit) break;
    if (entry.score > 0) related.push(entry.post);
  }
  for (const post of candidates) {
    if (related.length >= limit) break;
    if (!related.some((item) => item.slug === post.slug)) related.push(post);
  }
  return related;
}
