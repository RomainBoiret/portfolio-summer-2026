// Compiles content/blog/{slug}/{locale}.md → generated/blog/{locale}/{slug}.json
// so the Next app never runs marked at request/render time.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "content", "blog");
const OUT_DIR = path.join(ROOT, "generated", "blog");
const LOCALES = ["en", "fr"];

marked.setOptions({ gfm: true, breaks: false });

function stripQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function parseFrontmatter(raw) {
  const normalized = raw.replace(/^\uFEFF/, "");
  if (!normalized.startsWith("---")) {
    return { data: {}, content: normalized };
  }
  const end = normalized.indexOf("\n---", 3);
  if (end === -1) return { data: {}, content: normalized };

  const block = normalized.slice(4, end).trim();
  const content = normalized.slice(end + 4).replace(/^\r?\n/, "");
  const data = {};
  const lines = block.split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const match = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(lines[i]);
    if (!match) {
      i += 1;
      continue;
    }
    const key = match[1];
    const value = match[2].trim();
    if (value === "") {
      const list = [];
      i += 1;
      while (i < lines.length) {
        const item = /^\s*-\s+(.+)$/.exec(lines[i]);
        if (!item) break;
        list.push(stripQuotes(item[1].trim()));
        i += 1;
      }
      data[key] = list;
      continue;
    }
    if (value === "true" || value === "false") data[key] = value === "true";
    else data[key] = stripQuotes(value);
    i += 1;
  }
  return { data, content };
}

function estimateReadingMinutes(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function compile() {
  if (fs.existsSync(OUT_DIR)) {
    fs.rmSync(OUT_DIR, { recursive: true, force: true });
  }
  ensureDir(OUT_DIR);

  if (!fs.existsSync(BLOG_DIR)) {
    console.log("No content/blog directory - skipped.");
    return;
  }

  let count = 0;
  const index = { en: [], fr: [] };

  for (const entry of fs.readdirSync(BLOG_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const slug = entry.name;

    for (const locale of LOCALES) {
      const filePath = path.join(BLOG_DIR, slug, `${locale}.md`);
      if (!fs.existsSync(filePath)) continue;

      const raw = fs.readFileSync(filePath, "utf8");
      const { data: fm, content } = parseFrontmatter(raw);
      if (fm.draft) continue;
      if (!fm.title || !fm.description || !fm.date) {
        console.warn(`Skip ${locale}/${slug}: missing title/description/date`);
        continue;
      }

      const html = marked.parse(content, { async: false });
      const post = {
        slug,
        title: String(fm.title),
        description: String(fm.description),
        date: String(fm.date),
        tags: Array.isArray(fm.tags) ? fm.tags.map(String) : [],
        readingMinutes: estimateReadingMinutes(content),
        html,
        locale,
      };

      const localeDir = path.join(OUT_DIR, locale);
      ensureDir(localeDir);
      fs.writeFileSync(
        path.join(localeDir, `${slug}.json`),
        JSON.stringify(post),
        "utf8",
      );

      index[locale].push({
        slug: post.slug,
        title: post.title,
        description: post.description,
        date: post.date,
        tags: post.tags,
        readingMinutes: post.readingMinutes,
      });
      count += 1;
    }
  }

  for (const locale of LOCALES) {
    const localeDir = path.join(OUT_DIR, locale);
    ensureDir(localeDir);
    index[locale].sort((a, b) => b.date.localeCompare(a.date));
    fs.writeFileSync(
      path.join(localeDir, "_index.json"),
      JSON.stringify(index[locale]),
      "utf8",
    );
  }

  console.log(`Compiled ${count} blog posts → generated/blog`);
}

compile();
