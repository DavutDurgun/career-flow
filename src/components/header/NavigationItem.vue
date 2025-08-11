<template>
  <router-link
    :to="to"
    class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
    active-class="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
  >
    {{ $t(label, fallback) }}
  </router-link>
</template>

<script setup lang="ts">
interface Props {
  to: string;
  label: string;
  fallback: string;
}

defineProps<Props>();
</script>
