<script setup lang="ts">
import { useLinkInterceptor } from "@/composables/useLinkInterceptor";

useLinkInterceptor();
</script>

<template>
  <RouterView/>
</template>
