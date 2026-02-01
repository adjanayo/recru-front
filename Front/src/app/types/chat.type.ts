export interface ChatMessage {
  id: string;
  jobId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  message: string;
  timestamp: Date;
  isBot: boolean;
}

export interface ChatRoom {
  jobId: string;
  jobTitle: string;
  messages: ChatMessage[];
  lastMessageTime?: Date;
}
