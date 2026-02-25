<script setup lang="ts">
import useChaptersNavigation from "~/composables/useChaptersNavigation";

const route = useRoute()
const slug = computed(() => route.params.slug?.[0] as string)

// const { data: navigation } = await useChaptersNavigation();

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('chapters')
      .path(route.path)
      .first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${ route.path }-surround`, () => {
  return queryCollectionItemSurroundings('chapters', route.path, {
    fields: ['title', 'description']
  })
})

const title = page.value?.title ?? "Not Found"

useHead({
  title: `${ title } | Lexikon-Roman`,
})

</script>

<template>
  <UContainer>
    <UPage v-if="page">
      <UPageHeader :title="title"/>
      <UPageBody>
        <ContentRenderer :value="page" tag="article" role="article" :id="slug"/>
        <USeparator/>
        <UContentSurround :surround="(surround as any)"/>
      </UPageBody>
      <template #left>
        <UPageAside>
<!--          <UContentNavigation :navigation="navigation" highlight/>-->
        </UPageAside>
      </template>
      <template #right>
        <UContentToc :links="page.body.toc?.links"/>
      </template>

    </UPage>
  </UContainer>
</template>