import * as React from 'react';
import Chat from "src/app/pages/ChatList/Chat";
import { MsgList, MsgInput, Header, SearchBar, Footer } from 'src/app/components';
import {ChatPage} from 'src/app/pages'
import { HeaderType, SearchType } from '../../../libs/enum-type';

declare global{ namespace JSX{
    interface IntrinsicElements{
        "document-icon": any;
    }
}
}


function ChatList() {


    return (

        <div id="wrapmsgr" className="ng-scope">
            <div id="wrapmsgr_body"className="wrapmsgr_container ng-scope" >
                <div className="wrapmsgr_chat_list">
                    <Header docName = "" headerType={HeaderType.LIST}/>
                    <div className="wrapmsgr_content">
                        <SearchBar type = {SearchType.ROOM}/>
                        <div className= "wrapmsgr_chatroom_list">
                            <ul id = "chatList">
                                <Chat/>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    );
}

export default ChatList;
