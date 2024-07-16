/****************************************************************************
** Chat Screen
** contain:  Message Item
**
**
****************************************************************************/
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { ChatScreenNavigationProp, ChatScreenRouteProp } from '../types/navigation';
import { sendMessageToChat } from '../../core/redux/slices/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../core/redux/store';
import { Input, Button } from 'react-native-elements';
import MessageItem from '../shared/MessageItem';
import { USER_ID } from '../../constants';

interface ChatScreenProps {
    route: ChatScreenRouteProp;
    navigation: ChatScreenNavigationProp;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ route, navigation }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { chatId } = route.params;
    const chat = useSelector((state: RootState) => state.chat.chats.find(c => c.id === chatId));
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            const newMessage = {
                id: `${Date.now()}`, text: message, sender: USER_ID, timestamp: `${Date()}`
            };
            dispatch(sendMessageToChat({ chatId, message: newMessage }));
            setMessage('');
        }
    };

    if (!chat) {
        return <Text>Chat not found</Text>;
    }
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 90}>
            <FlatList
                style={styles.containerList}
                data={chat.messages}
                renderItem={({ item }) => <MessageItem message={item} />}
                keyExtractor={(item) => item.id}
            />
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Type here..."
                    value={message}
                    onChangeText={setMessage}
                    containerStyle={styles.input}
                />
                <Button
                    title="Send"
                    icon={{
                        name: 'send',
                        type: 'font-awesome',
                        size: 15,
                        color: 'white',
                    }}
                    iconRight
                    buttonStyle={styles.btnSend}
                    containerStyle={{
                        width: 100

                    }}
                    titleStyle={{ fontWeight: 'bold' }}
                    onPress={handleSendMessage}
                />

            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        display: 'flex',
        paddingHorizontal: 12,
        paddingVertical: 5,
    },
    input: {
        flex: 1,
        marginRight: 10,
        height: 60,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
    },
    btnSend: {
        backgroundColor: 'black',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 30,
        padding: 12,
        height: 60,
    },
    containerList: {
        maxHeight: '85%',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
});

export default ChatScreen;
