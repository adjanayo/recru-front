import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  email: string = '';
  currentYear: number = new Date().getFullYear();



  platformLinks = [
    { label: 'À propos', path: '/about' },
    { label: 'Projets', path: '/projects' },
    { label: 'Tarification', path: '/pricing' },
    { label: 'Blog', path: '/blog' }
  ];

  supportLinks = [
    { label: 'Aide', path: '/help' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
    { label: 'Confidentialité', path: '/privacy' },
    { label: 'Conditions', path: '/terms' }
  ];

  subscribeToNewsletter() {
    alert(`Merci de vous être abonné avec l'email: ${this.email}`);
    this.email = '';
  }
}
