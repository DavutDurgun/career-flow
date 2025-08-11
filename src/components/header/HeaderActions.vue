<template>
  <div class="flex items-center space-x-4">
    <!-- Dark Mode Toggle -->
    <ThemeToggle />

    <!-- Language Switcher -->
    <LanguageSwitcher />

    <!-- Mobile Menu Button -->
    <MobileMenuButton @click="$emit('toggle-mobile-menu')" />
  </div>
</template>

<script setup lang="ts">
import ThemeToggle from "@/components/header/ThemeToggle.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import MobileMenuButton from "@/components/header/MobileMenuButton.vue";

defineEmits<{
  "toggle-mobile-menu": [];
}>();
</script>
