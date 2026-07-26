import "server-only";

import { CMS_TAGS, getWpBaseUrl } from "@/lib/cms/config";

type CmsFetchOptions = {
  path: string;
  tags?: string[];
  revalidate?: number | false;
};

export class CmsError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "CmsError";
    this.status = status;
  }
}

export async function cmsFetch<T>({
  path,
  tags = [CMS_TAGS.all],
  revalidate = 60,
}: CmsFetchOptions): Promise<T> {
  const base = getWpBaseUrl();
  if (!base) {
    throw new CmsError("WP_URL is not configured", 500);
  }

  const url = `${base}/wp-json/portfolio/v1${path.startsWith("/") ? path : `/${path}`}`;
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    next: {
      revalidate,
      tags,
    },
  });

  if (!response.ok) {
    throw new CmsError(
      `CMS request failed (${response.status}) for ${path}`,
      response.status,
    );
  }

  return (await response.json()) as T;
}
