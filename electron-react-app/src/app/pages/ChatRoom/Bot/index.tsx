import React, { Component, Fragment } from 'react';
import { Client, IPublishParams, Message } from "@stomp/stompjs";
import Header from '../../../components/Header';
// import { HeaderType } from '../../../../libs/enum-type';

interface Props {
    client: Client,
    name: String,
}

interface State { user: [], message: [] }

class BotChatRoom extends React.PureComponent {
    client: Client = new Client;
    name: String = "";
    state: any = { user: [], message: [] };
    constructor(props: { client: Client, name: string; }, state: {}) {
        
        super(props, state);
        this.client = new Client({
            brokerURL: "ws://192.168.100.30:9500/ws",
            connectHeaders: {
                login: "admin",
                passcode: "1111",
                host: "/wrapsody-oracle",
            },
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 50000000,
            heartbeatIncoming: 10000,
            heartbeatOutgoing: 10000
        });

        console.log("connected to Stomp");

        var callback = function(message: Message) {
            // called when the client receives a STOMP message from the server
            if (message.body||message.isBinaryBody||message.command) {
              console.log("got message with body " + message.body)
            } 
              console.log("got empty message");
        };


        var uuidv4 = function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    
        // this.client.brokerURL = "ws://192.168.100.30:9500/ws";
        this.client.onConnect = () => {

            console.log("connected to Stomp");
            
            // this.client.subscribe("/exchange/user-admin", () => {
            //     this.setState({
            //         ...this.state,
            //         // user: JSON.parse(f.body)
            //     });
            //     console.log('asdf')
            // });          

            var binaryData = this.generateBinaryData();
            // this.client.publish({
            //     destination: '/exchange/request/api.user.info',
            //     binaryBody: binaryData
            // })

            var callback = function(message:Message) {
                // called when the client receives a STOMP message from the server
                  if (message.body) {
                    alert("got message with body " + message.body)
                  } else {
                    alert("got empty message");
                  }
                };
        
                var subscription = this.client.subscribe("/queue/test", callback);
        
                // Explicit subscription id
                var mySubId = 'my-subscription-id-001';
                this.client.subscribe("/exchange/user-admin", callback, { id: mySubId });

        };

        console.log(this.client)
        this.client.onStompError = () => {
            console.log('stomp error occured')
        }

        this.client.activate();

        console.log(this.client);
    }

    loginOnSubmit = () => {
        this.client.publish({
            destination: `/app/login/admin`,
            body: ""
        });
    }

    componentDidMount() {
        let client: String;
        let name: String;
        let state = { user: [], message: [] };
    }

    generateBinaryData(){
    return {
        senderID: "admin",
        locale: "ko-KR"
    }

    }

    render() {
        return (
            <div>
                <h3>채팅방리스트</h3>
                <Header docName="" headerType="" />
            </div>
        )
    }
}

export default BotChatRoom;