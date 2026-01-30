import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X, Globe, Bell, MessageSquare, Menu } from 'lucide-angular';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  @Input() title: string = 'Tableau de bord';
  @Output() onToggle = new EventEmitter<void>();
  @Output() onMessageClick = new EventEmitter<void>();

  readonly CloseIcon = X;
  readonly GlobeIcon = Globe;
  readonly BellIcon = Bell;
  readonly MessageIcon = MessageSquare;
  readonly MenuIcon = Menu;
}
