import * as React from 'react';
import Chat from "@/renderer/app/pages/ChatList/Chat";
import { MsgList, MsgInput, Header, SearchBar, Footer } from '@/renderer/app/components';
import { HeaderType, SearchType } from '../../../libs/enum-type';
import { useState } from 'react';

declare global{ namespace JSX{
    interface IntrinsicElements{
        "document-icon": any;
    }
}
}


function ChatList() {

    const[search, setSearch] = useState("");

    return (

        <div id="wrapmsgr" className="ng-scope">
            <div id="wrapmsgr_body"className="wrapmsgr_container" >
                <div className="wrapmsgr_chat_list">
                    <Header docName = "" headerType={HeaderType.LIST}/>
                    <div className="wrapmsgr_content">
                        <SearchBar type = {SearchType.ROOM} search = {search} setSearch = {setSearch}/>
                        <div className= "wrapmsgr_chatroom_list">
                            <ul id = "chatList">
                                <Chat search = {search}/>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    );
}

export default ChatList;
