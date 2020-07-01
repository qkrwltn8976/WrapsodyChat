import React, { Component, Fragment } from 'react';

type ChatListProps = {
    name: String
}
const ChatList: React.FC<ChatListProps> = ({name})=> {
    return (
        <div>
            <h3>채팅방리스트 {name}</h3>
        </div>
    )
}

export default ChatList;