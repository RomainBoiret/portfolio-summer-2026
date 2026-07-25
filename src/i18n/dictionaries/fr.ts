import type { Dictionary } from "./en";

export const fr: Dictionary = {
  meta: {
    role: "Étudiant en génie logiciel",
    description:
      "Romain Boiret, étudiant en génie logiciel à l’ÉTS Montréal, conçoit des applications web de bout en bout - interfaces, APIs, performance et outils pour développeurs.",
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
    tagline: "Je conçois des logiciels soignés pour le web.",
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
    sayHi: "Me contacter",
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
      empty: "Aucun résultat.",
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
      "Je développe pour le web - des interfaces claires, des systèmes fiables et une attention particulière aux détails.",
    paragraphs: [
      "Je suis étudiant en génie logiciel à l’École de Technologie Supérieure, à Montréal. Ce qui m’intéresse, c’est le web dans son ensemble : frontend et backend, APIs, données, et les choix de performance qui déterminent le ressenti d’un produit.",
      "Je travaille avec Vue, React, TypeScript, CSS et Node.js, et je mène les projets des premiers prototypes jusqu’au déploiement. En parallèle, je dirige les communications et le design d’un club étudiant, et je continue de bâtir des outils qui répondent à des besoins concrets.",
    ],
    focusTitle: "Domaines d’intérêt",
    focus: [
      "Applications web full-stack",
      "Performance et fiabilité",
      "APIs et services backend",
      "Systèmes d’interface réutilisables",
      "Applications mobiles avec React Native",
    ],
    education: "Formation",
    involvement: "Implication",
    clubRole: "Responsable communications et design",
    clubBlurb:
      "Je suis responsable de l’identité visuelle du club : site web, articles promotionnels, gabarits, ainsi que le design et les communications au quotidien.",
    skills: "Compétences",
    degree: "B. Ing. génie logiciel",
    present: "Présent",
  },
  projects: {
    title: "Projets",
    filterLabel: "Filtrer par catégorie",
    selectedWork: "Sélection",
    moreWork: "Autres projets",
    carouselPrev: "Afficher les projets précédents",
    carouselNext: "Afficher les projets suivants",
    github: "GitHub",
    liveSite: "Consulter le site",
    githubAria: "Voir le dépôt GitHub de {title}",
    liveAria: "Consulter le site de {title}",
    githubStats: {
      label: "GitHub",
      blurb: "Aperçu des contributions et de l’activité publiques.",
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
        "Une bibliothèque de composants Vue typée qui réduit le travail d’interface répété grâce à des motifs partagés, des thèmes et un mode sombre.",
      pokepark:
        "Un jeu d’exploration en Java dans un parc virtuel, avec interactions Pokémon et état de jeu persistant en JSON.",
      "fishfric-bank":
        "Une démonstration bancaire full-stack pour les comptes, les virements et l’authentification, réalisée avec PHP et SQL.",
      "romainboiret-com":
        "Ce portfolio bilingue, conçu pour la performance, la clarté et un suivi public du travail en cours.",
      fidelio:
        "Un portefeuille React Native qui scanne, organise et retrouve les cartes de fidélité en quelques gestes.",
      "simon-game":
        "Une reprise navigateur de Simon centrée sur le rythme, le retour utilisateur et une boucle de jeu fiable.",
      snake:
        "Un Snake classique en JavaScript, conçu pour travailler collisions, score et mises à jour en temps réel.",
      pong: "Une reprise de Pong en solo ou à deux, centrée sur le ressenti et une architecture simple.",
      "solar-system":
        "Un système solaire 2D interactif pour explorer le mouvement orbital et l’échelle relative dans le navigateur.",
      untitled:
        "Un outil de géométrie générative pour composer des formes colorées et expérimenter avec canvas et le DOM.",
      "teddy-bot":
        "Un robot Discord de modération avec des commandes utiles - l’un de mes premiers services Node.js de bout en bout.",
      "starwars-galaxy":
        "Une expérimentation d’interface Vue autour de la navigation cinématique, du mouvement et d’une mise en page immersive.",
    },
    highlights: {
      "pomikit-ui": [
        "Vue 3 et TypeScript",
        "Systèmes de design partagés",
        "Mode sombre inclus",
        "Conçu pour la réutilisation",
      ],
      "romainboiret-com": [
        "Next.js App Router",
        "Anglais et français",
        "Orienté performance",
      ],
      fidelio: [
        "React Native",
        "Accès rapide aux cartes",
        "Parcours pensés mobile",
      ],
    },
  },
  contact: {
    title: "Contact",
    blurb:
      "Basé à {location}. Ouvert aux stages en génie logiciel et aux échanges sur le développement web, le produit et la performance.",
    profileAria: "Profil {label} de {name}",
    form: {
      eyebrow: "Message",
      title: "Envoyer un message",
      blurb: "Présentez-vous brièvement - je vous répondrai par courriel.",
      name: "Nom",
      email: "Courriel",
      message: "Message",
      required: "obligatoire",
      requiredHint: "Tous les champs sont obligatoires.",
      namePlaceholder: "Alex Martin",
      emailPlaceholder: "alex@entreprise.com",
      messagePlaceholder: "Bonjour Romain, j’aimerais échanger au sujet de…",
      submit: "Envoyer le message",
      sending: "Envoi en cours…",
      successTitle: "Message envoyé",
      success: "Merci - je vous répondrai bientôt.",
      close: "Fermer",
      mailtoFallback: "Vous préférez ouvrir votre client de messagerie ?",
      errorGeneric: "Une erreur est survenue. Veuillez réessayer dans un instant.",
      errorNotConfigured:
        "Le formulaire de contact n’est pas encore disponible. Utilisez le lien courriel ci-dessous.",
      errorName: "Veuillez indiquer votre nom.",
      errorEmail: "Veuillez indiquer une adresse courriel valide.",
      errorMessage: "Veuillez saisir un message.",
    },
  },
  footer: {
    availability: "En recherche d’un stage en génie logiciel.",
    builtWithCare: "Conçu à {city}",
  },
  blog: {
    title: "Blog",
    blurb:
      "Des textes sur le génie logiciel, les décisions de design et les projets en cours.",
    homeTeaser:
      "Quelques articles récents issus du travail en cours. L’archive complète reste accessible en tout temps.",
    metaDescription:
      "Articles de Romain Boiret sur le génie logiciel, le développement web et les projets personnels.",
    empty: "Aucun article publié pour le moment. Revenez bientôt.",
    readingTime: "{minutes} min de lecture",
    backToBlog: "Retour au blog",
    keepReading: "Continuer la lecture",
    topStories: "À la une",
  },
};
