"use client";

import Link from "next/link";
import { Container } from "@/components/typography";
import { Reveal, TitleReveal } from "@/components/motion/reveal";
import type { BlogPostMeta } from "@/lib/blog-types";
import { formatBlogDate, toneForBlogSlug } from "@/lib/blog-format";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

function BlogMedia({
  tone,
  variant = "grid",
}: {
  tone: string;
  variant?: "featured" | "thumb" | "grid";
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "blog-media relative overflow-hidden",
        variant === "featured" && "aspect-[16/10]",
        variant === "grid" && "aspect-[2/1]",
        variant === "thumb" && "size-[3.25rem] shrink-0 sm:size-14",
      )}
    >
      <div
        className="blog-media-fill absolute inset-0"
        style={{ backgroundColor: tone }}
      >
        {variant !== "thumb" ? (
          <>
            <span className="absolute -right-8 -top-10 h-28 w-28 rounded-full border border-white/30 sm:h-36 sm:w-36" />
            <span className="absolute bottom-4 left-4 h-8 w-8 rotate-12 border-2 border-white/35" />
            <span className="absolute right-8 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white/70" />
          </>
        ) : (
          <>
            <span className="absolute -right-3 -top-3 h-10 w-10 rounded-full border border-white/35" />
            <span className="absolute bottom-2 left-2 h-2 w-2 rounded-full bg-white/70" />
          </>
        )}
      </div>
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
  copy: { readingTime: string };
}) {
  const tone = toneForBlogSlug(post.slug);
  const tag = post.tags[0];

  return (
    <Reveal className="reveal-soft">
      <Link
        href={`/${locale}/blog/${post.slug}`}
        className="blog-card group block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
      >
        <BlogMedia tone={tone} variant="featured" />
        {tag ? (
          <p className="mt-4 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-accent-text">
            {tag}
          </p>
        ) : null}
        <h2 className="mt-2 text-balance text-2xl font-extrabold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent-text sm:mt-3 sm:text-3xl sm:leading-[1.15]">
          {post.title}
        </h2>
        <p className="mt-3 line-clamp-3 max-w-xl text-pretty text-sm leading-relaxed text-muted sm:text-base">
          {post.description}
        </p>
        <p className="mt-3 text-[0.8125rem] text-muted-foreground">
          {formatBlogDate(post.date, locale)}
          <span aria-hidden> · </span>
          {copy.readingTime.replace("{minutes}", String(post.readingMinutes))}
        </p>
      </Link>
    </Reveal>
  );
}

function TopStories({
  locale,
  posts,
  title,
  readingTime,
}: {
  locale: Locale;
  posts: BlogPostMeta[];
  title: string;
  readingTime: string;
}) {
  if (posts.length === 0) return null;

  return (
    <Reveal delay={0.05} className="reveal-soft flex h-full flex-col">
      <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-accent-text">
        {title}
      </p>
      <ol className="mt-4 flex flex-1 flex-col border-t border-border">
        {posts.map((post, index) => (
          <li key={post.slug} className="stagger-item border-b border-border">
            <Link
              href={`/${locale}/blog/${post.slug}`}
              className="group flex items-center gap-3 py-4 sm:gap-4 sm:py-5"
            >
              <span
                aria-hidden
                className="flex size-8 shrink-0 items-center justify-center border border-border font-mono text-[0.75rem] text-muted-foreground transition-colors duration-300 group-hover:border-accent group-hover:text-accent-text"
              >
                {index + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-extrabold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent-text sm:text-base">
                  {post.title}
                </span>
                <span className="mt-1 block text-[0.75rem] text-muted-foreground">
                  {formatBlogDate(post.date, locale)}
                  <span aria-hidden> · </span>
                  {readingTime.replace(
                    "{minutes}",
                    String(post.readingMinutes),
                  )}
                </span>
              </span>
              <BlogMedia tone={toneForBlogSlug(post.slug)} variant="thumb" />
            </Link>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

function GridPost({
  locale,
  post,
  index,
  readingTime,
}: {
  locale: Locale;
  post: BlogPostMeta;
  index: number;
  readingTime: string;
}) {
  const tone = toneForBlogSlug(post.slug);

  return (
    <Reveal delay={Math.min(index, 4) * 0.04} className="reveal-soft">
      <Link
        href={`/${locale}/blog/${post.slug}`}
        className="blog-card group block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
      >
        <BlogMedia tone={tone} variant="grid" />
        <p className="mt-3 text-[0.75rem] text-muted-foreground">
          {formatBlogDate(post.date, locale)}
          <span aria-hidden> · </span>
          {readingTime.replace("{minutes}", String(post.readingMinutes))}
        </p>
        <h2 className="mt-2 text-balance text-lg font-extrabold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent-text sm:text-xl">
          {post.title}
        </h2>
        <p className="mt-2 line-clamp-2 text-pretty text-sm leading-relaxed text-muted">
          {post.description}
        </p>
        {post.tags.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <li
                key={tag}
                className="border border-border px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </Link>
    </Reveal>
  );
}

export function BlogIndex({
  locale,
  posts,
  copy,
}: {
  locale: Locale;
  posts: BlogPostMeta[];
  copy: {
    title: string;
    blurb: string;
    empty: string;
    readingTime: string;
    topStories: string;
  };
}) {
  const featured = posts[0];
  const topStories = posts.slice(1, 4);
  const more = posts.slice(4);

  return (
    <div className="page-atmosphere relative pb-16 pt-[4.75rem] sm:pb-24 sm:pt-24">
      <Container className="relative">
        <header className="max-w-2xl">
          <TitleReveal align="left" as="h1" className="section-title text-left">
            {copy.title}
          </TitleReveal>
          <Reveal className="reveal-soft mt-5 sm:mt-7">
            <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {copy.blurb}
            </p>
          </Reveal>
        </header>

        {posts.length === 0 ? (
          <Reveal className="reveal-soft mt-14">
            <p className="text-muted">{copy.empty}</p>
          </Reveal>
        ) : (
          <div className="mt-10 space-y-14 sm:mt-14 sm:space-y-16">
            <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <FeaturedPost locale={locale} post={featured} copy={copy} />
              </div>
              <div className="lg:col-span-5">
                <TopStories
                  locale={locale}
                  posts={topStories}
                  title={copy.topStories}
                  readingTime={copy.readingTime}
                />
              </div>
            </div>

            {more.length > 0 ? (
              <div className="grid gap-10 sm:grid-cols-2 sm:gap-8 lg:gap-10">
                {more.map((post, index) => (
                  <GridPost
                    key={post.slug}
                    locale={locale}
                    post={post}
                    index={index}
                    readingTime={copy.readingTime}
                  />
                ))}
              </div>
            ) : null}
          </div>
        )}
      </Container>
    </div>
  );
}
