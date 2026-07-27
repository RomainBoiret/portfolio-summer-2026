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
    accentColor: "#1a2744",
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
    ],
    githubUrl:
      "https://github.com/RomainBoiret/Fidelio",
    liveUrl: "https://fidelio-sand.vercel.app/",
    featured: true,
    accentColor: "#2a1f4d",
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
    accentColor: "#3d2b1f",
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
    accentColor: "#0e6b6d",
  },
  {
    slug: "pokepark",
    title: "PokePark",
    year: "2024",
    category: "Games",
    technologies: [
      "Java",
      "JSON",
    ],
    githubUrl: "https://github.com/RomainBoiret/PokePark",
    accentColor: "#7a1f3d",
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
    accentColor: "#5b2c6f",
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
    accentColor: "#1d4e4f",
  },
];

export const projectCategories: Array<ProjectCategory | "All"> = [
  "All",
  "Apps",
  "Utilities",
  "Games",
];