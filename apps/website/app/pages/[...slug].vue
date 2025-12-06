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
  <main class="tw:mx-auto tw:px-5 tw:max-w-prose tw:hyphens-manual tw:mb-[50svh]">
    <ContentRenderer v-if="page" :value="page" tag="article" role="article" class="chapter-article" :id="slug"/>
  </main>
</template>
