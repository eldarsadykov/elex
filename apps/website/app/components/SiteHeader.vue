<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Lesen',
    to: '/chapters',
  },
  {
    label: 'Über',
    to: '/about',
  }
])
</script>

<template>
  <UHeader title="Lexikon-Roman">
    <template #right>
      <UNavigationMenu
          :items="items"
          color="neutral"
          variant="link"
          class="hidden lg:flex"
      />
      <UContentSearchButton/>
    </template>
    <template #body>
      <UNavigationMenu
          :items="items"
          orientation="vertical"
      />
    </template>
  </UHeader>
</template>
