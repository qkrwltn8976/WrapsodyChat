import * as React from 'react';
import { render } from '@testing-library/react';
import { createClient, subscribe, publish } from 'src/libs/stomp';
import ReactDOM from 'react-dom';
import { IMessage } from "@stomp/stompjs";
import { getTime, getDate } from 'src/libs/timestamp-converter';

export interface Msg {
    sendUserId: string;
    body: string;
    messageId: string;
    messageType: number;
    type: string;
    createdAt: number;
    updatedAt: number;
    isNotice: boolean;
    recvConvoId: number;
}

interface MsgProps {
    msgs: Msg[];
    convoId: string;
}

function MsgDate(props: { date: number }) {
    let date = getDate(props.date)
    return (
        <div className="wrapmsgr_date ng-scope" ng-if="diffDays(current.messages[$index-1].createdAt, message.createdAt) >= 1">
            <span className="ng-binding">{date}</span>
        </div>
    )
}

function SystemMsg(props: { msg: Msg }) {
    let msgspan;
    // if (props.msg.type === "enter") {
    //     msgspan = <span className="ng-binding">조상원님이 입장하셨습니다.<a href="" className="wrapmsgr_right"></a></span>

    // }
    // if (props.msg.type == "invite") {
    msgspan = <span className="ng-binding">{props.msg.body}<a href="" className="wrapmsgr_right"></a></span>;
    // }

    return (
        <div className="wrapmsgr_msg_system ng-scope" ng-className="{revision: message.messageType == MESSAGE_TYPE_SYSTEM_REVISION}" ng-if="message.messageType >= MESSAGE_TYPE_SYSTEM">
            {msgspan}
        </div>
    )
}

function UserMsg(props: { msg: Msg }) {
    let time: string = getTime(props.msg.createdAt);
    return (
        <div className="wrapmsgr_msg ng-scope" ng-if="message.messageType < MESSAGE_TYPE_SYSTEM" ng-className="{'continuous': isContinuous(current.messages[$index-1], message)}">
            <div className="wrapmsgr_msg_user ng-isolate-scope" ng-attr-title="{{users[message.sendUserId].userName}}" wrapmsgr-user-profile="users[message.sendUserId]" user-profile-disabled="message.sendUserId.substr(0, 5) == '@BOT@'" title="administrator">
                <span className="user-photo ng-binding ng-isolate-scope no-photo cyan">ad</span>
            </div>
            <div className="wrapmsgr_msg_userid ng-binding">{props.msg.sendUserId}</div>
            <div className="wrapmsgr_msg_bubble-wrap">
                <div className="wrapmsgr_msg_bubble">
                    <div className="wrapmsgr_msg_body ng-binding" ng-bind-html="message.body | linky:'_blank'">{props.msg.body}</div>
                </div>
                <div className="wrapmsgr_msg_time" ng-hide="isContinuous(message, current.messages[$index+1])">
                    <span className="ng-binding">{time}</span>
                </div>
            </div>
        </div>
    )
}

export function MsgBody(props: { msg: Msg }) {
    let msgbubble;
    let msgbody;

    if (props.msg.sendUserId === "@SYS@")
        msgbubble = <SystemMsg msg={props.msg} />
    else
        msgbubble = <UserMsg msg={props.msg} />

    if (props.msg.createdAt !== 0) {
        let dateprops = <MsgDate date={props.msg.createdAt} />;
        msgbody = <React.Fragment>{dateprops}{msgbubble}</React.Fragment>;
        // 더하기 메세지버블 + bubble
    } else {
        msgbody = msgbubble;
    }

    if (props.msg.sendUserId === 'admin') {
        return (<li id={props.msg.messageId} ng-repeat="message in current.messages" className="ng-scope li-right">
            {msgbody}
        </li>)
    } else {
        return (

            <li id={props.msg.messageId} ng-repeat="message in current.messages" ng-className="{'li-right': user.id == message.sendUserId}" className="ng-scope">
                {msgbody}
            </li>
        )
    }

}



class MsgList extends React.Component<{convoId: string}, {}> {
    client: any;
    userId: string = "admin"
    convoId: string = "98f7e404-f6b7-4513-84b4-31aa1647bc6d";
    stompConnection = () => {
        // return new Promise(function(resolve, reject) {
        this.client = createClient("admin", "1111");

        this.client.onConnect = () => {
            console.log("connected to Stomp");

            subscribe(this.client, 'admin', this.convoId, (payload: any) => {
                if (payload.Messages) {
                    ReactDOM.render(
                        <div>{payload.Messages.map((msg: Msg) => <MsgBody msg={msg} />)}</div>,
                        document.getElementById('messageList'));
                }
                console.log(payload.Messages)
            });

            publish(this.client, 'api.user.info', 'admin', '98f7e404-f6b7-4513-84b4-31aa1647bc6d', {});
            publish(this.client, 'api.message.list', 'admin', '98f7e404-f6b7-4513-84b4-31aa1647bc6d', { 'convoId': this.convoId, "direction": "forward" });
            publish(this.client, 'api.conversation.view', 'admin', '98f7e404-f6b7-4513-84b4-31aa1647bc6d', { 'convoId': this.convoId });
        }

        this.client.activate();
    }
    constructor(props: MsgProps) {
        super(props);
        this.convoId = props.convoId;
        this.stompConnection();
    }


    render() {
        // const messages = this.props.msgs.map((msg: Msg) => {
        //     return (<MsgBody msg={msg} />)
        // });

        return (
            <div className="wrapmsgr_content" ng-class="{'no-header': current.convo.convoType == 2}">
                <div className="wrapmsgr_messages" in-view-container="">
                    <ul id="messageList">
                        {/* {messages} */}
                    </ul>
                    <div className="wrapmsgr_latest_message ng-hide" ng-show="current.latestMessage" ng-click="messagesScrollToLatestMessage()">
                        <i className="icon_arrow_down"></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default MsgList;