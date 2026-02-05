import { Component, signal, computed, AfterViewInit, ViewChild, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobService } from '../../../services/job.service';
import { ApplicationService } from '../../../services/application.service';
import { DashboardStats } from '../../../types/stats.type';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements AfterViewInit {
  @ViewChild('activityChart') activityChart!: ElementRef;
  @ViewChild('progressionChart') progressionChart!: ElementRef;

  private jobService = inject(JobService);
  private applicationService = inject(ApplicationService);


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

  ngAfterViewInit() {
    this.initActivityChart();
    this.initProgressionChart();
  }

  private initActivityChart() {
    const ctx = this.activityChart.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'],
        datasets: [
          {
            label: 'Visiteurs',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'Connexions',
            data: [28, 48, 40, 19, 86, 27, 90],
            borderColor: '#dc2626',
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }

  private initProgressionChart() {
    const ctx = this.progressionChart.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Financement', 'Mentorat', 'Croissance'],
        datasets: [{
          label: 'Progression',
          data: [80, 70, 65],
          backgroundColor: 'rgba(245, 158, 11, 0.4)',
          borderColor: '#f59e0b',
          pointBackgroundColor: '#f59e0b',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          r: {
            angleLines: {
              display: true
            },
            suggestedMin: 0,
            suggestedMax: 100
          }
        }
      }
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
