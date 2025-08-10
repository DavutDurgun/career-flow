import { useI18n } from "vue-i18n";
import {
  formatDate,
  formatSalary,
  getRemainingDays,
  getJobFreshness,
} from "@/utils/jobUtils";
import type { Job } from "@/types/job";

export const useJobFormatting = () => {
  const { locale, t } = useI18n();

  /**
   * Format job salary with proper formatting
   */
  const formatJobSalary = (salary: Job["salary"]): string => {
    return formatSalary(salary);
  };

  /**
   * Format job date with current locale
   */
  const formatJobDate = (dateString: string): string => {
    return formatDate(dateString, locale.value === "en" ? "en-US" : "tr-TR");
  };

  /**
   * Get formatted remaining days for deadline
   */
  const getFormattedRemainingDays = (deadlineString: string): string => {
    const days = getRemainingDays(deadlineString);

    if (days < 0) {
      return t("common.deadline.expired");
    }
    if (days === 0) {
      return t("common.deadline.today");
    }
    if (days === 1) {
      return t("common.deadline.oneDayLeft");
    }
    return t("common.deadline.daysLeft", { days: days });
  };

  /**
   * Get job freshness badge info
   */
  const getJobFreshnessInfo = (postedDateString: string) => {
    const freshness = getJobFreshness(postedDateString);

    switch (freshness) {
      case "new":
        return {
          label: "New",
          class:
            "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200",
        };
      case "recent":
        return {
          label: "Recent",
          class:
            "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200",
        };
      default:
        return null;
    }
  };

  /**
   * Get deadline urgency info
   */
  const getDeadlineUrgencyInfo = (deadlineString: string) => {
    const days = getRemainingDays(deadlineString);

    if (days < 0) {
      return {
        label: "Expired",
        class: "text-gray-400 dark:text-gray-300",
      };
    }

    if (days <= 3) {
      return {
        label: "Urgent",
        class: "text-red-600 dark:text-red-400",
      };
    }

    if (days <= 7) {
      return {
        label: "Soon",
        class: "text-orange-600 dark:text-orange-400",
      };
    }

    return {
      label: "Normal",
      class: "text-gray-900 dark:text-gray-500",
    };
  };

  return {
    formatJobSalary,
    formatJobDate,
    getFormattedRemainingDays,
    getJobFreshnessInfo,
    getDeadlineUrgencyInfo,
  };
};
