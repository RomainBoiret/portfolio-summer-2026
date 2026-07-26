---
title: "Le Web vu à travers Minecraft : pourquoi la simplicité est si difficile à concevoir"
description: "Casser un bloc, en poser un autre. Quatre gestes suffisent à faire tenir un monde entier. Ce que cette simplicité apparente m'apprend sur la difficulté réelle de concevoir des systèmes vraiment simples."
date: 2026-07-26
tags:
  - minecraft
  - simplicity
  - systems
  - design-systems
  - game-design
series: web-through
seriesOrder: 5
---

J'ai relancé un monde Minecraft tout neuf l'autre soir, sans vraiment savoir pourquoi - nostalgie, procrastination, un peu des deux. Le générateur de terrain crache un paysage, je frappe un arbre, un bloc de bois tombe au sol dans une petite animation qui n'a pas changé depuis plus d'une décennie. Je pose mes quatre premiers blocs pour un abri de fortune avant la nuit. Rien de tout ça n'est compliqué. Et pourtant, en observant mes propres gestes, je me suis surpris à penser : ce jeu tient debout sur un nombre ridiculement petit de règles. Poser un bloc. Casser un bloc. Combiner des objets dans une grille de fabrication. C'est à peu près tout, au niveau le plus fondamental. Et de ce petit vocabulaire est né un des jeux les plus construits, les plus rejoués, les plus détournés de l'histoire du médium. Ça m'a fait réfléchir à une question qui dépasse largement le jeu vidéo, et qui me hante régulièrement sur mes propres projets : pourquoi les produits qui ont l'air les plus simples sont-ils souvent les plus durs à concevoir ?

## Quatre commandes, un monde entier

Ce qui frappe le plus dans Minecraft, une fois qu'on prend un peu de recul, c'est le rapport disproportionné entre la taille du vocabulaire de base et l'étendue de ce qu'on peut en faire. Poser, casser, combiner, se déplacer : ces quatre verbes suffisent à construire un château, un ordinateur fonctionnel en circuits de redstone, une reproduction à l'échelle d'une ville réelle, ou juste un trou dans le sol pour se cacher des zombies la première nuit. Aucune de ces réalisations n'a nécessité l'ajout d'une nouvelle règle. Tout découle de la combinaison du même petit ensemble d'actions, répété à l'infini, à des échelles différentes. C'est une leçon de conception qu'on retrouve rarement formulée aussi clairement ailleurs : la richesse ne vient pas du nombre de règles, elle vient de la qualité de leur composition entre elles. Un système avec dix règles bien choisies, qui interagissent proprement, produit souvent plus de possibilités qu'un système avec cent règles qui se chevauchent et se contredisent.

## Le bloc comme langage

Le choix du bloc - un cube uniforme, toujours de la même taille, aligné sur une grille - n'est pas un détail technique anodin, c'est peut-être la décision de design la plus importante du jeu. Parce que chaque bloc a exactement les mêmes dimensions et s'aligne toujours de la même façon, n'importe quel bloc peut s'assembler avec n'importe quel autre, sans exception, sans cas particulier à gérer. C'est très exactement le rôle que joue une grille d'espacement dans un design system web - un système à base de 4px ou 8px où chaque composant, chaque marge, chaque espacement est un multiple de la même unité de base. La contrainte de la grille n'appauvrit pas les possibilités, elle les rend combinables. Sans cette contrainte, chaque nouvel élément devrait être négocié individuellement avec tous les éléments existants. Avec elle, la compatibilité est acquise par construction. C'est un principe qu'on sous-estime largement en développement web : la vraie liberté créative ne vient pas de l'absence de contraintes, elle vient de contraintes suffisamment bien choisies pour que tout ce qui les respecte s'articule automatiquement avec le reste.

## Apprendre en expérimentant, pas en lisant un manuel

Minecraft n'a quasiment pas de tutoriel, en tout cas pas dans ses premières années, et c'est resté un trait fondateur de son identité. On apprend en tâtonnant : on essaie de casser un bloc de pierre à mains nues, ça prend un temps ridicule, on comprend qu'il faut un outil ; on jette deux objets dans la grille de craft au hasard et parfois ça produit quelque chose. Ce mode d'apprentissage par expérimentation n'est possible que parce que le système sous-jacent est suffisamment cohérent et prévisible pour qu'une hypothèse formée dans un coin du jeu reste valable ailleurs. Si casser un bloc de pierre demandait une pioche dans une région du monde et une pelle dans une autre, l'expérimentation ne mènerait à rien de généralisable. C'est un vrai parallèle avec l'utilisabilité web : un utilisateur explore une interface en formant des hypothèses ("ce bouton bleu doit être cliquable, comme celui d'avant"), et ces hypothèses ne sont utiles que si le système reste cohérent d'un écran à l'autre. La cohérence n'est pas une option esthétique, c'est la condition qui rend l'apprentissage par exploration possible plutôt que frustrant.

## Ce que Notch a laissé se produire

Il y a une anecdote souvent racontée à propos du développement de Minecraft, rapportée par GameInformer et Kotaku après une conversation en tête-à-tête entre Markus "Notch" Persson et le designer Chris Hecker lors d'une session GDC 2012 (le fameux "fireside chat" avec un feu de cheminée simulé sur un écran). Avant que l'intelligence artificielle de pathfinding ne soit pleinement implémentée pour les créatures du jeu, des animaux prédateurs se sont mis à s'en prendre aux moutons de manière totalement inattendue. Plutôt que de corriger ce comportement pour respecter un plan initial, Persson a choisi de le garder tel quel parce qu'il s'intégrait naturellement à la cohérence du monde. C'est une décision de conception qui va à l'encontre du réflexe naturel de contrôle total : parfois, le système que vous avez construit produit quelque chose que vous n'aviez pas prévu, et la bonne réponse n'est pas de le supprimer par principe, mais de se demander s'il renforce ou trahit l'expérience que vous cherchez à créer. Dans la même conversation, Persson explique aussi pourquoi la gravité de Minecraft ne fonctionne pas de façon réaliste - les montagnes entières ne s'effondrent pas sur elles-mêmes - en expliquant qu'il ne cherchait pas le réalisme mais une expérience "aussi simple que possible et adaptée à ce que fait le joueur". La simplicité, ici, n'est pas un raccourci technique, c'est un objectif de conception assumé et priorisé au-dessus du réalisme.

