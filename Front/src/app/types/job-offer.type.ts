export interface JobOffer {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'CDI' | 'CDD' | 'Stage' | 'Freelance' | 'Alternance';
  domain: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary?: string;
  benefits?: string[];
  isPublished: boolean;
  postedDate: Date;
  expiryDate?: Date;
  viewCount: number;
  applicationsCount: number;
  tags: string[];
}

export interface JobFilters {
  keyword?: string;
  domain?: string;
  location?: string;
  type?: string;
}
