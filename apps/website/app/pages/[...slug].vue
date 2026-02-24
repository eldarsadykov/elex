<script setup lang="ts">
const route = useRoute()
const slug = computed(() => route.params.slug?.[0] as string)

console.log(slug.value)

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('chapters')
      .path(route.path)
      .first()
})

const { data: surround } = await useAsyncData(`${ route.path }-surround`, () => {
  return queryCollectionItemSurroundings('chapters', route.path, {
    fields: ['title', 'description']
  })
})

const title = page.value?.title ?? "Not Found"

useHead({
  title: `${ title } | Lexikon-Roman`,
})

const themes = ['original', 'alternative'] as const

type Theme = typeof themes[number]
const DATA_THEME = 'data-theme'

const setTheme = (theme: Theme): void => {
  document.documentElement.setAttribute(DATA_THEME, theme)
}

const themeIndex = useLocalStorage('themeIndex', 0)

onMounted(() => {
  setTheme(themes[themeIndex.value] ?? themes[0])
})

const cycleTheme = () => {
  themeIndex.value = (themeIndex.value + 1) % themes.length
  const nextTheme = themes[themeIndex.value];
  if (nextTheme) setTheme(nextTheme)
  console.log(theme.value)
}

const theme = computed(() => {
  return themes[themeIndex.value]
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

</script>

<template>
  <UContainer class="mt-16 mb-[50lvh]">
    <ContentRenderer v-if="page" :value="page" tag="article" role="article" :id="slug"/>
    <USeparator class="my-12"/>
    <UContentSurround :surround="(surround as any)"/>
  </UContainer>
</template>
