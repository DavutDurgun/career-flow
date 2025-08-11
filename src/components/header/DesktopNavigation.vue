<template>
  <nav class="hidden md:flex items-center space-x-6">
    <NavigationItem
      v-for="item in navigationItems"
      :key="item.name"
      :to="item.to"
      :label="item.label"
      :fallback="item.fallback"
    />
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import NavigationItem from "@/components/header/NavigationItem.vue";

interface NavItem {
  name: string;
  to: string;
  label: string;
  fallback: string;
}

const navigationItems = computed<NavItem[]>(() => [
  {
    name: "jobs",
    to: "/jobs",
    label: "navigation.jobs",
    fallback: "İş İlanları",
  },
  {
    name: "about",
    to: "/about",
    label: "navigation.about",
    fallback: "Hakkımızda",
  },
]);
</script>
