import React, { Component, Fragment } from 'react';
import { Client, IPublishParams, Message } from "@stomp/stompjs";
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
            brokerURL: "ws://192.168.100.30:9099/ws",
            connectHeaders: {
                login: "admin",
                passcode: "1111",
<<<<<<< HEAD
                host:"/wrapsody-oracle",
=======
                // password: "1111",
                host: "/wrapsody-oracle"
>>>>>>> b15aa3304c8a9b3b993144075a8f941a231a0e7a
            },
            debug: function (str) {
                console.log(str);
            },
<<<<<<< HEAD
            reconnectDelay: 50000000,
=======
            reconnectDelay: 5000,
>>>>>>> b15aa3304c8a9b3b993144075a8f941a231a0e7a
            heartbeatIncoming: 10000,
            heartbeatOutgoing: 10000
        });
    
        // this.client.brokerURL = "ws://192.168.100.30:9500/ws";
        this.client.onConnect = () => {
            
            console.log("connected to Stomp");
            
<<<<<<< HEAD
            this.client.subscribe("/exchange/user-admin", () => {
=======

            this.client.subscribe("/exchange/user", () => {
>>>>>>> b15aa3304c8a9b3b993144075a8f941a231a0e7a
                this.setState({
                    ...this.state,
                    // user: JSON.parse(f.body)
                });
                console.log('asdf')
            });

            this.client.publish({
                destination: '/exchange/request/api.user.info', 
                body: 'Hello world',
            });

        };

        console.log(this.client)
        this.client.onStompError = () => {
            console.log('stomp error occured')
        }

        this.client.activate();

<<<<<<< HEAD
        console.log(this.client);
=======
        this.client.onopen = () => {
            console.log('WebSocket Client Connected');
        }

        let params : IPublishParams = {
            destination: '/app/login/admin',
            body: ""
        };

        this.client.publish = () => params;

        // this.client.subscribe = () => {
        //     destination: '/exchage/user-admin'
        // }
        console.log(this.client)
>>>>>>> b15aa3304c8a9b3b993144075a8f941a231a0e7a
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

    render() {
        return (
            <div>
                <h3>채팅방리스트</h3>
            </div>
        )
    }
}

export default BotChatRoom;