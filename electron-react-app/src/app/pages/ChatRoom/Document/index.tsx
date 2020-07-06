import * as React from 'react';
import { MsgList, MsgInput } from '../../../components';

function DocumentChatRoom() {
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

    return (
        <React.Fragment>
            <div className="wrapmsgr_article wrapmsgr_viewmode_full" ng-class="viewModeClass">
                <MsgList msgs={msgs} />
                <MsgInput />
            </div>
        </React.Fragment>
    )
}

export default DocumentChatRoom;