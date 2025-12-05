<script setup lang="ts">
const route = useRoute()
const slug = computed(() => route.params.slug?.[0] as string)

console.log(slug.value)

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content')
      .path(route.path)
      .first()
})

const title = page.value?.title ?? "Not Found"

useHead({
  title: `${ title } | Lexikon-Roman`,
})

const { data: links } = await useAsyncData(`links-${ route.path }`, async () => {
      const chapterLinks = page.value?.links ?? []
      return Promise.all(
          chapterLinks.map(link => queryCollection('content')
              .path('/' + link.to)
              .select('meta')
              .first()
          )
      )
    }
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

</script>

<template>
  <main class="mx-auto max-w-prose hyphens-manual" v-if="page">
    <ContentRenderer :value="page" tag="article" class="chapter-article" :id="slug"/>
  </main>
</template>
