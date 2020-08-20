import * as React from 'react';
import { MsgList, MsgInput, Header, MemberList, InfoHeader, SearchBar } from '../../components';
import { HeaderType, MemberListType, RoomType, InfoHeaderType } from '../../../libs/enum-type';
import { Message } from '../../../models/Message';
import { Member } from '../../../models/Member';
import { Conversation } from '../../../models/Conversation';
import { Bot } from '@/renderer/models/Bot'
import { BotIntent } from '@/renderer/models/BotIntent';
import { subscribe, publishApi, publishChat, client } from '../../../libs/stomp';
import { v4 } from "uuid"
import * as type from '@/renderer/libs/enum-type';
import IntentList from '@/renderer/app/components/IntentList';
import { getDate } from '@/renderer/libs/timestamp-converter';
import store from '../../../../store';

const remote = require('electron').remote

const Store = require('electron-store')
const electronStore = new Store()

interface RoomProps {
    match: any,
}

interface RoomState {
    uuid: string;
    msgs: Message[];
    members: Member[];
    convo: Conversation;
    bot?: Bot;
    botIntent?: BotIntent[];
    search: string;
    isOpened?: boolean;
    eom: boolean; // end of message
    prevScrollHeight: number;
    topMsgId: number;
    bookmarkStart?: number;
}

class ChatRoom extends React.Component<RoomProps, RoomState> {
    getMsgs = (payload: any) => {
        publishApi(client, 'api.message.list', electronStore.get("username"), this.state.uuid, {
            convoId: this.state.convo.convoId,
            beforeAt: this.state.msgs[0].createdAt,
            direction: "backward"
        });
    }

    sendMsg = (msg: Message, api: string) => {
        publishChat(client, api, electronStore.get("username"), this.state.uuid, msg);
    }

    setSearch = (search: string) => {
        this.setState({ search: search })
    }

    setNotification = (type: number) => {
        this.setState(state => {
            state.convo.notificationType = type === 0 ? 1 : 0
            return {}
        })
        publishApi(client, "api.conversation.notification", electronStore.get("username"), this.state.uuid, { "convoId": this.state.convo.convoId, "type": type === 0 ? 1 : 0 })
        return false;
    }

    stompConnection = () => {
        client.onConnect = () => {
            subscribe(client, electronStore.get("username"), this.state.uuid);
            publishApi(client, 'api.conversation.view', electronStore.get("username"), this.state.uuid, { 'convoId': this.state.convo.convoId });
        }
    }

    constructor(props: RoomProps, state: {}) {
        super(props, state);
        console.log('@@@@@@@@@@@@@')
        console.log(props)

        this.state = ({
            uuid: v4(),
            msgs: [],
            members: [],
            convo: {
                convoId: this.props.match.params.convo,
                convoType: 0,
                roomType: 0,
                name: '',
                readAt: this.props.match.params.readAt,
                unread: this.props.match.params.unread,
                memberCount: 0,
                notificationType: 0,
                latestMessage: '',
                latestMessageAt: 0,
                createdAt: 0,
                updatedAt: 0,
            },
            search: "",
            eom: false,
            prevScrollHeight: 0,
            topMsgId: 0,
        })
        this.updateMembers = this.updateMembers.bind(this);
    }

    componentDidMount() {
        this.stompConnection();
        store.subscribe(function (this: any) {
            this.setState({
                members: store.getState().members,
                msgs: store.getState().msgs,
                convo: store.getState().convo
            });
        }.bind(this));
        console.log(store.getState())
    }
    updateMembers = () => {
        publishApi(client, 'api.conversation.view', electronStore.get("username"), this.state.uuid, { 'convoId': this.state.convo.convoId });
    }

    render() {
        let sendMsg = this.sendMsg;
        let aside, viewModeClass;

        if (this.state.convo && this.state.convo.convoType === type.ConvoType.BOT) {
            viewModeClass = 'wrapmsgr_chatbot'
            aside = <div className="wrapmsgr_aside" ng-hide="viewMode == 'chat' || current.convo.convoType == 2">
                <IntentList bot={this.state.bot} botIntent={this.state.botIntent} convoId={this.state.convo.convoId} notificationType={this.state.convo.notificationType} setNotification={this.setNotification} sendMsg={this.sendMsg} />
            </div>
        }
        else {
            viewModeClass = 'doc-chatroom'
            aside = <React.Fragment>
                <InfoHeader convoType={this.state.convo.convoType} convoId={this.state.convo.convoId} docName={this.state.convo.name} memberCount={this.state.convo.memberCount} notificationType={this.state.convo.notificationType} setNotification={this.setNotification} deadline={this.state.convo.deadline} />
                <div className="wrapmsgr_aside" ng-hide="viewMode == 'chat' || current.convo.convoType == 2">
                    <SearchBar search={this.state.search} setSearch={this.setSearch} />
                    <MemberList search={this.state.search} convoId={this.state.convo.convoId} memberListType={MemberListType.CHAT} />
                </div></React.Fragment>
        }

        return (
            <React.Fragment>
                <div id="wrapmsgr" className="ng-scope">
                    <div id="wrapmsgr_body" ng-controller="WrapMsgrController" className="wrapmsgr_container ng-scope" data-ws="ws://ecm.dev.fasoo.com:9500/ws" data-vhost="/wrapsody-oracle" data-fpns-enabled="true" data-weboffice-enabled="true">
                        <div className="wrapmsgr_chat wrapmsgr_state_normalize wrapmsgr_viewmode_full" ng-class="[chatroomState, viewModeClass, {false: 'disabled'}[loggedIn]]" ng-show="current.convo">
                            <Header convoId={this.state.convo.convoId} docName={this.state.convo.name} headerType={HeaderType.CHAT} bookmark={this.state.convo.bookmark} />
                            <div className={"wrapmsgr_content  wrapmsgr_viewmode_full " + viewModeClass}>
                                {aside}
                                <div className="wrapmsgr_article wrapmsgr_viewmode_full" ng-class="viewModeClass" id="DocumentChat">
                                    <MsgList msgs={this.state.msgs} convo={this.state.convo} sendMsg={this.sendMsg} getMsgs={this.getMsgs} eom={this.state.eom} topMsgId={this.state.topMsgId} isBookmark={false} />
                                    <MsgInput convoId={this.state.convo.convoId} uuid={this.state.uuid} sendMsg={sendMsg.bind(this)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ChatRoom;