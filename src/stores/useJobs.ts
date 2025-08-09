import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Job, JobFilters } from "@/types/job";
import { mockJobs } from "@/mock/mockJobs";

export const useJobsStore = defineStore("jobs", () => {
  // State
  const jobs = ref<Job[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const filters = ref<JobFilters>({
    search: "",
    location: "",
    category: "",
    type: "",
    remote: null,
    experienceLevel: "",
  });

  // Getters
  const filteredJobs = computed(() => {
    let result = [...jobs.value];

    // Search filter (title, company, description)
    if (filters.value.search) {
      const searchTerm = filters.value.search.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.company.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm)
      );
    }

    // Location filter
    if (filters.value.location) {
      result = result.filter((job) =>
        job.location
          .toLowerCase()
          .includes(filters.value.location.toLowerCase())
      );
    }

    // Category filter
    if (filters.value.category) {
      result = result.filter((job) => job.category === filters.value.category);
    }

    // Job type filter
    if (filters.value.type) {
      result = result.filter((job) => job.type === filters.value.type);
    }

    // Remote filter
    if (filters.value.remote !== null) {
      result = result.filter((job) => job.remote === filters.value.remote);
    }

    // Experience level filter
    if (filters.value.experienceLevel) {
      result = result.filter(
        (job) => job.experienceLevel === filters.value.experienceLevel
      );
    }

    return result;
  });

  const jobCount = computed(() => jobs.value.length);
  const filteredJobCount = computed(() => filteredJobs.value.length);

  // Actions
  const fetchJobs = async () => {
    try {
      loading.value = true;
      error.value = null;

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      jobs.value = mockJobs;
    } catch (err) {
      error.value = "İş ilanları yüklenirken bir hata oluştu";
      console.error("Error fetching jobs:", err);
    } finally {
      loading.value = false;
    }
  };

  const getJobById = (id: string): Job | undefined => {
    return jobs.value.find((job) => job.id === id);
  };

  const updateFilters = (newFilters: Partial<JobFilters>) => {
    filters.value = { ...filters.value, ...newFilters };
  };

  const clearFilters = () => {
    filters.value = {
      search: "",
      location: "",
      category: "",
      type: "",
      remote: null,
      experienceLevel: "",
    };
  };

  const searchJobs = (searchTerm: string) => {
    filters.value.search = searchTerm;
  };

  return {
    // State
    jobs,
    loading,
    error,
    filters,

    // Getters
    filteredJobs,
    jobCount,
    filteredJobCount,

    // Actions
    fetchJobs,
    getJobById,
    updateFilters,
    clearFilters,
    searchJobs,
  };
});
