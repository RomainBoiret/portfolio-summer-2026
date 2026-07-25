---
title: Ce que j’optimise en premier
description: Un ordre d’attaque concret quand une page paraît lente : bien mesurer, protéger le LCP, réduire le JavaScript, puis affiner.
date: 2026-06-12
tags:
  - performance
  - frontend
  - apprentissage
---

Quand une page paraissait lente, j’ouvrais DevTools et je modifiais des réglages au hasard. Aujourd’hui, je suis un ordre simple. Le simple va plus vite.

## 1. Mesurer le bon build

Le `next dev` local induit en erreur. Les extensions aussi. Mesurez d’abord un aperçu de production en navigation privée. Si le score est déjà solide, arrêtez d’optimiser des fantômes.

## 2. Protéger le LCP

Ce qui s’affiche comme plus grand élément ne doit pas démarrer invisible. Un titre qui apparaît depuis `opacity: 0` est une erreur classique. Gardez le nœud LCP lisible dès le premier rendu, puis animez le reste.

## 3. Couper le JavaScript inutile au premier chargement

Le découpage des routes aide. Garder les outils du blog hors de l’accueil aide davantage. Demandez-vous si ce code doit vraiment s’exécuter avant que le visiteur s’en soucie.

## 4. Différer la décoration

L’atmosphère - formes, léger parallaxe, illustrations en arrière-plan - peut attendre `requestIdleCallback`. On pardonne une décoration absente. On remarque un titre en retard.

## 5. Ensuite seulement les gains secondaires

Fallbacks de polices, tailles d’images, en-têtes de cache. Utiles, mais rarement le premier goulot sur un site de contenu.

La performance est une décision produit : qu’est-ce qui mérite l’attention dans la première seconde, et qu’est-ce qui peut arriver une fois la confiance établie.
