import { HomeHeroCtas } from "@/components/home/home-hero-ctas";
import { HomeClosing } from "@/components/home/home-closing";
import { Container, TextLink } from "@/components/typography";
import { Reveal, TitleReveal } from "@/components/motion/reveal";
import { ShapeFieldLazy } from "@/components/design/shape-field-lazy";
import { BlogPrefetch } from "@/components/blog/blog-prefetch";
import { ProjectsSectionLazy as ProjectsSection } from "@/components/home/projects-section-lazy";
import { siteConfig } from "@/data/site";
import { club, education, skills } from "@/data/about";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getProjectsCopy } from "@/i18n/chrome";
import {
  getContactBlurb,
  getLocalizedProjects,
  getLocalizedSocial,
} from "@/i18n/content";
import { getLatestBlogPosts } from "@/lib/blog";
import { getGithubStats } from "@/lib/github-stats";
import { cn } from "@/lib/utils";

function SectionHeading({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <TitleReveal
      align={align}
      className={cn(
        "section-title text-left",
        align === "right" && "sm:text-right",
      )}
    >
      {children}
    </TitleReveal>
  );
}

export async function HomePage({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const [first, last] = siteConfig.name.split(" ");
  const social = getLocalizedSocial(locale);
  const projects = getLocalizedProjects(locale);
  const projectsCopy = getProjectsCopy(dictionary);
  const notesPool = getLatestBlogPosts(locale, 8);
  const latestNotes = notesPool.slice(0, 3);
  const prefetchSlugs = notesPool.map((post) => post.slug);
  const githubStats = await getGithubStats();
  const contactBlurb = getContactBlurb(locale);

  return (
    <div className="page-atmosphere relative pb-10 pt-[4.75rem] sm:pb-14 sm:pt-24">
      <ShapeFieldLazy />
      <BlogPrefetch locale={locale} slugs={prefetchSlugs} />

      <section id="home" className="section-panel relative z-10 !pt-4 sm:!pt-8">
        <Container className="relative text-center">
          <h1 className="display-name mx-auto max-w-5xl px-1">
            <span className="hero-line hero-line-lcp block">{first}</span>
            <span className="hero-line hero-line-delay block">{last}</span>
          </h1>

          <p className="hero-fade mt-5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-accent-text sm:mt-8">
            {dictionary.site.roleLine}
          </p>
          <p className="hero-fade mx-auto mt-4 max-w-2xl text-base text-muted sm:mt-5 sm:text-lg">
            {dictionary.site.tagline}
          </p>

          <HomeHeroCtas
            locale={locale}
            seeProjects={dictionary.ui.seeProjects}
            seeNotes={dictionary.ui.seeNotes}
          />
        </Container>
      </section>

      <section id="about" className="section-panel relative z-10">
        <Container className="relative">
          <SectionHeading align="left">{dictionary.about.title}</SectionHeading>

          <div className="mt-8 space-y-8 sm:mt-12 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16 lg:space-y-0">
            <Reveal className="max-w-2xl space-y-4 sm:space-y-5">
              <h3 className="text-xl font-extrabold tracking-tight sm:text-3xl">
                {dictionary.about.headline}
              </h3>
              <p className="text-base leading-relaxed text-muted sm:text-lg">
                {dictionary.about.paragraphs[0]}
              </p>
              <p className="hidden text-lg leading-relaxed text-muted sm:block">
                {dictionary.about.paragraphs[1]}
              </p>
              <div className="pt-2">
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-accent-text">
                  {dictionary.about.focusTitle}
                </p>
                <ul className="mt-3 space-y-2">
                  {dictionary.about.focus.map((item) => (
                    <li
                      key={item}
                      className="stagger-item flex items-start gap-2.5 text-sm text-muted sm:text-base"
                    >
                      <span
                        aria-hidden
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal
              delay={0.08}
              className="h-fit space-y-6 border-t border-border pt-6 sm:space-y-8 sm:rounded-sm sm:border sm:border-border sm:bg-surface/70 sm:p-8 sm:pt-8"
            >
              {education.map((item) => (
                <div key={item.id}>
                  <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-accent-text">
                    {dictionary.about.education}
                  </p>
                  <p className="mt-2 text-base font-extrabold tracking-tight sm:text-lg">
                    {dictionary.about.degree}
                  </p>
                  <p className="mt-1 text-sm text-muted sm:text-base">
                    {item.school}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.startDate} - {dictionary.about.present}
                  </p>
                </div>
              ))}

              <div>
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-accent-text">
                  {dictionary.about.involvement}
                </p>
                <p className="mt-2 text-base font-extrabold tracking-tight sm:text-lg">
                  <TextLink href={club.url} external>
                    {club.name}
                  </TextLink>
                </p>
                <p className="mt-1 text-sm text-muted sm:text-base">
                  {dictionary.about.clubRole}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {dictionary.about.clubBlurb}
                </p>
              </div>

              <div>
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-accent-text">
                  {dictionary.about.skills}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <li
                      key={skill}
                      className="border border-border bg-background/60 px-2.5 py-1 text-sm text-muted sm:bg-transparent"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <ProjectsSection
        projects={projects}
        copy={projectsCopy}
        githubStats={githubStats}
        locale={locale}
      />

      <HomeClosing
        locale={locale}
        posts={latestNotes}
        social={social}
        copy={{
          notesTitle: dictionary.blog.title,
          notesBlurb: dictionary.blog.homeTeaser,
          seeNotes: dictionary.ui.seeNotes,
          readingTime: dictionary.blog.readingTime,
          contactTitle: dictionary.contact.title,
          contactBlurb: contactBlurb,
          availability: dictionary.footer.availability,
          emailMe: dictionary.ui.emailMe,
          profileAria: dictionary.contact.profileAria,
        }}
      />
    </div>
  );
}
