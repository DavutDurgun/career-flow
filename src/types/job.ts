export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: JobCategory;
  type: JobType;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  postedDate: string;
  deadline: string;
  remote: boolean;
  experienceLevel: ExperienceLevel;
  companyLogo?: string;
}

export type JobCategory =
  | "Yazılım Geliştirme"
  | "Tasarım"
  | "Pazarlama"
  | "Satış"
  | "İnsan Kaynakları"
  | "Finans"
  | "Operasyon"
  | "Müşteri Hizmetleri";

export type JobType =
  | "Tam Zamanlı"
  | "Yarı Zamanlı"
  | "Freelance"
  | "Staj"
  | "Sözleşmeli";

export type ExperienceLevel =
  | "Giriş Seviyesi"
  | "Orta Seviye"
  | "Kıdemli"
  | "Uzman";

export interface JobFilters {
  search: string;
  location: string;
  category: JobCategory | "";
  type: JobType | "";
  remote: boolean | null;
  experienceLevel: ExperienceLevel | "";
}
