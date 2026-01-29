import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '../../../services/job.service';
import { JobOffer, JobFilters } from '../../../models/job-offer.model';

import { PaginationComponent } from '../../../components/pagination/pagination.component';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent {
  filters = signal<JobFilters>({});
  searchKeyword = signal('');
  selectedDomain = signal('');
  selectedLocation = signal('');
  selectedType = signal('');

  // Pagination
  currentPage = signal(1);
  pageSize = signal(6);

  allJobs = computed(() => this.jobService.jobs());

  filteredJobs = computed(() => {
    return this.jobService.searchJobs(this.filters());
  });

  paginatedJobs = computed(() => {
    const jobs = this.filteredJobs();
    const startIndex = (this.currentPage() - 1) * this.pageSize();
    return jobs.slice(startIndex, startIndex + this.pageSize());
  });

  domains = ['Informatique', 'Design', 'Marketing', 'Management', 'Data Science', 'Finance', 'RH'];
  types = ['CDI', 'CDD', 'Stage', 'Freelance', 'Alternance'];

  constructor(
    private jobService: JobService,
    private router: Router
  ) {}

  onSearch(): void {
    this.filters.set({
      keyword: this.searchKeyword(),
      domain: this.selectedDomain(),
      location: this.selectedLocation(),
      type: this.selectedType()
    });
    this.currentPage.set(1); // Reset to first page on search
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  resetFilters(): void {
    this.searchKeyword.set('');
    this.selectedDomain.set('');
    this.selectedLocation.set('');
    this.selectedType.set('');
    this.filters.set({});
  }

  viewJobDetails(jobId: string): void {
    this.router.navigate(['/jobs', jobId]);
  }

  formatDate(date: Date): string {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`;
    return `Il y a ${Math.floor(diffDays / 30)} mois`;
  }
}
