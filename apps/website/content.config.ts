import { defineContentConfig, defineCollection } from '@nuxt/content'
import { ChapterMetaSchema } from "./schemas";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**',
      schema: ChapterMetaSchema
    }),
  },
})
