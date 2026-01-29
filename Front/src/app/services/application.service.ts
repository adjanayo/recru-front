import { Injectable, signal } from '@angular/core';
import { Application, ApplicationStats } from '../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private applicationsSignal = signal<Application[]>([]);
  public applications = this.applicationsSignal.asReadonly();

  constructor() {
    this.loadMockApplications();
  }

  private loadMockApplications(): void {
    const mockApplications: Application[] = [
      {
        id: '1',
        jobId: '1',
        userId: '1',
        jobTitle: 'Développeur Full Stack',
        company: 'Tech Sénégal',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        cvUrl: '/cv/john-doe.pdf',
        coverLetter: 'Je suis très intéressé par ce poste...',
        status: 'en cours',
        appliedDate: new Date('2024-01-20'),
        updatedDate: new Date('2024-01-20')
      }
    ];
    
    this.applicationsSignal.set(mockApplications);
  }

  getApplicationsByUser(userId: string): Application[] {
    return this.applications().filter(app => app.userId === userId);
  }

  getApplicationsByJob(jobId: string): Application[] {
    return this.applications().filter(app => app.jobId === jobId);
  }

  getApplicationById(id: string): Application | undefined {
    return this.applications().find(app => app.id === id);
  }

  async applyForJob(application: Omit<Application, 'id' | 'appliedDate' | 'updatedDate' | 'status'>): Promise<Application> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newApplication: Application = {
          ...application,
          id: Math.random().toString(36).substr(2, 9),
          status: 'envoyée',
          appliedDate: new Date(),
          updatedDate: new Date()
        };
        
        this.applicationsSignal.update(apps => [...apps, newApplication]);
        resolve(newApplication);
      }, 500);
    });
  }

  async updateApplicationStatus(id: string, status: Application['status']): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.applicationsSignal.update(apps =>
          apps.map(app => app.id === id ? { ...app, status, updatedDate: new Date() } : app)
        );
        resolve(true);
      }, 500);
    });
  }

  async deleteApplication(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.applicationsSignal.update(apps => apps.filter(app => app.id !== id));
        resolve(true);
      }, 500);
    });
  }

  getApplicationStats(userId?: string): ApplicationStats {
    const apps = userId 
      ? this.getApplicationsByUser(userId)
      : this.applications();

    return {
      total: apps.length,
      pending: apps.filter(a => a.status === 'envoyée').length,
      inProgress: apps.filter(a => a.status === 'en cours').length,
      accepted: apps.filter(a => a.status === 'retenue').length,
      rejected: apps.filter(a => a.status === 'rejetée').length
    };
  }

  hasApplied(userId: string, jobId: string): boolean {
    return this.applications().some(app => app.userId === userId && app.jobId === jobId);
  }
}
