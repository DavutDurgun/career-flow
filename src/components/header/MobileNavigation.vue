<template>
  <div class="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
    <div class="flex flex-col space-y-2">
      <NavigationItem
        v-for="item in mobileNavigationItems"
        :key="item.name"
        :to="item.to"
        :label="item.label"
        :fallback="item.fallback"
        @click="$emit('close')"
      />
    </div>
  </div>
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

const mobileNavigationItems = computed<NavItem[]>(() => [
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

defineEmits<{
  close: [];
}>();
</script>
