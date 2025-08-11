import { watch } from "vue";
import { useI18n } from "vue-i18n";

export function useLanguageManager() {
  const { locale } = useI18n();

  const updateHtmlLang = (newLocale: string) => {
    document.documentElement.lang = newLocale;
  };

  watch(
    locale,
    (newLocale) => {
      updateHtmlLang(newLocale);
    },
    { immediate: true }
  );

  return {
    updateHtmlLang,
  };
}
