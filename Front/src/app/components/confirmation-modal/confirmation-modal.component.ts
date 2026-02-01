import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {
  @Input() title: string = 'Confirmation';
  @Input() message: string = '';
  @Input() confirmText: string = 'Confirmer';
  @Input() cancelText: string = 'Annuler';
  @Input() type: 'success' | 'danger' | 'warning' = 'danger';
  @Input() isOpen: boolean = false;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }

  getIconColorClass(): string {
    switch (this.type) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-amber-600 bg-amber-100';
      case 'danger':
      default: return 'text-red-600 bg-red-100';
    }
  }

  getButtonColorClass(): string {
    switch (this.type) {
      case 'success': return 'bg-green-600 hover:bg-green-700';
      case 'warning': return 'bg-amber-600 hover:bg-amber-700';
      case 'danger':
      default: return 'bg-red-600 hover:bg-red-700';
    }
  }
}
