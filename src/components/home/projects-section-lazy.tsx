"use client";

import dynamic from "next/dynamic";
import type { Project } from "@/types";
import type { ProjectsCopy } from "@/i18n/chrome";
import type { GithubStats } from "@/lib/github-stats";
import type { Locale } from "@/i18n/config";

/** Code-split the heavy projects island off the main home chunk. */
const ProjectsSectionClient = dynamic(
  () =>
    import("@/components/home/projects-section").then(
      (mod) => mod.ProjectsSection,
    ),
  { ssr: true },
);

export function ProjectsSectionLazy({
  projects,
  copy,
  githubStats,
  locale,
}: {
  projects: Project[];
  copy: ProjectsCopy;
  githubStats: GithubStats | null;
  locale: Locale;
}) {
  return (
    <ProjectsSectionClient
      projects={projects}
      copy={copy}
      githubStats={githubStats}
      locale={locale}
    />
  );
}
