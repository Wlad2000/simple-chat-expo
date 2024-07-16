/****************************************************************************
**  TYPES for navigation
** 
**
**
****************************************************************************/
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
    Home: undefined;
    Chat: { chatId: string };
    CreateChat: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type ChatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Chat'>;
export type CreateChatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateChat'>;

export type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;
