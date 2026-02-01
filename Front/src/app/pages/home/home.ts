import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
}
