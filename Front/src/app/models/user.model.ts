export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  educationLevel?: string;
  experience?: string;
  profilePhoto?: string;
  cvUrl?: string;
  role: 'candidate' | 'admin';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  user: User;
  applications: number;
  savedJobs: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}
