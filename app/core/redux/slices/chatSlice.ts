import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Chat, Message } from '../../../static/types/chatTypes';
import {
    fetchChatsService,
    createChatService,
    deleteChatService,
    sendMessageToChatService,
    searchChatsByNameService,
} from '../../services/chatService';

export interface ChatState {
    chats: Chat[];
    loading: boolean;
}

const initialState: ChatState = {
    chats: [],
    loading: false,
};

export const fetchChats = createAsyncThunk<Chat[]>('chat/fetchChats', async () => {
    return fetchChatsService();
});

export const createChat = createAsyncThunk<Chat, { name: string }>('chat/createChat', async (newChat) => {
    return createChatService(newChat);
});

export const deleteChat = createAsyncThunk<string, string>('chat/deleteChat', async (chatId) => {
    return deleteChatService(chatId);
});

export const sendMessageToChat = createAsyncThunk<{ chatId: string; message: Message }, { chatId: string; message: Message }>(
    'chat/sendMessageToChat',
    async ({ chatId, message }) => {
        return sendMessageToChatService(chatId, message);
    }
);

export const searchChatsByName = createAsyncThunk<Chat[], string>('chat/searchChatsByName', async (searchTerm) => {
    return searchChatsByNameService(searchTerm);
});

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChats.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchChats.fulfilled, (state, action: PayloadAction<Chat[]>) => {
                state.loading = false;
                state.chats = action.payload;
            })
            .addCase(fetchChats.rejected, (state) => {
                state.loading = false;
            })
            .addCase(createChat.fulfilled, (state, action: PayloadAction<Chat>) => {
                state.chats.push(action.payload);
            })
            .addCase(deleteChat.fulfilled, (state, action: PayloadAction<string>) => {
                state.chats = state.chats.filter((chat) => chat.id !== action.payload);
            })
            .addCase(sendMessageToChat.fulfilled, (state, action: PayloadAction<{ chatId: string; message: Message }>) => {
                const chat = state.chats.find(chat => chat.id === action.payload.chatId);
                if (chat) {
                    chat.messages.push(action.payload.message);
                }
            });
    },
});

export default chatSlice.reducer;