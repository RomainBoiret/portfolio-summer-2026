"use client";

import { Suspense, useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/typography";
import { Reveal, TitleReveal } from "@/components/motion/reveal";
import { IconChevronDown, IconSearch } from "@/components/ui/icons";
import { getSeriesTitle } from "@/data/blog-series";
import type { BlogPostMeta } from "@/lib/blog-types";
import { formatBlogDate, toneForBlogSlug } from "@/lib/blog-format";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

type IndexCopy = {
  title: string;
  blurb: string;
  empty: string;
  readingTime: string;
  allTags: string;
  clearFilter: string;
  noPostsForTag: string;
  filterByTag: string;
  seriesLabel: string;
  allPosts: string;
  searchPlaceholder: string;
};

function coverMotif(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash + slug.charCodeAt(i) * (i + 1)) % 3;
  }
  return hash;
}

function CoverArt({
  tone,
  slug,
  label,
  variant,
}: {
  tone: string;
  slug: string;
  label: string;
  variant: "featured" | "card";
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "blog-cover",
        `blog-cover-motif-${coverMotif(slug)}`,
        variant === "featured" && "blog-cover-featured",
        variant === "card" && "blog-cover-card",
      )}
      style={{
        backgroundColor: tone,
        viewTransitionName: `blog-media-${slug}`,
      }}
    >
      <span className="blog-cover-mark">{label}</span>
      <span className="blog-cover-arc" />
      <span className="blog-cover-dot" />
      <span className="blog-cover-square" />
    </div>
  );
}

function FeaturedPost({
  locale,
  post,
  copy,
}: {
  locale: Locale;
  post: BlogPostMeta;
  copy: Pick<IndexCopy, "readingTime" | "seriesLabel">;
}) {
  const tone = toneForBlogSlug(post.slug);
  const tag = post.tags[0];
  const seriesTitle = post.seriesTitle
    ? post.seriesTitle
    : post.series
      ? getSeriesTitle(post.series, locale)
      : null;

  return (
    <Reveal className="reveal-soft">
      <Link
        href={`/${locale}/blog/${post.slug}`}
        className="blog-featured group"
      >
        <CoverArt
          tone={tone}
          slug={post.slug}
          label={(tag ?? "notes").toUpperCase()}
          variant="featured"
        />
        <div className="blog-featured-body">
          <div className="blog-card-topline">
            {tag ? <span className="blog-card-kicker">{tag}</span> : null}
            {seriesTitle ? (
              <span className="blog-card-series">
                {copy.seriesLabel} · {seriesTitle}
              </span>
            ) : null}
          </div>
          <h2 className="blog-featured-title">{post.title}</h2>
          <p className="blog-featured-desc">{post.description}</p>
          <p className="blog-card-meta">
            <time dateTime={post.date}>
              {formatBlogDate(post.date, locale)}
            </time>
            <span aria-hidden>·</span>
            <span>
              {copy.readingTime.replace(
                "{minutes}",
                String(post.readingMinutes),
              )}
            </span>
          </p>
        </div>
      </Link>
    </Reveal>
  );
}

function GridCard({
  locale,
  post,
  index,
  copy,
}: {
  locale: Locale;
  post: BlogPostMeta;
  index: number;
  copy: Pick<IndexCopy, "readingTime" | "seriesLabel">;
}) {
  const tone = toneForBlogSlug(post.slug);
  const tag = post.tags[0];
  const seriesTitle = post.seriesTitle
    ? post.seriesTitle
    : post.series
      ? getSeriesTitle(post.series, locale)
      : null;

  return (
    <Reveal delay={Math.min(index, 5) * 0.04} className="reveal-soft">
      <Link
        href={`/${locale}/blog/${post.slug}`}
        className="blog-grid-card group"
      >
        <CoverArt
          tone={tone}
          slug={post.slug}
          label={(tag ?? "notes").toUpperCase()}
          variant="card"
        />
        <div className="blog-grid-card-body">
          <div className="blog-card-topline">
            {tag ? <span className="blog-card-kicker">{tag}</span> : null}
            {seriesTitle ? (
              <span className="blog-card-series">
                {copy.seriesLabel} · {seriesTitle}
              </span>
            ) : null}
          </div>
          <h2 className="blog-grid-card-title">{post.title}</h2>
          <p className="blog-grid-card-desc">{post.description}</p>
          <p className="blog-card-meta">
            <time dateTime={post.date}>
              {formatBlogDate(post.date, locale)}
            </time>
            <span aria-hidden>·</span>
            <span>
              {copy.readingTime.replace(
                "{minutes}",
                String(post.readingMinutes),
              )}
            </span>
          </p>
        </div>
      </Link>
    </Reveal>
  );
}

