import type { ProjectCategory } from "@/types";

export type Dictionary = {
  meta: {
    role: string;
    description: string;
    keywords: string[];
  };
  site: {
    tagline: string;
    roleLine: string;
    location: string;
    nav: {
      home: string;
      about: string;
      projects: string;
      contact: string;
      blog: string;
    };
    social: {
      email: string;
      github: string;
      linkedin: string;
      instagram: string;
    };
  };
  ui: {
    skipToContent: string;
    seeProjects: string;
    seeNotes: string;
    sayHi: string;
    emailMe: string;
    navigate: string;
    openNav: string;
    closeNav: string;
    navMenu: string;
    goTo: string;
    primaryNav: string;
    sectionProgress: string;
    mobileNav: string;
    footerSocial: string;
    switchToLight: string;
    switchToDark: string;
    switchLocale: string;
    command: {
      open: string;
      placeholder: string;
      empty: string;
      navigation: string;
      notes: string;
      actions: string;
      openContact: string;
      toggleTheme: string;
      hint: string;
    };
    rss: string;
  };
  about: {
    title: string;
    headline: string;
    paragraphs: [string, string];
    focusTitle: string;
    focus: string[];
    education: string;
    involvement: string;
    clubRole: string;
    clubBlurb: string;
    skills: string;
    degree: string;
    present: string;
  };
  projects: {
    title: string;
    filterLabel: string;
    selectedWork: string;
    moreWork: string;
    carouselPrev: string;
    carouselNext: string;
    github: string;
    liveSite: string;
    githubAria: string;
    liveAria: string;
    githubStats: {
      label: string;
      blurb: string;
      contributions: string;
      repositories: string;
      stars: string;
      followers: string;
      grade: string;
      gradeAria: string;
      viewProfile: string;
    };
    categories: Record<ProjectCategory | "All", string>;
    summaries: Record<string, string>;
    highlights: Record<string, string[]>;
  };
  contact: {
    title: string;
    blurb: string;
    profileAria: string;
    form: {
      eyebrow: string;
      title: string;
      blurb: string;
      name: string;
      email: string;
      message: string;
      required: string;
      requiredHint: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      submit: string;
      sending: string;
      successTitle: string;
      success: string;
      close: string;
      mailtoFallback: string;
      errorGeneric: string;
      errorNotConfigured: string;
      errorName: string;
      errorEmail: string;
      errorMessage: string;
    };
  };
  footer: {
    availability: string;
    builtWithCare: string;
  };
  blog: {
    title: string;
    blurb: string;
    homeTeaser: string;
    metaDescription: string;
    empty: string;
    readingTime: string;
    backToBlog: string;
    keepReading: string;
    topStories: string;
    onThisPage: string;
    relatedPosts: string;
    allTags: string;
    clearFilter: string;
    noPostsForTag: string;
    copyCode: string;
    copiedCode: string;
    filterByTag: string;
    seriesLabel: string;
    seriesProgress: string;
    seriesPrevious: string;
    seriesNext: string;
    archiveCount: string;
    allPosts: string;
    searchPlaceholder: string;
  };
};

