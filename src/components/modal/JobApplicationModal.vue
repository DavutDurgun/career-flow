<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black opacity-50" @click="closeModal"></div>

    <!-- Modal Content -->
    <div
      class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto"
      @click.stop
    >
      <!-- Header -->
      <div
        class="bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              {{ t("application.title") }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {{ job.title }} • {{ job.company }}
            </p>
          </div>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <svg
              class="w-6 h-6"
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

      <!-- Success Message -->
      <div
        v-if="applicationSuccess"
        class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg m-6 p-4"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg
              class="w-5 h-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-green-800 dark:text-green-200">
              {{ t("application.success.title") }}
            </h3>
            <p class="text-sm text-green-700 dark:text-green-300 mt-1">
              {{ t("application.success.message") }}
            </p>
          </div>
        </div>
        <div class="mt-4">
          <button
            @click="closeModal"
            class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {{ t("common.close") }}
          </button>
        </div>
      </div>

      <!-- Application Form -->
      <form v-else @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <!-- Error Message -->
        <div
          v-if="applicationError"
          class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
        >
          <div class="flex items-center">
            <svg
              class="w-5 h-5 text-red-400 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            <p class="text-sm text-red-700 dark:text-red-300">
              {{ applicationError }}
            </p>
          </div>
        </div>

        <!-- Personal Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {{ t("application.fullName") }} *
            </label>
            <input
              v-model="applicationData.fullName"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Ahmet Yılmaz"
            />
          </div>
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {{ t("application.email") }} *
            </label>
            <input
              v-model="applicationData.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="ornek@email.com"
            />
          </div>
        </div>

        <!-- Phone -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {{ t("application.phone") }} *
          </label>
          <input
            v-model="applicationData.phone"
            type="tel"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="+90 555 123 45 67"
          />
        </div>

        <!-- CV Upload -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {{ t("application.cv") }} *
          </label>
          <div
            class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg"
          >
            <div class="space-y-1 text-center">
              <div v-if="!applicationData.cv">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div class="flex text-sm text-gray-600 dark:text-gray-400">
                  <label
                    class="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>{{ t("application.uploadFile") }}</span>
                    <input
                      type="file"
                      class="sr-only"
                      accept=".pdf,.doc,.docx"
                      @change="handleFileUpload"
                    />
                  </label>
                  <p class="pl-1">{{ t("application.orDragAndDrop") }}</p>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  PDF, DOC, DOCX - Maksimum 5MB
                </p>
              </div>

              <!-- File Preview -->
              <div v-else class="flex items-center justify-center space-x-3">
                <div class="flex items-center space-x-2">
                  <svg
                    class="w-8 h-8 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <div class="text-left">
                    <p
                      class="text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {{ applicationData.cv.name }}
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      {{ getFileSize(applicationData.cv.size) }}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  @click="removeFile"
                  class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Cover Letter -->
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {{ t("application.coverLetter") }} *
          </label>
          <textarea
            v-model="applicationData.coverLetter"
            rows="6"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
            placeholder="Değerli İnsan Kaynakları Ekibi,

Bu pozisyon için başvuru yapıyorum çünkü..."
            maxlength="1000"
          ></textarea>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {{ applicationData.coverLetter.length }}/1000 karakter
          </p>
        </div>

        <!-- Actions -->
        <div class="flex space-x-4 pt-4">
          <button
            type="button"
            @click="closeModal"
            class="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            {{ t("common.cancel") }}
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:bg-blue-300 dark:disabled:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center justify-center"
          >
            <div
              v-if="isSubmitting"
              class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
            ></div>
            {{
              isSubmitting
                ? t("application.submitting")
                : t("application.submit")
            }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useJobApplication } from "@/composables/useJobApplication";
import type { Job } from "@/types/job";

interface Props {
  job: Job;
  isOpen: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

const { t } = useI18n();

const {
  applicationData,
  isSubmitting,
  applicationSuccess,
  applicationError,
  handleFileUpload,
  submitApplication,
  removeFile,
  getFileSize,
  resetForm,
} = useJobApplication();

const closeModal = () => {
  resetForm();
  emit("close");
};

const handleSubmit = async () => {
  await submitApplication(props.job);
};
</script>
