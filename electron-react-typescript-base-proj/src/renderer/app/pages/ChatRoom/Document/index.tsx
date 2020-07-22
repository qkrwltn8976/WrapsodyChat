import * as React from 'react';
import { MsgList, MsgInput, Header, MemberList, InfoHeader, SearchBar } from '../../../components';
import { HeaderType, MemberListType, RoomType, InfoHeaderType } from '../../../../libs/enum-type';
import { Message } from '../../../../models/Message';
import { Member } from '../../../../models/Member';
import { Conversation } from '../../../../models/Conversation';
import { Bot } from '@/renderer/models/Bot'
import { BotIntent } from '@/renderer/models/BotIntent';
import { subscribe, publishApi, publishChat, client } from '../../../../libs/stomp';
import { v4 } from "uuid"
import * as type from '@/renderer/libs/enum-type';
import IntentList from '@/renderer/app/components/IntentList';

const Store = require('electron-store')
const store = new Store()

interface RoomProps {
    match: any,
}

interface RoomState {
    uuid: string;
    msgs: Message[];
    members: Member[];
    convo: Conversation;
    bot?: Bot,
    botIntent?: BotIntent[],
}

class DocumentChatRoom extends React.Component<RoomProps, RoomState> {
    sendMsg(msg: Message) {
        console.log(msg);
        console.log('=============')
        publishChat(client, 'chat.short.convo', this.state.uuid, msg);
    }

    constructor(props: RoomProps, state: {}) {
        super(props, state);
        console.log(props)

        this.state = ({
            uuid: v4(),
            msgs: [],
            members: [],
            convo: {
                convoId: this.props.match.params.convo, // 대화방 ID
                convoType: 0, // 대화 유형
                roomType: 0, // 대화방 유형
                name: '', // 대화방 이름
                readAt: 0, // 마지막으로 읽은 시간
                unread: 0, // 읽지 않은 메시지 수
                memberCount: 0, // 대화에 참여중인 유저 수
                notificationType: 0, // 대화 알람 유형
                latestMessage: '', // 마지막 메시지 유형
                latestMessageAt: 0, // 마지막 메시지 시간
                createdAt: 0, // 대화 생성 일시
                updatedAt: 0, // 대화 수정 일시}
            }
        })

    }

    componentDidMount() {
        client.onConnect = () => {
            subscribe(client, store.get("username"), this.state.uuid, (obj: any) => {
                let payload = obj.payload;
                if (payload) {
                    console.log(payload)
                    if (payload.Messages) {
                        this.setState({
                            msgs: payload.Messages
                        });
                    }

                    if (payload.Members) {
                        this.setState({
                            members: payload.Members
                        })
                    }

                    if (payload.Conversation) {
                        this.setState({
                            convo: payload.Conversation
                        })
                    }

                    // console.log(payload.Bot)
                    // console.log(payload.BotIntentGroup)
                    if (payload.Bot) {
                        this.setState({
                            bot: payload.Bot
                        })
                    }

                    if (payload.BotIntentGroup) {
                        this.setState({
                            botIntent: payload.BotIntentGroup
                        })
                    }

                } else {
                    console.log(obj);
                    if (obj.body) { // 받은 메세지 처리
                        this.setState({
                            msgs: this.state.msgs.concat(obj)
                        });

                        if (obj.sendUserId !== 'admin') { // 추후 변경
                            console.log('읽어')
                            // publishApi(client, 'api.conversation.read', 'admin', this.state.uuid, { 'convoId': this.state.convoId });
                        }
                    }

                    // if(obj.readAt) { // 읽음 처리
                    //     console.log(obj.readAt)
                    // }
                }
            });
            console.log(this.props)
            // publishApi(this.state.client, 'api.user.info', 'admin', this.props.uuid, {});
            publishApi(client, 'api.conversation.view', store.get("username"), this.state.uuid, { 'convoId': this.state.convo.convoId });
        }
        // this.setState({client})

    }

    render() {
        let sendMsg = this.sendMsg;
        let aside, viewModeClass;
        if (this.state.convo.convoType === type.ConvoType.BOT) {
            viewModeClass = 'wrapmsgr_chatbot'
            aside = <div className="wrapmsgr_aside" ng-hide="viewMode == 'chat' || current.convo.convoType == 2">
                <IntentList bot={this.state.bot} botIntent={this.state.botIntent} convoId={this.state.convo.convoId} notificationType={this.state.convo.notificationType}/>
            </div>
        }
        else {
            viewModeClass = 'doc-chatroom'
            aside = <React.Fragment>
                <InfoHeader convoType={this.state.convo.convoType} docName={this.state.convo.name} memberCount={this.state.convo.memberCount} />
                <div className="wrapmsgr_aside" ng-hide="viewMode == 'chat' || current.convo.convoType == 2">
                    <SearchBar /><MemberList convoId={this.state.convo.convoId} memberListType={MemberListType.CHAT} members={this.state.members} />
                </div></React.Fragment>
        }

        return (
            <React.Fragment>
                <div id="wrapmsgr" className="ng-scope">
                    <div id="wrapmsgr_body" ng-controller="WrapMsgrController" className="wrapmsgr_container ng-scope" data-ws="ws://ecm.dev.fasoo.com:9500/ws" data-vhost="/wrapsody-oracle" data-fpns-enabled="true" data-weboffice-enabled="true">
                        <div className="wrapmsgr_chat wrapmsgr_state_normalize wrapmsgr_viewmode_full" ng-class="[chatroomState, viewModeClass, {false: 'disabled'}[loggedIn]]" ng-show="current.convo">
                            <Header convoId={this.state.convo.convoId} docName={this.state.convo.name} headerType={HeaderType.CHAT} />
                            <div className={"wrapmsgr_content  wrapmsgr_viewmode_full " + viewModeClass}>
                                {aside}
                                <div className="wrapmsgr_article wrapmsgr_viewmode_full" ng-class="viewModeClass" id="DocumentChat">
                                    <MsgList msgs={this.state.msgs} convo={this.state.convo} />
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

export default DocumentChatRoom;