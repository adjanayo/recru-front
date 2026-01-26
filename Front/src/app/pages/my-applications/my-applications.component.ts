import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { AuthService } from '../../services/auth.service';
import { Application } from '../../models/application.model';

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-applications.component.html',
  styleUrl: './my-applications.component.css'
})
export class MyApplicationsComponent {
  currentUser = computed(() => this.authService.currentUser());
  
  myApplications = computed(() => {
    const user = this.currentUser();
    return user ? this.applicationService.getApplicationsByUser(user.id) : [];
  });

  filteredApplications = computed(() => {
    const filter = this.selectedFilter();
    const apps = this.myApplications();
    
    if (filter === 'all') return apps;
    return apps.filter(app => app.status === filter);
  });

  selectedFilter = signal<string>('all');

  stats = computed(() => this.applicationService.getApplicationStats(this.currentUser()?.id));

  constructor(
    private applicationService: ApplicationService,
    private authService: AuthService
  ) {}

  getStatusColor(status: Application['status']): string {
    const colors = {
      'envoyée': 'bg-blue-100 text-blue-700',
      'en cours': 'bg-amber-100 text-amber-700',
      'retenue': 'bg-green-100 text-green-700',
      'rejetée': 'bg-red-100 text-red-700'
    };
    return colors[status];
  }

  getStatusIcon(status: Application['status']): string {
    const icons = {
      'envoyée': 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8',
      'en cours': 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      'retenue': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      'rejetée': 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
    };
    return icons[status];
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
