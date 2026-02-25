<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Über',
    to: '/chapters/ueber-den-lexikon-roman',
  }
])
</script>

<template>
  <UHeader title="Lexikon-Roman" to="/chapters/gebrauchsanweisung">
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
