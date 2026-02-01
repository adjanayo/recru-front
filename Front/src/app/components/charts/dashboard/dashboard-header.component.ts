import { Component, input, output, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div class="flex items-center justify-between h-16 px-6">
        <button (click)="toggleSidebar.emit()" class="p-2 rounded-md text-gray-500 hover:text-terracotta-600 hover:bg-amber-50">
          @if (isSidebarOpen()) {
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          } @else {
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          }
        </button>

        <h1 class="text-xl font-bold text-gray-800">{{ pageTitle() }}</h1>

        <div class="flex items-center space-x-4">
          <div class="relative">
            <button class="p-2 rounded-md text-gray-500 hover:text-terracotta-600 hover:bg-amber-50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
              @if (notificationCount() > 0) {
                <span class="absolute top-0 right-0 h-5 w-5 rounded-full bg-terracotta-600 text-white text-xs flex items-center justify-center">
                  {{ notificationCount() }}
                </span>
              }
            </button>
          </div>
          </div>
      </div>
    </header>
  `
})
export class DashboardHeaderComponent {
  isSidebarOpen = input(true);
  toggleSidebar = output<void>();



  private router = inject(Router);

  pageTitle = computed(() => {
    const url = this.router.url;
    if (url.includes('statistics')) return 'Statistiques';
    if (url.includes('profile')) return 'Profil';
    return 'Tableau de bord';
  });

  notificationCount = computed(() => 3);
}
