import * as React from 'react';
import Chat from "../../components/Chat";
import SearchBar from "../../components/SearchBar";
import {SearchType} from "@libs/enum-type"

function ChatList() {
    return (
        <div className = "wrapmsgr_chatroom_list">
            <SearchBar enum = {SearchType.ROOM}/>
            <ul>
                <Chat/>
            </ul>
        </div>
    );
}

export default ChatList;