export const en: Dictionary = {
  meta: {
    role: "Software engineering student",
    description:
      "Romain Boiret is a software engineering student at ÉTS Montréal. He builds web interfaces, personal projects, and writes about design, culture, and how products feel to use.",
    keywords: [
      "software engineering student",
      "ÉTS Montréal",
      "web development",
      "React",
      "Vue",
      "TypeScript",
      "portfolio",
      "Romain Boiret",
    ],
  },
  site: {
    tagline:
      "I like building simple web interfaces that feel good to use - and learning something new with every project.",
    roleLine: "Software engineering student · ÉTS Montréal",
    location: "Montréal, QC",
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      contact: "Contact",
      blog: "Blog",
    },
    social: {
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
      instagram: "Instagram",
    },
  },
  ui: {
    skipToContent: "Skip to content",
    seeProjects: "See projects",
    seeNotes: "Read the blog",
    sayHi: "Say hi",
    emailMe: "Send a message",
    navigate: "Navigate",
    openNav: "Open menu",
    closeNav: "Close menu",
    navMenu: "Site navigation",
    goTo: "Go to",
    primaryNav: "Primary navigation",
    sectionProgress: "Reading progress",
    mobileNav: "Mobile navigation",
    footerSocial: "Social links",
    switchToLight: "Switch to light theme",
    switchToDark: "Switch to dark theme",
    switchLocale: "Change language",
    command: {
      open: "Open search",
      placeholder: "Search pages, posts, and actions…",
      empty: "Nothing matched that search.",
      navigation: "Pages",
      notes: "Blog",
      actions: "Actions",
      openContact: "Write a message",
      toggleTheme: "Switch theme",
      hint: "Search",
    },
    rss: "RSS",
  },
  about: {
    title: "About",
    headline:
      "I care as much about clean code as about the small details that make an interface pleasant.",
    paragraphs: [
      "I’m a software engineering student at École de Technologie Supérieure in Montréal. Most days I’m somewhere between frontend and backend: React, Vue, TypeScript, CSS, Node.js, and the little performance choices that change how a site feels.",
      "I like following a project from a rough idea to something I can ship. Outside class, I help with design and communications for a student club, and I keep building small tools when I want to try an idea for real.",
    ],
    focusTitle: "What I’m into right now",
    focus: [
      "Web apps and interfaces",
      "Making things feel fast and solid",
      "APIs and small backends",
      "Reusable UI components",
      "Mobile apps with React Native",
    ],
    education: "School",
    involvement: "Outside class",
    clubRole: "Communications & design lead",
    clubBlurb:
      "I look after the club’s visual side - website, merch, templates, and day-to-day design.",
    skills: "Tools I use",
    degree: "B.Eng. Software Engineering",
    present: "Present",
  },
  projects: {
    title: "Projects",
    filterLabel: "Filter by category",
    selectedWork: "A few I’m proud of",
    moreWork: "Other things I’ve built",
    carouselPrev: "Show previous projects",
    carouselNext: "Show next projects",
    github: "GitHub",
    liveSite: "Open site",
    githubAria: "View the GitHub repository for {title}",
    liveAria: "Visit the live website for {title}",
    githubStats: {
      label: "GitHub",
      blurb: "A quick look at what I’ve been shipping in public.",
      contributions: "contributions",
      repositories: "repositories",
      stars: "stars",
      followers: "followers",
      grade: "Grade",
      gradeAria: "Overall GitHub grade {grade}, with a score of {score} out of 100",
      viewProfile: "View GitHub profile",
    },
    categories: {
      All: "All",
      Games: "Games",
      Utilities: "Utilities",
      Apps: "Apps",
    },
    summaries: {
      "pomikit-ui":
        "A Nuxt component library I built to get better at reusable UI, Storybook, and tests - with themes and dark mode included.",
      pokepark:
        "A Java exploration game in a virtual park, with Pokémon-style interactions and save data in JSON.",
      "fishfric-bank":
        "A small banking demo with accounts, transfers, and login - my way into PHP and SQL end to end.",
      "romainboiret-com":
        "This site: a bilingual portfolio I keep refining for clarity, speed, and an honest record of what I’m working on.",
      fidelio:
        "A React Native (Expo) app to scan, store, and show loyalty barcodes at checkout - local-first, with a live web demo.",
      "simon-game":
        "A browser remake of Simon, mostly to practice timing, feedback, and a clean game loop.",
      snake:
        "Classic Snake in JavaScript - collisions, scoring, and live updates without overcomplicating it.",
      pong: "Pong for one or two players, focused on feel and a simple structure.",
      "solar-system":
        "A 2D solar system in the browser to play with orbits and relative scale.",
      untitled:
        "A little generative tool for colorful shapes - experimenting with canvas and the DOM.",
      "teddy-bot":
        "A Discord moderation bot with practical commands - one of my first full Node.js services.",
      "starwars-galaxy":
        "A Nuxt experiment around cinematic navigation, motion, and a more immersive layout.",
    },
    highlights: {
      "pomikit-ui": [
        "Nuxt and TypeScript",
        "Reusable components",
        "Dark mode",
        "Storybook and tests",
      ],
      "romainboiret-com": [
        "Next.js App Router",
        "English and French",
        "Built with performance in mind",
      ],
      fidelio: [
        "Expo and React Native",
        "Barcode scan and checkout display",
        "Local-first on device",
      ],
    },
  },
  contact: {
    title: "Contact",
    blurb:
      "I’m in {location}. Happy to talk about internships, the web, design, or just say hello.",
    profileAria: "{label} profile for {name}",
    form: {
      eyebrow: "Message",
      title: "Send a message",
      blurb: "A short note is enough - I’ll reply by email.",
      name: "Name",
      email: "Email",
      message: "Message",
      required: "required",
      requiredHint: "All fields are required.",
      namePlaceholder: "Alex Martin",
      emailPlaceholder: "alex@company.com",
      messagePlaceholder: "Hi Romain, I’d like to chat about…",
      submit: "Send message",
      sending: "Sending…",
      successTitle: "Message sent",
      success: "Thanks - I’ll get back to you soon.",
      close: "Close",
      mailtoFallback: "Prefer to use your email app instead?",
      errorGeneric: "Something went wrong. Mind trying again in a moment?",
      errorNotConfigured:
        "The form isn’t wired up yet. You can still reach me with the email link below.",
      errorName: "Please enter your name.",
      errorEmail: "Please enter a valid email address.",
      errorMessage: "Please enter a message.",
    },
  },
  footer: {
    availability: "Looking for a software engineering internship.",
    builtWithCare: "Made in {city}",
  },
  blog: {
    title: "Blog",
    blurb:
      "Notes on the web, interface design, and what games, films, and music can teach us about how products feel.",
    homeTeaser:
      "A few recent posts. There’s more in the full archive if you want to dig in.",
    metaDescription:
      "Writing by Romain Boiret on web design, culture, and building interfaces as a software engineering student.",
    empty: "No posts yet - check back soon.",
    readingTime: "{minutes} min read",
    backToBlog: "Back to blog",
    keepReading: "Keep reading",
    topStories: "Featured",
    onThisPage: "On this page",
    relatedPosts: "Keep reading",
    allTags: "All",
    clearFilter: "Clear",
    noPostsForTag: "Nothing with that tag yet.",
    copyCode: "Copy code",
    copiedCode: "Copied",
    filterByTag: "Filter by tag",
    seriesLabel: "Series",
    seriesProgress: "{current} of {total}",
    seriesPrevious: "Previous",
    seriesNext: "Next",
    archiveCount: "{count} posts",
    allPosts: "All posts",
    searchPlaceholder: "Search…",
  },
};
