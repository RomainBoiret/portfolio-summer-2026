/** True when the portfolio should read content from WordPress. */
export function isCmsEnabled() {
  return Boolean(process.env.WP_URL?.trim());
}

export function getWpBaseUrl() {
  const raw = process.env.WP_URL?.trim();
  if (!raw) return null;
  return raw.replace(/\/$/, "");
}

export function getRevalidateSecret() {
  return process.env.WP_REVALIDATE_SECRET?.trim() || "";
}

/** Cache tags used by the WP client and /api/revalidate. */
export const CMS_TAGS = {
  all: "cms",
  posts: "cms-posts",
  projects: "cms-projects",
  site: "cms-site",
} as const;
