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
  };
};

export const en: Dictionary = {
  meta: {
    role: "Software Engineering Student",
    description:
      "Romain Boiret is a software engineering student at ÉTS Montréal building web applications end to end - from interfaces and APIs to performance and developer tools.",
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
    tagline: "Building thoughtful software for the web.",
    roleLine: "Software Engineering Student · ÉTS Montréal",
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
    seeProjects: "Explore projects",
    seeNotes: "Read the blog",
    sayHi: "Get in touch",
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
      empty: "No matches found.",
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
      "I build software for the web - clear interfaces, reliable systems, and careful attention to detail.",
    paragraphs: [
      "I’m a software engineering student at École de Technologie Supérieure in Montréal. My interest covers the full web stack: frontend and backend, APIs, data, and the performance decisions that shape how a product feels in practice.",
      "I work with Vue, React, TypeScript, CSS, and Node.js, and I follow projects from early prototypes through to deployment. Outside of coursework, I lead communications and design for a student club and keep building tools that solve small, concrete problems.",
    ],
    focusTitle: "Areas of focus",
    focus: [
      "Full-stack web applications",
      "Performance and reliability",
      "APIs and backend services",
      "Reusable UI systems and tooling",
      "Mobile apps with React Native",
    ],
    education: "Education",
    involvement: "Involvement",
    clubRole: "Lead, Communications & Design",
    clubBlurb:
      "I own the club’s visual identity - website, merchandise, templates, and day-to-day design and communications.",
    skills: "Skills",
    degree: "B.Eng. Software Engineering",
    present: "Present",
  },
  projects: {
    title: "Projects",
    filterLabel: "Filter by category",
    selectedWork: "Selected work",
    moreWork: "More projects",
    carouselPrev: "Show previous projects",
    carouselNext: "Show next projects",
    github: "GitHub",
    liveSite: "Visit website",
    githubAria: "View the GitHub repository for {title}",
    liveAria: "Visit the live website for {title}",
    githubStats: {
      label: "GitHub",
      blurb: "A snapshot of public contributions and activity.",
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
        "A typed Vue component library that reduces repeated UI work with shared patterns, themes, and dark mode.",
      pokepark:
        "A Java exploration game in a virtual park, with Pokémon interactions and persistent JSON game state.",
      "fishfric-bank":
        "A full-stack banking demo for accounts, transfers, and authentication built with PHP and SQL.",
      "romainboiret-com":
        "This bilingual portfolio, designed for performance, clarity, and a public record of ongoing work.",
      fidelio:
        "A React Native wallet that scans, organizes, and retrieves loyalty cards in a few taps.",
      "simon-game":
        "A browser remake of Simon focused on timing, feedback, and a reliable game loop.",
      snake:
        "A classic Snake game in JavaScript, built to practice collision, scoring, and real-time updates.",
      pong: "A Pong remake with single and two-player modes, centered on feel and simple architecture.",
      "solar-system":
        "An interactive 2D solar system for exploring orbital motion and relative scale in the browser.",
      untitled:
        "A generative geometry tool for composing colorful shapes and experimenting with canvas and the DOM.",
      "teddy-bot":
        "A Discord moderation bot with practical server commands - an early end-to-end Node.js service.",
      "starwars-galaxy":
        "A Vue interface experiment exploring cinematic navigation, motion, and immersive layout.",
    },
    highlights: {
      "pomikit-ui": [
        "Vue 3 and TypeScript",
        "Shared design systems",
        "Dark mode included",
        "Built for reuse",
      ],
      "romainboiret-com": [
        "Next.js App Router",
        "English and French",
        "Performance-focused",
      ],
      fidelio: [
        "React Native",
        "Fast card retrieval",
        "Mobile-first flows",
      ],
    },
  },
  contact: {
    title: "Contact",
    blurb:
      "Based in {location}. Open to software engineering internships and conversations about web development, product, and performance.",
    profileAria: "{label} profile for {name}",
    form: {
      eyebrow: "Message",
      title: "Send a message",
      blurb: "Introduce yourself briefly and I’ll get back to you by email.",
      name: "Name",
      email: "Email",
      message: "Message",
      required: "required",
      requiredHint: "All fields are required.",
      namePlaceholder: "Alex Martin",
      emailPlaceholder: "alex@company.com",
      messagePlaceholder: "Hello Romain, I’d like to discuss…",
      submit: "Send message",
      sending: "Sending…",
      successTitle: "Message sent",
      success: "Thanks - I’ll get back to you soon.",
      close: "Close",
      mailtoFallback: "Prefer to use your email client instead?",
      errorGeneric: "Something went wrong. Please try again in a moment.",
      errorNotConfigured:
        "The contact form isn’t available yet. Please use the email link below.",
      errorName: "Please enter your name.",
      errorEmail: "Please enter a valid email address.",
      errorMessage: "Please enter a message.",
    },
  },
  footer: {
    availability: "Currently seeking a software engineering internship.",
    builtWithCare: "Built in {city}",
  },
  blog: {
    title: "Blog",
    blurb:
      "Writing on software engineering, design decisions, and projects in progress.",
    homeTeaser:
      "A few recent posts from ongoing work. The full archive is available anytime.",
    metaDescription:
      "Articles by Romain Boiret on software engineering, web development, and personal projects.",
    empty: "No posts published yet. Check back soon.",
    readingTime: "{minutes} min read",
    backToBlog: "Back to blog",
    keepReading: "Keep reading",
    topStories: "Featured",
  },
};
