<template>
  <div class="relative inline-block text-left">
    <button
      @click="isOpen = !isOpen"
      class="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md bg-white hover:bg-gray-50"
      type="button"
      aria-haspopup="true"
      :aria-expanded="isOpen"
      aria-controls="language-menu"
    >
      <span class="mr-2">{{ currentLocale.flag }}</span>
      {{ currentLocale.name }}
      <svg
        class="-mr-1 ml-2 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <div
      v-if="isOpen"
      id="language-menu"
      class="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
      role="menu"
      aria-orientation="vertical"
      tabindex="-1"
    >
      <div class="py-1">
        <button
          v-for="lang in availableLocales"
          :key="lang.code"
          @click="changeLanguage(lang.code)"
          :class="[
            'flex items-center w-full px-4 py-2 text-sm',
            locale === lang.code
              ? 'bg-gray-100 font-semibold'
              : 'text-gray-700 hover:bg-gray-50',
          ]"
          role="menuitem"
          type="button"
        >
          <span class="mr-2">{{ lang.flag }}</span> {{ lang.name }}
          <svg
            v-if="locale === lang.code"
            class="ml-auto h-4 w-4 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      </div>
    </div>

    <div
      v-if="isOpen"
      @click="isOpen = false"
      class="fixed inset-0 z-40"
      aria-hidden="true"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { availableLocales, type Locale } from "@/config/i18n";

const { locale } = useI18n();

const isOpen = ref(false);

const changeLanguage = (code: Locale) => {
  locale.value = code;
  localStorage.setItem("locale", code);
  isOpen.value = false;
};

const currentLocale = computed(() => {
  return (
    availableLocales.find((l) => l.code === locale.value) || availableLocales[0]
  );
});

// Escape ile dropdown kapanması
const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    isOpen.value = false;
  }
};

onMounted(() => {
  // LocalStorage'dan dil ayarını yükle
  const savedLocale = localStorage.getItem("locale") as Locale | null;
  if (savedLocale && availableLocales.some((l) => l.code === savedLocale)) {
    locale.value = savedLocale;
  }
  window.addEventListener("keydown", onKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeyDown);
});
</script>
