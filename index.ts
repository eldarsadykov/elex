#!/usr/bin/env ts-node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import pug from "pug";
import TurndownService from "turndown";

/**
 * Simple CLI usage helper
 */
function printUsageAndExit(): never {
  console.error("Usage: ts-node pug-to-md.ts <input.pug> [output.md]");
  process.exit(1);
}

/**
 * Get CLI arguments
 */
const [, , inputPath, outputPath] = process.argv;

if (!inputPath) {
  printUsageAndExit();
}

if (!fs.existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`);
  process.exit(1);
}

/**
 * Render Pug to HTML.
 *
 * This will respect `extends` and `block` directives if your
 * Pug template is part of a larger layout.
 */
let html: string;
try {
  html = pug.renderFile(inputPath, {
    // allow `extends ../../templates/layout` and similar to resolve
    basedir: path.dirname(inputPath),
    filename: inputPath,
  });
} catch (err) {
  console.error("Error while rendering Pug to HTML:");
  console.error(err);
  process.exit(1);
}

/**
 * Set up Turndown (HTML → Markdown)
 */
const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  emDelimiter: "*",
});

/**
 * Custom rule for span.small-caps:
 *
 *    <span class="small-caps">Some text</span>
 * →  :small-caps[Some text]
 */
turndownService.addRule("smallCapsSpan", {
  filter: (node: any) => {
    if (!node || node.nodeName !== "SPAN") return false;

    const classAttr =
      (node.getAttribute && node.getAttribute("class")) || "";
    const classes = classAttr.split(/\s+/).filter(Boolean);
    return classes.includes("small-caps");
  },
  replacement: (content: string) => {
    // Trim to avoid weird spaces like ":small-caps[  Text  ]"
    const inner = content.trim();
    return `:small-caps[${inner}]`;
  },
});

/**
 * Optional: you *could* add a rule for a.arrow, but Turndown already
 * converts <a> to markdown links of the form [text](href), which is
 * exactly what we want.
 *
 * So we just rely on the default behavior for links.
 *
 * If you ever want to special-case it, you could do:
 *
 * turndownService.addRule("arrowLinks", {
 *   filter: (node: any) => {
 *     if (!node || node.nodeName !== "A") return false;
 *     const classAttr =
 *       (node.getAttribute && node.getAttribute("class")) || "";
 *     const classes = classAttr.split(/\s+/).filter(Boolean);
 *     return classes.includes("arrow");
 *   },
 *   replacement: (content: string, node: any) => {
 *     const href = node.getAttribute("href") || "";
 *     const text = content.trim() || href;
 *     return `[${text}](${href})`;
 *   },
 * });
 */

/**
 * Convert HTML → Markdown
 */
let markdown: string;
try {
  markdown = turndownService.turndown(html);
} catch (err) {
  console.error("Error while converting HTML to Markdown:");
  console.error(err);
  process.exit(1);
}

/**
 * Output result
 */
if (outputPath) {
  try {
    fs.writeFileSync(outputPath, markdown, "utf8");
  } catch (err) {
    console.error(`Failed to write output file: ${outputPath}`);
    console.error(err);
    process.exit(1);
  }
} else {
  // Write to stdout
  process.stdout.write(markdown + "\n");
}
