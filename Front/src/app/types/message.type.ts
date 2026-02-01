export interface Message {
  id: string;
  conversationId: string;
  senderId: string; // 'admin' ou userId
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  type: 'JOB' | 'DIRECT';
  participantName: string;
  participantId: string;
  jobTitle?: string; // Si lié à une offre
  lastMessage?: Message;
  unreadCount: number;
  avatarUrl?: string; // Optionnel
}
