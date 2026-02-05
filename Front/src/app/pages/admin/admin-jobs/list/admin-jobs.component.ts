import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../../../services/job.service';
import { JobOffer } from '../../../../types/job-offer.type';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { ConfirmationModalComponent } from '../../../../components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-admin-jobs',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, PaginationComponent, ConfirmationModalComponent],
  templateUrl: './admin-jobs.component.html',
  styleUrl: './admin-jobs.component.css'
})
export class AdminJobsComponent {
  jobs = computed(() => this.jobService.jobs());
  searchTerm = signal('');
  filterStatus = signal<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL');
  filterType = signal<string>('ALL');

  // Pagination
  currentPage = signal(1);
  pageSize = signal(10);

  filteredJobs = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const status = this.filterStatus();
    const type = this.filterType();

    let result = this.jobs();

    // Filtre par recherche texte
    if (term) {
      result = result.filter(job =>
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term) ||
        job.domain.toLowerCase().includes(term)
      );
    }

    // Filtre par statut
    if (status !== 'ALL') {
      const isPublished = status === 'PUBLISHED';
      result = result.filter(job => job.isPublished === isPublished);
    }

    // Filtre par type
    if (type !== 'ALL') {
      result = result.filter(job => job.type === type);
    }

    return result;
  });

  paginatedJobs = computed(() => {
    const jobs = this.filteredJobs();
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return jobs.slice(start, end);
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

  onPageChange(page: number): void {
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
