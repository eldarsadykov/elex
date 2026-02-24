import { defineContentConfig, defineCollection } from '@nuxt/content'
import { ChapterMetaSchema } from "./schemas";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '*.md'
    }),
    chapters: defineCollection({
      type: 'page',
      source: 'chapters/*.md',
      schema: ChapterMetaSchema
    }),
  },
})
