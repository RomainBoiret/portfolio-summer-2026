---
title: Petits jeux, vraies leçons
description: Ce que reconstruire Snake, Pong et Simon m’a appris sur l’état, le retour utilisateur et le fait de terminer un travail.
date: 2026-06-28
tags:
  - jeux
  - javascript
  - apprentissage
---

Je reconstruis encore des jeux navigateur classiques. Pas parce que le monde a besoin d’un autre Snake - parce qu’un petit jeu impose une pensée claire.

## Pourquoi les jeux forment bien

Une boucle de jeu est honnête. Soit la raquette touche la balle, soit elle la rate. Cette clarté enseigne plus vite qu’un autre tableau de bord à moitié terminé.

En refaisant **Snake**, **Pong** et **Simon**, j’ai dû maîtriser :

- la gestion des entrées sans framework
- des mises à jour compatibles avec le framerate
- les collisions et le score comme données simples
- un retour utilisateur immédiat

## Ce qui se transfère au travail produit

Les mêmes réflexes reviennent dans une interface d’application :

- **L’état doit rester simple.** Préférer des valeurs explicites à une mutation trop habile.
- **Le retour fait partie de la fonctionnalité.** Un survol net ou une erreur claire vaut mieux qu’un échec silencieux.
- **Terminer la boucle.** Livrer une petite expérience complète avant d’élargir le périmètre.

## Pourquoi cela a sa place dans un portfolio

Les recruteurs ne joueront peut-être pas. Ils voient qu’on peut démarrer, structurer et livrer. Pour un étudiant, ce signal compte davantage qu’un autre clone de produit inachevé.
