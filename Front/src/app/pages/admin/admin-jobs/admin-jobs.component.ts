import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../../services/job.service';
import { JobOffer } from '../../../models/job-offer.model';

@Component({
  selector: 'app-admin-jobs',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './admin-jobs.component.html',
  styleUrl: './admin-jobs.component.css'
})
export class AdminJobsComponent {
  jobs = computed(() => this.jobService.jobs());
  searchTerm = signal('');
  
  filteredJobs = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.jobs();
    
    return this.jobs().filter(job =>
      job.title.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      job.domain.toLowerCase().includes(term)
    );
  });

  showDeleteModal = signal(false);
  jobToDelete = signal<JobOffer | null>(null);

  constructor(private jobService: JobService) {}

  async togglePublish(job: JobOffer): Promise<void> {
    await this.jobService.updateJob(job.id, {
      isPublished: !job.isPublished
    });
  }

  confirmDelete(job: JobOffer): void {
    this.jobToDelete.set(job);
    this.showDeleteModal.set(true);
  }

  async deleteJob(): Promise<void> {
    const job = this.jobToDelete();
    if (job) {
      await this.jobService.deleteJob(job.id);
      this.showDeleteModal.set(false);
      this.jobToDelete.set(null);
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