## Simple ne veut pas dire simpliste

C'est peut-être le point le plus mal compris de toute cette discussion : la simplicité d'un système d'interaction n'a rien à voir avec la pauvreté de ce qu'on peut en tirer. Minecraft est un jeu simple à apprendre et pourtant on y trouve des ordinateurs fonctionnels construits entièrement en circuits de redstone, des reconstitutions historiques à l'échelle, des serveurs entiers dédiés à des économies simulées. La simplicité porte sur l'interface d'entrée - le nombre de règles qu'il faut connaître pour commencer à jouer - pas sur la richesse de ce qui peut en émerger. C'est exactement ce qu'on cherche, ou qu'on devrait chercher, dans un design system web bien construit : un petit nombre de composants primitifs (bouton, champ, carte, grille), simples individuellement, mais capables de se combiner en une quantité de mises en page qu'aucune liste exhaustive ne pourrait prévoir à l'avance. Le danger, dans les deux cas, est le même : ajouter une fonctionnalité, un composant, un bloc qui ne s'articule pas proprement avec l'ensemble existant, parce qu'il répond à un besoin ponctuel plutôt qu'à la cohérence du système. Chaque ajout de ce type ne se contente pas d'ajouter de la complexité localement - il fragilise la prévisibilité de tout ce qui existait avant.

## La prévisibilité, vraie fondation de la créativité

Ce qui permet de construire un ordinateur en redstone dans Minecraft, ce n'est pas la liberté au sens vague du terme, c'est la certitude absolue qu'un bloc de redstone activé se comportera toujours exactement de la même façon, sans exception, sans variation contextuelle. Cette prévisibilité totale est ce qui permet de raisonner à un niveau d'abstraction supérieur - construire une porte logique, puis un additionneur, puis un ordinateur - sans avoir à revérifier sans cesse le comportement de base. En conception d'interface, le même mécanisme est à l'œuvre : un bouton "primaire" qui se comporte différemment d'un écran à l'autre détruit la capacité de l'utilisateur (et du designer suivant qui reprend le projet) à raisonner par analogie. La prévisibilité n'est pas l'ennemie de la créativité, elle en est la condition. On ne construit rien de complexe sur une fondation qui change de comportement selon le contexte.

## Pourquoi c'est si difficile à faire, concrètement

Si je devais résumer pourquoi ce genre de simplicité est si dur à atteindre, ce serait ceci : dire non à un ajout ponctuel qui semble utile à court terme est beaucoup plus difficile que de l'accepter. Chaque fonctionnalité individuelle, prise isolément, a généralement une justification solide. Le problème n'apparaît jamais au niveau d'un seul ajout, il apparaît au niveau du système après le vingtième ajout non coordonné. C'est un travail de discipline plus que de talent : il faut constamment se demander si un nouvel élément renforce le petit ensemble de règles fondamentales déjà en place, ou s'il introduit une exception qui va, à terme, complexifier tout le reste. C'est beaucoup plus facile à dire qu'à appliquer, surtout sous la pression d'un planning ou d'une demande client légitime.

## Les limites de l'analogie

Je dois être honnête sur la nature de mes sources ici : je n'ai pas assisté à cette conversation entre Persson et Hecker, et je m'appuie sur des comptes rendus journalistiques publiés à l'époque, pas sur une transcription intégrale ni sur des propos que j'aurais pu vérifier directement. Je fais donc attention à paraphraser plutôt qu'à citer, et à ne prêter à Notch aucune intention qui dépasserait ce qui a été rapporté. Par ailleurs, il serait excessif de prétendre que Minecraft "est" un design system, ou que Persson concevait son jeu en pensant à des composants d'interface web. Ce sont deux domaines différents. Ce que je fais dans cet article, c'est utiliser un système que je comprends intuitivement - parce que je l'ai beaucoup joué - pour rendre plus concrets des principes de conception qui, autrement, restent souvent abstraits.

## Ce que ça change pour moi

Depuis, avant d'ajouter quoi que ce soit à un projet - un composant, une variante de bouton, une option de configuration - je me pose une question simple : est-ce que ça renforce les règles déjà en place, ou est-ce que ça introduit une exception que je devrai justifier plus tard ? Ce n'est pas toujours suffisant pour trancher, mais ça change au moins la nature de la décision : d'un réflexe d'ajout par défaut à un choix qu'il faut justifier activement.

## Sources et pistes de lecture

- [GamesIndustry.biz - GDC: Notch's Fireside Tales](https://www.gamesindustry.biz/gdc-notchs-fireside-tales)
- [Game Developer - GDC 2012: A few words with Minecraft's Markus 'Notch' Persson](https://www.gamedeveloper.com/design/gdc-2012-a-few-words-with-i-minecraft-i-s-markus-notch-persson)
- [GameInformer - Notch Talks Minecraft Development, Regrets, And Piracy](https://www.gameinformer.com/b/news/archive/2012/03/07/notch-talks-minecraft-development-regrets-and-piracy.aspx)
- [Vitsœ - Les dix principes du bon design de Dieter Rams](https://www.vitsoe.com/us/about/good-design)
