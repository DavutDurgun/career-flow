<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8 transition-colors"
  >
    <!-- Active Filters Summary -->
    <div
      v-if="hasActiveFilters()"
      class="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <svg
            class="w-4 h-4 text-blue-600 dark:text-blue-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-sm font-medium text-blue-800 dark:text-blue-200">
            {{ getActiveFiltersCount() }} {{ t("filter.activeFilters") }}
          </span>
        </div>
        <button
          @click="clearAllFilters"
          class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium"
        >
          {{ t("filter.clearAll") }}
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Search Input -->
      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {{ t("filter.search") }}
        </label>
        <div class="relative">
          <input
            v-model="localFilters.search"
            type="text"
            :placeholder="t('filter.searchPlaceholder')"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
            @input="debounceSearch"
          />
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <svg
              class="h-5 w-5 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <!-- Clear search button -->
          <button
            v-if="localFilters.search"
            @click="resetFilter('search')"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg
              class="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Location Filter -->
      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {{ t("filter.location") }}
        </label>
        <select
          v-model="localFilters.location"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
          @change="updateFilters"
        >
          <option value="">{{ t("filter.allLocations") }}</option>
          <option
            v-for="location in locationOptions"
            :key="location.value"
            :value="location.value"
          >
            {{ location.label }}
          </option>
        </select>
      </div>

      <!-- Category Filter -->
      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {{ t("filter.category") }}
        </label>
        <select
          v-model="localFilters.category"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
          @change="updateFilters"
        >
          <option value="">{{ t("filter.allCategories") }}</option>
          <option
            v-for="category in categoryOptions"
            :key="category.value"
            :value="category.value"
          >
            {{ category.label }}
          </option>
        </select>
      </div>

      <!-- Job Type Filter -->
      <div>
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {{ t("filter.jobType") }}
        </label>
        <select
          v-model="localFilters.type"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
          @change="updateFilters"
        >
          <option value="">{{ t("filter.allTypes") }}</option>
          <option
            v-for="type in jobTypeOptions"
            :key="type.value"
            :value="type.value"
          >
            {{ type.label }}
          </option>
        </select>
      </div>
    </div>

    <!-- Advanced Filters Row -->
    <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <!-- Experience Level -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {{ t("filter.experienceLevel") }}
          </label>
          <select
            v-model="localFilters.experienceLevel"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
            @change="updateFilters"
          >
            <option value="">{{ t("filter.allLevels") }}</option>
            <option
              v-for="level in experienceLevelOptions"
              :key="level.value"
              :value="level.value"
            >
              {{ level.label }}
            </option>
          </select>
        </div>

        <!-- Remote Work -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {{ t("filter.remote") }}
          </label>
          <div class="flex space-x-4">
            <label
              v-for="option in remoteWorkOptions"
              :key="option.value"
              class="flex items-center"
            >
              <input
                v-model="remoteFilter"
                type="radio"
                :value="option.value"
                class="mr-2 text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                @change="updateRemoteFilter"
              />
              <span class="text-sm text-gray-700 dark:text-gray-300">
                {{ option.label }}
              </span>
            </label>
          </div>
        </div>

        <!-- Clear Filters Button -->
        <div>
          <button
            @click="clearAllFilters"
            :disabled="!hasActiveFilters()"
            class="w-full px-4 py-2 rounded-lg font-medium transition-colors border"
            :class="
              hasActiveFilters()
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600'
                : 'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-700 cursor-not-allowed'
            "
          >
            {{ t("jobs.clearFilters") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useJobFilters } from "@/composables/useJobFilters";
import { useFilterOptions } from "@/composables/useFilterOptions";

const { t } = useI18n();

// Use composables
const {
  localFilters,
  remoteFilter,
  debounceSearch,
  updateFilters,
  updateRemoteFilter,
  clearAllFilters,
  resetFilter,
  hasActiveFilters,
  getActiveFiltersCount,
} = useJobFilters();

const {
  locationOptions,
  categoryOptions,
  jobTypeOptions,
  experienceLevelOptions,
  remoteWorkOptions,
} = useFilterOptions();
</script>
