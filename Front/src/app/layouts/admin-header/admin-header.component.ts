import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  @Input() title: string = 'Tableau de bord';
  @Output() onToggle = new EventEmitter<void>();
  @Output() onMessageClick = new EventEmitter<void>();
}
