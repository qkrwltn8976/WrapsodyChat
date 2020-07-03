import * as React from 'react';
import Chat from "./Chat";
import SearchBar from "../../components/SearchBar";

function ChatList() {
    return (
        <div className = "wrapmsgr_chatroom_list">
            <SearchBar type = "ChatRoomList"/>
            <ul>
                <Chat/>
            </ul>
        </div>
    );
}

export default ChatList;