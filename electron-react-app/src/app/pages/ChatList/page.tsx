import { Component, Fragment } from 'react';
import React, { useState } from 'react';
import { createClient, subscribe, publishApi } from 'src/libs/stomp';
import ReactDOM from 'react-dom';
import DocumentChatRoom from '../ChatRoom/Document';
import { Message } from 'src/models/Message';
import { v4 } from "uuid"
import { getConvoDate } from 'src/libs/timestamp-converter';

interface IState {
    msgs: any;
    members: any;
    convos: any;
    payload: any;
}

class ChatPage extends Component<{}, IState> {
    _isMounted: boolean = false;
    roomName: [] = [];
    roomDate: [] = [];
    roomRead: [] = [];
    client: any;
    payload: any;
    state: any = { payload: [] };
    convoId: string = "";
    uuid: string = "";


    getConvo = (convoId: string) => (event: any) => {
        // e.currentTarget.dataset.id 
        // alert(convoId);
        console.log(this.state.payload)
        this.convoId = convoId;



        ReactDOM.render(<DocumentChatRoom convoId={this.convoId} uuid={this.uuid} client={this.client} />, document.getElementById('root'));
        console.log(this.state.members);
    }


    stompConnection = () => {
        this.client = createClient("admin", "1111");
        let obj = {};
        this.uuid = v4();
        this.client.onConnect = () => {
            console.log("connected to Stomp");

            subscribe(this.client, 'admin', this.uuid, (payload: any) => {
                console.log(this._isMounted)
                if (payload) {
                    // if (this._isMounted) {
                    //     this.setState({ payload: payload })
                    // }
                    if (payload.Conversations) {
                        this.setState(
                            { convos: payload.Conversations }
                        )
                    }
                }
            });
            publishApi(this.client, 'api.conversation.list', 'admin', this.uuid, {});
        }
        this.client.activate();
    }

    constructor(props: {}, state: {}) {
        super(props, state);
    }

    componentDidMount() {
        this.stompConnection();
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        let convos = this.state.convos;
        if (convos != undefined) {
            return (
                <Fragment>
                    {convos.map((item: any) =>
                        <li onClick={this.getConvo(item.convoId)} className="ng-scope">
                            <document-icon className="ng-scope ng-isolate-scope">
                                <i className="icon_doc">            <span className="path1"></span>         <span className="path2"></span>         <span className="path3"></span>         <span className="path4"></span>         <span className="path5"></span>         <span className="path6"></span>         <span className="path7"></span>         <span className="path8"></span>         <span className="path9"></span>         <span className="path10"></span>            <span className="path11"></span>            </i>
                            </document-icon>
                            <div className="title_5" id="title_5">
                                <span className="chatroom-name ng-binding">{item.name}</span>
                                <span className="chatroom-user-cnt ng-binding">2</span>
                                <span className="chatroom-user-cnt ng-binding">{item.memberCount}</span>
                                <i></i>
                                <span className="chatroom-message-contents ng-binding">{item.latestMessage}</span>
                            </div>
                            <div className="wrapmsgr_right">
                                <span className="chatroom-date ng-binding">{getConvoDate(item.updatedAt)}</span>
                                <span className="wrapmsgr_unread_outer wrapmsgr_right ng-hide">
                                    <span className="wrapmsgr_unread wrapmsgr_right ng-binding"></span>
                                </span>
                            </div>
                        </li>)
                    }
                </Fragment>)
        }
        return (<Fragment></Fragment>)
    }
}
export default ChatPage;