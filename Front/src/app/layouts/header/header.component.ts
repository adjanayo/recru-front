import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { filter } from 'rxjs/operators';
import menu from '../../../assets/config/menu.json';
import social from '../../../assets/config/social.json';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // On récupère l'identifiant de la plateforme (Navigateur ou Serveur)
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  isMenuOpen = false;
  isDarkMode = false;
  menuItems = menu.main;
  socialLinks = social;
  currentPath = '';

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (isPlatformBrowser(this.platformId)) {
      if (this.isMenuOpen) {
        document.body.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open');
      }
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('menu-open');
    }
  }

  toggleDarkMode() {
    // On ne manipule le DOM et localStorage que si on est sur le navigateur
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = !this.isDarkMode;
      document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.currentPath = this.router.url;
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: any) => {
        this.currentPath = event.urlAfterRedirects;
      });

      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        this.isDarkMode = true;
        document.documentElement.classList.add('dark');
      }
    }
  }

  isChildActive(item: any): boolean {
    if (!item.children) return false;
    return item.children.some((child: any) => this.currentPath === child.url);
  }
}
