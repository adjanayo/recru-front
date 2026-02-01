import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'candidat-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './candidat-layout.component.html',
  styleUrl: './candidat-layout.component.css'
})
export class CandidatLayoutComponent implements OnInit {
  private router = inject(Router);

  isDarkMode = signal<boolean>(false);
  currentPath = signal<string>('');


  ngOnInit() {
    this.initTheme();
    this.trackRouteChanges();
  }

  private trackRouteChanges() {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentPath.set(event.urlAfterRedirects);
    });
  }

  private initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      this.setDarkMode(true);
    } else {
      this.setDarkMode(false);
    }
  }

  setDarkMode(isDark: boolean) {
    this.isDarkMode.set(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
