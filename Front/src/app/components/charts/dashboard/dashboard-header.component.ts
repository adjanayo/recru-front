import { Component, input, output, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, Menu, X, Bell, MessageSquare } from 'lucide-angular';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div class="flex items-center justify-between h-16 px-6">
        <button (click)="toggleSidebar.emit()" class="p-2 rounded-md text-gray-500 hover:text-terracotta-600 hover:bg-amber-50">
          <lucide-icon [name]="isSidebarOpen() ? XIcon : MenuIcon" class="h-6 w-6"></lucide-icon>
        </button>

        <h1 class="text-xl font-bold text-gray-800">{{ pageTitle() }}</h1>

        <div class="flex items-center space-x-4">
          <div class="relative">
            <button class="p-2 rounded-md text-gray-500 hover:text-terracotta-600 hover:bg-amber-50">
              <lucide-icon [name]="BellIcon" class="h-6 w-6"></lucide-icon>
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

  readonly MenuIcon = Menu;
  readonly XIcon = X;
  readonly BellIcon = Bell;

  private router = inject(Router);

  pageTitle = computed(() => {
    const url = this.router.url;
    if (url.includes('statistics')) return 'Statistiques';
    if (url.includes('profile')) return 'Profil';
    return 'Tableau de bord';
  });

  notificationCount = computed(() => 3);
}
