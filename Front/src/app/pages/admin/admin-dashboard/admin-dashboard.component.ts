import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobService } from '../../../services/job.service';
import { ApplicationService } from '../../../services/application.service';
import { DashboardStats } from '../../../models/stats.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  stats = computed<DashboardStats>(() => {
    const jobs = this.jobService.jobs();
    const applications = this.applicationService.applications();
    
    return {
      totalUsers: 45, // Mock data
      totalJobs: jobs.length,
      totalApplications: applications.length,
      activeJobs: jobs.filter(j => j.isPublished).length,
      userGrowth: 12,
      jobGrowth: 8,
      applicationGrowth: 15
    };
  });

  recentApplications = computed(() => {
    return this.applicationService.applications()
      .slice(0, 5)
      .sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime());
  });

  recentJobs = computed(() => {
    return this.jobService.jobs()
      .slice(0, 5)
      .sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
  });

  constructor(
    private jobService: JobService,
    private applicationService: ApplicationService
  ) {}

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
