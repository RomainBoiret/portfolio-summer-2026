import type { Dictionary } from "./en";

export const fr: Dictionary = {
  meta: {
    role: "Étudiant en génie logiciel",
    description:
      "Romain Boiret, étudiant en génie logiciel à l’ÉTS Montréal. Il construit des interfaces web, des projets perso, et écrit sur le design, la culture et le ressenti des produits.",
    keywords: [
      "étudiant en génie logiciel",
      "ÉTS Montréal",
      "développement web",
      "React",
      "Vue",
      "TypeScript",
      "portfolio",
      "Romain Boiret",
    ],
  },
  site: {
    tagline:
      "J’aime construire des interfaces web simples et agréables à utiliser - et apprendre un peu plus à chaque projet.",
    roleLine: "Étudiant en génie logiciel · ÉTS Montréal",
    location: "Montréal, QC",
    nav: {
      home: "Accueil",
      about: "À propos",
      projects: "Projets",
      contact: "Contact",
      blog: "Blog",
    },
    social: {
      email: "Courriel",
      github: "GitHub",
      linkedin: "LinkedIn",
      instagram: "Instagram",
    },
  },
  ui: {
    skipToContent: "Aller au contenu",
    seeProjects: "Voir les projets",
    seeNotes: "Lire le blog",
    sayHi: "Me dire bonjour",
    emailMe: "Envoyer un message",
    navigate: "Navigation",
    openNav: "Ouvrir le menu",
    closeNav: "Fermer le menu",
    navMenu: "Navigation du site",
    goTo: "Aller à",
    primaryNav: "Navigation principale",
    sectionProgress: "Progression de lecture",
    mobileNav: "Navigation mobile",
    footerSocial: "Réseaux sociaux",
    switchToLight: "Passer au thème clair",
    switchToDark: "Passer au thème sombre",
    switchLocale: "Changer de langue",
    command: {
      open: "Ouvrir la recherche",
      placeholder: "Rechercher des pages, articles ou actions…",
      empty: "Aucun résultat pour cette recherche.",
      navigation: "Pages",
      notes: "Blog",
      actions: "Actions",
      openContact: "Écrire un message",
      toggleTheme: "Changer de thème",
      hint: "Rechercher",
    },
    rss: "RSS",
  },
  about: {
    title: "À propos",
    headline:
      "Je m’intéresse autant au code qu’aux petits détails qui rendent une interface agréable.",
    paragraphs: [
      "Je suis étudiant en génie logiciel à l’École de Technologie Supérieure, à Montréal. La plupart du temps, je suis quelque part entre le frontend et le backend : React, Vue, TypeScript, CSS, Node.js, et les choix de perf qui changent le ressenti d’un site.",
      "J’aime suivre un projet d’une idée un peu floue jusqu’à quelque chose que je peux vraiment publier. En dehors des cours, je m’occupe du design et des communications d’un club étudiant, et je continue de bricoler de petits outils quand une idée me démange.",
    ],
    focusTitle: "Ce qui m’occupe en ce moment",
    focus: [
      "Applications et interfaces web",
      "Rendre les choses rapides et solides",
      "APIs et petits backends",
      "Composants d’interface réutilisables",
      "Apps mobiles avec React Native",
    ],
    education: "École",
    involvement: "En dehors des cours",
    clubRole: "Responsable communications et design",
    clubBlurb:
      "Je m’occupe du côté visuel du club : site, merch, gabarits, et le design au quotidien.",
    skills: "Outils que j’utilise",
    degree: "B. Ing. génie logiciel",
    present: "Présent",
  },
  projects: {
    title: "Projets",
    filterLabel: "Filtrer par catégorie",
    selectedWork: "Quelques projets dont je suis fier",
    moreWork: "D’autres choses que j’ai construites",
    carouselPrev: "Afficher les projets précédents",
    carouselNext: "Afficher les projets suivants",
    github: "GitHub",
    liveSite: "Ouvrir le site",
    githubAria: "Voir le dépôt GitHub de {title}",
    liveAria: "Consulter le site de {title}",
    githubStats: {
      label: "GitHub",
      blurb: "Un aperçu rapide de ce que je publie en public.",
      contributions: "contributions",
      repositories: "dépôts",
      stars: "étoiles",
      followers: "abonnés",
      grade: "Note",
      gradeAria: "Note GitHub globale {grade}, score de {score} sur 100",
      viewProfile: "Voir le profil GitHub",
    },
    categories: {
      All: "Tous",
      Games: "Jeux",
      Utilities: "Utilitaires",
      Apps: "Applications",
    },
    summaries: {
      "pomikit-ui":
        "Une bibliothèque de composants Nuxt que j’ai créée pour mieux comprendre les composants réutilisables, Storybook et les tests - avec thèmes et mode sombre.",
      pokepark:
        "Un jeu d’exploration en Java dans un parc virtuel, avec des interactions façon Pokémon et une sauvegarde en JSON.",
      "fishfric-bank":
        "Une petite démo bancaire avec comptes, virements et connexion - ma façon d’aborder PHP et SQL de bout en bout.",
      "romainboiret-com":
        "Ce site : un portfolio bilingue que je peaufine pour la clarté, la vitesse, et un suivi honnête de ce sur quoi je travaille.",
      fidelio:
        "Une app React Native pour scanner et ranger des cartes de fidélité, histoire de les retrouver facilement.",
      "simon-game":
        "Une reprise de Simon dans le navigateur, surtout pour travailler le rythme, le feedback et une boucle de jeu propre.",
      snake:
        "Un Snake classique en JavaScript - collisions, score et mises à jour en direct, sans tout compliquer.",
      pong: "Pong en solo ou à deux, centré sur le ressenti et une structure simple.",
      "solar-system":
        "Un système solaire 2D dans le navigateur pour jouer avec les orbites et l’échelle.",
      untitled:
        "Un petit outil génératif pour des formes colorées - expérimentation avec canvas et le DOM.",
      "teddy-bot":
        "Un bot Discord de modération avec des commandes utiles - l’un de mes premiers services Node.js complets.",
      "starwars-galaxy":
        "Une expérimentation Nuxt autour de la navigation cinématique, du mouvement et d’une mise en page plus immersive.",
    },
    highlights: {
      "pomikit-ui": [
        "Nuxt et TypeScript",
        "Composants réutilisables",
        "Mode sombre",
        "Storybook et tests",
      ],
      "romainboiret-com": [
        "Next.js App Router",
        "Anglais et français",
        "Pensé pour la perf",
      ],
      fidelio: [
        "React Native",
        "Accès rapide aux cartes",
        "Pensé pour le téléphone",
      ],
    },
  },
  contact: {
    title: "Contact",
    blurb:
      "Je suis à {location}. Ouvert aux stages, aux discussions sur le web et le design, ou juste à un bonjour.",
    profileAria: "Profil {label} de {name}",
    form: {
      eyebrow: "Message",
      title: "Envoyer un message",
      blurb: "Quelques lignes suffisent - je répondrai par courriel.",
      name: "Nom",
      email: "Courriel",
      message: "Message",
      required: "obligatoire",
      requiredHint: "Tous les champs sont obligatoires.",
      namePlaceholder: "Alex Martin",
      emailPlaceholder: "alex@entreprise.com",
      messagePlaceholder: "Bonjour Romain, j’aimerais discuter de…",
      submit: "Envoyer le message",
      sending: "Envoi en cours…",
      successTitle: "Message envoyé",
      success: "Merci - je vous répondrai bientôt.",
      close: "Fermer",
      mailtoFallback: "Vous préférez ouvrir votre messagerie ?",
      errorGeneric: "Une erreur est survenue. Réessayez dans un instant ?",
      errorNotConfigured:
        "Le formulaire n’est pas encore branché. Vous pouvez quand même m’écrire via le lien courriel ci-dessous.",
      errorName: "Indiquez votre nom.",
      errorEmail: "Indiquez une adresse courriel valide.",
      errorMessage: "Saisissez un message.",
    },
  },
  footer: {
    availability: "Je cherche un stage en génie logiciel.",
    builtWithCare: "Fait à {city}",
  },
  blog: {
    title: "Blog",
    blurb:
      "Des notes sur le web, le design d’interfaces, et ce que les jeux, films et musiques peuvent nous apprendre sur le ressenti des produits.",
    homeTeaser:
      "Quelques articles récents. L’archive complète est là si vous voulez fouiller.",
    metaDescription:
      "Textes de Romain Boiret sur le design web, la culture et la construction d’interfaces, en tant qu’étudiant en génie logiciel.",
    empty: "Pas encore d’article - revenez bientôt.",
    readingTime: "{minutes} min de lecture",
    backToBlog: "Retour au blog",
    keepReading: "Continuer",
    topStories: "À la une",
    onThisPage: "Sur cette page",
    relatedPosts: "Continuer",
    allTags: "Tous",
    clearFilter: "Effacer",
    noPostsForTag: "Rien avec ce tag pour l’instant.",
    copyCode: "Copier le code",
    copiedCode: "Copié",
    filterByTag: "Filtrer par tag",
    seriesLabel: "Série",
    seriesProgress: "{current} sur {total}",
    seriesPrevious: "Précédent",
    seriesNext: "Suivant",
    archiveCount: "{count} articles",
    allPosts: "Tous les articles",
    searchPlaceholder: "Rechercher…",
  },
};
