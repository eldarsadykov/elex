<script setup lang="ts">
import { de, en } from '@nuxt/ui/locale'

const searchTerm = ref('');

const locale = computed(() => de);

const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('chapters'), {
  server: false
})

const { data: navigation } = await useAsyncData('navigation', async () => {
  const navigation = await queryCollectionNavigation('chapters');

  navigation.forEach((item) => {
    if (item.stem === 'chapters') {
      item.title = locale.value.code === 'de' ? 'Kapitel' : 'Chapters'
    }
  })

  return navigation;
})

</script>
<template>
  <NuxtRouteAnnouncer/>
  <UApp :locale=locale>
    <ClientOnly>
      <LazyUContentSearch
          v-model:search-term="searchTerm"
          shortcut="meta_k"
          :color-mode="true"
          :files="files"
          :navigation="navigation"
          :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
    <SiteHeader/>
    <UMain>
      <NuxtPage/>
    </UMain>
  </UApp>
</template>
