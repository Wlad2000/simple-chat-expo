/****************************************************************************
** Message Item
** 
**
**
****************************************************************************/
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '../types/chatTypes';
import { USER_ID } from '../../constants';

interface MessageItemProps {
    message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
    const isCurrentUser = message.sender === USER_ID;
    return (
        <View style={[styles.messageContainer, isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage]}>
            <Text style={styles.messageText}>{message.text}</Text>
            <View style={styles.containerBeige}>
                <Text style={styles.textBeige}>{isCurrentUser ? 'You' : message.sender}</Text>
                <Text style={styles.textBeige}>{new Date(message.timestamp).toLocaleTimeString()}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    messageContainer: {
        maxWidth: '80%',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    currentUserMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
    },
    otherUserMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#ECECEC',
    },
    messageText: {
        fontSize: 16,
    },
    containerBeige: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        columnGap: 20,
        marginTop: 5,
    },
    textBeige: {
        color: 'gray',
        fontSize: 12,
        fontWeight: '300',
    },
});

export default MessageItem;
