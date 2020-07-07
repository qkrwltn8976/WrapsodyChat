import * as React from 'react';
import { render } from '@testing-library/react';

interface Msg {
    userId: string;
    msgBody: string;
    createdAt: string;
    msgId: string;
    type: string;
}

interface MsgProps {
    msgs: Msg[];
}

function MsgDate(props: { date: string }) {
    return (
        <div className="wrapmsgr_date ng-scope" ng-if="diffDays(current.messages[$index-1].createdAt, message.createdAt) >= 1">
            <span className="ng-binding">{props.date}</span>
        </div>
    )
}

function SystemMsg(props: { msg: Msg }) {
    let msgspan;
    // if (props.msg.type === "enter") {
    //     msgspan = <span className="ng-binding">조상원님이 입장하셨습니다.<a href="" className="wrapmsgr_right"></a></span>

    // }
    // if (props.msg.type == "invite") {
    msgspan = <span className="ng-binding">administrator님이 김민지2님을 초대했습니다.<a href="" className="wrapmsgr_right"></a></span>;
    // }

    return (
        <div className="wrapmsgr_msg_system ng-scope" ng-className="{revision: message.messageType == MESSAGE_TYPE_SYSTEM_REVISION}" ng-if="message.messageType >= MESSAGE_TYPE_SYSTEM">
            {msgspan}
        </div>
    )
}

function UserMsg(props: { msg: Msg }) {
    return (
        <div className="wrapmsgr_msg ng-scope" ng-if="message.messageType < MESSAGE_TYPE_SYSTEM" ng-className="{'continuous': isContinuous(current.messages[$index-1], message)}">
            <div className="wrapmsgr_msg_user ng-isolate-scope" ng-attr-title="{{users[message.sendUserId].userName}}" wrapmsgr-user-profile="users[message.sendUserId]" user-profile-disabled="message.sendUserId.substr(0, 5) == '@BOT@'" title="administrator">
                <span className="user-photo ng-binding ng-isolate-scope no-photo cyan">ad</span>
            </div>
            <div className="wrapmsgr_msg_userid ng-binding">{props.msg.userId}</div>
            <div className="wrapmsgr_msg_bubble-wrap">
                <div className="wrapmsgr_msg_bubble">
                    <div className="wrapmsgr_msg_body ng-binding" ng-bind-html="message.body | linky:'_blank'">{props.msg.msgBody}</div>
                </div>
                <div className="wrapmsgr_msg_time" ng-hide="isContinuous(message, current.messages[$index+1])">
                    <span className="ng-binding">{props.msg.createdAt}</span>
                </div>
            </div>
        </div>
    )
}

function MsgBody(props: { msg: Msg }) {
    let msgbubble;
    let msgbody;

    if (props.msg.type === "system")
        msgbubble = <SystemMsg msg={props.msg} />
    if (props.msg.type === "user")
        msgbubble = <UserMsg msg={props.msg} />

    if (props.msg.createdAt !== "이전 메세지 시간과 비교") {
        let dateprops = <MsgDate date={props.msg.createdAt} />;
        msgbody = <React.Fragment>{dateprops}{msgbubble}</React.Fragment>;
        // 더하기 메세지버블 + bubble
    } else {
        msgbody = msgbubble;
    }

    return (
        <li id={props.msg.msgId} ng-repeat="message in current.messages" ng-className="{'li-right': user.id == message.sendUserId}" className="ng-scope">
            {msgbody}
        </li>
    )
}



class MsgList extends React.Component<MsgProps, {}> {
    constructor(props: MsgProps) {
        super(props);
    }

    render() {
        const messages = this.props.msgs.map((msg: Msg) => {
            return (<MsgBody msg={msg} />)
        });

        return (
            <div className="wrapmsgr_content" ng-class="{'no-header': current.convo.convoType == 2}">
                <div className="wrapmsgr_messages" in-view-container="">
                    <ul>
                        {messages}
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