import * as React from 'react';
import { getTime, getDate } from '../../libs/timestamp-converter';
import { Message } from '../../models/Message';
import { Conversation } from '../../models/Conversation';
import { getShortName } from '../../libs/messengerLoader';
import { Attachment } from '@/renderer/models/Attachment';
import { Action } from '@/renderer/models/Action';
import * as etype from '@/renderer/libs/enum-type';
const {remote} = require('electron')
const Store = require('electron-store')
const store = new Store()
const {BrowserWindow} = remote

interface MsgProps {
    msgs: Message[];
    convo?: Conversation;
    eom?: boolean;
    sendMsg?: any;
    getMsgs?: any;
    topMsgId?: number;
    isBookmark?: boolean;
}

interface MsgListState {
    msgs: Message[];
    convo: Conversation;
    unreadExists: boolean;
}

class MsgList extends React.Component<MsgProps, MsgListState> {
    userId: string = store.get("username")
    private scrollTarget = React.createRef<HTMLDivElement>();
    private scrollView = React.createRef<HTMLDivElement>();

    isReadAt(before: number, after: number) {
        // console.log(this.state)
        // console.log(this.state.unreadExists)
        // console.log(this.state.convo.readAt >= before)
        // console.log('+++++++++++++++++++++++++++++++++++=')
        // console.log(this.state.convo.readAt)
        // console.log(this.state.convo.readAt < after)
        return this.state.convo && this.state.unreadExists && this.state.convo.readAt >= before && this.state.convo.readAt < after;
    }

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

    getSystemMsg(body: string, type: string) {
        let msgspan;

        msgspan = <span className="ng-binding">{body}<a href="" className="wrapmsgr_right"></a></span>;

        return (
            <div className="wrapmsgr_msg_system ng-scope" ng-if="message.messageType >= MESSAGE_TYPE_SYSTEM" id={type}>
                {msgspan}
            </div>
        )
    }

    sendBotCommand = (command: string) => {
        let msg: Message = {
            messageId: 0,
            sendUserId: store.get("username"),
            recvConvoId: this.state.convo.convoId,
            body: command,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            messageType: 1
        }

        this.props.sendMsg(msg, 'chat.short.command.convo');
    }

    onAttachmentButton = (button: Action) => (e: any) => {
        switch (button.action) {
            case 'link':
                window.open(button.value, '_blank');
                break;
            case 'command':
                this.sendBotCommand(button.value);
                break;
            case 'api':
                break;
        }
    }

    getAttachments(attach: Attachment[]) {
        if (attach[0].attachmentType === etype.Attachment.ACTION) {
            return (
                <React.Fragment>
                    <div className="wrapmsgr_msg_body">Wrapsody에서 사용되는 용어입니다. 상세 설명을 보려면 용어를 클릭하세요.</div>
                    <div className="wrapmsgr_msg_attachment" >
                        <div className="wrapmsgr_msg_title"></div>
                        {attach[0].payload.map((action: Action) => {
                            return (
                                <span className="ng-scope">
                                    <button type="button" data-attr-title={action.value} onClick={this.onAttachmentButton(action)} className="ng-scope" title={action.value} ><div className="ng-binding">{action.value}</div></button>
                                </span>)
                        })}

                    </div></React.Fragment>
            )
        }
        if (attach[0].attachmentType === etype.Attachment.IMAGE) {
            return (
                <React.Fragment>
                    <div className="wrapmsgr_msg_body ng-binding" ng-bind-html="message.body | linky:'_blank'"></div>
                    {/* {attach[0].title?attach[0].title : ''} */}

                    <div className="wrapmsgr_msg_attachment ng-scope" ng-repeat="attachment in message.attachments">
                        <div className="wrapmsgr_msg_title ng-binding">{attach[0].title}</div>
                        <img className="ng-scope fullscreen-view-element" src={"http://ecm.dev.fasoo.com:9400" + attach[0].uri}
                            onClick = {(e)=>{
                                e.preventDefault();
                                var win = new BrowserWindow()
                                win.loadURL("http://ecm.dev.fasoo.com:9400" + attach[0].uri)
                            }}
                        />
                    </div>
                </React.Fragment>
            )
        }
    }

