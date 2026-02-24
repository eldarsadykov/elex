<script setup lang="ts">
const searchTerm = ref('');
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('chapters'), {
  server: false
})

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('chapters'))
</script>
<template>
  <NuxtRouteAnnouncer/>
  <UApp>
    <ClientOnly>
      <LazyUContentSearch
          v-model:search-term="searchTerm"
          shortcut="meta_k"
          :color-mode="false"
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
