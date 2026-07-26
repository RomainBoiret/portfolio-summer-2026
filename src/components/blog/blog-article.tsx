"use client";

import Link from "next/link";
import { Container } from "@/components/typography";
import { AccentRule } from "@/components/design/ornaments";
import { Reveal } from "@/components/motion/reveal";
import { BlogProse } from "@/components/blog/blog-prose";
import { BlogReadingProgress } from "@/components/blog/blog-reading-progress";
import { BlogToc } from "@/components/blog/blog-toc";
import { getSeriesTitle } from "@/data/blog-series";
import type { BlogPost, BlogPostMeta } from "@/lib/blog-types";
import { formatBlogDate } from "@/lib/blog-format";
import type { Locale } from "@/i18n/config";
import { interpolate } from "@/lib/interpolate";
import { cn } from "@/lib/utils";

export function BlogArticle({
  locale,
  post,
  related,
  seriesPosts,
  copy,
}: {
  locale: Locale;
  post: BlogPost;
  related: BlogPostMeta[];
  seriesPosts: BlogPostMeta[];
  copy: {
    backToBlog: string;
    readingTime: string;
    keepReading: string;
    onThisPage: string;
    relatedPosts: string;
    copyCode: string;
    copiedCode: string;
    seriesLabel: string;
    seriesProgress: string;
    seriesPrevious: string;
    seriesNext: string;
  };
}) {
  const leadTag = post.tags[0];
  const seriesTitle = post.series
    ? getSeriesTitle(post.series, locale)
    : null;

  const seriesIndex = seriesPosts.findIndex((item) => item.slug === post.slug);
  const previous =
    seriesIndex > 0 ? seriesPosts[seriesIndex - 1] : undefined;
  const next =
    seriesIndex >= 0 && seriesIndex < seriesPosts.length - 1
      ? seriesPosts[seriesIndex + 1]
      : undefined;

  return (
    <article className="page-atmosphere relative pb-16 pt-[4.75rem] sm:pb-24 sm:pt-24">
      <BlogReadingProgress />

      <Container className="relative">
        <Reveal className="reveal-soft">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-muted transition-colors duration-300 hover:text-accent-text"
          >
            {copy.backToBlog}
          </Link>
        </Reveal>

        <Reveal delay={0.04} className="reveal-soft mt-8 sm:mt-10">
          <header className="blog-article-header mx-auto max-w-[42rem]">
            <div
              aria-hidden
              className="blog-article-rule"
              style={{
                viewTransitionName: `blog-media-${post.slug}`,
              }}
            />

            {seriesTitle && seriesPosts.length > 0 ? (
              <p className="blog-series-kicker">
                <span>{copy.seriesLabel}</span>
                <span aria-hidden>·</span>
                <span>{seriesTitle}</span>
                {seriesIndex >= 0 ? (
                  <>
                    <span aria-hidden>·</span>
                    <span>
                      {interpolate(copy.seriesProgress, {
                        current: String(seriesIndex + 1),
                        total: String(seriesPosts.length),
                      })}
                    </span>
                  </>
                ) : null}
              </p>
            ) : leadTag ? (
              <p className="blog-series-kicker">
                <Link
                  href={`/${locale}/blog?tag=${encodeURIComponent(leadTag)}`}
                  className="transition-colors hover:text-foreground"
                >
                  {leadTag}
                </Link>
              </p>
            ) : null}

            <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[0.8125rem] text-muted-foreground">
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
            </div>

            <h1 className="mt-5 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:mt-6 sm:text-[3.15rem] sm:leading-[1.06]">
              {post.title}
            </h1>
            <p className="blog-article-dek mt-5 text-pretty text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed">
              {post.description}
            </p>

            {post.tags.length > 0 ? (
              <ul className="blog-article-tags mt-6">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Link
                      href={`/${locale}/blog?tag=${encodeURIComponent(tag)}`}
                    >
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </header>
        </Reveal>

        {seriesPosts.length > 1 ? (
          <Reveal className="reveal-soft mx-auto mt-8 max-w-[42rem] sm:mt-10">
            <nav className="blog-series-nav" aria-label={copy.seriesLabel}>
              <div className="blog-series-nav-head">
                <p className="blog-series-nav-kicker">
                  <span>{copy.seriesLabel}</span>
                  {seriesTitle ? (
                    <>
                      <span aria-hidden>·</span>
                      <span>{seriesTitle}</span>
                    </>
                  ) : null}
                </p>
                {seriesIndex >= 0 ? (
                  <p className="blog-series-nav-progress">
                    {interpolate(copy.seriesProgress, {
                      current: String(seriesIndex + 1),
                      total: String(seriesPosts.length),
                    })}
                  </p>
                ) : null}
              </div>

              <ol className="blog-series-steps">
                {seriesPosts.map((item, index) => (
                  <li key={item.slug}>
                    <Link
                      href={`/${locale}/blog/${item.slug}`}
                      className={cn(
                        "blog-series-step",
                        item.slug === post.slug && "is-current",
                      )}
                      aria-current={
                        item.slug === post.slug ? "page" : undefined
                      }
                    >
                      <span className="blog-series-step-index" aria-hidden>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="blog-series-step-title">
                        {item.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>

              <div className="blog-series-arrows">
                {previous ? (
                  <Link
                    href={`/${locale}/blog/${previous.slug}`}
                    className="blog-series-arrow"
                  >
                    <span aria-hidden>←</span>
                    <span>{copy.seriesPrevious}</span>
                  </Link>
                ) : (
                  <span />
                )}
                {next ? (
                  <Link
                    href={`/${locale}/blog/${next.slug}`}
                    className="blog-series-arrow is-next"
                  >
                    <span>{copy.seriesNext}</span>
                    <span aria-hidden>→</span>
                  </Link>
                ) : null}
              </div>
            </nav>
          </Reveal>
        ) : null}

        <div className="blog-article-layout mt-10 sm:mt-12">
          <aside className="blog-toc-rail">
            <BlogToc items={post.toc} title={copy.onThisPage} />
          </aside>

          <div className="blog-article-main mx-auto max-w-[42rem] min-w-0">
            <Reveal className="reveal-soft">
              <BlogProse
                html={post.html}
                copyLabel={copy.copyCode}
                copiedLabel={copy.copiedCode}
              />
            </Reveal>

            <Reveal className="reveal-soft mt-14 border-t border-border pt-10 sm:mt-16">
              <AccentRule />
              <h2 className="mt-5 text-lg font-extrabold tracking-tight text-foreground sm:text-xl">
                {related.length > 0 ? copy.relatedPosts : copy.keepReading}
              </h2>

              {related.length > 0 ? (
                <ol className="blog-related-list mt-6">
                  {related.map((item, index) => (
                    <li key={item.slug}>
                      <Link
                        href={`/${locale}/blog/${item.slug}`}
                        className="group"
                        style={{
                          viewTransitionName: `blog-media-${item.slug}`,
                        }}
                      >
                        <span aria-hidden className="blog-related-index">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0">
                          <span className="blog-related-title">
                            {item.title}
                          </span>
                          <span className="blog-related-meta">
                            {formatBlogDate(item.date, locale)}
                            <span aria-hidden> · </span>
                            {copy.readingTime.replace(
                              "{minutes}",
                              String(item.readingMinutes),
                            )}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              ) : null}

              <div className="mt-8">
                <Link
                  href={`/${locale}/blog`}
                  className="text-sm font-semibold text-muted transition-colors hover:text-accent-text"
                >
                  {copy.backToBlog}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </article>
  );
}
