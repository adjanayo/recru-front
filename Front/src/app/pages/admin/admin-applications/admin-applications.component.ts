import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplicationService } from '../../../services/application.service';
import { Application } from '../../../models/application.model';

@Component({
  selector: 'app-admin-applications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-applications.component.html',
  styleUrl: './admin-applications.component.css'
})
export class AdminApplicationsComponent {
  applications = computed(() => this.applicationService.applications());
  searchTerm = signal('');
  selectedStatus = signal<string>('all');
  
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

  stats = computed(() => this.applicationService.getApplicationStats());

  constructor(private applicationService: ApplicationService) {}

  async updateStatus(application: Application, newStatus: Application['status']): Promise<void> {
    await this.applicationService.updateApplicationStatus(application.id, newStatus);
  }

  getStatusColor(status: Application['status']): string {
    const colors = {
      'envoyée': 'bg-blue-100 text-blue-700',
      'en cours': 'bg-amber-100 text-amber-700',
      'retenue': 'bg-green-100 text-green-700',
      'rejetée': 'bg-red-100 text-red-700'
    };
    return colors[status];
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
}
