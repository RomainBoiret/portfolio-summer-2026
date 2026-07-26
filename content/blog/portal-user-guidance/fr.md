---
title: Le Web vu à travers Portal : comment guider un utilisateur sans lui parler
description: Comment Portal enseigne ses règles par l’espace, la lumière et l’action - et ce que cela suggère pour l’onboarding web sans monologues d’instruction.
date: 2026-07-14
series: web-through
seriesOrder: 2
tags:
  - portal
  - ux
  - onboarding
  - game-design
  - interaction
---

Il y a quelques semaines, sans raison particulière, j'ai relancé Portal et j'ai rejoué les toutes premières chambres de test - celles qu'on oublie vite une fois qu'on maîtrise le canon à portails, tant elles paraissent évidentes rétrospectivement. Et c'est justement ça qui m'a arrêté : à aucun moment le jeu ne m'explique par écrit ce que je dois faire. Pas de bulle de tutoriel, pas de flèche clignotante, pas de texte flottant disant « appuyez sur clic gauche pour ouvrir un portail bleu ». On se réveille dans une pièce vitrée, on voit un bouton, un cube, une sortie qui s'ouvre quand on pose le cube sur le bouton. On comprend avant même d'avoir lu quoi que ce soit. Ça m'a fait me demander, en repensant à des interfaces web que j'ai construites ou utilisées récemment : est-ce qu'on peut vraiment concevoir quelque chose qui s'enseigne lui-même, sans jamais tout expliquer ?

## Apprendre en faisant, pas en lisant

La première chose qui frappe en rejouant ces chambres, c'est la lenteur assumée de la progression. Le jeu ne donne pas le canon à portails tout de suite : les toutes premières salles se contentent de portails déjà ouverts, fixes, pour qu'on apprenne juste à marcher au travers et à comprendre que l'espace n'est plus linéaire. Ce n'est qu'ensuite qu'on reçoit l'outil pour créer soi-même ces portails, et encore, un seul type au départ. Chaque nouvelle capacité arrive seule, isolée, dans un espace conçu spécifiquement pour qu'on ne puisse rien faire d'autre que la tester. On pourrait appeler ça de la pédagogie, mais ce serait presque trop généreux : c'est surtout une manière de limiter drastiquement le nombre de choses qu'on peut faire à un instant donné, pour que la seule action possible soit aussi la bonne action. Un onboarding web qui afficherait toutes les fonctionnalités d'un produit dès le premier écran fait l'inverse exact de ce choix : il mise sur l'exhaustivité là où Portal mise sur la restriction progressive.

## La lumière, la couleur, la forme comme grammaire

Ce qui remplace le texte, dans Portal, c'est un vocabulaire visuel d'une cohérence presque obsessionnelle. Le bleu et l'orange des portails ne sont jamais interchangeables ni ambigus : une fois qu'on a vu les deux couleurs s'associer à deux extrémités d'un même passage, on n'a plus besoin qu'on nous le rappelle. Les surfaces sur lesquelles on peut poser un portail sont d'un blanc mat et lisse ; celles où c'est impossible ont une texture différente, souvent plus sombre ou plus rugueuse. Les boutons à pression sont ronds, oranges, légèrement surélevés - une forme qui invite déjà, avant toute explication, à ce qu'on pose quelque chose dessus. Aucune de ces décisions n'est un hasard esthétique : chacune encode une règle de gameplay dans une propriété purement visuelle. C'est très proche de ce qu'on cherche à faire dans une interface web bien conçue, quand une couleur signale systématiquement un état (erreur, succès, action possible) et qu'on n'a jamais besoin de lire un mot pour comprendre qu'un bouton est cliquable ou qu'un champ est en erreur.

## Le feedback immédiat, ou pourquoi on comprend sans qu'on nous explique

Un autre ressort essentiel, c'est la rapidité absolue du retour visuel et sonore. Chaque action a une conséquence immédiate et sans ambiguïté : on tire un portail, on entend un son distinct, on voit l'ouverture se dessiner instantanément sur la surface visée. Il n'y a jamais de délai qui laisse planer un doute sur la question « est-ce que ça a marché ? ». C'est exactement le principe qu'on retrouve derrière un bon état de chargement, une micro-animation de validation de formulaire, ou un simple changement de couleur au survol d'un bouton sur le web : le système confirme en temps réel qu'il a bien reçu l'intention de l'utilisateur, avant même que ce dernier ait besoin de se poser la question. Sans ce feedback, l'utilisateur - que ce soit dans un jeu ou sur un site - commence à douter de sa propre compréhension du système, et c'est souvent à ce moment précis qu'il abandonne ou qu'il se met à chercher une aide externe.

## Des contraintes qui orientent plutôt qu'elles n'empêchent

Il y a un concept qui revient souvent dans la littérature de design d'interaction, celui d'« affordance », qu'on doit à Donald Norman : une affordance, dans ce sens, désigne simplement la manière dont la forme d'un objet suggère par elle-même les actions qu'on peut réaliser avec lui, sans qu'on ait besoin qu'on nous l'explique. Une poignée suggère qu'on tire, un bouton-poussoir suggère qu'on appuie. Portal utilise ce principe à un niveau presque architectural : les murs impossibles à traverser avec un portail sont visuellement identifiables avant même qu'on essaie, ce qui évite une bonne partie de la frustration qu'on aurait si on découvrait la règle uniquement par l'échec répété. C'est une forme de prévention de l'erreur plutôt que de correction après coup. Sur le web, on retrouve ce même principe quand un bouton désactivé est visuellement distinct - grisé, sans ombre, curseur différent - plutôt que cliquable mais silencieusement inopérant. Dans les deux cas, l'objectif est le même : éviter que l'utilisateur découvre une limite uniquement en s'y heurtant.

