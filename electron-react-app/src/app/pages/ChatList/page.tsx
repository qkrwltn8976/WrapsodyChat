import { Component, Fragment } from 'react';
import React from 'react';
import { createClient, subscribe, publish } from 'src/libs/stomp';
import ReactDOM from 'react-dom';
import DocumentChatRoom from '../ChatRoom/Document';
import { Msg, MsgBody } from '../../components/MsgList'

class ChatPage extends Component {
    roomName: [] = [];
    roomDate: [] = [];
    roomRead: [] = [];

    client: any;
    payload: any;
    state: any = { payload: [] };
    convoId: string = "";


    getConvo = (convoId: string) => (event: any) => {
        // e.currentTarget.dataset.id 
        // alert(convoId);
        this.convoId = convoId;
        ReactDOM.render(<DocumentChatRoom convoId={this.convoId} />, document.getElementById('root'));
        console.log(convoId);
    }

    stompConnection = () => {
        this.client = createClient("admin", "1111");

        let obj = {};

        this.client.onConnect = () => {
            console.log("connected to Stomp");

            subscribe(this.client, 'admin', '98f7e404-f6b7-4513-84b4-31aa1647bc6d', (payload: any) => {
                this.state = ({
                    ...this.state,
                    payload: payload
                })
                console.log(payload)
                if (payload) {
                    if (payload.Conversations) {
                        ReactDOM.render(<Fragment>
                            {payload.Conversations.map((item: any) => <li onClick={this.getConvo(item.convoId)} className="ng-scope" data-id={item.convoId}>
                                <document-icon></document-icon>
                                <div className="title_5" id="title_5">
                                    <span className="chatroom-name ng-binding">{item.name}</span>
                                    <span className="chatroom-user-cnt ng-binding">{item.memberCount}</span>
                                    <i></i>
                                    <span className="chatroom-message-contents ng-binding">{item.latestMessage}</span>
                                </div>
                                <div className="wrapmsgr_right">
                                    <span className="chatroom-date ng-binding">{item.latestMessageAt}</span>
                                    <span className="wrapmsgr_unread_outer wrapmsgr_right ng-hide">
                                        <span className="wrapmsgr_unread wrapmsgr_right ng-binding"></span>
                                    </span>
                                </div>

                            </li>)
                            }</Fragment>, document.getElementById('chatList'));
                    }
                    if (payload.Messages) {
                        ReactDOM.render(
                            <div>{payload.Messages.map((msg: Msg) => <MsgBody msg={msg} />)}</div>,
                            document.getElementById('messageList'));
                    }
                }
            });
            publish(this.client, 'api.conversation.list', 'admin', '98f7e404-f6b7-4513-84b4-31aa1647bc6d', {});


        }


        this.client.activate();


        // })


    }
    constructor(props: {}, state: {}) {
        super(props, state);
        this.stompConnection();

    }

    render() {
        return (
            <Fragment>
                {/* {this.renderConvo} */}
                {/* <DocumentChatRoom/> */}
            </Fragment>

        )
    }

}

export default ChatPage;