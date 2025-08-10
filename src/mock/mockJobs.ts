import type { Job } from "@/types/job";

// Çok dilli iş ilanları için interface
export interface MultilingualJobData {
  id: string;
  titles: {
    tr: string;
    en: string;
  };
  company: string;
  location: string;
  category: string;
  type: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  descriptions: {
    tr: string;
    en: string;
  };
  requirements: {
    tr: string[];
    en: string[];
  };
  responsibilities: {
    tr: string[];
    en: string[];
  };
  benefits: {
    tr: string[];
    en: string[];
  };
  postedDate: string;
  deadline: string;
  remote: boolean;
  experienceLevel: string;
  companyLogo?: string;
}

// Çok dilli mock data
export const multilingualMockJobs: MultilingualJobData[] = [
  {
    id: "1",
    titles: {
      tr: "Kıdemli Frontend Geliştirici",
      en: "Senior Frontend Developer",
    },
    company: "TechCorp",
    location: "İstanbul",
    category: "software",
    type: "fullTime",
    salary: {
      min: 110000,
      max: 130000,
      currency: "TL",
    },
    descriptions: {
      tr: "Modern web uygulamaları geliştiren deneyimli frontend developer arıyoruz.",
      en: "We are looking for an experienced frontend developer who builds modern web applications.",
    },
    requirements: {
      tr: [
        "5+ yıl frontend geliştirme deneyimi",
        "Vue.js, React veya Angular uzmanlığı",
        "TypeScript bilgisi",
        "CSS preprocessor deneyimi",
      ],
      en: [
        "5+ years of frontend development experience",
        "Expertise in Vue.js, React or Angular",
        "TypeScript knowledge",
        "CSS preprocessor experience",
      ],
    },
    responsibilities: {
      tr: [
        "Web uygulamalarının frontend kısmını geliştirmek",
        "UI/UX tasarımlarını kodla hayata geçirmek",
        "Performance optimizasyonu yapmak",
        "Code review süreçlerine katılmak",
      ],
      en: [
        "Develop frontend part of web applications",
        "Implement UI/UX designs with code",
        "Perform performance optimization",
        "Participate in code review processes",
      ],
    },
    benefits: {
      tr: [
        "Esnek çalışma saatleri",
        "Remote çalışma imkanı",
        "Eğitim ve gelişim desteği",
        "Sağlık sigortası",
      ],
      en: [
        "Flexible working hours",
        "Remote work opportunity",
        "Training and development support",
        "Health insurance",
      ],
    },
    postedDate: "2025-07-15",
    deadline: "2025-08-18",
    remote: true,
    experienceLevel: "senior",
  },
  {
    id: "2",
    titles: {
      tr: "UI/UX Tasarımcısı",
      en: "UI/UX Designer",
    },
    company: "DesignStudio",
    location: "Ankara",
    category: "design",
    type: "fullTime",
    salary: {
      min: 70000,
      max: 90000,
      currency: "TL",
    },
    descriptions: {
      tr: "Kullanıcı deneyimi odaklı, yaratıcı tasarımlar yapan designer arıyoruz.",
      en: "We are looking for a designer who creates user experience-focused, creative designs.",
    },
    requirements: {
      tr: [
        "3+ yıl UI/UX tasarım deneyimi",
        "Figma, Sketch, Adobe XD uzmanlığı",
        "Prototyping deneyimi",
        "Kullanıcı araştırması bilgisi",
      ],
      en: [
        "3+ years of UI/UX design experience",
        "Expertise in Figma, Sketch, Adobe XD",
        "Prototyping experience",
        "User research knowledge",
      ],
    },
    responsibilities: {
      tr: [
        "Kullanıcı araştırması yapmak",
        "Wireframe ve prototype oluşturmak",
        "Visual tasarımları hazırlamak",
        "Developer'larla işbirliği yapmak",
      ],
      en: [
        "Conduct user research",
        "Create wireframes and prototypes",
        "Prepare visual designs",
        "Collaborate with developers",
      ],
    },
    benefits: {
      tr: [
        "Kreatif çalışma ortamı",
        "Tasarım konferansları",
        "Adobe Creative Suite lisansı",
        "Yemek kartı",
      ],
      en: [
        "Creative work environment",
        "Design conferences",
        "Adobe Creative Suite license",
        "Meal card",
      ],
    },
    postedDate: "2025-07-10",
    deadline: "2025-08-15",
    remote: false,
    experienceLevel: "mid",
  },
  {
    id: "3",
    titles: {
      tr: "Dijital Pazarlama Uzmanı",
      en: "Digital Marketing Specialist",
    },
    company: "MarketingPro",
    location: "İzmir",
    category: "marketing",
    type: "fullTime",
    salary: {
      min: 40000,
      max: 60000,
      currency: "TL",
    },
    descriptions: {
      tr: "Dijital pazarlama stratejileri geliştiren uzman arıyoruz.",
      en: "We are looking for a specialist who develops digital marketing strategies.",
    },
    requirements: {
      tr: [
        "2+ yıl dijital pazarlama deneyimi",
        "Google Ads, Facebook Ads bilgisi",
        "SEO/SEM uzmanlığı",
        "Analytics tools deneyimi",
      ],
      en: [
        "2+ years of digital marketing experience",
        "Google Ads, Facebook Ads knowledge",
        "SEO/SEM expertise",
        "Analytics tools experience",
      ],
    },
    responsibilities: {
      tr: [
        "Dijital kampanyalar yönetmek",
        "Social media stratejileri geliştirmek",
        "Performance analizi yapmak",
        "Content marketing planlamak",
      ],
      en: [
        "Manage digital campaigns",
        "Develop social media strategies",
        "Perform performance analysis",
        "Plan content marketing",
      ],
    },
    benefits: {
      tr: [
        "Performance bonusu",
        "Esnek çalışma",
        "Eğitim desteği",
        "Ulaşım desteği",
      ],
      en: [
        "Performance bonus",
        "Flexible working",
        "Training support",
        "Transportation allowance",
      ],
    },
    postedDate: "2025-07-12",
    deadline: "2025-08-13",
    remote: true,
    experienceLevel: "mid",
  },
  {
    id: "4",
    titles: {
      tr: "Backend Geliştirici",
      en: "Backend Developer",
    },
    company: "CodeBase",
    location: "İstanbul",
    category: "software",
    type: "fullTime",
    salary: {
      min: 80000,
      max: 100000,
      currency: "TL",
    },
    descriptions: {
      tr: "Ölçeklenebilir backend sistemleri geliştiren developer arıyoruz.",
      en: "We are looking for a developer who builds scalable backend systems.",
    },
    requirements: {
      tr: [
        "4+ yıl backend geliştirme deneyimi",
        "Node.js, Python veya Java uzmanlığı",
        "Database tasarımı bilgisi",
        "API geliştirme deneyimi",
      ],
      en: [
        "4+ years of backend development experience",
        "Expertise in Node.js, Python or Java",
        "Database design knowledge",
        "API development experience",
      ],
    },
    responsibilities: {
      tr: [
        "Backend API'leri geliştirmek",
        "Database optimizasyonu yapmak",
        "Sistem mimarisini tasarlamak",
        "Security best practices uygulamak",
      ],
      en: [
        "Develop backend APIs",
        "Perform database optimization",
        "Design system architecture",
        "Apply security best practices",
      ],
    },
    benefits: {
      tr: [
        "Teknik eğitimler",
        "Conference katılım desteği",
        "Remote working",
        "Stock option",
      ],
      en: [
        "Technical training",
        "Conference participation support",
        "Remote working",
        "Stock options",
      ],
    },
    postedDate: "2025-07-08",
    deadline: "2025-08-08",
    remote: true,
    experienceLevel: "senior",
  },
  {
    id: "5",
    titles: {
      tr: "Junior Frontend Geliştirici",
      en: "Junior Frontend Developer",
    },
    company: "StartupTech",
    location: "Bursa",
    category: "software",
    type: "fullTime",
    salary: {
      min: 40000,
      max: 70000,
      currency: "TL",
    },
    descriptions: {
      tr: "Kariyerine yeni başlayan, öğrenmeye açık frontend developer arıyoruz.",
      en: "We are looking for a frontend developer who is just starting their career and eager to learn.",
    },
    requirements: {
      tr: [
        "1+ yıl frontend geliştirme deneyimi",
        "HTML, CSS, JavaScript bilgisi",
        "Vue.js veya React temel bilgisi",
        "Git kullanımı",
      ],
      en: [
        "1+ years of frontend development experience",
        "HTML, CSS, JavaScript knowledge",
        "Basic knowledge of Vue.js or React",
        "Git usage",
      ],
    },
    responsibilities: {
      tr: [
        "Web arayüzleri geliştirmek",
        "Bug fix ve improvement yapmak",
        "Senior developer'lardan öğrenmek",
        "Code review süreçlerine katılmek",
      ],
      en: [
        "Develop web interfaces",
        "Perform bug fixes and improvements",
        "Learn from senior developers",
        "Participate in code review processes",
      ],
    },
    benefits: {
      tr: [
        "Mentorship programı",
        "Eğitim ve gelişim fırsatları",
        "Genç ve dinamik takım",
        "Yemek kartı",
      ],
      en: [
        "Mentorship program",
        "Training and development opportunities",
        "Young and dynamic team",
        "Meal card",
      ],
    },
    postedDate: "2025-07-14",
    deadline: "2025-08-11",
    remote: false,
    experienceLevel: "entry",
  },
  {
    id: "6",
    titles: {
      tr: "Ürün Müdürü",
      en: "Product Manager",
    },
    company: "InnovateNow",
    location: "İstanbul",
    category: "operations",
    type: "fullTime",
    salary: {
      min: 90000,
      max: 120000,
      currency: "TL",
    },
    descriptions: {
      tr: "Ürün stratejileri belirleyen ve geliştirme süreçlerini yöneten ürün müdürü arıyoruz.",
      en: "We are looking for a product manager who defines product strategies and manages development processes.",
    },
    requirements: {
      tr: [
        "5+ yıl ürün yöneticiliği deneyimi",
        "Agile/Scrum metodolojileri bilgisi",
        "Veri analizi becerileri",
        "Paydaş yönetimi",
      ],
      en: [
        "5+ years of product management experience",
        "Knowledge of Agile/Scrum methodologies",
        "Data analysis skills",
        "Stakeholder management",
      ],
    },
    responsibilities: {
      tr: [
        "Ürün roadmap'i oluşturmak",
        "Feature önceliklerini belirlemek",
        "Cross-functional takımlarla çalışmak",
        "Market araştırması yapmak",
      ],
      en: [
        "Create product roadmap",
        "Define feature priorities",
        "Work with cross-functional teams",
        "Conduct market research",
      ],
    },
    benefits: {
      tr: [
        "Yüksek maaş paketi",
        "Equity participation",
        "Leadership training",
        "Esnek çalışma saatleri",
      ],
      en: [
        "High salary package",
        "Equity participation",
        "Leadership training",
        "Flexible working hours",
      ],
    },
    postedDate: "2025-07-05",
    deadline: "2025-08-20",
    remote: true,
    experienceLevel: "expert",
  },
];

export const locations = [
  "İstanbul",
  "Ankara",
  "İzmir",
  "Bursa",
  "Antalya",
  "Adana",
  "Konya",
] as const;

// Helper function to transform multilingual data to Job interface based on current locale
export const getLocalizedJobs = (locale: "tr" | "en"): Job[] => {
  return multilingualMockJobs.map((job) => ({
    id: job.id,
    title: job.titles[locale],
    company: job.company,
    location: job.location,
    category: job.category as any,
    type: job.type as any,
    salary: job.salary,
    description: job.descriptions[locale],
    requirements: job.requirements[locale],
    responsibilities: job.responsibilities[locale],
    benefits: job.benefits[locale],
    postedDate: job.postedDate,
    deadline: job.deadline,
    remote: job.remote,
    experienceLevel: job.experienceLevel as any,
    companyLogo: job.companyLogo,
  }));
};

export const mockJobs: Job[] = getLocalizedJobs("tr");
