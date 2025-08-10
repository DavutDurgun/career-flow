<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-gray-900/25 transition-shadow duration-200 overflow-hidden"
  >
    <div class="p-6">
      <!-- Header -->
      <div class="flex justify-between items-start mb-4">
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-2">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              <router-link
                :to="`/jobs/${job.id}`"
                class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {{ job.title }}
              </router-link>
            </h3>

            <!-- Freshness Badge -->
            <span
              v-if="jobFreshnessInfo"
              :class="jobFreshnessInfo.class"
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
            >
              {{ jobFreshnessInfo.label }}
            </span>
          </div>

          <div
            class="flex items-center text-gray-600 dark:text-gray-400 space-x-4"
          >
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 104 0 2 2 0 00-4 0zm6 0a2 2 0 104 0 2 2 0 00-4 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="font-medium">{{ job.company }}</span>
            </div>
            <div class="flex items-center">
              <svg
                class="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{{ job.location }}</span>
            </div>
          </div>
        </div>

        <!-- Salary -->
        <div class="text-right">
          <div class="text-lg font-bold text-green-600 dark:text-green-400">
            {{ formatJobSalary(job.salary) }}
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ job.salary.currency }} {{ t("job.perMonth") }}
          </div>
        </div>
      </div>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200"
        >
          {{ translateCategory(job.category) }}
        </span>
        <span
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        >
          {{ translateJobType(job.type) }}
        </span>
        <span
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200"
        >
          {{ translateExperienceLevel(job.experienceLevel) }}
        </span>
        <span
          v-if="job.remote"
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200"
        >
          <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
          {{ t("filter.remoteOnly") }}
        </span>
      </div>

      <!-- Description -->
      <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {{ job.description }}
      </p>

      <!-- Requirements Preview -->
      <div class="mb-4">
        <div class="text-sm text-gray-700 dark:text-gray-300 mb-2">
          {{ t("job.requirements") }}
        </div>
        <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li
            v-for="req in job.requirements.slice(0, 2)"
            :key="req"
            class="flex items-start"
          >
            <span
              class="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 mr-2 flex-shrink-0"
            ></span>
            {{ req }}
          </li>
          <li
            v-if="job.requirements.length > 2"
            class="text-blue-600 dark:text-blue-400 font-medium"
          >
            +{{ job.requirements.length - 2 }} {{ t("job.more") }}
          </li>
        </ul>
      </div>

      <!-- Footer -->
      <div
        class="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700"
      >
        <div class="text-sm text-gray-500 dark:text-gray-400">
          <div class="flex items-center">
            <svg
              class="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {{ formatJobDate(job.postedDate) }}
          </div>
          <div
            :class="deadlineUrgencyInfo.class"
            class="mt-1 flex items-center"
          >
            <span class="text-xs">{{ t("job.deadline") }}</span>
            <span class="ml-1 font-medium">{{
              formatJobDate(job.deadline)
            }}</span>
            <span class="ml-1 text-xs"
              >({{ getFormattedRemainingDays(job.deadline) }})</span
            >
          </div>
        </div>

        <router-link
          :to="`/jobs/${job.id}`"
          class="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
        >
          {{ t("job.viewDetails") }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useJobTranslations } from "@/composables/useJobTranslations";
import { useJobFormatting } from "@/composables/useJobFormatting";
import type { Job } from "@/types/job";

interface Props {
  job: Job;
}

const props = defineProps<Props>();
const { t } = useI18n();

// Use composables
const { translateCategory, translateJobType, translateExperienceLevel } =
  useJobTranslations();

const {
  formatJobSalary,
  formatJobDate,
  getFormattedRemainingDays,
  getJobFreshnessInfo,
  getDeadlineUrgencyInfo,
} = useJobFormatting();

// Computed properties for UI enhancements
const jobFreshnessInfo = computed(() =>
  getJobFreshnessInfo(props.job.postedDate)
);
const deadlineUrgencyInfo = computed(() =>
  getDeadlineUrgencyInfo(props.job.deadline)
);
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
