import * as fs from "node:fs";
import * as path from "node:path";

const inputPath = path.resolve("chapters.json");
const jsonOutputDir = path.resolve("./dist/static/");
const tsOutputDir = path.resolve("./src/generated/");
const tsOutputFile = path.join(tsOutputDir, "index.ts");

// ---------- I/O ----------
function readChapters() {
  const raw = fs.readFileSync(inputPath, "utf-8");
  return JSON.parse(raw);
}

function ensureDirs() {
  fs.mkdirSync(tsOutputDir, { recursive: true });
  fs.mkdirSync(jsonOutputDir, { recursive: true });
}

// ---------- Builders ----------
function buildHtml(title: string) {
  return `<p>${ title } HTML Content…</p>`;
}

function buildCss() {
  return `p { color: #700; }`;
}

function buildChapterObject(chapter: any, indexToSlug: Record<number, string>) {
  const { slug, links = [], ...metaWithoutLinks } = chapter;

  const metaLinks = chapter.links ?? [];

  const resolvedLinks = metaLinks.map((link: any) => ({
    ...link,
    to: indexToSlug[link.to],  // convert index → slug
  }));

  const meta = {
    ...metaWithoutLinks,
    links: resolvedLinks,
  };

  return {
    meta,
    html: buildHtml(meta.title),
    css: buildCss(),
  };
}


// ---------- Writers ----------
function writeChapterJsonFiles(chapters: any[], indexToSlug: Record<number, string>) {
  chapters.forEach((chapter) => {
    const obj = buildChapterObject(chapter, indexToSlug);
    fs.writeFileSync(
      path.join(jsonOutputDir, `${ chapter.slug }.json`),
      JSON.stringify(obj, null, 2)
    );
  });
}

function writeBundledTsModule(chapters: any[], indexToSlug: Record<number, string>) {
  const slugs = chapters.map((c) => c.slug);

  // -- Build ChapterSlug union type --
  const slugUnion = slugs.map((s) => `  | "${ s }"`).join("\n");

  // -- Build chapters record --
  const chaptersEntries = chapters
    .map((chapter) => {
      const obj = buildChapterObject(chapter, indexToSlug);
      const literal = JSON.stringify(obj, null, 2);
      return `  "${ chapter.slug }": ${ literal }`;
    })
    .join(",\n");

  const ts = `// GENERATED FILE — DO NOT EDIT

import type { Chapter } from "../types";

export type ChapterSlug =
${ slugUnion };

export const chapters: Record<ChapterSlug, Chapter> = {
${ chaptersEntries }
};
`;

  fs.writeFileSync(tsOutputFile, ts, "utf-8");
}

// ---------- Main ----------
function generate() {
  ensureDirs();
  const chapters = readChapters();

  const indexToSlug = Object.fromEntries(
    chapters.map((c: any) => [c.index, c.slug])
  );

  writeChapterJsonFiles(chapters, indexToSlug);
  writeBundledTsModule(chapters, indexToSlug);

  console.log(`✔ Created ${ chapters.length } JSON chapter files`);
  console.log(`✔ Created TS chapter bundle at ${ tsOutputFile }`);
}

generate();
