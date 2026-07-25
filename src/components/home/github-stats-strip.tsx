"use client";

import type { CSSProperties } from "react";
import { AccentRule } from "@/components/design/ornaments";
import { useRevealOnView } from "@/components/motion/use-reveal-on-view";
import type { GithubStats } from "@/lib/github-stats";
import type { Locale } from "@/i18n/config";
import { interpolate } from "@/lib/interpolate";
import { cn } from "@/lib/utils";

export type GithubStatsCopy = {
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

function formatCount(value: number, locale: Locale): string {
  return value.toLocaleString(locale === "fr" ? "fr-CA" : "en-CA");
}

export function GithubStatsStrip({
  stats,
  copy,
  locale,
}: {
  stats: GithubStats;
  copy: GithubStatsCopy;
  locale: Locale;
}) {
  const { ref, visible } = useRevealOnView<HTMLElement>();

  const metrics = [
    { key: "stars", value: stats.stars, label: copy.stars },
    { key: "followers", value: stats.followers, label: copy.followers },
    {
      key: "repositories",
      value: stats.repositories,
      label: copy.repositories,
    },
    stats.contributions != null
      ? {
          key: "contributions",
          value: stats.contributions,
          label: copy.contributions,
        }
      : null,
  ].filter(Boolean) as Array<{ key: string; value: number; label: string }>;

  const gradeAria = interpolate(copy.gradeAria, {
    grade: stats.grade,
    score: String(stats.gradeScore),
  });

  return (
    <aside
      ref={ref}
      className={cn("github-stats", visible && "is-visible")}
      aria-label={copy.label}
      style={
        {
          "--github-score": stats.gradeScore,
        } as CSSProperties
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="flex items-center gap-4">
          <AccentRule />
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-accent-text">
            {copy.label}
          </p>
        </div>
        <a
          href={stats.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-muted transition-colors hover:text-accent-text"
        >
          {copy.viewProfile}
        </a>
      </div>

      <div className="github-stats-body">
        <div
          className="github-stats-grade"
          role="img"
          aria-label={gradeAria}
        >
          <p className="github-stats-grade-kicker">{copy.grade}</p>
          <p className="github-stats-grade-letter">{stats.grade}</p>
          <div className="github-stats-score" aria-hidden>
            <span className="github-stats-score-fill" />
          </div>
        </div>

        <dl className="github-stats-metrics">
          {metrics.map((metric) => (
            <div key={metric.key} className="github-stats-metric">
              <dt className="github-stats-caption">{metric.label}</dt>
              <dd className="github-stats-value">
                {formatCount(metric.value, locale)}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="github-stats-blurb mt-4 max-w-xl text-sm text-muted-foreground sm:mt-5">
        {copy.blurb}
      </p>
    </aside>
  );
}
