# Romain Boiret

Portfolio personnel - Next.js 15, React 19, TypeScript, Tailwind CSS v4.

## Routes

| Path | Purpose |
|------|---------|
| `/en`, `/fr` | Accueil i18n |
| `/en/blog`, `/fr/blog` | Index des notes |
| `/en/blog/[slug]` | Article (Markdown) |

## Blog

Ajoute un dossier dans `content/blog/<slug>/` avec `en.md` et `fr.md` :

```md
---
title: My post
description: Short summary for SEO and listings.
date: 2026-07-22
tags:
  - learning
draft: false
---

Markdown body here.
```

Les pages blog sont SSG et hors du bundle de l’accueil.

## Develop

```bash
npm install
npm run dev
```

```bash
npm run preview
```
