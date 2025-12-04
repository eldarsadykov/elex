import { type ChapterSlug } from "../generated/index.ts";

export type ChapterMeta = {
  index: number;
  title: string;
  articlesCount: number;
  titleEndsWithPeriod: boolean;
  links: ChapterLink[];
};

export type ChapterLink = {
  to: ChapterSlug;
  mainRoute: boolean;
};

export type Chapter = {
  meta: ChapterMeta;
  html: string;
  css: string;
};
