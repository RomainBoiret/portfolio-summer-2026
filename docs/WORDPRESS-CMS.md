# WordPress headless CMS

The Next.js frontend stays on Vercel. Content (projects, articles, editorial texts) can live in WordPress on Hostinger at `cms.romainboiret.com`.

While `WP_URL` is empty, the site uses the current local sources (`content/blog`, `src/data`, dictionaries). Nothing breaks.

## Architecture

```
romainboiret.com  →  Cloudflare DNS  →  Vercel  →  Next.js
cms.romainboiret.com  →  Hostinger  →  WordPress + MariaDB
                                      (plugin: portfolio-cms)
```

## 1. Install WordPress on Hostinger

1. Create the site / subdomain `cms.romainboiret.com`.
2. Install WordPress + MariaDB (Hostinger one-click is fine).
3. Upload the folder [`wordpress/portfolio-cms`](../wordpress/portfolio-cms) as a plugin:
   - Zip the `portfolio-cms` directory, or
   - Copy it to `wp-content/plugins/portfolio-cms`.
4. Activate **Portfolio CMS** in wp-admin.

## 2. Seed demo content

From this repo (with blog compiled):

```bash
npm run compile:blog
npm run export:cms-seed
```

Copy the updated `wordpress/portfolio-cms/seed/content.json` onto the server plugin (or re-upload the plugin zip).

In wp-admin → **Portfolio CMS** → **Import demo content**.

## 3. Configure the plugin

In **Portfolio CMS** settings:

| Field | Value |
|-------|--------|
| Allowed origin (CORS) | `https://romainboiret.com` (and preview URLs if needed) |
| Revalidate URL | `https://romainboiret.com/api/revalidate` |
| Revalidate secret | same random string as Vercel `WP_REVALIDATE_SECRET` |

Smoke-test the API in a browser:

- `https://cms.romainboiret.com/wp-json/portfolio/v1/site`
- `https://cms.romainboiret.com/wp-json/portfolio/v1/posts`
- `https://cms.romainboiret.com/wp-json/portfolio/v1/projects`

## 4. Configure Vercel

Environment variables:

```
WP_URL=https://cms.romainboiret.com
WP_REVALIDATE_SECRET=<same secret as WP>
```

Redeploy. The Next.js app will fetch content from WordPress and keep the same UI.

## 5. Day-to-day editing

| Task | Where |
|------|--------|
| Add / edit / delete a project | wp-admin → Projects |
| Write / edit an article | wp-admin → Articles |
| Change hero, about, contact blurbs | Portfolio CMS → Editorial EN/FR |
| Name, email, socials, skills | Portfolio CMS → Identity / About |
| Change layout / CSS / features | This Next.js repo + Vercel |

On save, the plugin calls `/api/revalidate` so Vercel refreshes cached CMS data.

## 6. Cloudflare DNS (reminder)

- `@` / `www` → Vercel
- `cms` → Hostinger
- SSL mode: **Full (strict)**

## API contract

Namespace: `portfolio/v1`

Bilingual fields use `{ "en": "...", "fr": "..." }` on the same resource (no Polylang).

Types on the Next side: [`src/lib/cms/types.ts`](../src/lib/cms/types.ts).
