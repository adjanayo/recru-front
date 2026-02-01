import { Injectable, signal, computed } from '@angular/core';
import { Message, Conversation } from '../types/message.type';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private conversationsSignal = signal<Conversation[]>([]);
  public conversations = this.conversationsSignal.asReadonly();

  // Store messages by conversation ID
  private messagesMap = signal<Map<string, Message[]>>(new Map());

  constructor() {
    this.loadMockData();
  }

  private loadMockData() {
    const mockConversations: Conversation[] = [
      {
        id: '1',
        type: 'JOB',
        participantName: 'John Doe',
        participantId: 'user1',
        jobTitle: 'Développeur Full Stack',
        unreadCount: 2,
        avatarUrl: '',
        lastMessage: {
          id: 'm1',
          conversationId: '1',
          senderId: 'user1',
          content: 'Bonjour, est-ce que le poste est toujours disponible ?',
          timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
          isRead: false
        }
      },
      {
        id: '2',
        type: 'DIRECT',
        participantName: 'Alice Smith',
        participantId: 'user2',
        unreadCount: 0,
        lastMessage: {
          id: 'm2',
          conversationId: '2',
          senderId: 'admin',
          content: 'Nous avons bien reçu votre dossier.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          isRead: true
        }
      }
    ];

    const mockMessages1: Message[] = [
      {
        id: 'm0',
        conversationId: '1',
        senderId: 'user1',
        content: 'Bonjour, je viens de postuler.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        isRead: true
      },
      {
        id: 'm1',
        conversationId: '1',
        senderId: 'user1',
        content: 'Bonjour, est-ce que le poste est toujours disponible ?',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        isRead: false
      }
    ];

     const mockMessages2: Message[] = [
      {
        id: 'm2',
        conversationId: '2',
        senderId: 'user2',
        content: 'Merci pour votre retour.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        isRead: true
      },
      {
        id: 'm3',
        conversationId: '2',
        senderId: 'admin',
        content: 'Nous avons bien reçu votre dossier.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        isRead: true
      }
    ];

    this.conversationsSignal.set(mockConversations);

    const initialMap = new Map<string, Message[]>();
    initialMap.set('1', mockMessages1);
    initialMap.set('2', mockMessages2);
    this.messagesMap.set(initialMap);
  }

  getMessages(conversationId: string) {
    return computed(() => this.messagesMap().get(conversationId) || []);
  }

  async sendMessage(conversationId: string, content: string): Promise<void> {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      conversationId,
      senderId: 'admin', // Current user is admin
      content,
      timestamp: new Date(),
      isRead: true
    };

    // Update messages
    this.messagesMap.update(map => {
        const newMap = new Map(map);
        const messages = newMap.get(conversationId) || [];
        newMap.set(conversationId, [...messages, newMessage]);
        return newMap;
    });

    // Update conversation last message
    this.conversationsSignal.update(convs =>
        convs.map(c => c.id === conversationId ? { ...c, lastMessage: newMessage } : c)
    );
  }

  markAsRead(conversationId: string) {
    this.conversationsSignal.update(convs =>
      convs.map(c => c.id === conversationId ? { ...c, unreadCount: 0 } : c)
    );
    // In a real app, we would also update messages status in backend
  }
}
