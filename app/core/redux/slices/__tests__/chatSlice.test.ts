import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import chatReducer, {
    ChatState,
    fetchChats,
    createChat,
} from '../chatSlice';
import { Chat } from '../../../../static/types/chatTypes';

describe('chatSlice reducers', () => {
    let store: EnhancedStore<{ chat: ChatState }>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                chat: chatReducer,
            },
        });
    });


    it('should handle fetchChats.fulfilled', () => {
        const mockChats: Chat[] = [
            { id: '1', name: 'Chat 1', messages: [], creator: 'user1' },
            { id: '2', name: 'Chat 2', messages: [], creator: 'user2' },
        ];
        store.dispatch(fetchChats.fulfilled(mockChats, 'requestId'));

        const state = store.getState().chat;
        expect(state.chats).toEqual(mockChats);
        expect(state.loading).toEqual(false);
    });

    it('should handle createChat.fulfilled', () => {
        const newChat: Chat = {
            id: '123',
            name: 'New Chat',
            messages: [],
            creator: 'user1',
        };
        store.dispatch(createChat.fulfilled(newChat, 'requestId', { name: 'New Chat' }));

        const state = store.getState().chat;
        expect(state.chats.length).toEqual(1);
        expect(state.chats[0]).toEqual(newChat);
    });



});
