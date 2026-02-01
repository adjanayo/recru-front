import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { MessagingSidebarComponent } from '../../components/messaging-sidebar/messaging-sidebar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Sidebar, AdminHeaderComponent, MessagingSidebarComponent],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayoutComponent {
  isSidebarCollapsed = signal(false);
  showMessaging = signal(false);

  toggleSidebar() {
    this.isSidebarCollapsed.set(!this.isSidebarCollapsed());
  }
}
