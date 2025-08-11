<template>
  <header
    class="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <AppLogo />

        <!-- Desktop Navigation -->
        <DesktopNavigation />

        <!-- Header Actions -->
        <HeaderActions
          @toggle-mobile-menu="isMobileMenuOpen = !isMobileMenuOpen"
        />
      </div>

      <!-- Mobile Navigation -->
      <MobileNavigation
        v-if="isMobileMenuOpen"
        @close="isMobileMenuOpen = false"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppLogo from "@/components/header/AppLogo.vue";
import DesktopNavigation from "@/components/header/DesktopNavigation.vue";
import HeaderActions from "@/components/header/HeaderActions.vue";
import MobileNavigation from "@/components/header/MobileNavigation.vue";

const isMobileMenuOpen = ref(false);
</script>
