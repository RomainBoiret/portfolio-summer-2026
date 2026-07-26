# Romain Boiret

> Personal bilingual portfolio built with **Next.js 15**, **React 19**, **TypeScript** and **Tailwind CSS v4**.

🌍 **Live:** https://romainboiret.com

---

## Stack

| Layer | Technology |
|--------|------------|
| Framework | Next.js 15 (App Router, SSG) |
| UI | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| i18n | Typed dictionaries (`en` / `fr`) |
| Blog | Markdown compiled at build time |
| Testing | Vitest |
| Deployment | GitHub → Vercel |

---

## Architecture

```text
Browser
    │
    ▼
Cloudflare DNS
    │
    ▼
Vercel
    │
    ▼
Next.js 15
    ├── src/data
    ├── generated/blog
    └── API Routes
```

---

## Project Structure

```text
src/
├── app/
├── components/
├── data/
├── i18n/
└── lib/

content/blog/     # Markdown sources
generated/blog/   # Build output (gitignored)
scripts/          # compile-blog.mjs
docs/             # Architecture notes
```
---

## Blog Pipeline

```text
Markdown
    │
compile-blog.mjs
    │
generated/blog
    │
Next.js Build
    │
Vercel
```

---

## Features

- 🌍 English / French localization
- ⚡ Static Site Generation
- 📚 Markdown-powered blog
- 🌙 Dark / Light mode
- 🔍 Command palette
- 📬 Contact API
- 📡 RSS feeds
- 📈 GitHub project statistics
- 🧪 Vitest

---

## Deployment

Every push to `main` automatically deploys a new production version.

```text
git push
    │
    ▼
GitHub
    │
    ▼
Vercel
    │
    ▼
romainboiret.com
```

| Component | Provider |
|-----------|----------|
| Domain | Namecheap |
| DNS | Cloudflare |
| Hosting | Vercel |
| SSL | Vercel |
| CI/CD | GitHub → Vercel |

---

## Development

```bash
npm install
npm run dev
```

Useful commands:

```bash
npm run build
npm run preview
npm run lint
npm run typecheck
npm test
npm run test:coverage
```