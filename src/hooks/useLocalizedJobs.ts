import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useJobsStore } from "@/stores/useJobsStore";
import type { Job } from "@/types/job";

/**
 * Composable that ensures jobs are always in the current locale
 * and provides additional utilities for working with localized job data
 */
export const useLocalizedJobs = () => {
  const { locale } = useI18n();
  const jobsStore = useJobsStore();

  // Ensure jobs are loaded in current locale
  const ensureJobsLoaded = async () => {
    if (jobsStore.jobs.length === 0) {
      await jobsStore.fetchJobs();
    } else {
      // If jobs are already loaded but locale changed, refresh them
      jobsStore.refreshJobsForLocale();
    }
  };

  // Get jobs that are guaranteed to be in current locale
  const localizedJobs = computed<Job[]>(() => {
    return jobsStore.jobs;
  });

  // Get filtered jobs in current locale
  const filteredLocalizedJobs = computed<Job[]>(() => {
    return jobsStore.filteredJobs;
  });

  // Helper to format job data for display
  const formatJobForDisplay = (job: Job) => {
    return {
      ...job,
      // Add any additional formatting logic here
      salaryRange: `${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()} ${
        job.salary.currency
      }`,
      isNew: isJobNew(job.postedDate),
      isExpiringSoon: isJobExpiringSoon(job.deadline),
    };
  };

  // Check if job is posted within last 7 days
  const isJobNew = (postedDate: string): boolean => {
    const posted = new Date(postedDate);
    const now = new Date();
    const diffTime = now.getTime() - posted.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  // Check if job deadline is within next 7 days
  const isJobExpiringSoon = (deadline: string): boolean => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  return {
    // Data
    locale,
    localizedJobs,
    filteredLocalizedJobs,

    // State
    loading: computed(() => jobsStore.loading),
    error: computed(() => jobsStore.error),
    jobCount: computed(() => jobsStore.jobCount),
    filteredJobCount: computed(() => jobsStore.filteredJobCount),

    // Actions
    ensureJobsLoaded,
    refreshJobs: jobsStore.refreshJobsForLocale,
    getJobById: jobsStore.getJobById,

    // Utilities
    formatJobForDisplay,
    isJobNew,
    isJobExpiringSoon,
  };
};
