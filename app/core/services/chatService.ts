import { io, Socket } from 'socket.io-client';
import { Chat, Message } from '../../static/types/chatTypes';
import { USER_ID } from '../../constants';

// Replace your server URL. example: http://192.168.1.101:3001
const SOCKET_SERVER_URL = 'http://192.168.0.135:3001';

let socket: Socket | null = null;

// WebSocket connection
export const initializeSocket = () => {
    if (!socket) {
        socket = io(SOCKET_SERVER_URL);
        socket.on('connect', () => {
            console.log('Socket connected');
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });
    }
};

export const fetchChatsService = (): Promise<Chat[]> => {
    initializeSocket();
    return new Promise<Chat[]>((resolve, reject) => {
        if (socket) {
            socket.emit('fetchChats');
            socket.on('chats', (chats: Chat[]) => {
                resolve(chats);
            });
            socket.on('error', (error: any) => {
                reject(error);
            });
        }
    });
};

export const createChatService = (newChat: { name: string }): Promise<Chat> => {
    return new Promise<Chat>((resolve, reject) => {
        if (socket) {
            const chatWithCreator = { ...newChat, creator: USER_ID };
            socket.emit('createChat', chatWithCreator);
            socket.on('newChat', (chat: Chat) => {
                resolve(chat);
            });
            socket.on('error', (error: any) => {
                reject(error);
            });
        }
    });
};

export const deleteChatService = (chatId: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        if (socket) {
            socket.emit('deleteChat', { chatId, userId: USER_ID });
            socket.on('deletedChat', (deletedChatId: string) => {
                resolve(deletedChatId);
            });
            socket.on('error', (error: any) => {
                reject(error);
            });
        }
    });
};

export const sendMessageToChatService = (chatId: string, message: Message): Promise<{ chatId: string; message: Message }> => {
    initializeSocket();
    return new Promise<{ chatId: string; message: Message }>((resolve) => {
        socket!.emit('sendMessage', { chatId, message });
        resolve({ chatId, message });
    });
};

export const searchChatsByNameService = (searchTerm: string): Promise<Chat[]> => {
    return new Promise<Chat[]>((resolve, reject) => {
        if (socket) {
            socket.emit('searchChats', searchTerm);
            socket.on('chats', (chats: Chat[]) => {
                resolve(chats);
            });
            socket.on('error', (error: any) => {
                reject(error);
            });
        }
    });
};
