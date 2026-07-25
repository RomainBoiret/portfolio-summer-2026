import Link from "next/link";
import { Container, TextLink } from "@/components/typography";
import { Reveal, TitleReveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ContactTrigger } from "@/components/contact/contact-trigger";
import { AccentRule } from "@/components/design/ornaments";
import { siteConfig } from "@/data/site";
import type { BlogPostMeta } from "@/lib/blog-types";
import { formatBlogDate } from "@/lib/blog-format";
import type { Locale } from "@/i18n/config";
import { interpolate } from "@/lib/interpolate";

type ClosingCopy = {
  notesTitle: string;
  notesBlurb: string;
  seeNotes: string;
  readingTime: string;
  contactTitle: string;
  contactBlurb: string;
  availability: string;
  emailMe: string;
  profileAria: string;
};

export function HomeClosing({
  locale,
  posts,
  social,
  copy,
}: {
  locale: Locale;
  posts: BlogPostMeta[];
  social: Array<{ href: string; label: string; icon: string }>;
  copy: ClosingCopy;
}) {
  return (
    <section id="contact" className="section-panel relative z-10">
      <Container className="relative">
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div className="min-w-0">
            <TitleReveal align="left" className="section-title text-left">
              {copy.notesTitle}
            </TitleReveal>

            <Reveal className="mt-5 max-w-xl sm:mt-7">
              <p className="text-base leading-relaxed text-muted sm:text-lg">
                {copy.notesBlurb}
              </p>

              {posts.length > 0 ? (
                <ol className="mt-8 border-t border-border">
                  {posts.map((post, index) => (
                    <li key={post.slug} className="stagger-item border-b border-border">
                      <Link
                        href={`/${locale}/blog/${post.slug}`}
                        className="group flex gap-4 py-5 sm:gap-5 sm:py-6"
                      >
                        <span
                          aria-hidden
                          className="shrink-0 pt-1 font-mono text-[0.75rem] tracking-wider text-muted-foreground transition-colors duration-300 group-hover:text-accent sm:text-[0.8rem]"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-base font-extrabold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent sm:text-xl">
                            {post.title}
                          </span>
                          <span className="mt-1.5 block text-[0.8125rem] text-muted-foreground">
                            {formatBlogDate(post.date, locale)}
                            <span aria-hidden> · </span>
                            {copy.readingTime.replace(
                              "{minutes}",
                              String(post.readingMinutes),
                            )}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              ) : null}

              <div className="mt-7">
                <Button href={`/${locale}/blog`} variant="secondary" arrow>
                  {copy.seeNotes}
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08} className="lg:border-l lg:border-border lg:pl-12 xl:pl-16">
            <aside className="max-w-md space-y-6 sm:space-y-7">
              <AccentRule />

              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="closing-status-dot size-1.5 shrink-0 rounded-full bg-accent"
                />
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-accent-text">
                  {copy.availability}
                </p>
              </div>

              <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl sm:leading-[0.95]">
                {copy.contactTitle}
              </h2>

              <p className="text-base leading-relaxed text-muted sm:text-lg">
                {copy.contactBlurb}
              </p>

              <p className="text-lg font-extrabold tracking-tight sm:text-xl">
                <ContactTrigger
                  variant="link"
                  className="break-all text-lg font-extrabold tracking-tight text-foreground underline decoration-border underline-offset-[5px] transition-colors duration-300 hover:text-accent-hover hover:decoration-accent sm:text-xl"
                >
                  {siteConfig.email}
                </ContactTrigger>
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem]">
                {social
                  .filter((item) => item.icon !== "email")
                  .map((item) => (
                    <TextLink
                      key={item.href}
                      href={item.href}
                      external
                      className="inline-flex min-h-10 items-center"
                      aria-label={interpolate(copy.profileAria, {
                        label: item.label,
                        name: siteConfig.name,
                      })}
                    >
                      {item.label}
                    </TextLink>
                  ))}
              </div>

              <div className="pt-1">
                <ContactTrigger arrow>{copy.emailMe}</ContactTrigger>
              </div>
            </aside>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
