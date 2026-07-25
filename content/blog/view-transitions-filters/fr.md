---
title: View Transitions pour les filtres de projets
description: Comment une petite amélioration progressive rend la grille de projets plus fluide lors d’un changement de catégorie.
date: 2026-06-18
tags:
  - bons-plans
  - css
---

J’ai encapsulé les mises à jour de filtre projets dans `document.startViewTransition` lorsque le navigateur le permet.

Pas de bibliothèque. Pas de framework d’animation. Juste un réarrangement plus doux quand les catégories changent - et un remplacement immédiat si le mouvement réduit est préféré.

L’amélioration progressive a toujours sa place.
