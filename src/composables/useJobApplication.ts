import { ref } from "vue";
import { useI18n } from "vue-i18n";
import type { Job, ApplicationData } from "@/types/job";

export const useJobApplication = () => {
  const { t } = useI18n();

  const isApplicationModalOpen = ref(false);
  const isSubmitting = ref(false);
  const applicationSuccess = ref(false);
  const applicationError = ref<string | null>(null);

  const applicationData = ref<ApplicationData>({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    cv: null,
  });

  /**
   * Open application modal
   */
  const openApplicationModal = () => {
    isApplicationModalOpen.value = true;
    resetForm();
  };

  /**
   * Close application modal
   */
  const closeApplicationModal = () => {
    isApplicationModalOpen.value = false;
    applicationSuccess.value = false;
    applicationError.value = null;
    resetForm();
  };

  /**
   * Reset application form
   */
  const resetForm = () => {
    applicationData.value = {
      fullName: "",
      email: "",
      phone: "",
      coverLetter: "",
      cv: null,
    };
  };

  /**
   * Validate application form
   */
  const validateForm = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!applicationData.value.fullName.trim()) {
      errors.push(t("application.errors.nameRequired"));
    }

    if (!applicationData.value.email.trim()) {
      errors.push(t("application.errors.emailRequired"));
    } else if (!isValidEmail(applicationData.value.email)) {
      errors.push(t("application.errors.emailInvalid"));
    }

    if (!applicationData.value.phone.trim()) {
      errors.push(t("application.errors.phoneRequired"));
    }

    if (!applicationData.value.coverLetter.trim()) {
      errors.push(t("application.errors.coverLetterRequired"));
    }

    if (!applicationData.value.cv) {
      errors.push(t("application.errors.cvRequired"));
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  /**
   * Validate email format
   */
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Handle file upload
   */
  const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) return;

    // Validate file type
    const allowedTypes = [".pdf", ".doc", ".docx"];
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

    if (!allowedTypes.includes(fileExtension)) {
      applicationError.value = t("application.errors.invalidFileType");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      applicationError.value = t("application.errors.fileTooLarge");
      return;
    }

    applicationData.value.cv = file;
    applicationError.value = null;
  };

  /**
   * Submit job application
   */
  const submitApplication = async (job: Job) => {
    const validation = validateForm();

    if (!validation.isValid) {
      applicationError.value = validation.errors.join(", ");
      return;
    }

    isSubmitting.value = true;
    applicationError.value = null;

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically:
      // 1. Upload CV to storage service
      // 2. Submit application data to backend
      // 3. Send confirmation emails

      console.log("Application submitted:", {
        jobId: job.id,
        jobTitle: job.title,
        applicantData: applicationData.value,
      });

      applicationSuccess.value = true;
    } catch (error) {
      console.error("Error submitting application:", error);
      applicationError.value = t("application.errors.submitFailed");
    } finally {
      isSubmitting.value = false;
    }
  };

  /**
   * Save job to favorites (bookmark)
   */
  const saveJob = async (job: Job) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Here you would save to backend
      console.log("Job saved to favorites:", job.id);

      // You could also add to local state/store
      // favoritesStore.addFavorite(job);
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  /**
   * Remove file
   */
  const removeFile = () => {
    applicationData.value.cv = null;
  };

  /**
   * Get file size in readable format
   */
  const getFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + " KB";
    return Math.round(bytes / (1024 * 1024)) + " MB";
  };

  return {
    isApplicationModalOpen,
    isSubmitting,
    applicationSuccess,
    applicationError,
    applicationData,
    openApplicationModal,
    closeApplicationModal,
    resetForm,
    validateForm,
    handleFileUpload,
    submitApplication,
    saveJob,
    removeFile,
    getFileSize,
  };
};
