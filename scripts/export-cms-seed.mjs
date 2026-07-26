/**
 * Builds wordpress/portfolio-cms/seed/content.json from the current
 * local portfolio sources (generated blog, data/*, dictionaries).
 *
 * Run: node scripts/export-cms-seed.mjs
 * (compile:blog first so generated/blog exists)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "wordpress", "portfolio-cms", "seed", "content.json");
const GENERATED = path.join(ROOT, "generated", "blog");

const require = createRequire(import.meta.url);

// Load TS sources via compiled-less approach: read JSON + eval dictionaries from generated isn't available.
// Instead parse the dictionary files is heavy — import via dynamic path won't work for TS.
// We embed by reading the compiled Next isn't needed: read en/fr from a small node-readable export.

async function loadTsModule(rel) {
  // Use vitest/tsx if available; fallback: spawn npx tsx
  const { pathToFileURL } = await import("node:url");
  try {
    return await import(pathToFileURL(path.join(ROOT, rel)).href);
  } catch {
    return null;
  }
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function collectPosts() {
  const bySlug = new Map();
  for (const locale of ["en", "fr"]) {
    const dir = path.join(GENERATED, locale);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith(".json") || file.startsWith("_")) continue;
      const post = readJson(path.join(dir, file));
      const entry = bySlug.get(post.slug) ?? {
        slug: post.slug,
        date: post.date,
        tags: post.tags ?? [],
        series: post.series,
        seriesOrder: post.seriesOrder,
        title: { en: "", fr: "" },
        description: { en: "", fr: "" },
        content: { en: "", fr: "" },
      };
      entry.title[locale] = post.title;
      entry.description[locale] = post.description;
      entry.content[locale] = post.html;
      entry.date = post.date;
      entry.tags = post.tags ?? entry.tags;
      if (post.series) entry.series = post.series;
      if (post.seriesOrder) entry.seriesOrder = post.seriesOrder;
      bySlug.set(post.slug, entry);
    }
  }
  return [...bySlug.values()].sort((a, b) => b.date.localeCompare(a.date));
}

function pickEditorial(dict) {
  return {
    meta: dict.meta,
    site: {
      tagline: dict.site.tagline,
      roleLine: dict.site.roleLine,
      location: dict.site.location,
    },
    about: dict.about,
    projects: {
      title: dict.projects.title,
      selectedWork: dict.projects.selectedWork,
      moreWork: dict.projects.moreWork,
      githubStats: {
        label: dict.projects.githubStats.label,
        blurb: dict.projects.githubStats.blurb,
      },
    },
    contact: {
      title: dict.contact.title,
      blurb: dict.contact.blurb,
    },
    footer: dict.footer,
    blog: {
      title: dict.blog.title,
      blurb: dict.blog.blurb,
      homeTeaser: dict.blog.homeTeaser,
      metaDescription: dict.blog.metaDescription,
      empty: dict.blog.empty,
    },
  };
}

async function main() {
  // Prefer tsx for TS imports
  const { execFileSync } = await import("node:child_process");
  const helper = path.join(__dirname, "_export-cms-seed-data.mjs");
  // Inline data loader via temporary compiled approach using existing JSON where possible

  const enPath = path.join(ROOT, "src/i18n/dictionaries/en.ts");
  const frPath = path.join(ROOT, "src/i18n/dictionaries/fr.ts");
  if (!fs.existsSync(enPath) || !fs.existsSync(GENERATED)) {
    console.error("Missing dictionaries or generated/blog. Run npm run compile:blog first.");
    process.exit(1);
  }

  // Extract exports by running a small tsx script
  const loader = `
import { en } from "../src/i18n/dictionaries/en.ts";
import { fr } from "../src/i18n/dictionaries/fr.ts";
import { projects } from "../src/data/projects.ts";
import { siteConfig } from "../src/data/site.ts";
import { education, club, skills } from "../src/data/about.ts";
import { blogSeries } from "../src/data/blog-series.ts";
console.log(JSON.stringify({ en, fr, projects, siteConfig, education, club, skills, blogSeries }));
`;
  const tmp = path.join(__dirname, ".cms-seed-loader.mts");
  fs.writeFileSync(tmp, loader);
  let payload;
  try {
    const tsxCli = path.join(ROOT, "node_modules", "tsx", "dist", "cli.mjs");
    const out = execFileSync(process.execPath, [tsxCli, tmp], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    payload = JSON.parse(out);
  } finally {
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
  }

  const posts = collectPosts();
  const projects = payload.projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    year: p.year,
    category: p.category,
    technologies: p.technologies,
    githubUrl: p.githubUrl,
    liveUrl: p.liveUrl,
    featured: Boolean(p.featured),
    accentColor: p.accentColor,
    summary: {
      en: payload.en.projects.summaries[p.slug] ?? "",
      fr: payload.fr.projects.summaries[p.slug] ?? "",
    },
    highlights: {
      en: payload.en.projects.highlights?.[p.slug] ?? [],
      fr: payload.fr.projects.highlights?.[p.slug] ?? [],
    },
  }));

  const seed = {
    identity: {
      name: payload.siteConfig.name,
      email: payload.siteConfig.email,
      url: payload.siteConfig.url,
      social: payload.siteConfig.social.map((s) => ({
        labelKey: s.labelKey,
        href: s.href,
        icon: s.icon,
      })),
    },
    about: {
      education: payload.education,
      club: payload.club,
      skills: payload.skills,
    },
    series: payload.blogSeries,
    editorial: {
      en: pickEditorial(payload.en),
      fr: pickEditorial(payload.fr),
    },
    posts,
    projects,
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(seed, null, 2));
  console.log(
    `Wrote seed: ${posts.length} posts, ${projects.length} projects → ${path.relative(ROOT, OUT)}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
