---
title: Les patterns Vue que je réutilise
description: Composables, props claires et quelques habitudes qui aident un petit système d’interface à paraître abouti.
date: 2026-07-08
draft: true
tags:
  - apprentissage
  - vue
---

Je reviens souvent aux mêmes habitudes Vue : des composables sobres, des noms de props simples, et des composants qui ont déjà une présentation correcte par défaut.

## À conserver

- Préférer l’**état local** tant que le partage ne devient pas nécessaire.
- Nommer les événements d’après ce qui s’est produit, pas d’après ce que le parent doit faire.
- Livrer tôt les états vides - ils révèlent la vraie forme du produit.

Les petites bibliothèques s’améliorent quand chaque composant répond clairement à une seule question.
