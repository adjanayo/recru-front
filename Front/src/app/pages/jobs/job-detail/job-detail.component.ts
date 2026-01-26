import { Component, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JobService } from '../../../services/job.service';
import { ApplicationService } from '../../../services/application.service';
import { AuthService } from '../../../services/auth.service';
import { ChatService } from '../../../services/chat.service';
import { JobOffer } from '../../../models/job-offer.model';
import { ChatComponent } from '../../../components/chat/chat.component';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ChatComponent],
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.css'
})
export class JobDetailComponent implements OnInit {
  job = signal<JobOffer | undefined>(undefined);
  isLoading = signal(true);
  showApplyModal = signal(false);
  showChat = signal(false);
  hasApplied = signal(false);
  isApplying = signal(false);

  currentUser = computed(() => this.authService.currentUser());

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private applicationService: ApplicationService,
    private authService: AuthService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    const jobId = this.route.snapshot.paramMap.get('id');
    if (jobId) {
      this.loadJob(jobId);
      this.checkIfApplied(jobId);
    }
  }

  loadJob(jobId: string): void {
    const job = this.jobService.getJobById(jobId);
    if (job) {
      this.job.set(job);
      this.jobService.incrementViewCount(jobId);
    }
    this.isLoading.set(false);
  }

  checkIfApplied(jobId: string): void {
    const user = this.currentUser();
    if (user) {
      this.hasApplied.set(this.applicationService.hasApplied(user.id, jobId));
    }
  }

  async applyForJob(): Promise<void> {
    const user = this.currentUser();
    const currentJob = this.job();

    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    if (!currentJob) return;

    if (!user.cvUrl) {
      alert('Veuillez d\'abord télécharger votre CV dans votre profil');
      this.router.navigate(['/profile']);
      return;
    }

    this.isApplying.set(true);

    try {
      await this.applicationService.applyForJob({
        jobId: currentJob.id,
        userId: user.id,
        jobTitle: currentJob.title,
        company: currentJob.company,
        userName: `${user.firstName} ${user.lastName}`,
        userEmail: user.email,
        cvUrl: user.cvUrl
      });

      this.hasApplied.set(true);
      this.showApplyModal.set(false);
      alert('Votre candidature a été envoyée avec succès !');
    } catch (error) {
      alert('Une erreur est survenue lors de l\'envoi de votre candidature');
    } finally {
      this.isApplying.set(false);
    }
  }

  toggleChat(): void {
    const user = this.currentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }
    this.showChat.update(v => !v);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
