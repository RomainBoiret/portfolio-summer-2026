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
    accentColor: "#5b5bd6",
  },
  {
    slug: "fishfric-bank-remastered",
    title: "Fish&Fric Remastered",
    year: "2026",
    category: "Apps",
    technologies: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Auth.js",
    ],
    githubUrl:
      "https://github.com/RomainBoiret/FishFric-remastered",
    liveUrl: "https://fish-fric-remastered-psi.vercel.app/",
    featured: true,
    accentColor: "#087f8c",
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
    accentColor: "#a34067",
  },
  {
    slug: "northwood-player",
    title: "Northwood Player",
    year: "2026",
    category: "Apps",
    technologies: [
      "Next.js",
      "TypeScript",
      "Electron",
      "Spotify API",
      "Canvas",
    ],
    githubUrl:
      "https://github.com/RomainBoiret/Northwood-Player",
    liveUrl:
      "https://github.com/RomainBoiret/Northwood-Player/releases",
    accentColor: "#4f6b45",
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
    liveUrl: "https://github.com/RomainBoiret/PokePark/releases",
    accentColor: "#c94747",
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
    accentColor: "#c65d2e",
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
    accentColor: "#b89622",
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
    liveUrl: "https://romainboiret.github.io/Solar_System.html/",
    accentColor: "#d97706",
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