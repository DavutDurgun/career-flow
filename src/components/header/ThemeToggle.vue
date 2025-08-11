<template>
  <button
    @click="toggleDarkMode"
    class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    :title="
      isDark
        ? $t('theme.lightMode', 'Açık Tema')
        : $t('theme.darkMode', 'Koyu Tema')
    "
  >
    <SunIcon v-if="isDark" />
    <MoonIcon v-else />
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import SunIcon from "../icons/SunIcon.vue";
import MoonIcon from "../icons/MoonIcon.vue";

const isDark = ref(false);

const applyTheme = (dark: boolean) => {
  if (dark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  applyTheme(isDark.value);
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
};

watch(
  isDark,
  (newValue) => {
    applyTheme(newValue);
  },
  { flush: "post" }
);

onMounted(() => {
  // Tema tercihini localStorage'dan yükle
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  isDark.value = savedTheme === "dark" || (!savedTheme && prefersDark);

  applyTheme(isDark.value);

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleSystemThemeChange = (e: MediaQueryListEvent) => {
    if (!localStorage.getItem("theme")) {
      isDark.value = e.matches;
    }
  };

  mediaQuery.addEventListener("change", handleSystemThemeChange);

  // Cleanup
  return () => {
    mediaQuery.removeEventListener("change", handleSystemThemeChange);
  };
});
</script>
