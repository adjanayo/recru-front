import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, LucideAngularModule],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  email: string = '';
  currentYear: number = new Date().getFullYear();

  readonly FacebookIcon = Facebook;
  readonly TwitterIcon = Twitter;
  readonly InstagramIcon = Instagram;
  readonly LinkedInIcon = Linkedin;

  socials = [
    { name: 'Facebook', href: '#', icon: this.FacebookIcon },
    { name: 'Twitter', href: '#', icon: this.TwitterIcon },
    { name: 'Instagram', href: '#', icon: this.InstagramIcon },
    { name: 'LinkedIn', href: '#', icon: this.LinkedInIcon }
  ];

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
