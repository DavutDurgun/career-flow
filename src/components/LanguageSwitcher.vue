<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <span class="text-sm font-medium">{{ currentLanguage.flag }}</span>
      <span class="text-sm">{{ currentLanguage.code.toUpperCase() }}</span>
      <ChevronDownIcon class="w-4 h-4" />
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 py-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
    >
      <button
        v-for="lang in availableLanguages"
        :key="lang.code"
        @click="changeLanguage(lang.code)"
        class="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        :class="{
          'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400':
            locale === lang.code,
        }"
      >
        <span class="mr-2">{{ lang.flag }}</span>
        <span>{{ lang.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { useLanguageManager } from "@/composables/useLanguage";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon.vue";

const { locale } = useI18n();
const { updateHtmlLang } = useLanguageManager();
const isOpen = ref(false);

interface Language {
  code: string;
  name: string;
  flag: string;
}

const availableLanguages: Language[] = [
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
];

const currentLanguage = computed(
  () =>
    availableLanguages.find((lang) => lang.code === locale.value) ||
    availableLanguages[0]
);

const changeLanguage = (langCode: string) => {
  locale.value = langCode;
  updateHtmlLang(langCode);
  localStorage.setItem("locale", langCode);
  isOpen.value = false;
};

// Sayfanın herhangi bir yerine tıklandığında dropdown'u kapat
const closeDropdown = (event: Event) => {
  if (!(event.target as Element).closest(".relative")) {
    isOpen.value = false;
  }
};

onMounted(() => {
  // Kaydedilen dili yükle
  const savedLocale = localStorage.getItem("locale");
  if (
    savedLocale &&
    availableLanguages.some((lang) => lang.code === savedLocale)
  ) {
    locale.value = savedLocale;
    updateHtmlLang(savedLocale);
  }

  document.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>
