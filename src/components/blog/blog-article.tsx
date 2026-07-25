"use client";

import Link from "next/link";
import { Container } from "@/components/typography";
import { AccentRule } from "@/components/design/ornaments";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import type { BlogPost } from "@/lib/blog-types";
import { formatBlogDate, toneForBlogSlug } from "@/lib/blog-format";
import type { Locale } from "@/i18n/config";

export function BlogArticle({
  locale,
  post,
  copy,
}: {
  locale: Locale;
  post: BlogPost;
  copy: {
    backToBlog: string;
    readingTime: string;
    keepReading: string;
  };
}) {
  const tone = toneForBlogSlug(post.slug);
  const leadTag = post.tags[0];

  return (
    <article className="page-atmosphere relative pb-16 pt-[4.75rem] sm:pb-24 sm:pt-24">
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
          <header>
            <div
              aria-hidden
              className="blog-article-hero relative overflow-hidden"
              style={{ backgroundColor: tone }}
            >
              <span className="absolute -right-6 -top-8 h-24 w-24 rounded-full border border-white/30" />
              <span className="absolute bottom-3 left-4 h-6 w-6 rotate-12 border-2 border-white/35" />
              <span className="absolute right-12 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white/70" />
            </div>

            <div className="mx-auto mt-8 max-w-[42rem] space-y-5 sm:mt-10">
              {leadTag ? (
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-accent-text">
                  {leadTag}
                </p>
              ) : null}
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[0.8125rem] text-muted-foreground">
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
              <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl sm:leading-[1.08]">
                {post.title}
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed">
                {post.description}
              </p>
              {post.tags.length > 0 ? (
                <ul className="flex flex-wrap gap-2 pt-1">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border border-border px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.12em] text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </header>
        </Reveal>

        <Reveal className="reveal-soft mx-auto mt-10 max-w-[42rem] sm:mt-12">
          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </Reveal>

        <Reveal className="reveal-soft mx-auto mt-14 max-w-[42rem] border-t border-border pt-10 sm:mt-16">
          <AccentRule />
          <p className="mt-5 text-base text-muted sm:text-lg">
            {copy.keepReading}
          </p>
          <div className="mt-5">
            <Button href={`/${locale}/blog`} variant="secondary">
              {copy.backToBlog}
            </Button>
          </div>
        </Reveal>
      </Container>
    </article>
  );
}
