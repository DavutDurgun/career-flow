import { ref, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useJobsStore } from "@/stores/useJobsStore";
import type { JobFilters, RemoteFilterType } from "@/types/job";

export const useJobFilters = () => {
  const { locale } = useI18n();
  const jobsStore = useJobsStore();

  // Local filter state
  const localFilters = ref<Omit<JobFilters, "remote">>({
    search: "",
    location: "",
    category: "",
    type: "",
    experienceLevel: "",
  });

  const remoteFilter = ref<RemoteFilterType>("all");

  // Search debounce
  let searchTimeout: number | null = null;

  /**
   * Initialize local filters from store
   */
  const initializeFilters = () => {
    const currentFilters = jobsStore.filters;
    localFilters.value = {
      search: currentFilters.search,
      location: currentFilters.location,
      category: currentFilters.category,
      type: currentFilters.type,
      experienceLevel: currentFilters.experienceLevel,
    };

    remoteFilter.value = getRemoteFilterValue(currentFilters.remote);
  };

  /**
   * Convert remote filter boolean to string representation
   */
  const getRemoteFilterValue = (remote: boolean | null): RemoteFilterType => {
    if (remote === null) return "all";
    return remote ? "remote" : "office";
  };

  /**
   * Convert remote filter string to boolean
   */
  const getRemoteFilterBoolean = (value: RemoteFilterType): boolean | null => {
    switch (value) {
      case "all":
        return null;
      case "remote":
        return true;
      case "office":
        return false;
      default:
        return null;
    }
  };

  /**
   * Debounced search update
   */
  const debounceSearch = () => {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      updateFilters();
    }, 300);
  };

  /**
   * Update filters in store
   */
  const updateFilters = () => {
    const filtersToUpdate: JobFilters = {
      ...localFilters.value,
      remote: getRemoteFilterBoolean(remoteFilter.value),
    };
    jobsStore.updateFilters(filtersToUpdate);
  };

  /**
   * Update remote filter specifically
   */
  const updateRemoteFilter = () => {
    const remoteValue = getRemoteFilterBoolean(remoteFilter.value);
    jobsStore.updateFilters({ remote: remoteValue });
  };

  /**
   * Clear all filters
   */
  const clearAllFilters = () => {
    localFilters.value = {
      search: "",
      location: "",
      category: "",
      type: "",
      experienceLevel: "",
    };
    remoteFilter.value = "all";
    jobsStore.clearFilters();
  };

  /**
   * Reset specific filter
   */
  const resetFilter = (filterKey: keyof Omit<JobFilters, "remote">) => {
    localFilters.value[filterKey] = "";
    updateFilters();
  };

  /**
   * Check if any filters are active
   */
  const hasActiveFilters = () => {
    return !!(
      localFilters.value.search ||
      localFilters.value.location ||
      localFilters.value.category ||
      localFilters.value.type ||
      localFilters.value.experienceLevel ||
      remoteFilter.value !== "all"
    );
  };

  /**
   * Get active filters count
   */
  const getActiveFiltersCount = () => {
    let count = 0;
    if (localFilters.value.search) count++;
    if (localFilters.value.location) count++;
    if (localFilters.value.category) count++;
    if (localFilters.value.type) count++;
    if (localFilters.value.experienceLevel) count++;
    if (remoteFilter.value !== "all") count++;
    return count;
  };

  // Watch for external store changes
  watch(
    () => jobsStore.filters,
    (newFilters) => {
      localFilters.value = {
        search: newFilters.search,
        location: newFilters.location,
        category: newFilters.category,
        type: newFilters.type,
        experienceLevel: newFilters.experienceLevel,
      };
      remoteFilter.value = getRemoteFilterValue(newFilters.remote);
    },
    { deep: true }
  );

  // Clear search when language changes
  watch(locale, () => {
    if (localFilters.value.search) {
      localFilters.value.search = "";
      updateFilters();
    }
  });

  // Initialize on mount
  onMounted(() => {
    initializeFilters();
  });

  return {
    localFilters,
    remoteFilter,
    debounceSearch,
    updateFilters,
    updateRemoteFilter,
    clearAllFilters,
    resetFilter,
    hasActiveFilters,
    getActiveFiltersCount,
    initializeFilters,
  };
};
