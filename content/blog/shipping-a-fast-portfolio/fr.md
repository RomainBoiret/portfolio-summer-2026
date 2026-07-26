---
title: Un portfolio rapide, sans le poids habituel
description: Ce qui a réellement amélioré le score Lighthouse de ce site - et quels conseils de performance n’étaient que du bruit.
date: 2026-07-22
series: portfolio-notes
seriesOrder: 3
tags:
  - performance
  - nextjs
  - portfolio
---

J’ai passé quelques jours à améliorer les performances de ce portfolio. Une partie des conseils était utile. Beaucoup mesurait la mauvaise chose.

## Le mode développement n’est pas la production

L’onglet Network de `next dev` a de quoi inquiéter : des mégaoctets de `main-app.js`, un websocket HMR, des chunks non minifiés. Rien de tout cela n’atteint les visiteurs. Mesurez avec :

```bash
npm run preview
```

Puis auditez `/fr` en navigation privée. Cette seule habitude m’a évité d’« optimiser » des problèmes inventés.

## Ce qui a vraiment aidé

- **Garder le code du blog hors de la page d’accueil.** Les articles ont leurs propres routes et ne se chargent que lorsqu’on les ouvre.
- **Ne pas masquer l’élément LCP.** Animer le nom depuis `opacity: 0` retardait le rendu pour rien.
- **Différer la décoration.** Le champ géométrique attend un moment d’inactivité pour ne pas concurrencer le premier affichage.
- **Faire confiance aux navigateurs modernes.** Retirer les polyfills hérités a réduit le poids sans changer l’expérience.

## Ce que j’ignore désormais

Les extensions Chrome dans Lighthouse. Grammarly à lui seul peut inventer du « JavaScript inutilisé » qui n’a rien à voir avec le site.

Le travail sur la performance est plus utile lorsque le score reflète ce que les lecteurs téléchargent vraiment - pas ce qu’un éditeur injecte.
