export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "email" | "instagram";
};

export type ProjectCategory = "Games" | "Utilities" | "Apps";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: string;
  category: ProjectCategory;
  technologies: string[];
  highlights?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  accentColor: string;
};

export type EducationItem = {
  id: string;
  school: string;
  startDate: string;
};
