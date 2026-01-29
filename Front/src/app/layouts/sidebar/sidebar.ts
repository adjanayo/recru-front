import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, Home, BarChart2, User, Briefcase, CreditCard, Settings, LogOut } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  @Input() isCollapsed = false;
  private authService = inject(AuthService);
  currentUser = this.authService.currentUser;

  readonly HomeIcon = Home;
  readonly StatsIcon = BarChart2;
  readonly ProfileIcon = User;
  readonly ProjectsIcon = Briefcase;
  readonly SubscriptionIcon = CreditCard;
  readonly SettingsIcon = Settings;
  readonly LogoutIcon = LogOut;

  logout() {
    this.authService.logout();
  }
}
