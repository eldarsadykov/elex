<script setup lang="ts">
const route = useRoute()
const slug = computed(() => route.params.slug?.[0] as string)

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content')
      .path(route.path)
      .first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = page.value?.title ?? "Not Found"

useHead({
  title: `${ title } | Lexikon-Roman`,
})

</script>

<template>
  <UContainer class="my-12">
    <ContentRenderer v-if="page" :value="page" tag="article" role="article" :id="slug"/>
  </UContainer>
</template>
