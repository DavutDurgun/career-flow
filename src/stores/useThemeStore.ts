import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const isDark = ref(false);

  // Initialize theme from localStorage or system preference
  const initTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      isDark.value = saved === "dark";
    } else {
      isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    applyTheme();
  };

  const toggleTheme = () => {
    isDark.value = !isDark.value;
  };

  const setTheme = (dark: boolean) => {
    isDark.value = dark;
  };

  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Watch theme changes and apply them
  watch(isDark, (newValue) => {
    localStorage.setItem("theme", newValue ? "dark" : "light");
    applyTheme();
  });

  return {
    isDark,
    initTheme,
    toggleTheme,
    setTheme,
  };
});
