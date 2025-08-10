import type { JobFilters } from "@/types/job";

/**
 * Check if filters object has any active filters
 */
export const hasAnyActiveFilters = (filters: JobFilters): boolean => {
  return !!(
    filters.search ||
    filters.location ||
    filters.category ||
    filters.type ||
    filters.remote !== null ||
    filters.experienceLevel
  );
};

/**
 * Count active filters
 */
export const countActiveFilters = (filters: JobFilters): number => {
  let count = 0;
  if (filters.search) count++;
  if (filters.location) count++;
  if (filters.category) count++;
  if (filters.type) count++;
  if (filters.remote !== null) count++;
  if (filters.experienceLevel) count++;
  return count;
};

/**
 * Create empty filters object
 */
export const createEmptyFilters = (): JobFilters => ({
  search: "",
  location: "",
  category: "",
  type: "",
  remote: null,
  experienceLevel: "",
});

/**
 * Clean filters by removing empty values
 */
export const cleanFilters = (
  filters: Partial<JobFilters>
): Partial<JobFilters> => {
  const cleaned: Partial<JobFilters> = {};

  if (filters.search?.trim()) cleaned.search = filters.search.trim();
  if (filters.location?.trim()) cleaned.location = filters.location.trim();
  if (filters.category?.trim()) cleaned.category = filters.category.trim();
  if (filters.type?.trim()) cleaned.type = filters.type.trim();
  if (filters.experienceLevel?.trim())
    cleaned.experienceLevel = filters.experienceLevel.trim();
  if (filters.remote !== null && filters.remote !== undefined)
    cleaned.remote = filters.remote;

  return cleaned;
};

/**
 * Merge filters with defaults
 */
export const mergeWithDefaults = (filters: Partial<JobFilters>): JobFilters => {
  const defaults = createEmptyFilters();
  return {
    ...defaults,
    ...cleanFilters(filters),
  };
};

/**
 * Compare two filter objects
 */
export const areFiltersEqual = (
  filters1: JobFilters,
  filters2: JobFilters
): boolean => {
  return (
    filters1.search === filters2.search &&
    filters1.location === filters2.location &&
    filters1.category === filters2.category &&
    filters1.type === filters2.type &&
    filters1.remote === filters2.remote &&
    filters1.experienceLevel === filters2.experienceLevel
  );
};

/**
 * Validate filter values
 */
export const validateFilters = (
  filters: Partial<JobFilters>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Check search length
  if (filters.search && filters.search.length > 100) {
    errors.push("Search query is too long");
  }

  // Add more validation rules as needed

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Convert filters to URL query parameters
 */
export const filtersToQuery = (filters: JobFilters): Record<string, string> => {
  const query: Record<string, string> = {};

  if (filters.search) query.search = filters.search;
  if (filters.location) query.location = filters.location;
  if (filters.category) query.category = filters.category;
  if (filters.type) query.type = filters.type;
  if (filters.experienceLevel) query.experienceLevel = filters.experienceLevel;
  if (filters.remote !== null) query.remote = filters.remote.toString();

  return query;
};

/**
 * Convert URL query parameters to filters
 */
export const queryToFilters = (
  query: Record<string, string | string[]>
): Partial<JobFilters> => {
  const filters: Partial<JobFilters> = {};

  if (typeof query.search === "string") filters.search = query.search;
  if (typeof query.location === "string") filters.location = query.location;
  if (typeof query.category === "string") filters.category = query.category;
  if (typeof query.type === "string") filters.type = query.type;
  if (typeof query.experienceLevel === "string")
    filters.experienceLevel = query.experienceLevel;
  if (typeof query.remote === "string") {
    filters.remote =
      query.remote === "true" ? true : query.remote === "false" ? false : null;
  }

  return filters;
};
