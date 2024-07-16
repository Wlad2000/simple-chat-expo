/****************************************************************************
** Chat Item
** 
**
**
****************************************************************************/
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { deleteChat } from '../../core/redux/slices/chatSlice';
import { Chat } from '../types/chatTypes';
import { AppDispatch } from '../../core/redux/store';
import { HomeScreenNavigationProp } from '../types/navigation';
import { USER_ID } from '../../constants';

interface ChatItemProps {
    chat: Chat;
    navigation: HomeScreenNavigationProp;
}

const ChatItem: React.FC<ChatItemProps> = ({ chat, navigation }) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleDelete = () => {
        dispatch(deleteChat(chat.id));
    };


    return (
        <TouchableOpacity onPress={() => navigation.navigate('Chat', { chatId: chat.id })}>
            <View style={styles.card}>
                <Text style={styles.textTitle}> {chat.name}</Text>
                {chat.creator === USER_ID && (
                    <Button
                        title="Delete"
                        icon={{
                            name: 'trash',
                            type: 'font-awesome',
                            size: 15,
                            color: 'white',
                        }}
                        iconRight
                        iconContainerStyle={{ marginLeft: 10 }}
                        titleStyle={{ fontWeight: '600', fontSize: 14 }}
                        buttonStyle={styles.btnDelete}
                        onPress={handleDelete}
                    />
                )}
            </View>
        </TouchableOpacity >
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
        padding: 12,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 20,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    },
    textTitle: {
        fontWeight: '700'
    },
    buttonContainer: {
        alignItems: 'center',
    },
    container: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    btnDelete: {
        backgroundColor: '#a42c56',
        borderColor: 'transparent',
        borderRadius: 30,
    }
});

export default ChatItem;
