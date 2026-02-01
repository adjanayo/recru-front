import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobFormComponent } from '../job-form/job-form.component';
import { JobService } from '../../../../services/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JobOffer } from '../../../../types/job-offer.type';

@Component({
  selector: 'app-admin-job-edit',
  standalone: true,
  imports: [CommonModule, JobFormComponent],
  templateUrl: './admin-job-edit.component.html',
  styleUrl: './admin-job-edit.component.css'
})
export class AdminJobEditComponent implements OnInit {
  job = signal<JobOffer | null>(null);
  jobId: string | null = null;
  loading = signal(true);

  constructor(
    private jobService: JobService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('id');
    if (this.jobId) {
      const jobData = this.jobService.getJobById(this.jobId);
      if (jobData) {
        this.job.set(jobData);
      } else {
        // Rediriger si non trouvé
        this.router.navigate(['/admin/jobs']);
      }
      this.loading.set(false);
    }
  }

  async onFormSubmit(jobData: Omit<JobOffer, 'id' | 'viewCount' | 'applicationsCount' | 'postedDate'>) {
    if (this.jobId) {
      try {
        await this.jobService.updateJob(this.jobId, jobData);
        // Optionnel: Notification
        this.router.navigate(['/admin/jobs']);
      } catch (error) {
        console.error('Erreur lors de la mise à jour:', error);
      }
    }
  }
}
