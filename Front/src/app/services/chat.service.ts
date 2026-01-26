import { Injectable, signal } from '@angular/core';
import { ChatMessage, ChatRoom } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chatRoomsSignal = signal<ChatRoom[]>([]);
  public chatRooms = this.chatRoomsSignal.asReadonly();

  constructor() {}

  getChatRoomByJobId(jobId: string): ChatRoom | undefined {
    return this.chatRooms().find(room => room.jobId === jobId);
  }

  async sendMessage(jobId: string, jobTitle: string, userId: string, userName: string, message: string, userAvatar?: string): Promise<ChatMessage> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newMessage: ChatMessage = {
          id: Math.random().toString(36).substr(2, 9),
          jobId,
          userId,
          userName,
          userAvatar,
          message,
          timestamp: new Date(),
          isBot: false
        };

        this.chatRoomsSignal.update(rooms => {
          const existingRoomIndex = rooms.findIndex(room => room.jobId === jobId);
          
          if (existingRoomIndex >= 0) {
            const updatedRooms = [...rooms];
            updatedRooms[existingRoomIndex].messages.push(newMessage);
            updatedRooms[existingRoomIndex].lastMessageTime = new Date();
            return updatedRooms;
          } else {
            const newRoom: ChatRoom = {
              jobId,
              jobTitle,
              messages: [newMessage],
              lastMessageTime: new Date()
            };
            return [...rooms, newRoom];
          }
        });

        // Simulation de réponse automatique du bot
        this.sendBotResponse(jobId, jobTitle, message);

        resolve(newMessage);
      }, 300);
    });
  }

  private sendBotResponse(jobId: string, jobTitle: string, userMessage: string): void {
    setTimeout(() => {
      const responses = [
        "Merci pour votre question ! Un recruteur vous répondra sous peu.",
        "C'est une excellente question. Notre équipe RH va vous répondre rapidement.",
        "Pour plus d'informations sur ce poste, n'hésitez pas à consulter la description complète.",
        "Votre intérêt pour ce poste est noté. Nous reviendrons vers vous très prochainement."
      ];

      const botMessage: ChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        jobId,
        userId: 'bot',
        userName: 'Assistant RH',
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        isBot: true
      };

      this.chatRoomsSignal.update(rooms => {
        const roomIndex = rooms.findIndex(room => room.jobId === jobId);
        if (roomIndex >= 0) {
          const updatedRooms = [...rooms];
          updatedRooms[roomIndex].messages.push(botMessage);
          updatedRooms[roomIndex].lastMessageTime = new Date();
          return updatedRooms;
        }
        return rooms;
      });
    }, 1000);
  }

  getMessagesByJobId(jobId: string): ChatMessage[] {
    const room = this.getChatRoomByJobId(jobId);
    return room?.messages || [];
  }

  clearChatRoom(jobId: string): void {
    this.chatRoomsSignal.update(rooms =>
      rooms.filter(room => room.jobId !== jobId)
    );
  }
}
