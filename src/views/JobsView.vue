<template>
  <div class="jobs-page dark:bg-gray-900 min-h-screen transition-colors">
    <div class="container mx-auto px-4 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {{ t("jobs.title") }}
        </h1>
        <p class="text-gray-600 dark:text-gray-300">
          {{ filteredJobCount }} {{ t("jobs.found") }}
          <span
            v-if="hasActiveFilters"
            class="text-blue-600 dark:text-blue-400"
          >
            {{ t("jobs.filtered") }}
          </span>
        </p>
      </div>

      <!-- Filters Section -->
      <JobFilters />

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"
        ></div>
        <p class="mt-4 text-gray-600 dark:text-gray-300">
          {{ t("common.loading") }}
        </p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600 dark:text-red-400 mb-4">
          <svg
            class="w-16 h-16 mx-auto mb-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {{ t("common.error") }}
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4">{{ error }}</p>
        <button
          @click="ensureJobsLoaded"
          class="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {{ t("common.retry") }}
        </button>
      </div>

      <!-- Jobs List -->
      <div v-else class="space-y-6">
        <!-- No Results -->
        <div
          v-if="filteredLocalizedJobs.length === 0"
          class="text-center py-12"
        >
          <div class="text-gray-400 dark:text-gray-500 mb-4">
            <svg
              class="w-16 h-16 mx-auto mb-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {{ t("jobs.noResults") }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            {{ t("jobs.noResultsDesc") }}
          </p>
        </div>

        <!-- Job Cards -->
        <div v-else class="grid gap-6">
          <JobCard
            v-for="job in filteredLocalizedJobs"
            :key="`${job.id}-${locale}`"
            :job="formatJobForDisplay(job)"
          />
        </div>

        <!-- Debug Info (sadece development'ta göster) -->
        <div
          v-if="isDevelopment"
          class="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm"
        >
          <details>
            <summary
              class="cursor-pointer font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              Debug Info (Current Locale: {{ locale }})
            </summary>
            <div class="mt-2 space-y-2 text-gray-600 dark:text-gray-400">
              <p><strong>Total Jobs:</strong> {{ jobCount }}</p>
              <p><strong>Filtered Jobs:</strong> {{ filteredJobCount }}</p>
              <p>
                <strong>Active Filters:</strong>
                {{ JSON.stringify(filters, null, 2) }}
              </p>
            </div>
          </details>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useJobsStore } from "@/stores/useJobsStore";
import { useLocalizedJobs } from "@/hooks/useLocalizedJobs";
import JobFilters from "../components/jobs/JobFilters.vue";
import JobCard from "../components/jobs/JobCard.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";

const { t, locale } = useI18n();
const jobsStore = useJobsStore();

// Use the new localized jobs composable
const {
  filteredLocalizedJobs,
  loading,
  error,
  jobCount,
  filteredJobCount,
  ensureJobsLoaded,
  formatJobForDisplay,
} = useLocalizedJobs();

// Computed properties
const filters = computed(() => jobsStore.filters);

const hasActiveFilters = computed(() => {
  return !!(
    filters.value.search ||
    filters.value.location ||
    filters.value.category ||
    filters.value.type ||
    filters.value.remote !== null ||
    filters.value.experienceLevel
  );
});

// Development mode check
const isDevelopment = computed(() => {
  return import.meta.env.DEV;
});

// Lifecycle
onMounted(async () => {
  await ensureJobsLoaded();
});
</script>

<style scoped>
/* Custom scrollbar for better dark mode experience */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background-color: rgb(243 244 246); /* gray-100 */
}

::-webkit-scrollbar-thumb {
  background-color: rgb(209 213 219); /* gray-300 */
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgb(156 163 175); /* gray-400 */
}

/* Dark mode scrollbar */
:root.dark ::-webkit-scrollbar-track {
  background-color: rgb(31 41 55); /* gray-800 */
}

:root.dark ::-webkit-scrollbar-thumb {
  background-color: rgb(75 85 99); /* gray-600 */
}

:root.dark ::-webkit-scrollbar-thumb:hover {
  background-color: rgb(107 114 128); /* gray-500 */
}
</style>
