import * as React from 'react';
import Chat from "src/app/pages/ChatList/Chat";
import { MsgList, MsgInput, Header, MemberList, InfoHeader, SearchBar, Footer } from '../../components';
import { HeaderType, SearchType } from '../../../libs/enum-type';


function ChatList() {
    return (
        <div id="wrapmsgr" className="ng-scope">
            <div id="wrapmsgr_body" ng-controller="WrapMsgrController" className="wrapmsgr_container ng-scope" data-ws="ws://ecm.dev.fasoo.com:9500/ws" data-vhost="/wrapsody-oracle" data-fpns-enabled="true" data-weboffice-enabled="true">
                <div className="wrapmsgr_chat_list" ng-class="{disabled: !loggedIn}" ng-show="viewMode == 'full' &amp;&amp; showChatList">
                    <Header docName = "" headerType={HeaderType.LIST}/>
                    <div className="wrapmsgr_content">
                        <SearchBar type = {SearchType.ROOM}/>
                        <div className= "wrapmsgr_chatroom_list">
                            <ul>
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
