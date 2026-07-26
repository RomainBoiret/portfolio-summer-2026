"use client";

import * as React from "react";
import { Container } from "@/components/typography";
import { TitleReveal, Reveal } from "@/components/motion/reveal";
import { AccentRule, CategoryChip } from "@/components/design/ornaments";
import { projectCategories } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types";
import type { ProjectsCopy } from "@/i18n/chrome";
import type { Locale } from "@/i18n/config";
import { GithubStatsStrip } from "@/components/home/github-stats-strip";
import type { GithubStats } from "@/lib/github-stats";
import { interpolate } from "@/lib/interpolate";
import { IconChevronLeft, IconChevronRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type CardLabels = {
  category: string;
  github: string;
  liveSite: string;
  githubAria: string;
  liveAria: string;
};

function ProjectLinks({
  project,
  labels,
}: {
  project: Project;
  labels: CardLabels;
}) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-white">
      {project.githubUrl ? (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={labels.githubAria}
          className="underline decoration-white/50 underline-offset-4 transition-colors hover:decoration-accent"
        >
          {labels.github}
        </a>
      ) : null}
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={labels.liveAria}
          className="underline decoration-white/50 underline-offset-4 transition-colors hover:decoration-accent"
        >
          {labels.liveSite}
        </a>
      ) : null}
    </div>
  );
}

function DecorPanel({ label }: { label: string }) {
  return (
    <div
      aria-hidden
      className="relative min-h-[7rem] overflow-hidden border-t border-white/10 lg:min-h-0 lg:w-[42%] lg:shrink-0 lg:border-l lg:border-t-0"
    >
      <span className="absolute -right-10 -top-12 h-44 w-44 rounded-full border border-white/20 transition-transform duration-500 group-hover:scale-105" />
      <span className="absolute bottom-8 left-8 h-12 w-12 rotate-12 border-2 border-white/25" />
      <span className="absolute right-14 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white/35" />
      <span className="absolute left-[40%] top-8 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-white/45">
        {label}
      </span>
    </div>
  );
}

