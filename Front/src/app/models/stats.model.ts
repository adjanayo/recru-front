export interface DashboardStats {
  totalUsers: number;
  totalJobs: number;
  totalApplications: number;
  activeJobs: number;
  userGrowth: number;
  jobGrowth: number;
  applicationGrowth: number;
}

export interface CandidateStats {
  totalApplications: number;
  pendingApplications: number;
  acceptedApplications: number;
  rejectedApplications: number;
  profileViews: number;
  savedJobs: number;
}
