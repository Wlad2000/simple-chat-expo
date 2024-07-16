/****************************************************************************
** Home Screen
** contain:  chat Item, search, popup(CreateChat)
**
**
****************************************************************************/
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Alert, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createChat, fetchChats } from '../../core/redux/slices/chatSlice';
import { RootState, AppDispatch } from '../../core/redux/store';
import ChatItem from '../shared/ChatItem';
import { HomeScreenNavigationProp } from '../types/navigation';
import { Button, Input, Overlay } from 'react-native-elements';
import { Chat } from '../types/chatTypes';


interface HomeScreenProps {
    navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { chats, loading } = useSelector((state: RootState) => state.chat);
    const [searchTerm, setSearchTerm] = useState('');
    const [newChatName, setNewChatName] = useState('');
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [filteredChats, setFilteredChats] = useState<Chat[]>([]);

    useEffect(() => {
        dispatch(fetchChats());
    }, [dispatch]);

    useEffect(() => {
        setFilteredChats(chats);
    }, [chats]);

    const handleSearch = (text: string) => {
        setSearchTerm(text);
        if (text.trim() !== '') {
            const filtered = chats.filter(chat =>
                chat.name.toLowerCase().includes(text.trim().toLowerCase())
            );
            setFilteredChats(filtered);
        } else {
            setFilteredChats(chats);
        }
    };


    const handleCreateChat = () => {
        if (newChatName.trim() !== '') {
            dispatch(createChat({ name: newChatName }));
            setNewChatName('');
            setIsOverlayVisible(false);
        } else {
            Alert.alert("Error", `Chat name is a required field.`);
        }
    };

    return (
        <View style={styles.container}>
            <Button
                title="Create Chat"
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={styles.btnCreate}
                containerStyle={{
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                onPress={() => setIsOverlayVisible(true)}
            />
            <Overlay isVisible={isOverlayVisible} onBackdropPress={() => { setIsOverlayVisible(false); setNewChatName(''); }}>
                <View style={styles.overlayContainer}>
                    <Input
                        placeholder="New chat name"
                        value={newChatName}
                        onChangeText={setNewChatName}
                        containerStyle={styles.input}
                    />
                    <Button
                        title="Create"
                        titleStyle={{ fontWeight: '500' }}
                        buttonStyle={styles.btnCreate}
                        onPress={handleCreateChat}
                    />
                </View>
            </Overlay>
            <Input
                placeholder='Search by chat name'
                leftIcon={{ type: 'font-awesome', name: 'search' }}
                value={searchTerm}
                onChangeText={handleSearch}
            />

            {loading ? (
                <View style={styles.messageContainer} >
                    <ActivityIndicator size="large" color="#007BFF" />
                </View>
            ) : filteredChats.length ? (
                <FlatList
                    data={filteredChats}
                    renderItem={({ item }) => <ChatItem chat={item} navigation={navigation} />}
                    keyExtractor={(item) => item.id}
                />
            ) : <View style={styles.messageContainer} ><Text>Not found chat</Text></View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    input: {
        marginBottom: 10,
    },
    btnCreate: {
        backgroundColor: '#000000',
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 30,
        padding: 14
    },
    overlayContainer: {
        padding: 10,
        width: 250,
        backgroundColor: '#fff',
    },
    messageContainer: {
        height: '60%', alignItems: 'center', justifyContent: 'center'
    },
});

export default HomeScreen;
