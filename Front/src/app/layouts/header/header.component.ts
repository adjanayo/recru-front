import { Component, signal, computed, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  mobileMenuOpen = signal(false);
  isProfileMenuOpen = signal(false);

  currentUser = computed(() => this.authService.currentUser());
  isLoggedIn = computed(() => this.authService.isAuthenticated());
  isAdmin = computed(() => this.authService.isAdmin());

  navItems = computed(() => {
    if (this.isAdmin()) {
      return [
        { label: 'Accueil', path: '/' },
        { label: 'Offres d\'emploi', path: '/jobs' },
        { label: 'Dashboard Admin', path: '/admin/dashboard' }
      ];
    }
    return [
      { label: 'Accueil', path: '/' },
      { label: 'Offres d\'emploi', path: '/jobs' },
      { label: 'Mes candidatures', path: '/my-applications' }
    ];
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isProfileMenuOpen.set(false);
      this.mobileMenuOpen.set(false);
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen.update(v => !v);
  }

  logout() {
    this.authService.logout();
    this.isProfileMenuOpen.set(false);
  }
}
