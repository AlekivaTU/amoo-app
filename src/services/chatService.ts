import { io, Socket } from 'socket.io-client';
import api from './api';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}

export interface Chat {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
}

class ChatService {
  private socket: Socket | null = null;
  private messageHandlers: ((message: Message) => void)[] = [];

  connect(token: string) {
    this.socket = io(process.env.REACT_APP_WS_URL || 'http://localhost:3001', {
      auth: { token },
    });

    this.socket.on('message', (message: Message) => {
      this.messageHandlers.forEach(handler => handler(message));
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  onMessage(handler: (message: Message) => void) {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    };
  }

  sendMessage(receiverId: string, content: string) {
    if (this.socket) {
      this.socket.emit('message', { receiverId, content });
    }
  }

  async getChats(): Promise<Chat[]> {
    const response = await api.get('/chats');
    return response.data;
  }

  async getChatMessages(chatId: string): Promise<Message[]> {
    const response = await api.get(`/chats/${chatId}/messages`);
    return response.data;
  }
}

export const chatService = new ChatService(); 