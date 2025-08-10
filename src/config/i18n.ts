import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import tr from "@/locales/tr.json";

// Uygulamada kullanılacak dil kodlarının tipi
export type Locale = "en" | "tr";

// Dil seçenekleri
export const availableLocales = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
] as const;

// i18n instance
export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem("locale") || "tr", // localStorage'dan yükle
  fallbackLocale: "tr",
  messages: {
    en,
    tr,
  },
});
