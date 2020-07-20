import * as React from 'react';
import { MsgList, MsgInput, Header, MemberList, InfoHeader, SearchBar } from '../../../components';
import { HeaderType, MemberListType, RoomType, InfoHeaderType } from '../../../../libs/enum-type';
import { Message } from '../../../../models/Message';
import { Member } from '../../../../models/Member';
import { Conversation } from '../../../../models/Conversation';
import { subscribe, publishApi, publishChat, client } from '../../../../libs/stomp';
import { v4 } from "uuid"

interface RoomProps {
    match: any,
}

interface RoomState {
    uuid: string;
    msgs: Message[];
    members: Member[];
    convo: Conversation;
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
            }})
        
    }

    componentDidMount() {
        client.onConnect = () => {
            console.log('connectjaskdfjaslkdjfskljfklds')
            subscribe(client, 'admin', this.state.uuid, (obj: any) => {
                let payload = obj.payload;
                if (payload) {
                    console.log(payload)
                    if (payload.Messages) {
                        this.setState({
                            msgs: payload.Messages
                        });
    
                        // let unread:number = 0;
                        // payload.Messages.map((msg: Message) => {
                        //     if(msg.messageType < 240) {
                        //         if(msg.sendUserId !== 'admin')
                        //             unread++;
                        //     }
                        // })
                        // console.log('안읽은 메세지' + unread)
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
                        // if(this.state.convo.latestMessageAt != undefined && (this.state.convo.latestMessageAt > payload.Conversation.latestMessageAt ) || payload.Conversation.latestMessageAt == undefined) {
                        //     if (!payload.MessageId) {
                        //         console.log('메세지리스트 호출')
                        //         let afterAt = this.state.msgs.length > 0 ? this.state.msgs[this.state.msgs.length-1].createdAt : 0;
                        //         // publishApi(client, 'api.message.list', 'admin', this.props.uuid, { 'convoId': this.props.convoId, "direction": "forward", "afterAt": afterAt, "beforeAt": this.state.convo.latestMessageAt });
                        //     }
                        // } else {
                        //     console.log('설정')
    
                        // }
    
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
            publishApi(client, 'api.conversation.view', 'admin', this.state.uuid, { 'convoId': this.state.convo.convoId });
        }
        
    }

    render() {
        let sendMsg = this.sendMsg;

        return (
            <React.Fragment>
                <div id="wrapmsgr" className="ng-scope">
                    <div id="wrapmsgr_body" ng-controller="WrapMsgrController" className="wrapmsgr_container ng-scope" data-ws="ws://ecm.dev.fasoo.com:9500/ws" data-vhost="/wrapsody-oracle" data-fpns-enabled="true" data-weboffice-enabled="true">
                        <div className="wrapmsgr_chat wrapmsgr_state_normalize wrapmsgr_viewmode_full" ng-class="[chatroomState, viewModeClass, {false: 'disabled'}[loggedIn]]" ng-show="current.convo">
                            <Header convoId={this.state.convo.convoId} docName={this.state.convo.name} headerType={HeaderType.CHAT} />
                            <div className="wrapmsgr_content  wrapmsgr_viewmode_full doc-chatroom" ng-class="[{1: 'doc-chatroom', 2: 'wrapmsgr_chatbot'}[current.convo.convoType], viewModeClass]">
                                <InfoHeader docName={this.state.convo.name} memberCount={this.state.convo.memberCount} infoheaderType={InfoHeaderType.DOC} />
                                <div className="wrapmsgr_aside" ng-hide="viewMode == 'chat' || current.convo.convoType == 2">
                                    <SearchBar />
                                    <MemberList convoId={this.state.convo.convoId} memberListType={MemberListType.CHAT} members={this.state.members} />
                                </div>
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