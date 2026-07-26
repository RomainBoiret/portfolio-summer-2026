import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { CMS_TAGS, getRevalidateSecret } from "@/lib/cms/config";

/**
 * Called by the WordPress portfolio-cms plugin on content save.
 * Header: `x-portfolio-secret: <WP_REVALIDATE_SECRET>`
 * Body (optional): `{ "tags": ["cms-posts"] }`
 */
export async function POST(request: Request) {
  const secret = getRevalidateSecret();
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "WP_REVALIDATE_SECRET is not configured" },
      { status: 503 },
    );
  }

  const header = request.headers.get("x-portfolio-secret");
  if (header !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let tags: string[] = [CMS_TAGS.all, CMS_TAGS.posts, CMS_TAGS.projects, CMS_TAGS.site];
  try {
    const body = (await request.json()) as { tags?: string[] };
    if (Array.isArray(body.tags) && body.tags.length > 0) {
      tags = body.tags;
    }
  } catch {
    // empty body → revalidate everything
  }

  for (const tag of tags) {
    revalidateTag(tag);
  }

  return NextResponse.json({ ok: true, revalidated: tags });
}
