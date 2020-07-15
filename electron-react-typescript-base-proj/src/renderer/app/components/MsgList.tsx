import * as React from 'react';
import { createClient, subscribe, publishApi } from '@/renderer/libs/stomp';
import ReactDOM from 'react-dom';
import { IMessage } from "@stomp/stompjs";
import { getTime, getDate } from '@/renderer/libs/timestamp-converter';
import { Message } from '../../models/Message'

interface MsgProps {
    msgs: Message[];
    // convoId: string;
    // uuid: string;
}

interface MsgListState {
    msgs: Message[];
}

class MsgList extends React.Component<{ msgs: Message[] }, MsgListState> {
    client: any;
    userId: string = "admin"

    isContinuous(before: Message, after: Message) {
        if (!before || !after) {
            return false;
        }

        if (before.sendUserId != after.sendUserId) {
            return false;
        }
        let diff = after.createdAt - before.createdAt;
        let afterDate = new Date(after.createdAt);
        let beforeDate = new Date(before.createdAt);

        return diff < 60 * 1000 && beforeDate.getMinutes() == afterDate.getMinutes();
    }

    diffDays(before: number, after: number) {
        if (before == undefined) {
            return 1;
        } else {
            var diff = after - before;
            var afterDate = new Date(after);
            var todayMilliseconds = ((((afterDate.getHours() * 60) + afterDate.getMinutes()) * 60 + afterDate.getSeconds()) * 1000);
            return Math.floor((diff + (24 * 60 * 60 * 1000) - todayMilliseconds) / (24 * 60 * 60 * 1000));
        }
    };

    getMsgDate(date: number) {
        return (
            <div className="wrapmsgr_date ng-scope" ng-if="diffDays(current.messages[$index-1].createdAt, message.createdAt) >= 1">
                <span className="ng-binding">{getDate(date)}</span>
            </div>
        )
    }

    getSystemMsg(msg: Message) {
        let msgspan;

        msgspan = <span className="ng-binding">administrator님이 김민지2님을 초대했습니다.<a href="" className="wrapmsgr_right"></a></span>;

        return (
            <div className="wrapmsgr_msg_system ng-scope" ng-className="{revision: message.messageType == MESSAGE_TYPE_SYSTEM_REVISION}" ng-if="message.messageType >= MESSAGE_TYPE_SYSTEM">
                {msgspan}
            </div>
        )
    }

    getUserMsg(msg: Message, index: number) {
        let time;
        if (!this.isContinuous(msg, this.state.msgs[index+1])) {
            time = <div className="wrapmsgr_msg_time">
                <span className="ng-binding">{getTime(msg.createdAt)}</span>
            </div>;
        }
        return (
            <div className="wrapmsgr_msg ng-scope" ng-if="message.messageType < MESSAGE_TYPE_SYSTEM" ng-className="{'continuous': isContinuous(current.messages[$index-1], message)}">
                <div className="wrapmsgr_msg_user ng-isolate-scope" ng-attr-title="{{users[message.sendUserId].userName}}" wrapmsgr-user-profile="users[message.sendUserId]" user-profile-disabled="message.sendUserId.substr(0, 5) == '@BOT@'" title="administrator">
                    <span className="user-photo ng-binding ng-isolate-scope no-photo cyan">ad</span>
                </div>
                <div className="wrapmsgr_msg_userid ng-binding">{msg.sendUserId}</div>
                <div className="wrapmsgr_msg_bubble-wrap">
                    <div className="wrapmsgr_msg_bubble">
                        <div className="wrapmsgr_msg_body ng-binding" ng-bind-html="message.body | linky:'_blank'">{msg.body}</div>
                    </div>
                    {time}
                </div>
            </div>
        )
    }

    getMsgBody(msg: Message, index: number) {
        let msgbubble;
        let msgbody;

        if (msg.sendUserId === "@SYS@")
            msgbubble = this.getSystemMsg(msg);
        else
            msgbubble = this.getUserMsg(msg, index);


        let prev = this.state.msgs[index - 1];
        let diff : number = 1;
        if(prev) {
            diff = this.diffDays(prev.createdAt, msg.createdAt)
        }

        msgbody = msgbubble;

        if (diff >= 1) {
            let dateprops = this.getMsgDate(msg.createdAt);
            msgbody = <React.Fragment>{dateprops}{msgbubble}</React.Fragment>;
            // 더하기 메세지버블 + bubble
        }
        

        if (msg.sendUserId === "admin") { // 나중에 자신의 sendUserId로 수정
            return (
                <li id={msg.id} ng-repeat="message in current.messages" className="li-right ng-scope">
                    {msgbody}
                </li>
            )
        } else {
            return (
                <li id={msg.id} ng-repeat="message in current.messages" className="ng-scope">
                    {msgbody}
                </li>
            )
        }
    }

    constructor(props: MsgProps) {
        super(props);
        this.state = ({ msgs: props.msgs });
    }

    componentDidMount() {
        console.log(this.state.msgs);
        this.setState({ msgs: this.props.msgs });
    }

    render() {
        this.state = ({ msgs: this.props.msgs });
        return (
            <div className="wrapmsgr_content" ng-class="{'no-header': current.convo.convoType == 2}">
                <div className="wrapmsgr_messages" in-view-container="" id="MsgList">
                    <ul id="messageList">
                        {this.state.msgs.map((msg: Message, index: number) =>
                            this.getMsgBody(msg, index)
                        )}
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