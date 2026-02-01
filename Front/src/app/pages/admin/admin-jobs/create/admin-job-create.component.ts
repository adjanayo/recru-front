import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobFormComponent } from '../job-form/job-form.component';
import { JobService } from '../../../../services/job.service';
import { Router } from '@angular/router';
import { JobOffer } from '../../../../types/job-offer.type';

@Component({
  selector: 'app-admin-job-create',
  standalone: true,
  imports: [CommonModule, JobFormComponent],
  templateUrl: './admin-job-create.component.html',
  styleUrl: './admin-job-create.component.css'
})
export class AdminJobCreateComponent {

  constructor(
    private jobService: JobService,
    private router: Router
  ) {}

  async onFormSubmit(jobData: Omit<JobOffer, 'id' | 'viewCount' | 'applicationsCount' | 'postedDate'>) {
    try {
      await this.jobService.createJob(jobData);
      // Optionnel: Ajouter une notification de succès ici
      this.router.navigate(['/admin/jobs']);
    } catch (error) {
      console.error('Erreur lors de la création de l\'offre:', error);
      // Optionnel: Gérer l'erreur (afficher un message)
    }
  }
}
