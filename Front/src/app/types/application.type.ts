export interface Application {
  id: string;
  jobId: string;
  userId: string;
  jobTitle: string;
  company: string;
  userName: string;
  userEmail: string;
  cvUrl: string;
  coverLetter?: string;
  status: 'envoyée' | 'en cours' | 'retenue' | 'rejetée';
  appliedDate: Date;
  updatedDate: Date;
}

export interface ApplicationStats {
  total: number;
  pending: number;
  inProgress: number;
  accepted: number;
  rejected: number;
}
