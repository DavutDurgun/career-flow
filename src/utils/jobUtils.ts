import type { Job } from "@/types/job";

/**
 * Format salary range for display
 */
export const formatSalary = (salary: Job["salary"]): string => {
  return `${salary.min.toLocaleString()} - ${salary.max.toLocaleString()}`;
};

/**
 * Format date for display with locale support
 */
export const formatDate = (
  dateString: string,
  locale: string = "tr-TR"
): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

/**
 * Calculate remaining days until deadline
 */
export const getRemainingDays = (deadlineString: string): number => {
  const deadline = new Date(deadlineString);
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Check if job deadline is approaching (within 7 days)
 */
export const isDeadlineApproaching = (deadlineString: string): boolean => {
  const remainingDays = getRemainingDays(deadlineString);
  return remainingDays <= 7 && remainingDays > 0;
};

/**
 * Check if job deadline has passed
 */
export const isDeadlinePassed = (deadlineString: string): boolean => {
  return getRemainingDays(deadlineString) < 0;
};

/**
 * Get job freshness indicator
 */
export const getJobFreshness = (
  postedDateString: string
): "new" | "recent" | "old" => {
  const postedDate = new Date(postedDateString);
  const today = new Date();
  const diffTime = today.getTime() - postedDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) return "new";
  if (diffDays <= 7) return "recent";
  return "old";
};
