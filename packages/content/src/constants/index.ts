import { type Chapter } from "../types/index.ts";

export const missingChapter: Chapter = {
  meta: {
    index: -1,
    title: "Missing chapter",
    articlesCount: 0,
    titleEndsWithPeriod: false,
    links: []
  },
  html: `<p>No chapter found.</p>`,
  css: "",
};
