import type { Project, ProjectCategory } from "@/types";

/**
 * Featured projects are displayed in the main spotlight.
 * Keep a maximum of three featured projects.
 *
 * All remaining projects are displayed in the “More work” section.
 * Their position in this array determines their display order.
 */
export const projects: Omit<Project, "summary" | "highlights">[] = [
  {
    slug: "pomikit-ui",
    title: "Pomikit UI",
    year: "2026",
    category: "Utilities",
    technologies: [
      "Nuxt.js",
      "Vue 3",
      "TypeScript",
      "Storybook",
      "Vitest",
    ],
    githubUrl: "https://github.com/RomainBoiret/Pomikit-ui",
    liveUrl: "https://romainboiret.github.io/Pomikit-ui/",
    featured: true,
    accentColor: "#15233f",
  },
  {
    slug: "romainboiret-com",
    title: "Portfolio",
    year: "2026",
    category: "Apps",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],
    githubUrl:
      "https://github.com/RomainBoiret/portfolio-summer-2026",
    liveUrl: "https://romainboiret.com",
    featured: true,
    accentColor: "#c45c26",
  },
  {
    slug: "fidelio",
    title: "Fidelio",
    year: "2024",
    category: "Apps",
    technologies: [
      "React Native",
      "TypeScript",
      "Expo",
    ],
    githubUrl:
      "https://github.com/RomainBoiret/Fidelio",
    liveUrl: "https://fidelio-sand.vercel.app/",
    featured: true,
    accentColor: "#6e2f4a",
  },
  {
    slug: "pokepark",
    title: "PokePark",
    year: "2024",
    category: "Games",
    technologies: [
      "Java",
      "Swing",
      "JSON",
      "i18n",
    ],
    githubUrl: "https://github.com/RomainBoiret/PokePark",
    accentColor: "#22593a",
  },
  {
    slug: "fishfric-bank",
    title: "Fish&Fric Bank",
    year: "2024",
    category: "Apps",
    technologies: [
      "PHP",
      "SQL",
      "JavaScript",
      "HTML / CSS",
    ],
    githubUrl:
      "https://github.com/RomainBoiret/FishFric-Bank",
    accentColor: "#0a4d68",
  },
  {
    slug: "starwars-galaxy",
    title: "Star Wars Galaxy",
    year: "2025",
    category: "Apps",
    technologies: [
      "Nuxt.js",
      "Vue 3",
      "TypeScript",
      "Three.js",
    ],
    githubUrl:
      "https://github.com/RomainBoiret/starwars-galaxy",
    accentColor: "#c9a227",
  },
  {
    slug: "solar-system",
    title: "Solar System",
    year: "2024",
    category: "Games",
    technologies: [
      "JavaScript",
      "HTML",
      "CSS",
    ],
    githubUrl:
      "https://github.com/RomainBoiret/Solar_System.html",
    accentColor: "#e07020",
  },
  {
    slug: "teddy-bot",
    title: "Teddy Bot",
    year: "2023",
    category: "Utilities",
    technologies: [
      "Node.js",
      "JavaScript",
      "Discord API",
    ],
    githubUrl:
      "https://github.com/RomainBoiret/Teddy_Bot.js",
    accentColor: "#5865f2",
  },
];

export const projectCategories: Array<ProjectCategory | "All"> = [
  "All",
  "Apps",
  "Utilities",
  "Games",
];