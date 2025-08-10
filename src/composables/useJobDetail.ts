import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useJobsStore } from "@/stores/useJobsStore";
import {
  formatDate,
  getRemainingDays,
  isDeadlineApproaching,
  isDeadlinePassed,
} from "@/utils/jobUtils";
import type { Job } from "@/types/job";

export const useJobDetail = () => {
  const route = useRoute();
  const router = useRouter();
  const { locale } = useI18n();
  const jobsStore = useJobsStore();

  const loading = ref(false);
  const error = ref<string | null>(null);
  const job = ref<Job | null>(null);

  /**
   * Get job ID from route params
   */
  const jobId = computed(() => route.params.id as string);

  /**
   * Load job details
   */
  const loadJobDetail = async () => {
    if (!jobId.value) {
      error.value = "Job ID is required";
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      // First ensure jobs are loaded in the store
      await jobsStore.getJobById(jobId.value);

      // Find the job by ID
      const foundJob = jobsStore.jobs.find((j) => j.id === jobId.value);

      if (!foundJob) {
        error.value = "Job not found";
        return;
      }

      job.value = foundJob;
    } catch (err) {
      console.error("Error loading job detail:", err);
      error.value = "Failed to load job details";
    } finally {
      loading.value = false;
    }
  };

  /**
   * Navigate back to jobs list
   */
  const goBack = () => {
    router.push("/jobs");
  };

  /**
   * Navigate to similar jobs
   */
  const goToSimilarJobs = (category?: string, location?: string) => {
    const query: Record<string, string> = {};
    if (category) query.category = category;
    if (location) query.location = location;

    router.push({
      path: "/jobs",
      query,
    });
  };

  /**
   * Share job URL
   */
  const shareJob = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: job.value?.title || "Job Opportunity",
          text: job.value?.description || "Check out this job opportunity",
          url,
        });
      } catch (err) {
        console.error("Error sharing:", err);
        await copyToClipboard(url);
      }
    } else {
      await copyToClipboard(url);
    }
  };

  /**
   * Copy URL to clipboard
   */
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You can add a toast notification here
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  /**
   * Format job dates with current locale
   */
  const formatJobDate = (dateString: string) => {
    return formatDate(dateString, locale.value === "en" ? "en-US" : "tr-TR");
  };

  /**
   * Get deadline info with urgency
   */
  const deadlineInfo = computed(() => {
    if (!job.value) return null;

    const remainingDays = getRemainingDays(job.value.deadline);
    const isApproaching = isDeadlineApproaching(job.value.deadline);
    const isPassed = isDeadlinePassed(job.value.deadline);

    return {
      remainingDays,
      isApproaching,
      isPassed,
      formattedDate: formatJobDate(job.value.deadline),
      urgencyClass: isPassed
        ? "text-red-600 dark:text-red-400"
        : isApproaching
        ? "text-orange-600 dark:text-orange-400"
        : "text-gray-600 dark:text-gray-400",
    };
  });

  /**
   * Check if user can apply (deadline not passed)
   */
  const canApply = computed(() => {
    return deadlineInfo.value ? !deadlineInfo.value.isPassed : false;
  });

  /**
   * Get salary range formatted
   */
  const formattedSalary = computed(() => {
    if (!job.value) return "";
    return `${job.value.salary.min.toLocaleString()} - ${job.value.salary.max.toLocaleString()} ${
      job.value.salary.currency
    }`;
  });

  /**
   * Get similar jobs based on category and location
   */
  const similarJobs = computed(() => {
    if (!job.value) return [];

    return jobsStore.jobs
      .filter(
        (j) =>
          j.id !== job.value!.id &&
          (j.category === job.value!.category ||
            j.location === job.value!.location)
      )
      .slice(0, 3);
  });

  return {
    job,
    loading,
    error,
    jobId,
    deadlineInfo,
    canApply,
    formattedSalary,
    similarJobs,
    loadJobDetail,
    goBack,
    goToSimilarJobs,
    shareJob,
    formatJobDate,
  };
};
