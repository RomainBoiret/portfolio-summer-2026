import "server-only";

import { cache } from "react";
import type { Locale } from "@/i18n/config";
import type { Project } from "@/types";
import { cmsFetch } from "@/lib/cms/client";
import { CMS_TAGS } from "@/lib/cms/config";
import { pickLocale, type WpProjectDto } from "@/lib/cms/types";

function toProject(dto: WpProjectDto, locale: Locale): Project {
  return {
    slug: dto.slug,
    title: dto.title,
    year: dto.year,
    category: dto.category,
    technologies: dto.technologies ?? [],
    accentColor: dto.accentColor,
    summary: pickLocale(dto.summary, locale) || "",
    highlights: pickLocale(dto.highlights, locale),
    ...(dto.githubUrl ? { githubUrl: dto.githubUrl } : {}),
    ...(dto.liveUrl ? { liveUrl: dto.liveUrl } : {}),
    ...(dto.featured ? { featured: true } : {}),
  };
}

export const fetchWpProjects = cache(
  async (locale: Locale): Promise<Project[]> => {
    const projects = await cmsFetch<WpProjectDto[]>({
      path: `/projects?locale=${locale}`,
      tags: [CMS_TAGS.all, CMS_TAGS.projects],
    });
    return projects.map((project) => toProject(project, locale));
  },
);