function TagSelect({
  tags,
  value,
  allLabel,
  label,
  onChange,
}: {
  tags: string[];
  value: string | null;
  allLabel: string;
  label: string;
  onChange: (tag: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const display = value ?? allLabel;

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={cn("blog-tag-select", open && "is-open", value && "has-value")}
    >
      <button
        type="button"
        className="blog-tag-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={label}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="blog-tag-select-value">{display}</span>
        <IconChevronDown className="blog-tag-select-caret" />
      </button>

      {open ? (
        <ul
          id={listId}
          className="blog-tag-select-menu"
          role="listbox"
          aria-label={label}
        >
          <li role="option" aria-selected={!value}>
            <button
              type="button"
              className={cn("blog-tag-select-option", !value && "is-active")}
              onClick={() => {
                onChange(null);
                setOpen(false);
              }}
            >
              {allLabel}
            </button>
          </li>
          {tags.map((tag) => (
            <li key={tag} role="option" aria-selected={value === tag}>
              <button
                type="button"
                className={cn(
                  "blog-tag-select-option",
                  value === tag && "is-active",
                )}
                onClick={() => {
                  onChange(tag);
                  setOpen(false);
                }}
              >
                {tag}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function BlogIndexBody({
  locale,
  posts,
  copy,
}: {
  locale: Locale;
  posts: BlogPostMeta[];
  copy: IndexCopy;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const allTags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of posts) {
      for (const tag of post.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag]) => tag);
  }, [posts]);

  const latest = posts[0];
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (activeTag && !post.tags.includes(activeTag)) return false;
      if (!needle) return true;
      const haystack = [
        post.title,
        post.description,
        ...post.tags,
        post.series ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [posts, activeTag, query]);

  const featured = latest;
  const gridPosts = filtered.filter((post) => post.slug !== latest?.slug);

  const replaceParams = (next: { tag?: string | null; q?: string | null }) => {
    const params = new URLSearchParams(searchParams.toString());
    if ("tag" in next) {
      if (next.tag) params.set("tag", next.tag);
      else params.delete("tag");
    }
    if ("q" in next) {
      if (next.q) params.set("q", next.q);
      else params.delete("q");
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <>
      {featured ? (
        <div className="mt-10 sm:mt-12">
          <FeaturedPost locale={locale} post={featured} copy={copy} />
        </div>
      ) : null}

      <div className="blog-index-toolbar mt-10 sm:mt-12">
        <p className="blog-index-toolbar-title">{copy.allPosts}</p>
        <div className="blog-index-controls">
          <TagSelect
            tags={allTags}
            value={activeTag}
            allLabel={copy.allTags}
            label={copy.filterByTag}
            onChange={(tag) => replaceParams({ tag })}
          />

          <label className="blog-search">
            <span className="sr-only">{copy.searchPlaceholder}</span>
            <IconSearch />
            <input
              type="search"
              value={query}
              onChange={(event) => {
                const value = event.target.value;
                setQuery(value);
                replaceParams({ q: value.trim() ? value : null });
              }}
              placeholder={copy.searchPlaceholder}
              autoComplete="off"
            />
          </label>
        </div>
      </div>

      {posts.length === 0 ? (
        <Reveal className="reveal-soft mt-10">
          <p className="text-muted">{copy.empty}</p>
        </Reveal>
      ) : gridPosts.length === 0 && (activeTag || query.trim()) ? (
        <Reveal className="reveal-soft mt-10">
          <p className="text-muted">{copy.noPostsForTag}</p>
        </Reveal>
      ) : gridPosts.length > 0 ? (
        <div className="blog-post-grid mt-8 sm:mt-10">
          {gridPosts.map((post, index) => (
            <GridCard
              key={post.slug}
              locale={locale}
              post={post}
              index={index}
              copy={copy}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}

export function BlogIndex({
  locale,
  posts,
  copy,
}: {
  locale: Locale;
  posts: BlogPostMeta[];
  copy: IndexCopy;
}) {
  return (
    <div className="page-atmosphere relative pb-16 pt-[4.75rem] sm:pb-24 sm:pt-24">
      <Container className="relative">
        <header className="blog-index-hero">
          <div className="blog-index-hero-copy">
            <p className="blog-index-eyebrow">{copy.title}</p>
            <TitleReveal
              align="left"
              as="h1"
              className="blog-index-headline text-left"
            >
              {copy.blurb}
            </TitleReveal>
          </div>
          <Reveal delay={0.06} className="reveal-soft blog-index-ornament">
            <div aria-hidden className="blog-index-ornament-inner">
              <span className="blog-index-ornament-ring" />
              <span className="blog-index-ornament-block" />
              <span className="blog-index-ornament-rule" />
            </div>
          </Reveal>
        </header>

        <Suspense fallback={null}>
          <BlogIndexBody locale={locale} posts={posts} copy={copy} />
        </Suspense>
      </Container>
    </div>
  );
}
