<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
const slug = computed(() => route.params.slug)

</script>

<template>
  <elex-chapter :slug></elex-chapter>
</template>

<style scoped></style>
