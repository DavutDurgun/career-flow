import { useI18n } from "vue-i18n";
import type { JobCategory, JobType, ExperienceLevel } from "@/types/job";

export const useJobTranslations = () => {
  const { t } = useI18n();

  /**
   * Translate job category
   */
  const translateCategory = (category: JobCategory): string => {
    const categoryMap: Record<JobCategory, string> = {
      software: t("category.software"),
      design: t("category.design"),
      marketing: t("category.marketing"),
      sales: t("category.sales"),
      hr: t("category.hr"),
      finance: t("category.finance"),
      operations: t("category.operations"),
      support: t("category.support"),
    };
    return categoryMap[category] || category;
  };

  /**
   * Translate job type
   */
  const translateJobType = (type: JobType): string => {
    const typeMap: Record<JobType, string> = {
      fullTime: t("type.fullTime"),
      partTime: t("type.partTime"),
      freelance: t("type.freelance"),
      internship: t("type.internship"),
      contract: t("type.contract"),
    };
    return typeMap[type] || type;
  };

  /**
   * Translate experience level
   */
  const translateExperienceLevel = (level: ExperienceLevel): string => {
    const levelMap: Record<ExperienceLevel, string> = {
      entry: t("exp.entry"),
      mid: t("exp.mid"),
      senior: t("exp.senior"),
      expert: t("exp.expert"),
    };
    return levelMap[level] || level;
  };

  /**
   * Get all available categories with translations
   */
  const getAvailableCategories = (): Array<{
    value: JobCategory;
    label: string;
  }> => {
    const categories: JobCategory[] = [
      "software",
      "design",
      "marketing",
      "sales",
      "hr",
      "finance",
      "operations",
      "support",
    ];

    return categories.map((category) => ({
      value: category,
      label: translateCategory(category),
    }));
  };

  /**
   * Get all available job types with translations
   */
  const getAvailableJobTypes = (): Array<{ value: JobType; label: string }> => {
    const types: JobType[] = [
      "fullTime",
      "partTime",
      "freelance",
      "internship",
      "contract",
    ];

    return types.map((type) => ({
      value: type,
      label: translateJobType(type),
    }));
  };

  /**
   * Get all available experience levels with translations
   */
  const getAvailableExperienceLevels = (): Array<{
    value: ExperienceLevel;
    label: string;
  }> => {
    const levels: ExperienceLevel[] = ["entry", "mid", "senior", "expert"];

    return levels.map((level) => ({
      value: level,
      label: translateExperienceLevel(level),
    }));
  };

  return {
    translateCategory,
    translateJobType,
    translateExperienceLevel,
    getAvailableCategories,
    getAvailableJobTypes,
    getAvailableExperienceLevels,
  };
};
