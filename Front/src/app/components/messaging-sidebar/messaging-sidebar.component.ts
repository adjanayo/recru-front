import { Component, Input, Output, EventEmitter, signal, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Conversation, Message } from '../../types/message.type';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-messaging-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messaging-sidebar.component.html',
  styleUrl: './messaging-sidebar.component.css'
})
export class MessagingSidebarComponent {
  private messageService = inject(MessageService);

  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  conversations = this.messageService.conversations;
  selectedConversationId = signal<string | null>(null);
  newMessage = signal('');

  selectedConversation = computed(() =>
    this.conversations().find(c => c.id === this.selectedConversationId())
  );

  currentMessages = computed(() => {
    const id = this.selectedConversationId();
    if (!id) return [];
    return this.messageService.getMessages(id)();
  });

  constructor() {
    // Mark as read when selecting conversation
    effect(() => {
        const id = this.selectedConversationId();
        if (id && this.isOpen) {
            this.messageService.markAsRead(id);
        }
    }, { allowSignalWrites: true });
  }

  selectConversation(id: string) {
    this.selectedConversationId.set(id);
  }

  backToList() {
    this.selectedConversationId.set(null);
  }

  async sendMessage() {
    if (!this.newMessage().trim() || !this.selectedConversationId()) return;

    await this.messageService.sendMessage(this.selectedConversationId()!, this.newMessage());
    this.newMessage.set('');

    // Scroll to bottom logic would go here
    setTimeout(() => {
        const container = document.getElementById('messages-container');
        if (container) container.scrollTop = container.scrollHeight;
    }, 100);
  }

  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  formatDate(date: Date): string {
     return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  }
}
