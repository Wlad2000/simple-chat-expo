/****************************************************************************
** MAIN TYPES
** 
**
**
****************************************************************************/
export interface Chat {
    id: string;
    name: string;
    messages: Message[];
    creator: string;
}

export interface Message {
    id: string;
    text: string;
    timestamp: string;
    sender: string;
}
