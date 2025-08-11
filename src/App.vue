<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useLanguageManager } from "@/composables/useLanguage";

useLanguageManager();

onMounted(() => {
  const currentLocale = document.documentElement.lang || "tr";
  document.documentElement.lang = currentLocale;
});
</script>
