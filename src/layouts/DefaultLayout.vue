<template>
  <Header />
  <main class="min-h-screen">
    <router-view />
  </main>
  <footer
    class="flex w-full h-16 justify-center items-center text-gray-900 dark:text-white bg-white dark:bg-gray-900 shadow-sm border-t border-gray-200 dark:border-gray-700 sticky bottom-0 z-40"
  >
    <p>&copy; 2025 CareerFlow</p>
  </footer>
</template>

<script setup>
import Header from "@/components/header/Header.vue";
</script>
