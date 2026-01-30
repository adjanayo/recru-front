import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplicationService } from '../../../services/application.service';
import { Application } from '../../../types/application.type';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { ConfirmationModalComponent } from '../../../components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-admin-applications',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent, ConfirmationModalComponent],
  templateUrl: './admin-applications.component.html',
  styleUrl: './admin-applications.component.css'
})
export class AdminApplicationsComponent {
  applications = computed(() => this.applicationService.applications());
  searchTerm = signal('');
  selectedStatus = signal<string>('all');

  // Pagination
  currentPage = signal(1);
  pageSize = signal(10);

  // Modales
  showRejectModal = signal(false);
  showValidateModal = signal(false);
  selectedApp = signal<Application | null>(null);

  filteredApplications = computed(() => {
    let apps = this.applications();

    const term = this.searchTerm().toLowerCase();
    if (term) {
      apps = apps.filter(app =>
        app.userName.toLowerCase().includes(term) ||
        app.jobTitle.toLowerCase().includes(term) ||
        app.company.toLowerCase().includes(term)
      );
    }

    const status = this.selectedStatus();
    if (status !== 'all') {
      apps = apps.filter(app => app.status === status);
    }

    return apps;
  });

  paginatedApplications = computed(() => {
    const apps = this.filteredApplications();
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return apps.slice(start, end);
  });

  stats = computed(() => this.applicationService.getApplicationStats());

  constructor(private applicationService: ApplicationService) {}

  onPageChange(page: number) {
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Actions
  confirmValidate(app: Application) {
    this.selectedApp.set(app);
    this.showValidateModal.set(true);
  }

  confirmReject(app: Application) {
    this.selectedApp.set(app);
    this.showRejectModal.set(true);
  }

  async validateApplication() {
    const app = this.selectedApp();
    if (app) {
      await this.applicationService.updateApplicationStatus(app.id, 'retenue');
      this.closeModals();
    }
  }

  async rejectApplication() {
    const app = this.selectedApp();
    if (app) {
      await this.applicationService.updateApplicationStatus(app.id, 'rejetée');
      this.closeModals();
    }
  }

  closeModals() {
    this.showRejectModal.set(false);
    this.showValidateModal.set(false);
    this.selectedApp.set(null);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  downloadCV(cvUrl: string): void {
    window.open(cvUrl, '_blank');
  }

  getStatusColor(status: Application['status']): string {
     const colors = {
      'envoyée': 'bg-blue-50 text-blue-700 border-blue-100',
      'en cours': 'bg-amber-50 text-amber-700 border-amber-100',
      'retenue': 'bg-green-50 text-green-700 border-green-100',
      'rejetée': 'bg-red-50 text-red-700 border-red-100'
    };
    return colors[status];
  }
}
