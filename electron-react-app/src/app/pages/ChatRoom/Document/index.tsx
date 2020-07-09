import * as React from 'react';
import { MsgList, MsgInput, Header, MemberList, InfoHeader, SearchBar } from '../../../components';
import { HeaderType, MemberListType, RoomType } from '../../../../libs/enum-type';
import "src/assets/css/base.css";
import "src/assets/css/wrapmsgr.css";
import "src/assets/css/wrapmsgr-components.css";
import "src/assets/css/wrapmsgr-icons.css";


function DocumentChatRoom() {
    let data: string;
    interface Msg {
        userId: string;
        msgBody: string;
        createdAt: string;
        msgId: string;
        type: string;
    }

    let msgs: Array<Msg>;

    msgs = [
        { userId: "administrator", msgBody: "안녕", createdAt: "6월 6일 (토요일)", msgId: "message_14495", type: "user" },
        { userId: "administrator", msgBody: "배고파", createdAt: "6월 8일 (월요일)", msgId: "message_14495", type: "system" },
        { userId: "administrator", msgBody: "안녕", createdAt: "6월 8일 (월요일)", msgId: "message_14495", type: "user" },
        { userId: "administrator", msgBody: "반가워", createdAt: "7월 6일 (월요일)", msgId: "message_14495", type: "user" },
    ];

    interface Member{
        longName: string;
        shortName: string;
        dept: string;
    }

    let members: Array<Member>;

    members = [
        { longName: "administrator", shortName: "ad", dept: "랩소디"},
        { longName: "administrator", shortName: "ad", dept: "GS"},
        { longName: "administrator", shortName: "ad", dept: "디지털 페이지"},
    ];

    return (
        <React.Fragment>
            <div id="wrapmsgr" className="ng-scope">
	            <div id="wrapmsgr_body" ng-controller="WrapMsgrController" className="wrapmsgr_container ng-scope" data-ws="ws://ecm.dev.fasoo.com:9500/ws" data-vhost="/wrapsody-oracle" data-fpns-enabled="true" data-weboffice-enabled="true">
                    <div className="wrapmsgr_chat wrapmsgr_state_normalize wrapmsgr_viewmode_full" ng-class="[chatroomState, viewModeClass, {false: 'disabled'}[loggedIn]]" ng-show="current.convo">
                        <Header docName = "새 Microsoft Excel 워크시트.xlsx" headerType = {HeaderType.CHAT}/>
                        <div className="wrapmsgr_content  wrapmsgr_viewmode_full doc-chatroom" ng-class="[{1: 'doc-chatroom', 2: 'wrapmsgr_chatbot'}[current.convo.convoType], viewModeClass]">
                            <InfoHeader type = {RoomType.DOC}/>
                            <div className="wrapmsgr_aside" ng-hide="viewMode == 'chat' || current.convo.convoType == 2">
                                <SearchBar/>
                                {/* <MemberList memberListType = {MemberListType.CHAT} members = {members}/> */}
                            </div>   
                            <div className="wrapmsgr_article wrapmsgr_viewmode_full" ng-class="viewModeClass">
                                <MsgList msgs={msgs} />
                                <MsgInput/>
                            </div>       
                        </div>
                    </div>
                </div>
            </div>    
           
        </React.Fragment>
    )
}

export default DocumentChatRoom;