function LeadProject({
  project,
  labels,
}: {
  project: Project;
  labels: CardLabels;
}) {
  const primaryHref = project.liveUrl ?? project.githubUrl;

  return (
    <article
      className="project-card project-item group flex min-h-[16rem] flex-col overflow-hidden text-white sm:min-h-[18rem] lg:min-h-[20rem] lg:flex-row"
      style={{ backgroundColor: project.accentColor }}
    >
      <div className="relative z-10 flex flex-1 flex-col justify-between gap-6 p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryChip>{labels.category}</CategoryChip>
          <span className="text-[0.7rem] uppercase tracking-[0.16em] text-white/85">
            {project.year}
          </span>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <h3 className="max-w-2xl text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            {primaryHref ? (
              <a
                href={primaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h3>
          <p className="max-w-xl text-sm leading-relaxed text-white/92 sm:text-base">
            {project.summary}
          </p>
          {project.highlights && project.highlights.length > 0 ? (
            <ul className="hidden flex-wrap gap-x-5 gap-y-2 pt-1 sm:flex">
              {project.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-[0.8rem] text-white/88"
                >
                  <span
                    aria-hidden
                    className="size-1 shrink-0 rounded-full bg-accent"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="space-y-4">
          <ul className="hidden flex-wrap gap-2 sm:flex">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="border border-white/35 px-2 py-0.5 text-[0.68rem] uppercase tracking-[0.08em] text-white/90"
              >
                {tech}
              </li>
            ))}
          </ul>
          <ProjectLinks project={project} labels={labels} />
        </div>
      </div>

      <DecorPanel label={project.category} />
    </article>
  );
}

function SelectedCard({
  project,
  labels,
}: {
  project: Project;
  labels: CardLabels;
}) {
  const primaryHref = project.liveUrl ?? project.githubUrl;

  return (
    <article
      className="project-card project-item flex h-full min-h-[18rem] flex-col justify-between p-6 text-white sm:min-h-[22rem] sm:p-8"
      style={{ backgroundColor: project.accentColor }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <CategoryChip>{labels.category}</CategoryChip>
        <span className="text-[0.7rem] uppercase tracking-[0.16em] text-white/85">
          {project.year}
        </span>
      </div>

      <div className="mt-8 space-y-3 sm:space-y-4">
        <h3 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
          {primaryHref ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-white/92 sm:text-[0.95rem]">
          {project.summary}
        </p>
        {project.highlights && project.highlights.length > 0 ? (
          <ul className="hidden space-y-1.5 pt-1 sm:block">
            {project.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[0.8rem] leading-snug text-white/88"
              >
                <span
                  aria-hidden
                  className="mt-1.5 size-1 shrink-0 rounded-full bg-accent"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="mt-8 space-y-4">
        <ul className="hidden flex-wrap gap-2 sm:flex">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="border border-white/35 px-2 py-0.5 text-[0.68rem] uppercase tracking-[0.08em] text-white/90"
            >
              {tech}
            </li>
          ))}
        </ul>
        <ProjectLinks project={project} labels={labels} />
      </div>
    </article>
  );
}

function MoreCard({
  project,
  labels,
}: {
  project: Project;
  labels: CardLabels;
}) {
  const primaryHref = project.liveUrl ?? project.githubUrl;

  return (
    <article
      className="project-card project-item flex h-full min-h-[15rem] flex-col justify-between p-5 text-white sm:min-h-[17rem] sm:p-6"
      style={{ backgroundColor: project.accentColor }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <CategoryChip>{labels.category}</CategoryChip>
        <span className="text-[0.7rem] uppercase tracking-[0.16em] text-white/85">
          {project.year}
        </span>
      </div>

      <div className="mt-5 space-y-2 sm:mt-6">
        <h3 className="text-xl font-extrabold leading-tight tracking-tight sm:text-2xl">
          {primaryHref ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-white/90">
          {project.summary}
        </p>
      </div>

      <div className="mt-5 space-y-4">
        <ul className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="border border-white/35 px-2 py-0.5 text-[0.68rem] uppercase tracking-[0.08em] text-white/90"
            >
              {tech}
            </li>
          ))}
        </ul>
        <ProjectLinks project={project} labels={labels} />
      </div>
    </article>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <AccentRule />
      <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-accent-text">
        {children}
      </p>
    </div>
  );
}

function CarouselButton({
  direction,
  label,
  onClick,
}: {
  direction: "prev" | "next";
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="icon-btn inline-flex border-border"
    >
      {direction === "prev" ? <IconChevronLeft /> : <IconChevronRight />}
    </button>
  );
}

function ProjectsCarousel({
  projects,
  copy,
  labelFor,
}: {
  projects: Project[];
  copy: ProjectsCopy;
  labelFor: (project: Project) => CardLabels;
}) {
  const COPIES = 3;
  const MID = 1; // start on the center copy

  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const jumpingRef = React.useRef(false);
  const rafRef = React.useRef<number | null>(null);
  const [active, setActive] = React.useState(0);

  const looped = React.useMemo(() => {
    const sets: Project[] = [];
    for (let i = 0; i < COPIES; i += 1) {
      sets.push(...projects);
    }
    return sets;
  }, [projects]);

  const getMetrics = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el || projects.length === 0) {
      return { step: 320, setWidth: 320 * Math.max(projects.length, 1) };
    }
    const first = el.querySelector<HTMLElement>("[data-carousel-item]");
    const styles = window.getComputedStyle(el);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "16") || 16;
    const step = (first?.offsetWidth ?? 300) + gap;
    return { step, setWidth: step * projects.length };
  }, [projects.length]);

  const prefersReduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const normalizeLoop = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el || jumpingRef.current || projects.length === 0) return;

    const { step, setWidth } = getMetrics();
    if (step <= 0 || setWidth <= 0) return;

    let left = el.scrollLeft;
    // Keep the viewport inside the middle copy: [setWidth, setWidth * 2).
    const min = setWidth;
    const max = setWidth * (COPIES - 1);

    if (left < min || left >= max) {
      jumpingRef.current = true;
      el.classList.add("is-jumping");

      while (left < min) left += setWidth;
      while (left >= max) left -= setWidth;

      el.scrollLeft = left;

      requestAnimationFrame(() => {
        el.classList.remove("is-jumping");
        jumpingRef.current = false;
      });
    }

    const raw = Math.round(el.scrollLeft / step);
    setActive(((raw % projects.length) + projects.length) % projects.length);
  }, [getMetrics, projects.length]);

  const scheduleNormalize = React.useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      normalizeLoop();
    });
  }, [normalizeLoop]);

  // Land on the center copy so both directions have a long runway.
  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el || projects.length === 0) return;

    jumpingRef.current = true;
    el.classList.add("is-jumping");
    const { setWidth } = getMetrics();
    el.scrollLeft = setWidth * MID;

    requestAnimationFrame(() => {
      el.classList.remove("is-jumping");
      jumpingRef.current = false;
      setActive(0);
    });
  }, [projects, getMetrics]);

  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => scheduleNormalize();
    const onScrollEnd = () => normalizeLoop();

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("resize", onScrollEnd);

    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("resize", onScrollEnd);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [normalizeLoop, scheduleNormalize]);

  const scrollByDir = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const { step } = getMetrics();
    if (step <= 0) return;
    // Snap to the nearest card, then step - avoids fighting scroll-snap mid-gesture.
    const current = Math.round(el.scrollLeft / step) * step;
    el.scrollTo({
      left: current + dir * step,
      behavior: prefersReduced() ? "auto" : "smooth",
    });
  };

  const goToLogical = (logicalIndex: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const { step, setWidth } = getMetrics();
    el.scrollTo({
      left: setWidth * MID + logicalIndex * step,
      behavior: prefersReduced() ? "auto" : "smooth",
    });
  };

  return (
    <div className="projects-carousel">
      <div className="mb-4 flex items-end justify-between gap-4 sm:mb-5">
        <SectionLabel>{copy.moreWork}</SectionLabel>
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden font-mono text-[0.75rem] text-muted-foreground sm:inline">
            {String(active + 1).padStart(2, "0")}
            <span aria-hidden> / </span>
            {String(projects.length).padStart(2, "0")}
          </span>
          <CarouselButton
            direction="prev"
            label={copy.carouselPrev}
            onClick={() => scrollByDir(-1)}
          />
          <CarouselButton
            direction="next"
            label={copy.carouselNext}
            onClick={() => scrollByDir(1)}
          />
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollerRef}
          className="projects-carousel-track flex gap-3 overflow-x-auto pb-2 sm:gap-4"
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label={copy.moreWork}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              scrollByDir(-1);
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              scrollByDir(1);
            }
          }}
        >
          {looped.map((project, index) => (
            <div
              key={`${project.slug}-${index}`}
              data-carousel-item
              className="projects-carousel-item shrink-0"
            >
              <MoreCard project={project} labels={labelFor(project)} />
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-4 flex max-w-full justify-center overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-5"
        role="tablist"
        aria-label={copy.moreWork}
      >
        <div className="flex items-center gap-0.5 px-1 sm:gap-1.5">
          {projects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-label={project.title}
              className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full sm:size-10"
              onClick={() => goToLogical(index)}
            >
              <span
                aria-hidden
                className={cn(
                  "rounded-full transition-[width,background-color] duration-300",
                  active === index
                    ? "h-1.5 w-4 bg-accent sm:w-6"
                    : "h-1.5 w-1.5 bg-border-strong hover:bg-muted-foreground",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function runFilterTransition(update: () => void) {
  update();
}

function labelsFor(project: Project, copy: ProjectsCopy): CardLabels {
  return {
    category: copy.categories[project.category],
    github: copy.github,
    liveSite: copy.liveSite,
    githubAria: interpolate(copy.githubAria, { title: project.title }),
    liveAria: interpolate(copy.liveAria, { title: project.title }),
  };
}

function ProjectFilterBar({
  filter,
  labels,
  ariaLabel,
  onChange,
}: {
  filter: ProjectCategory | "All";
  labels: Record<ProjectCategory | "All", string>;
  ariaLabel: string;
  onChange: (category: ProjectCategory | "All") => void;
}) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const btnRefs = React.useRef(new Map<string, HTMLButtonElement>());
  const [thumb, setThumb] = React.useState({
    left: 0,
    width: 0,
    ready: false,
  });

  const updateThumb = React.useCallback(() => {
    const track = trackRef.current;
    const btn = btnRefs.current.get(filter);
    if (!track || !btn) return;
    const trackRect = track.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setThumb({
      left: btnRect.left - trackRect.left + track.scrollLeft,
      width: btnRect.width,
      ready: true,
    });

    // Keep the active chip visible without shifting the page vertically.
    const overflowLeft = btnRect.left < trackRect.left + 4;
    const overflowRight = btnRect.right > trackRect.right - 4;
    if (overflowLeft || overflowRight) {
      track.scrollTo({
        left:
          track.scrollLeft +
          (btnRect.left - trackRect.left) -
          (trackRect.width - btnRect.width) / 2,
        behavior: "smooth",
      });
    }
  }, [filter]);

  React.useLayoutEffect(() => {
    updateThumb();
  }, [updateThumb, labels]);

  React.useEffect(() => {
    const track = trackRef.current;
    const onResize = () => updateThumb();
    window.addEventListener("resize", onResize);
    track?.addEventListener("scroll", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      track?.removeEventListener("scroll", onResize);
    };
  }, [updateThumb]);

  return (
    <div
      ref={trackRef}
      className="project-filter"
      role="group"
      aria-label={ariaLabel}
    >
      <span
        aria-hidden
        className={cn("project-filter-thumb", thumb.ready && "is-ready")}
        style={{
          width: thumb.width,
          transform: `translate3d(${thumb.left}px, 0, 0)`,
        }}
      />
      {projectCategories.map((category) => {
        const selected = filter === category;
        return (
          <button
            key={category}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(category)}
            ref={(node) => {
              if (node) btnRefs.current.set(category, node);
              else btnRefs.current.delete(category);
            }}
            className={cn(
              "project-filter-label",
              selected && "is-active",
            )}
          >
            {labels[category]}
          </button>
        );
      })}
    </div>
  );
}

export function ProjectsSection({
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
  const [filter, setFilter] = React.useState<ProjectCategory | "All">("All");
  const [animKey, setAnimKey] = React.useState(0);

  const visibleProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  const selected = visibleProjects.filter((project) => project.featured);
  const more = visibleProjects.filter((project) => !project.featured);
  const [lead, ...selectedRest] = selected;

  const changeFilter = (category: ProjectCategory | "All") => {
    runFilterTransition(() => {
      setFilter(category);
      setAnimKey((value) => value + 1);
    });
  };

  return (
    <section id="projects" className="section-panel relative z-10">
      <Container className="relative">
        <TitleReveal
          align="right"
          className="section-title text-left sm:text-right"
        >
          {copy.title}
        </TitleReveal>

        <div className="mt-6 sm:mt-8">
          <div className="flex sm:justify-end">
            <ProjectFilterBar
              filter={filter}
              labels={copy.categories}
              ariaLabel={copy.filterLabel}
              onChange={changeFilter}
            />
          </div>

          <div
            key={animKey}
            className="projects-grid mt-8 space-y-12 sm:mt-12 sm:space-y-14"
          >
            {filter === "All" && lead ? (
              <Reveal>
                <div>
                  <div className="mb-4 sm:mb-5">
                    <SectionLabel>{copy.selectedWork}</SectionLabel>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <div
                      className="project-filter-cell"
                      style={
                        {
                          viewTransitionName: `project-${lead.slug}`,
                          animationDelay: "0ms",
                        } as React.CSSProperties
                      }
                    >
                      <LeadProject
                        project={lead}
                        labels={labelsFor(lead, copy)}
                      />
                    </div>

                    {selectedRest.length > 0 ? (
                      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                        {selectedRest.map((project, index) => (
                          <div
                            key={project.slug}
                            className="project-filter-cell"
                            style={
                              {
                                viewTransitionName: `project-${project.slug}`,
                                animationDelay: `${(index + 1) * 50}ms`,
                              } as React.CSSProperties
                            }
                          >
                            <SelectedCard
                              project={project}
                              labels={labelsFor(project, copy)}
                            />
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ) : null}

            {filter === "All" && githubStats ? (
              <GithubStatsStrip
                stats={githubStats}
                copy={copy.githubStats}
                locale={locale}
              />
            ) : null}

            {filter === "All" && more.length > 0 ? (
              <Reveal>
                <ProjectsCarousel
                  projects={more}
                  copy={copy}
                  labelFor={(project) => labelsFor(project, copy)}
                />
              </Reveal>
            ) : null}

            {filter !== "All" && visibleProjects.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {visibleProjects.map((project, index) => (
                  <div
                    key={project.slug}
                    className="project-filter-cell"
                    style={
                      {
                        viewTransitionName: `project-${project.slug}`,
                        animationDelay: `${Math.min(index, 8) * 40}ms`,
                      } as React.CSSProperties
                    }
                  >
                    <MoreCard
                      project={project}
                      labels={labelsFor(project, copy)}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
