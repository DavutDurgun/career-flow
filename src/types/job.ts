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
  | "software"
  | "design"
  | "marketing"
  | "sales"
  | "hr"
  | "finance"
  | "operations"
  | "support";

export type JobType =
  | "fullTime"
  | "partTime"
  | "freelance"
  | "internship"
  | "contract";

export type ExperienceLevel = "entry" | "mid" | "senior" | "expert";

export interface JobFilters {
  search: string;
  location: string;
  category: JobCategory | "";
  type: JobType | "";
  remote: boolean | null;
  experienceLevel: ExperienceLevel | "";
}

export type RemoteFilterType = "all" | "remote" | "office";
