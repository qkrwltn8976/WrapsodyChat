import {Component, Fragment} from 'react';
import React from 'react';
import { createClient, subscribe, publish } from 'src/libs/stomp';
import ReactDOM from 'react-dom';

class ChatPage extends Component{
    roomName:[] =[];
    roomDate: [] = [];
    roomRead: [] = [];

    client: any;
    payload: any;
    state: any = { payload: [] };


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
                    
                    let messages = <h1>a</h1>
                    payload.Conversations.map((item:any) => {
                        console.log(item.name)
                    });

                    //ReactDOM.render(<div>{payload.Conversations.map((item:any) => <h6>{item.name}</h6>)}</div>,document.getElementById('chatList'));

                    
                    ReactDOM.render(<Fragment>
                        {payload.Conversations.map((item:any) => <li className = "ng-scope">
            <document-icon></document-icon>
            <div className = "title_5" id = "title_5">
                    <span className = "chatroom-name ng-binding">{item.name}</span>
                    <span className = "chatroom-user-cnt ng-binding">{item.memberCount}</span>
                <i></i>
                    <span className = "chatroom-message-contents ng-binding">{item.latestMessage}</span>
            </div>
            <div className = "wrapmsgr_right">
                    <span className = "chatroom-date ng-binding">{item.latestMessageAt}</span>
                <span className = "wrapmsgr_unread_outer wrapmsgr_right ng-hide">
                    <span className = "wrapmsgr_unread wrapmsgr_right ng-binding"></span>
                </span>
            </div>
            
        </li>)
        }</Fragment>, document.getElementById('chatList'));
                    
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

    render(){
        return(
            <Fragment>
                
            </Fragment>
        )
    }

}

export default ChatPage;