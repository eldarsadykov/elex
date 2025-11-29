import { type Chapter, type ChapterSlug, missingChapter } from "@elex/content";

const CDN_BASE = `https://cdn.jsdelivr.net/npm/@elex/content/dist/static/`;
const LOCAL_BASE = `/static/`;

interface ChapterProvider {
  cdnMode: boolean;
  chapters: Record<ChapterSlug, Chapter>;

  loadChapter(slug: ChapterSlug): Promise<Chapter>;

  fetchChapter(slug: ChapterSlug): Promise<Chapter>;
}

// Use within component library.
const chapterProvider: ChapterProvider = {
  cdnMode: false,
  chapters: {} as Record<ChapterSlug, Chapter>,
  async loadChapter(slug: ChapterSlug): Promise<Chapter> {
    return this.chapters[slug] ?? await this.fetchChapter(slug);
  },

  async fetchChapter(slug: ChapterSlug): Promise<Chapter> {
    try {
      const urlBase = this.cdnMode ? CDN_BASE : LOCAL_BASE;
      const response = await fetch(`${ urlBase }${ slug }.json`);
      this.chapters[slug] = await response.json() as unknown as Chapter;
    } catch (error) {
      console.error(`Error fetching chapter "${ slug }":`, error);
      return missingChapter;
    }

    return this.chapters[slug];
  },
}

export async function loadChapter(slug: ChapterSlug): Promise<Chapter> {
  return await chapterProvider.loadChapter(slug);
}

// Use from host application.
export function setCdnMode(isEnabled: boolean) {
  chapterProvider.cdnMode = isEnabled;
}

// Use from host application when using bundled data.
export function setChapters(chapters: Record<ChapterSlug, Chapter>) {
  chapterProvider.chapters = chapters;
}
