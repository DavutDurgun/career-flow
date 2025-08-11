<template>
  <div class="flex items-center">
    <router-link
      to="/"
      class="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
    >
      <LogoIcon />
      <span>{{ $t("app.name", "CareerFlow") }}</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import LogoIcon from "@/components/icons/LogoIcon.vue";
</script>
