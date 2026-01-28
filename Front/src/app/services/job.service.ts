import { Injectable, signal } from '@angular/core';
import { JobOffer, JobFilters } from '../models/job-offer.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private jobsSignal = signal<JobOffer[]>([]);
  public jobs = this.jobsSignal.asReadonly();

  constructor() {
    this.loadMockJobs();
  }

  private loadMockJobs(): void {
    const mockJobs: JobOffer[] = [
      {
        id: '1',
        title: 'Développeur Full Stack',
        company: 'Tech Sénégal',
        companyLogo: '/images/logo/e-link-logo.jpg',
        location: 'Dakar, Sénégal',
        type: 'CDI',
        domain: 'Informatique',
        description: 'Nous recherchons un développeur Full Stack passionné pour rejoindre notre équipe dynamique.',
        requirements: ['3+ ans d\'expérience', 'Maîtrise Angular/React', 'Connaissance Node.js', 'Base de données SQL/NoSQL'],
        responsibilities: ['Développement d\'applications web', 'Maintenance du code', 'Collaboration avec l\'équipe'],
        salary: '800 000 - 1 200 000 FCFA',
        benefits: ['Assurance santé', 'Formation continue', 'Télétravail partiel'],
        isPublished: true,
        postedDate: new Date('2024-01-15'),
        viewCount: 245,
        applicationsCount: 12,
        tags: ['Angular', 'Node.js', 'MongoDB']
      },
      {
        id: '2',
        title: 'Designer UI/UX',
        company: 'Creative Agency',
        companyLogo: '/images/logo/e-link-logo.jpg',
        location: 'Abidjan, Côte d\'Ivoire',
        type: 'CDD',
        domain: 'Design',
        description: 'Rejoignez notre équipe créative pour concevoir des interfaces utilisateur exceptionnelles.',
        requirements: ['Portfolio solide', 'Figma/Adobe XD', 'Sens du détail', 'Communication'],
        responsibilities: ['Conception d\'interfaces', 'Recherche utilisateur', 'Prototypage'],
        salary: '600 000 - 900 000 FCFA',
        benefits: ['Environnement créatif', 'Équipement fourni'],
        isPublished: true,
        postedDate: new Date('2024-01-18'),
        viewCount: 189,
        applicationsCount: 8,
        tags: ['Figma', 'UI/UX', 'Design']
      },
      {
        id: '3',
        title: 'Chef de Projet Digital',
        company: 'Digital Solutions',
        companyLogo: '/images/logo/e-link-logo.jpg',
        location: 'Lomé, Togo',
        type: 'CDI',
        domain: 'Management',
        description: 'Pilotez des projets digitaux innovants et managez des équipes multiculturelles.',
        requirements: ['5+ ans d\'expérience', 'Certification PMP/Scrum', 'Leadership', 'Anglais courant'],
        responsibilities: ['Gestion de projets', 'Coordination d\'équipes', 'Reporting client'],
        salary: '1 000 000 - 1 500 000 FCFA',
        benefits: ['Prime sur objectifs', 'Formation', 'Véhicule de fonction'],
        isPublished: true,
        postedDate: new Date('2024-01-20'),
        viewCount: 312,
        applicationsCount: 15,
        tags: ['Gestion de projet', 'Scrum', 'Leadership']
      },
      {
        id: '4',
        title: 'Stagiaire Marketing Digital',
        company: 'StartUp Hub',
        companyLogo: '/images/logo/e-link-logo.jpg',
        location: 'Cotonou, Bénin',
        type: 'Stage',
        domain: 'Marketing',
        description: 'Stage de 6 mois pour apprendre le marketing digital dans un environnement startup.',
        requirements: ['Formation en marketing', 'Créativité', 'Réseaux sociaux', 'Motivation'],
        responsibilities: ['Gestion réseaux sociaux', 'Création de contenu', 'Analyse de données'],
        salary: '100 000 - 150 000 FCFA',
        benefits: ['Formation pratique', 'Certification possible'],
        isPublished: true,
        postedDate: new Date('2024-01-22'),
        viewCount: 156,
        applicationsCount: 24,
        tags: ['Marketing', 'Stage', 'Réseaux sociaux']
      },
      {
        id: '5',
        title: 'Data Analyst',
        company: 'Analytics Pro',
        companyLogo: '/images/logo/e-link-logo.jpg',
        location: 'Accra, Ghana',
        type: 'CDI',
        domain: 'Data Science',
        description: 'Analysez des données pour aider nos clients à prendre des décisions stratégiques.',
        requirements: ['Python/R', 'SQL avancé', 'Visualisation de données', 'Statistiques'],
        responsibilities: ['Analyse de données', 'Création de dashboards', 'Reporting'],
        salary: '900 000 - 1 300 000 FCFA',
        benefits: ['Équipement fourni', 'Formations', 'Bonus annuel'],
        isPublished: true,
        postedDate: new Date('2024-01-21'),
        viewCount: 198,
        applicationsCount: 10,
        tags: ['Python', 'SQL', 'Data Analysis']
      },
      {
        id: '6',
        title: 'Data Analyst',
        company: 'Analytics Pro',
        companyLogo: '/images/logo/e-link-logo.jpg',
        location: 'Accra, Ghana',
        type: 'CDI',
        domain: 'Data Science',
        description: 'Analysez des données pour aider nos clients à prendre des décisions stratégiques.',
        requirements: ['Python/R', 'SQL avancé', 'Visualisation de données', 'Statistiques'],
        responsibilities: ['Analyse de données', 'Création de dashboards', 'Reporting'],
        salary: '900 000 - 1 300 000 FCFA',
        benefits: ['Équipement fourni', 'Formations', 'Bonus annuel'],
        isPublished: true,
        postedDate: new Date('2024-01-21'),
        viewCount: 198,
        applicationsCount: 10,
        tags: ['Python', 'SQL', 'Data Analysis']
      },
      {
        id: '7',
        title: 'Data Analyst',
        company: 'Analytics Pro',
        companyLogo: '/images/logo/e-link-logo.jpg',
        location: 'Accra, Ghana',
        type: 'CDI',
        domain: 'Data Science',
        description: 'Analysez des données pour aider nos clients à prendre des décisions stratégiques.',
        requirements: ['Python/R', 'SQL avancé', 'Visualisation de données', 'Statistiques'],
        responsibilities: ['Analyse de données', 'Création de dashboards', 'Reporting'],
        salary: '900 000 - 1 300 000 FCFA',
        benefits: ['Équipement fourni', 'Formations', 'Bonus annuel'],
        isPublished: true,
        postedDate: new Date('2024-01-21'),
        viewCount: 198,
        applicationsCount: 10,
        tags: ['Python', 'SQL', 'Data Analysis']
      },
      {
        id: '8',
        title: 'Data Analyst',
        company: 'Analytics Pro',
        companyLogo: '/images/logo/e-link-logo.jpg',
        location: 'Accra, Ghana',
        type: 'CDI',
        domain: 'Data Science',
        description: 'Analysez des données pour aider nos clients à prendre des décisions stratégiques.',
        requirements: ['Python/R', 'SQL avancé', 'Visualisation de données', 'Statistiques'],
        responsibilities: ['Analyse de données', 'Création de dashboards', 'Reporting'],
        salary: '900 000 - 1 300 000 FCFA',
        benefits: ['Équipement fourni', 'Formations', 'Bonus annuel'],
        isPublished: true,
        postedDate: new Date('2024-01-21'),
        viewCount: 198,
        applicationsCount: 10,
        tags: ['Python', 'SQL', 'Data Analysis']
      },
      {
        id: '9',
        title: 'Data Analyst',
        company: 'Analytics Pro',
        companyLogo: '/images/logo/e-link-logo.jpg',
        location: 'Accra, Ghana',
        type: 'CDI',
        domain: 'Data Science',
        description: 'Analysez des données pour aider nos clients à prendre des décisions stratégiques.',
        requirements: ['Python/R', 'SQL avancé', 'Visualisation de données', 'Statistiques'],
        responsibilities: ['Analyse de données', 'Création de dashboards', 'Reporting'],
        salary: '900 000 - 1 300 000 FCFA',
        benefits: ['Équipement fourni', 'Formations', 'Bonus annuel'],
        isPublished: true,
        postedDate: new Date('2024-01-21'),
        viewCount: 198,
        applicationsCount: 10,
        tags: ['Python', 'SQL', 'Data Analysis']
      },
      {
        id: '10',
        title: 'Data Analyst',
        company: 'Analytics Pro',
        companyLogo: '/images/logo/e-link-logo.jpg',
        location: 'Accra, Ghana',
        type: 'CDI',
        domain: 'Data Science',
        description: 'Analysez des données pour aider nos clients à prendre des décisions stratégiques.',
        requirements: ['Python/R', 'SQL avancé', 'Visualisation de données', 'Statistiques'],
        responsibilities: ['Analyse de données', 'Création de dashboards', 'Reporting'],
        salary: '900 000 - 1 300 000 FCFA',
        benefits: ['Équipement fourni', 'Formations', 'Bonus annuel'],
        isPublished: true,
        postedDate: new Date('2024-01-21'),
        viewCount: 198,
        applicationsCount: 10,
        tags: ['Python', 'SQL', 'Data Analysis']
      },
      {
        id: '11',
        title: 'Data Analyst',
        company: 'Analytics Pro',
        companyLogo: '/images/logo/e-link-logo.jpg',
        location: 'Accra, Ghana',
        type: 'CDI',
        domain: 'Data Science',
        description: 'Analysez des données pour aider nos clients à prendre des décisions stratégiques.',
        requirements: ['Python/R', 'SQL avancé', 'Visualisation de données', 'Statistiques'],
        responsibilities: ['Analyse de données', 'Création de dashboards', 'Reporting'],
        salary: '900 000 - 1 300 000 FCFA',
        benefits: ['Équipement fourni', 'Formations', 'Bonus annuel'],
        isPublished: true,
        postedDate: new Date('2024-01-21'),
        viewCount: 198,
        applicationsCount: 10,
        tags: ['Python', 'SQL', 'Data Analysis']
      },
      {
        id: '12',
        title: 'Data Analyst',
        company: 'Analytics Pro',
        companyLogo: '/images/logo/e-link-logo.jpg',
        location: 'Accra, Ghana',
        type: 'CDI',
        domain: 'Data Science',
        description: 'Analysez des données pour aider nos clients à prendre des décisions stratégiques.',
        requirements: ['Python/R', 'SQL avancé', 'Visualisation de données', 'Statistiques'],
        responsibilities: ['Analyse de données', 'Création de dashboards', 'Reporting'],
        salary: '900 000 - 1 300 000 FCFA',
        benefits: ['Équipement fourni', 'Formations', 'Bonus annuel'],
        isPublished: true,
        postedDate: new Date('2024-01-21'),
        viewCount: 198,
        applicationsCount: 10,
        tags: ['Python', 'SQL', 'Data Analysis']
      },
      {
        id: '13',
        title: 'Data Analyst',
        company: 'Analytics Pro',
        companyLogo: '/images/logo/e-link-logo.jpg',
        location: 'Accra, Ghana',
        type: 'CDI',
        domain: 'Data Science',
        description: 'Analysez des données pour aider nos clients à prendre des décisions stratégiques.',
        requirements: ['Python/R', 'SQL avancé', 'Visualisation de données', 'Statistiques'],
        responsibilities: ['Analyse de données', 'Création de dashboards', 'Reporting'],
        salary: '900 000 - 1 300 000 FCFA',
        benefits: ['Équipement fourni', 'Formations', 'Bonus annuel'],
        isPublished: true,
        postedDate: new Date('2024-01-21'),
        viewCount: 198,
        applicationsCount: 10,
        tags: ['Python', 'SQL', 'Data Analysis']
      }
    ];

    this.jobsSignal.set(mockJobs);
  }

  getAllJobs(): JobOffer[] {
    return this.jobs();
  }

  getJobById(id: string): JobOffer | undefined {
    return this.jobs().find(job => job.id === id);
  }

  searchJobs(filters: JobFilters): JobOffer[] {
    let filteredJobs = this.jobs();

    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(keyword) ||
        job.company.toLowerCase().includes(keyword) ||
        job.description.toLowerCase().includes(keyword)
      );
    }

    if (filters.domain) {
      filteredJobs = filteredJobs.filter(job => job.domain === filters.domain);
    }

    if (filters.location) {
      filteredJobs = filteredJobs.filter(job =>
        job.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters.type) {
      filteredJobs = filteredJobs.filter(job => job.type === filters.type);
    }

    return filteredJobs;
  }

  async createJob(job: Omit<JobOffer, 'id' | 'postedDate' | 'viewCount' | 'applicationsCount'>): Promise<JobOffer> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newJob: JobOffer = {
          ...job,
          id: Math.random().toString(36).substr(2, 9),
          postedDate: new Date(),
          viewCount: 0,
          applicationsCount: 0
        };

        this.jobsSignal.update(jobs => [...jobs, newJob]);
        resolve(newJob);
      }, 500);
    });
  }

  async updateJob(id: string, updates: Partial<JobOffer>): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.jobsSignal.update(jobs =>
          jobs.map(job => job.id === id ? { ...job, ...updates } : job)
        );
        resolve(true);
      }, 500);
    });
  }

  async deleteJob(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.jobsSignal.update(jobs => jobs.filter(job => job.id !== id));
        resolve(true);
      }, 500);
    });
  }

  incrementViewCount(id: string): void {
    this.jobsSignal.update(jobs =>
      jobs.map(job => job.id === id ? { ...job, viewCount: job.viewCount + 1 } : job)
    );
  }
}
