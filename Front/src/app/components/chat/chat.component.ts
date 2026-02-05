import { Component, Input, Output, EventEmitter, signal, computed, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { ChatMessage, ChatRoom } from '../../types/chat.type';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  @Input() jobId!: string;
  @Input() jobTitle!: string;
  @Output() close = new EventEmitter<void>();

  messageText = signal('');
  isSending = signal(false);

  messages = computed(() => this.chatService.getMessagesByJobId(this.jobId));
  currentUser = computed(() => this.authService.currentUser());

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Scroll to bottom when messages change
    effect(() => {
      const msgs = this.messages();
      if (msgs.length > 0) {
        setTimeout(() => this.scrollToBottom(), 100);
      }
    });
  }

  async sendMessage(): Promise<void> {
    const text = this.messageText().trim();
    if (!text) return;

    const user = this.currentUser();
    if (!user) return;

    this.isSending.set(true);

    try {
      await this.chatService.sendMessage(
        this.jobId,
        this.jobTitle,
        user.id,
        `${user.firstName} ${user.lastName}`,
        text,
        user.profilePhoto
      );
      this.messageText.set('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      this.isSending.set(false);
    }
  }

  onClose(): void {
    this.close.emit();
  }

  formatTime(timestamp: Date): string {
    return new Date(timestamp).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  private scrollToBottom(): void {
    const chatContainer = document.getElementById('chat-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }
}
