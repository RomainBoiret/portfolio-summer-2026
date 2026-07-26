# Romain Boiret

Portfolio personnel bilingue ([romainboiret.com](https://romainboiret.com)) — Next.js App Router, React 19, TypeScript, Tailwind CSS v4.

## Stack

| Couche | Choix |
|--------|--------|
| Framework | Next.js 15 (App Router, SSG) |
| UI | React 19, Tailwind CSS v4 |
| i18n | Dictionnaires TypeScript (`en` / `fr`), routes préfixées |
| Blog | Markdown → JSON compilé au build |
| Tests | Vitest (+ coverage v8 sur `src/lib` et `src/i18n`) |

## Architecture

```text
src/
  app/                 # Routes Next (layouts, pages, API, RSS, SEO)
  components/          # UI (shell, home, blog, contact, motion…)
  data/                # Données stables (site, projets, about)
  i18n/                # Config locale + dictionnaires + helpers
  lib/                 # Blog, contact, RSS, toasts, easter eggs…
content/blog/          # Source Markdown des articles (en.md / fr.md)
generated/blog/        # Sortie compilée (gitignored, produite au build)
scripts/               # compile-blog.mjs
```

**Flux principal**

1. Le middleware détecte / redirige vers `/en` ou `/fr` (cookie, `Accept-Language`, défaut `en`).
2. Les pages lisent le dictionnaire via `getDictionary(locale)` et les données via `src/data` + `src/i18n/content.ts`.
3. Le blog ne parse **pas** le Markdown à la requête : `scripts/compile-blog.mjs` le transforme en JSON sous `generated/blog/` (hooks `predev` / `prebuild`).
4. L’API `POST /api/contact` valide le payload (honeypot inclus) et envoie le message.

Le shell commun (`AppShell`) porte le header, le footer, le thème, la command palette, le contact modal et les easter eggs / toasts.

## Routes

| Path | Rôle |
|------|------|
| `/` | Redirection locale |
| `/en`, `/fr` | Accueil |
| `/en/blog`, `/fr/blog` | Index des notes |
| `/en/blog/[slug]`, `/fr/blog/[slug]` | Article |
| `/en/feed.xml`, `/fr/feed.xml` | Flux RSS |
| `/api/contact` | Formulaire de contact |
| `sitemap.xml` / `robots.txt` | SEO |

## Internationalisation

- Locales : `en`, `fr` (`src/i18n/config.ts`).
- Copy UI : `src/i18n/dictionaries/{en,fr}.ts` (même forme de clés).
- Projets / social / footer : fusion données `src/data` + dictionnaire (`getLocalizedProjects`, etc.).
- Préférence locale : cookie côté client (évite de bloquer le bfcache avec `Set-Cookie` dans le middleware).

## Blog

Ajoute un dossier `content/blog/<slug>/` avec `en.md` et `fr.md` :

```md
---
title: My post
description: Short summary for SEO and listings.
date: 2026-07-22
tags:
  - learning
draft: false
# Optionnel - rattache l'article à une série
# series: fidelio
# seriesOrder: 1
---

Markdown body here.
```

- Compilation : `npm run compile:blog` (aussi lancée avant `dev` / `build`).
- Pages blog en SSG, isolées du bundle de l’accueil.
- Meta : `slug`, `title`, `description`, `date`, `tags`, `readingMinutes`, `series?`, `seriesOrder?`.
- Titres de séries : `src/data/blog-series.ts`.
- Index éditorial (liste) ; articles avec TOC, progression, related, bandeau série si présent.

## Fonctionnalités notables

- **Thème** clair / sombre (script inline anti-FOUC).
- **Command palette** (navigation + actions + secrets).
- **Contact** : modal + validation partagée API / client.
- **Toasts** + easter eggs (Konami, footer, console).
- **GitHub stats** sur la section projets (fetch serveur).

## Develop

```bash
npm install
npm run dev
```

```bash
npm run preview    # build + start
npm run typecheck
npm run lint
npm test
npm run test:coverage
```

| Script | Rôle |
|--------|------|
| `dev` / `build` / `start` | Cycle Next habituel |
| `compile:blog` | Markdown → `generated/blog` |
| `test` / `test:watch` / `test:coverage` | Vitest |
| `typecheck` | `tsc --noEmit` |

## Contenu éditorial (hors blog)

| Fichier | Contenu |
|---------|---------|
| `src/data/site.ts` | Nom, URL, email, liens sociaux |
| `src/data/projects.ts` | Liste des projets (slug, stack, liens) |
| `src/data/about.ts` | Contenu about structurel |
| `src/i18n/dictionaries/*` | Textes UI + résumés / highlights projets |
