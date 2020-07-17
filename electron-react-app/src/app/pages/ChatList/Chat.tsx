import { Component, Fragment } from 'react';
import React, { useState } from 'react';
import { client, subscribe, publishApi } from 'src/libs/stomp';
import ReactDOM from 'react-dom';
import DocumentChatRoom from '../ChatRoom/Document';
import { v4 } from "uuid"
import { getConvoDate } from 'src/libs/timestamp-converter';
import { getDocType } from 'src/libs/messengerLoader'
import { Conversation } from 'src/models/Conversation';
import { Client } from '@stomp/stompjs';
import { sortConvos } from 'src/libs/sort';

interface ChatListState {
    client: Client,
    convos: Conversation[],
    len: number,
    uuid: string;
}

interface ChatListProps {
    search: string
}

class Chat extends Component<ChatListProps, ChatListState> {
    _isMounted: boolean = false;
    roomName: [] = [];
    roomDate: [] = [];
    roomRead: [] = [];
    payload: any;
    search: string = "";
    chatBotImgPath = "http://ecm.dev.fasoo.com:9400/images/icon_bot_wrapsody.png"

    getConvo = (convo: Conversation) => (event: any) => {
        ReactDOM.render(<DocumentChatRoom convo={convo} />, document.getElementById('root'));
    }

    constructor(props: ChatListProps) {
        super(props);
        this.state = ({
            uuid: v4(),
            convos: [],
            len: 0,
            client: new Client
        })

    }

    componentDidMount() {
        this._isMounted = true;
        client.onConnect = () => {
            subscribe(client, 'admin', this.state.uuid, (obj: any) => {
                let payload = obj.payload;
                console.log(this._isMounted)
                if (payload) {
                    if (payload.Conversations) {
                        //채팅방 시간순 정렬
                        this.setState(
                            {
                                convos: sortConvos(payload.Conversations),
                                len: payload.Conversations.length
                            },
                        )

                    }
                } else {
                    if (obj.body) {
                        console.log(obj)
                        const index = this.state.convos.findIndex(convo => convo.convoId === obj.recvConvoId),
                            convos = [...this.state.convos] // important to create a copy, otherwise you'll modify state outside of setState call
                            convos[index].latestMessage = obj.body;
                            convos[index].unread += 1;
                            convos[index].latestMessageAt = obj.updatedAt;
                            this.setState({ convos:sortConvos(convos) });

                        // console.log(this.state.convos)
                    }
                }
            });
            publishApi(client, 'api.conversation.list', 'admin', this.state.uuid, {});
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    checkInclude = (name: string) => {
        if (name !== undefined) {
            if (name.toLowerCase().includes(this.props.search.toLowerCase()))
                return true;
        }
        return false;
    }


    render() {
        let convos = this.state.convos;
        if (convos) {
            return (
                <Fragment>
                    {convos.map((item: any) =>
                        <Fragment>
                            {this.props.search === null || item.name.toLowerCase().includes(this.props.search.toLowerCase()) ?
                                <li onClick={this.getConvo(item)} className="ng-scope">
                                    {/* /챗봇, 문서채팅방의 아이콘 표시/ */}
                                    {item.convoType === 2 ?
                                        <span className="user-photo" style={{ backgroundImage: 'url(http://ecm.dev.fasoo.com:9400/images/icon_bot_wrapsody.png)' }}></span> :
                                        <document-icon className="ng-scope ng-isolate-scope">
                                            <i className={getDocType(item.name)}>
                                                <span className="path1"></span>         <span className="path2"></span>         <span className="path3"></span>         <span className="path4"></span>         <span className="path5"></span>         <span className="path6"></span>         <span className="path7"></span>         <span className="path8"></span>         <span className="path9"></span>         <span className="path10"></span>            <span className="path11"></span>
                                            </i>
                                        </document-icon>
                                    }
                                    <div className="title_h5" id="title_5">
                                        <span className="chatroom-name">{item.name}</span>
                                        <span className="chatroom-user-cnt">{item.memberCount}</span>
                                        <i></i>
                                        <span className="chatroom-message-contents">{item.latestMessage}</span>
                                    </div>
                                    <div className="wrapmsgr_right">
                                        <span className="chatroom-date">{getConvoDate(item.latestMessageAt)}</span>
                                        {/* 조건부 unread 메세지 표시 */}
                                        {item.unread === 0 ? null :
                                            <span className="wrapmsgr_unread_outer">
                                                <span className="wrapmsgr_unread">{item.unread}</span>
                                            </span>
                                        }


                                    </div>
                                </li>
                                :
                                <Fragment></Fragment>
                            }

                        </Fragment>
                    )
                    }
                </Fragment>)
        }
        // return (<Fragment></Fragment>)
        // return{chats}
        return (<div>{this.props.search}</div>)
    }
}
export default Chat;