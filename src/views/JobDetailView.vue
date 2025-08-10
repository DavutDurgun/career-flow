<template>
  <div class="job-detail-page dark:bg-gray-900 min-h-screen transition-colors">
    <div class="container mx-auto px-4 py-8">
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
        <div class="space-x-4">
          <button
            @click="loadJobDetail"
            class="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {{ t("common.retry") }}
          </button>
          <button
            @click="goBack"
            class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {{ t("common.goBack") }}
          </button>
        </div>
      </div>

      <!-- Job Detail Content -->
      <div v-else-if="job" class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <!-- Breadcrumb -->
          <nav class="mb-4">
            <button
              @click="goBack"
              class="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
            >
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {{ t("job.backToJobs") }}
            </button>
          </nav>

          <!-- Job Header Card -->
          <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8"
          >
            <div class="flex justify-between items-start mb-6">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-3">
                  <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
                    {{ job.title }}
                  </h1>
                  <span
                    v-if="getJobFreshnessInfo(job.postedDate)"
                    :class="getJobFreshnessInfo(job.postedDate)?.class"
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {{ getJobFreshnessInfo(job.postedDate)?.label }}
                  </span>
                </div>

                <div
                  class="flex items-center text-gray-600 dark:text-gray-400 space-x-6 mb-4"
                >
                  <div class="flex items-center">
                    <svg
                      class="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 104 0 2 2 0 00-4 0zm6 0a2 2 0 104 0 2 2 0 00-4 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="font-medium text-lg">{{ job.company }}</span>
                  </div>
                  <div class="flex items-center">
                    <svg
                      class="w-5 h-5 mr-2"
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

                <!-- Tags -->
                <div class="flex flex-wrap gap-3 mb-6">
                  <span
                    class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200"
                  >
                    {{ translateCategory(job.category) }}
                  </span>
                  <span
                    class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  >
                    {{ translateJobType(job.type) }}
                  </span>
                  <span
                    class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200"
                  >
                    {{ translateExperienceLevel(job.experienceLevel) }}
                  </span>
                  <span
                    v-if="job.remote"
                    class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200"
                  >
                    <svg
                      class="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    {{ t("filter.remoteOnly") }}
                  </span>
                </div>
              </div>

              <!-- Salary & Actions -->
              <div class="text-right ml-8">
                <div class="mb-4">
                  <div
                    class="text-2xl font-bold text-green-600 dark:text-green-400"
                  >
                    {{ formattedSalary }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ t("job.perMonth") }}
                  </div>
                </div>

                <div class="space-y-3">
                  <button
                    v-if="canApply"
                    @click="openApplicationModal"
                    class="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors font-semibold text-lg"
                  >
                    {{ t("job.applyNow") }}
                  </button>
                  <button
                    v-else
                    disabled
                    class="w-full bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 px-6 py-3 rounded-lg cursor-not-allowed font-semibold text-lg"
                  >
                    {{ t("job.applicationClosed") }}
                  </button>

                  <div class="flex space-x-2">
                    <button
                      @click="saveJob(job)"
                      class="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <svg
                        class="w-4 h-4 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                    <button
                      @click="shareJob"
                      class="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <svg
                        class="w-4 h-4 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Job Meta Info -->
            <div
              class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ t("job.postedDate") }}
                </div>
                <div class="font-medium text-gray-900 dark:text-white">
                  {{ formatJobDate(job.postedDate) }}
                </div>
              </div>
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ t("job.deadline") }}
                </div>
                <div :class="deadlineInfo?.urgencyClass" class="font-medium">
                  {{ deadlineInfo?.formattedDate }}
                </div>
              </div>
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ t("job.remainingDays") }}
                </div>
                <div :class="deadlineInfo?.urgencyClass" class="font-medium">
                  {{ deadlineInfo?.remainingDays
                  }}{{
                    deadlineInfo?.remainingDays === 1
                      ? t("job.day")
                      : t("job.days")
                  }}
                </div>
              </div>
              <div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  {{ t("job.jobId") }}
                </div>
                <div
                  class="font-medium text-gray-900 dark:text-white font-mono text-sm"
                >
                  {{ job.id }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Job Description -->
            <section
              class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h2
                class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
              >
                {{ t("job.description") }}
              </h2>
              <div class="prose dark:prose-invert max-w-none">
                <p
                  class="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line"
                >
                  {{ job.description }}
                </p>
              </div>
            </section>

            <!-- Requirements -->
            <section
              class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h2
                class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
              >
                {{ t("job.requirements") }}
              </h2>
              <ul class="space-y-3">
                <li
                  v-for="requirement in job.requirements"
                  :key="requirement"
                  class="flex items-start"
                >
                  <svg
                    class="w-5 h-5 text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-gray-600 dark:text-gray-300">{{
                    requirement
                  }}</span>
                </li>
              </ul>
            </section>

            <!-- Benefits -->
            <section
              v-if="job.benefits && job.benefits.length > 0"
              class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h2
                class="text-xl font-semibold text-gray-900 dark:text-white mb-4"
              >
                {{ t("job.benefits") }}
              </h2>
              <ul class="space-y-3">
                <li
                  v-for="benefit in job.benefits"
                  :key="benefit"
                  class="flex items-start"
                >
                  <svg
                    class="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-gray-600 dark:text-gray-300">{{
                    benefit
                  }}</span>
                </li>
              </ul>
            </section>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Quick Actions -->
            <div
              class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
              >
                {{ t("job.quickActions") }}
              </h3>
              <div class="space-y-3">
                <button
                  v-if="canApply"
                  @click="openApplicationModal"
                  class="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  {{ t("job.applyNow") }}
                </button>
                <button
                  @click="goToSimilarJobs(job.category, job.location)"
                  class="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                  {{ t("job.similarJobs") }}
                </button>
              </div>
            </div>

            <!-- Company Info -->
            <div
              class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
              >
                {{ t("job.companyInfo") }}
              </h3>
              <div class="space-y-4">
                <div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ t("job.company") }}
                  </div>
                  <div class="font-medium text-gray-900 dark:text-white">
                    {{ job.company }}
                  </div>
                </div>
                <div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ t("job.location") }}
                  </div>
                  <div class="font-medium text-gray-900 dark:text-white">
                    {{ job.location }}
                  </div>
                </div>
                <div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ t("job.workType") }}
                  </div>
                  <div class="font-medium text-gray-900 dark:text-white">
                    {{ job.remote ? t("job.remoteWork") : t("job.officeWork") }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Similar Jobs -->
            <div
              v-if="similarJobs.length > 0"
              class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
              >
                {{ t("job.similarJobs") }}
              </h3>
              <div class="space-y-4">
                <div
                  v-for="similarJob in similarJobs"
                  :key="similarJob.id"
                  class="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  @click="$router.push(`/jobs/${similarJob.id}`)"
                >
                  <h4 class="font-medium text-gray-900 dark:text-white mb-1">
                    {{ similarJob.title }}
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {{ similarJob.company }} • {{ similarJob.location }}
                  </p>
                  <div class="flex items-center justify-between">
                    <span
                      class="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200"
                    >
                      {{ translateCategory(similarJob.category) }}
                    </span>
                    <span
                      class="text-sm font-medium text-green-600 dark:text-green-400"
                    >
                      {{ formatJobSalary(similarJob.salary) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Application Modal -->
        <JobApplicationModal
          v-if="isApplicationModalOpen"
          :job="job"
          :is-open="isApplicationModalOpen"
          @close="closeApplicationModal"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useJobDetail } from "@/composables/useJobDetail";
import { useJobApplication } from "@/composables/useJobApplication";
import { useJobTranslations } from "@/composables/useJobTranslations";
import { useJobFormatting } from "@/composables/useJobFormatting";
import JobApplicationModal from "@/components/jobs/JobApplicationModal.vue";

const { t } = useI18n();

// Use composables
const {
  job,
  loading,
  error,
  deadlineInfo,
  canApply,
  formattedSalary,
  similarJobs,
  loadJobDetail,
  goBack,
  goToSimilarJobs,
  shareJob,
  formatJobDate,
} = useJobDetail();

const {
  isApplicationModalOpen,
  openApplicationModal,
  closeApplicationModal,
  saveJob,
} = useJobApplication();

const { translateCategory, translateJobType, translateExperienceLevel } =
  useJobTranslations();

const { formatJobSalary, getJobFreshnessInfo } = useJobFormatting();

// Load job on mount
onMounted(async () => {
  await loadJobDetail();
});
</script>

<style scoped>
.prose {
  max-width: none;
}

.prose p {
  margin-bottom: 1rem;
  line-height: 1.7;
}
</style>