    getUserMsg(msg: Message, index: number) {
        let time;
        let profile;
        let msgbubble;
        let profileClass;
        let senderName;
        if(this.state.convo && this.state.convo.convoType === etype.ConvoType.BOT) {
            profileClass = 'bot-profile';
            senderName = this.state.convo.name;
        }
        else {
            profileClass = 'no-photo cyan';
            senderName = msg.sendUserId;
        }

        if (!this.isContinuous(this.state.msgs[index - 1], msg)) {
            profile = <React.Fragment><div className="wrapmsgr_msg_user ng-isolate-scope" ng-attr-title="{{users[message.sendUserId].userName}}" wrapmsgr-user-profile="users[message.sendUserId]" user-profile-disabled="message.sendUserId.substr(0, 5) == '@BOT@'" title="administrator">
                <span className={"user-photo ng-binding ng-isolate-scope " + profileClass }>{getShortName(msg.sendUserId)}</span>
            </div>
                <div className="wrapmsgr_msg_userid ng-binding">{senderName}</div></React.Fragment>
        }
        if (!this.isContinuous(msg, this.state.msgs[index + 1])) {
            time = <div className="wrapmsgr_msg_time">
                {/* <span className="wrapmsgr_msg_unread ng-binding">1</span> */}
                <span className="ng-binding">{getTime(msg.createdAt)}</span>
            </div>;
        }

        if (msg.attachments && msg.attachments.length != 0) {
            msgbubble = this.getAttachments(msg.attachments);
        } else {
            msgbubble =
                <div className="wrapmsgr_msg_body ng-binding" ng-bind-html="message.body | linky:'_blank'">{msg.body}</div>;
        }
        return (
            <div className="wrapmsgr_msg ng-scope" ng-if="message.messageType < MESSAGE_TYPE_SYSTEM" ng-className="{'continuous': isContinuous(current.messages[$index-1], message)}">
                {profile}
                <div className="wrapmsgr_msg_bubble-wrap">
                    <div className="wrapmsgr_msg_bubble">
                        {msgbubble}
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
            msgbubble = this.getSystemMsg(msg.body, 'sys');
        else {
            msgbubble = this.getUserMsg(msg, index);
        }



        let prev = this.state.msgs[index - 1];
        let diff: number = 1;
        let readAt: boolean = false;
        let readUntil: any;
        if (prev) {
            diff = this.diffDays(prev.createdAt, msg.createdAt)
            readAt = this.isReadAt(prev.createdAt, msg.createdAt)
        }
        console.log('--------------------------' + readAt)
        if (readAt)
            readUntil = this.getSystemMsg('여기까지 읽었습니다', 'read');
        else
            readUntil = '';
        msgbody = <React.Fragment>{readUntil}{msgbubble}</React.Fragment>;

        if (diff >= 1) {
            let dateprops = this.getMsgDate(msg.createdAt);
            msgbody = <React.Fragment>{dateprops}{readUntil}{msgbubble}</React.Fragment>;
            // 더하기 메세지버블 + bubble
        }

        if (msg.sendUserId === store.get("username")) { // 나중에 자신의 sendUserId로 수정
            return (
                <li id={msg.messageId.toString()}  ng-repeat="message in current.messages" className="li-right ng-scope">
                    {msgbody}
                </li>
            )
        } else {
            return (
                <li id={msg.messageId.toString()} ng-repeat="message in current.messages" className="ng-scope">
                    {msgbody}
                </li>
            )
        }
    }


    messagesScrollToBottom = () => {
        const node: HTMLDivElement | null = this.scrollTarget.current; //get the element via ref

        if (node) { //current ref can be null, so we have to check
            node.scrollIntoView({ behavior: 'auto', inline: 'start' }); //scroll to the targeted element
        }
    }

    messagesScrollToLatestMessage = () => {
        if (this.scrollView.current.scrollTop === 0) {
            this.props.getMsgs(this.scrollView.current.scrollHeight);
            if (this.props.eom) {
                this.scrollView.current.scrollTop = 0;
            }   
            else 
                document.getElementById(this.props.topMsgId.toString()).scrollIntoView({ behavior: 'auto', inline: 'start' });
        }
    }

    constructor(props: MsgProps) {
        super(props);
        
    }

    componentDidMount() {
        console.log(this.props.isBookmark)
        const scrollView: HTMLDivElement | null = this.scrollView.current;
        if (scrollView) {
            scrollView.addEventListener('scroll', this.messagesScrollToLatestMessage);
        }

    }

    componentDidUpdate = () => {
        // 처음 채팅방에 접속했을 경우
        if (this.state.msgs.length <= 20) {
            if(this.props.isBookmark) 
                this.scrollView.current.scrollTop = 0;
            else
                this.messagesScrollToBottom();
        }
            

             // 안 읽은 메세지가 있는 경우
        if(this.state.unreadExists && document.getElementById('read'))
            document.getElementById('read').scrollIntoView({ behavior: 'auto', inline: 'start' });
    }

    render() {
        let unreadExists = (this.props.convo && this.props.convo.unread > 0)
        this.state = ({ msgs: this.props.msgs, convo: this.props.convo, unreadExists});

        return (
            <div className="wrapmsgr_content">
                <div className="wrapmsgr_messages" in-view-container="" ref={this.scrollView} id="scrollView">
                    <ul>
                        {this.state.msgs.map((msg: Message, index: number) =>
                            this.getMsgBody(msg, index)
                        )}
                    </ul>
                    <div className="wrapmsgr_latest_message ng-hide" ng-show="current.latestMessage" onClick={this.messagesScrollToBottom}>
                        <i className="icon_arrow_down"></i>
                    </div>
                    <div ref={this.scrollTarget} data-explanation="This is where we scroll to"></div>

                </div>
            </div>
        )
    }
}

export default MsgList;