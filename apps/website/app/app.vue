<script setup lang="ts">
import { de } from '@nuxt/ui/locale'
import useChaptersNavigation from "~/composables/useChaptersNavigation";

const searchTerm = ref('');

const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('chapters'), {
  server: false
})

const { data: navigation } = await useChaptersNavigation();

</script>
<template>
  <NuxtRouteAnnouncer/>
  <UApp :locale=de>
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
