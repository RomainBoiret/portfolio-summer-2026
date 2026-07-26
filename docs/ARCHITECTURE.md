# Architecture (Vercel)

## Runtime

```text
Browser → (Cloudflare DNS) → Vercel → Next.js 15 (SSG)
```

No external CMS. Content ships with the repo and is baked at build time.

## Content sources

| Content | Source | How it reaches the site |
|---------|--------|-------------------------|
| Blog posts | `content/blog/{slug}/{en\|fr}.md` | `scripts/compile-blog.mjs` → `generated/blog` on `predev` / `prebuild` |
| Projects | `src/data/projects.ts` + dictionary summaries | `getLocalizedProjects()` |
| About / skills | `src/data/about.ts` + dictionaries | Home page |
| Site identity | `src/data/site.ts` | Layout, SEO, footer |
| UI / marketing copy | `src/i18n/dictionaries/{en,fr}.ts` | `getDictionary(locale)` |

## Deploy workflow

1. Edit files in the repo.
2. `git push` to GitHub.
3. Vercel builds (`compile-blog` + `next build`) and publishes.

## Env (Vercel)

See `.env.example`:

- `RESEND_*` - contact form
- `GITHUB_TOKEN` - optional richer GitHub stats

## Local

```bash
npm run dev      # compiles blog then starts Next
npm run build    # production build
npm test
```
