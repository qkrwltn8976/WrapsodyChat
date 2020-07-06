import * as React from 'react';
import Chat from "src/app/pages/ChatList/Chat";
import SearchBar from "src/app/components/SearchBar";
import {SearchType} from "src/libs/enum-type"

function ChatList() {
    return (
        <div className = "wrapmsgr_chatroom_list">
            <SearchBar type = {SearchType.ROOM}/>
            <ul>
                <Chat/>
            </ul>
        </div>
    );
}

export default ChatList;