import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useJobTranslations } from "./useJobTranslations";
import { locations } from "@/mock/mockJobs";

export const useFilterOptions = () => {
  const { t } = useI18n();
  const {
    getAvailableCategories,
    getAvailableJobTypes,
    getAvailableExperienceLevels,
  } = useJobTranslations();

  /**
   * Get location options for filter dropdown
   */
  const locationOptions = computed(() =>
    locations.map((location) => ({
      value: location,
      label: location,
    }))
  );

  /**
   * Get category options with translations
   */
  const categoryOptions = computed(() => getAvailableCategories());

  /**
   * Get job type options with translations
   */
  const jobTypeOptions = computed(() => getAvailableJobTypes());

  /**
   * Get experience level options with translations
   */
  const experienceLevelOptions = computed(() => getAvailableExperienceLevels());

  /**
   * Get remote work options
   */
  const remoteWorkOptions = computed(() => [
    { value: "all", label: t("filter.all") },
    { value: "remote", label: t("filter.remoteOnly") },
    { value: "office", label: t("filter.officeOnly") },
  ]);

  /**
   * Get all filter options
   */
  const filterOptions = computed(() => ({
    locations: locationOptions.value,
    categories: categoryOptions.value,
    jobTypes: jobTypeOptions.value,
    experienceLevels: experienceLevelOptions.value,
    remoteWork: remoteWorkOptions.value,
  }));

  return {
    locationOptions,
    categoryOptions,
    jobTypeOptions,
    experienceLevelOptions,
    remoteWorkOptions,
    filterOptions,
  };
};
