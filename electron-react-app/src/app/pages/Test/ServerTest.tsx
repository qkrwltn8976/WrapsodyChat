import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Client, Message, StompSubscription, Stomp, StompConfig, IMessage } from "@stomp/stompjs";
import { createClient, subscribe, publish } from 'src/libs/stomp';
import { promisify } from 'es6-promisify';
import {Promise} from 'es6-promise';
type ClientState = {
    client: Client;
    payload: any
}

class ServerTest extends React.PureComponent {
    client: any;
    payload: any;
    state: any = { payload: [] };

    stompConnection = () => {
        // return new Promise(function(resolve, reject) {
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
                    let list;
                    

                    let messages = <h1>a</h1>
                    payload.Conversations.map((item:any) => {
                        console.log(item.name)
                        // ReactDOM.render(<h6>{item.name}</h6>, document.getElementById('root'));
                    });
                    console.log(messages)
                    ReactDOM.render(<div>{payload.Conversations.map((item:any) => <h6>{item.name}</h6>)}</div>, document.getElementById('wrapmsgr'));
                    
                });
                // publish(this.client, 'api.user.info', 'admin-', '98f7e404-f6b7-4513-84b4-31aa1647bc6d', {});
                publish(this.client, 'api.conversation.list', 'admin', '98f7e404-f6b7-4513-84b4-31aa1647bc6d', {});

                
            }
    
    
            this.client.activate();
            
           
        // })
       

    }
    constructor(props: {}, state: {}) {
        super(props, state);
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        this.stompConnection();

    }

    componentDidMount() {
        // let test = Utils.getElementById(item.get('test'));
        return new Promise(function(resolve, reject) {
            
        })
        // console.log('##########################')
        // publish(this.client, 'api.user.info', 'admin-', '98f7e404-f6b7-4513-84b4-31aa1647bc6d', {});
        // publish(this.client, 'api.conversation.list', 'admin', '98f7e404-f6b7-4513-84b4-31aa1647bc6d', {});
    }

    render() {
        console.log(this.client.onUnhandledMessage())
        // const messages = this.state.payload.Conversations.map((item: any) => {
        //     return (<li>{item}</li>)
        // });
        if (this.client.connected) {
            return (
                <div>
                    안녕
                </div>
            )
        } else {
            return (
                <div>
                    
                </div>
            )
        }
        
        
    }
}

export default ServerTest;
        // console.log(this.client)
        // this.setState({client: client});
        // var callback = function (message: IMessage) {
        //     // called when the client receives a STOMP message from the server
        //     if (message.body || message.isBinaryBody || message.command) {
        //         var obj = JSON.parse(message.body)
        //         console.log(obj)
        //     }
        //     else
        //         console.log("got empty message");
        // };
        // let thisclient = this;
        // let callback = function(payload: {}) {
        //     thisclient.setState({

        //     })
        // }
            // subscribe(client, 'admin', '98f7e404-f6b7-4513-84b4-31aa1647bc6d'
            // , (payload: any) => {
            //     // console.log(payload.UserInfo);
            //     // obj = await payload;
            //     // this.setState({
            //     //     client: client,
            //     //     payload: payload
            //     // })
            //     // obj=await payload;
            //     console.log(payload);

            // });
            // console.log(obj);
            // client.subscribe('/exchange/user-admin', (message: IMessage) => {
            //     this.state ={
            //         ...this.state,
            //         payload: JSON.parse(message.body)

            //     };
            //     // return(<div>"callback"</div>)
            //     console.log('jhhhihihi')
            //     console.log(JSON.parse(message.body))
            // }, {"x-queue-name": "user-admin-98f7e404-f6b7-4513-84b4-31aa1647bc6d"});
