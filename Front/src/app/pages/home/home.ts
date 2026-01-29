import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AwardIcon, BriefcaseIcon, CheckCheck, DollarSignIcon, LightbulbIcon, LucideAngularModule, MessageCircle, Search, TrendingUpIcon, UsersIcon } from 'lucide-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './home.html'
})
export class HomeComponent {

  steps = [
    {
      title: 'Créez votre profil',
      description: 'Inscrivez-vous et créez un profil détaillé pour facilter votre visibiliter.'
    },
    {
      title: 'Connectez-vous',
    description: 'Trouvez des offres d\'emploi qui vous correspondent.'
  },
  {
    title: 'Postulez',
    description: 'Postulez aux offres d\'emploi qui vous correspondent.'
  }
];


features = [
  {
    title: 'Recherche simplifiée',
    description: 'Trouvez facilement les offres qui vous correspondent avec nos filtres avancés.',
    icon: Search
  },
  {
    title: 'Chat intégré',
    description: 'Posez vos questions directement sur chaque offre d\'emploi.',
    icon: MessageCircle
  },
  {
    title: 'Suivi de candidatures',
    description: 'Suivez l\'état de vos candidatures en temps réel.',
    icon: CheckCheck
  }
];
}