## GLaDOS, une voix pas un manuel

On pourrait croire, en décrivant tout ça, que Portal enseigne dans un silence total. Ce n'est pas vrai : il y a une voix, celle de GLaDOS, qui commente en continu. Mais ce qui est intéressant, c'est que cette voix n'explique presque jamais les mécaniques de jeu à proprement parler. Elle installe un ton - ironique, faussement bienveillant, de plus en plus inquiétant - sans jamais devenir un manuel d'instructions déguisé en personnage. On n'apprend pas comment jouer en l'écoutant ; on apprend une ambiance, une méfiance progressive, une relation. C'est une distinction importante : l'humour et la narration servent ici à donner de la texture émotionnelle à l'expérience, pas à transmettre de l'information fonctionnelle. Beaucoup d'onboardings web tombent dans le piège inverse en confondant ton et instruction - un mascotte sympathique qui débite malgré tout des paragraphes entiers de configuration initiale n'a rien réglé, elle a juste habillé le problème d'un sourire.

## Le playtesting comme moteur de conception

Ce qui m'a le plus marqué en lisant autour du développement de Portal, c'est à quel point rien de tout ce vocabulaire visuel n'est arrivé du premier coup sur une intuition de designer. Kim Swift, l'une des responsables du projet, racontait dans un entretien pour Rock Paper Shotgun que l'équipe avait commencé à tester le jeu dès la première semaine de développement chez Valve, avec une seule salle à moitié terminée. Le studio a ensuite testé le jeu quasiment chaque semaine jusqu'à la sortie, en observant des joueurs en silence plutôt qu'en leur demandant simplement s'ils avaient aimé. Un exemple souvent cité : le personnage de GLaDOS lui-même est en partie né d'un problème de compréhension observé en playtest, où des testeurs terminaient toute une série de chambres de test en disant que c'était un bon tutoriel, sans réaliser qu'ils venaient de terminer le jeu - l'équipe a alors ajouté un antagoniste pour donner un sens et un enjeu à cette progression. Ce n'est pas un détail anecdotique : ça montre que la clarté perçue d'un système, aussi bien pensée soit-elle sur le papier, ne se valide jamais qu'en observant de vraies personnes s'y confronter sans aide.

## Ce que ça dit de l'onboarding web

Ramené au web, ce constat est presque gênant tant on en fait rarement l'effort. La plupart des onboardings de produits numériques sont écrits, puis testés a posteriori si le temps le permet, plutôt que construits itérativement à partir de l'observation de vraies personnes en train de se perdre. On rédige une liste d'étapes, on l'illustre, on l'affiche au premier lancement, et on considère le problème réglé. Ce que Portal suggère, c'est une approche presque inverse : concevoir l'espace et les signaux d'abord, tester en observant où les gens hésitent, et ne rédiger du texte qu'en dernier recours, pour ce qui ne peut vraiment pas se comprendre autrement. Ce n'est pas qu'un texte d'aide soit toujours inutile - il l'est rarement, en réalité, pour des systèmes complexes - mais qu'il devrait être un filet de sécurité, pas la première ligne de défense contre la confusion.

## Les limites de l'analogie

Il faut néanmoins être honnête sur ce que cette comparaison ne couvre pas. Un joueur de Portal accepte, en s'installant devant le jeu, de passer plusieurs heures à en apprendre les règles progressivement ; c'est une part du contrat implicite du médium. Un visiteur de site web, lui, décide en quelques secondes s'il reste ou s'il repart, et n'a signé aucun contrat d'investissement progressif. On ne peut pas se permettre, sur le web, une chambre de test dédiée uniquement à l'apprentissage d'un seul geste avant d'arriver au contenu utile. Il y a aussi une différence dans la manière dont l'échec est traité : un jeu peut faire « échouer en avançant », c'est-à-dire transformer une erreur en information utile pour la suite sans coût réel (on retente le puzzle, sans perte). Un formulaire web mal rempli, une action irréversible mal comprise, peuvent avoir un coût bien réel - une commande perdue, des données effacées. L'analogie éclaire une intention de design, pas une méthode transposable telle quelle.

## Ce que je retiens en tant que dev qui construit des interfaces

Ce qui reste de tout ça, pour moi, c'est moins une recette qu'une question à se poser systématiquement avant d'écrire le moindre texte d'aide : est-ce que ce que je veux expliquer pourrait plutôt se voir, se ressentir ou se déduire d'une action ? Ce n'est pas toujours possible, et il serait naïf de prétendre qu'on peut faire disparaître tout texte explicatif d'une interface complexe. Mais Portal me rappelle qu'expliquer est souvent un aveu d'échec du design plutôt qu'une qualité pédagogique - le texte arrive quand la forme, la couleur ou le geste n'ont pas suffi à porter le sens tout seuls. Ce n'est pas une règle absolue, mais c'est devenu un réflexe que j'essaie de garder avant d'ajouter un tooltip de plus.

## Sources et pistes de lecture

- [Rock Paper Shotgun - RPS Interview: Portal's Kim Swift and Jeep Barnett](https://www.rockpapershotgun.com/rps-interview-portals-kim-swift-and-jeep-barnett)
- [Game Maker's Toolkit (Mark Brown) - Valve's "Secret Weapon"](https://gmtk.substack.com/p/valves-secret-weapon)
- [Game Developer - Analysis of Game Concepts and Player Learning in Portal](https://www.gamedeveloper.com/design/analysis-of-game-concepts-and-player-learning-in-portal)
- [Don Norman (jnd.org) - Affordances and Design](https://jnd.org/affordances-and-design/)
