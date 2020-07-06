import React, { Component, Fragment } from 'react';
import { Client, IPublishParams, Message } from "@stomp/stompjs";
import Header from 'src/app/components/Header';
import * as etype from 'src/libs/enum-type';

interface Props {
    client: Client,
    name: String,
}

interface State { user: [], message: [] }

class ServerTest extends React.PureComponent {
    client: Client = new Client;
    name: String = "";
    state: any = { user: [], message: [] };
    constructor(props: { client: Client, name: string; }, state: {}) {
        super(props, state);
        this.client = new Client({
            brokerURL: "ws://192.168.100.30:9400/ws",
            connectHeaders: {
                login: "admin",
                passcode: "1111",
                host:"/wrapsody-oracle",
            },
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 50000000,
            heartbeatIncoming: 10000,
            heartbeatOutgoing: 10000
        });
    
        // this.client.brokerURL = "ws://192.168.100.30:9500/ws";
        this.client.onConnect = () => {
            
            console.log("connected to Stomp");
            
            var message = this.client.subscribe("/exchange/user-admin",f => {
                this.setState({
                    ...this.state,
                    sender: "admin"
                })
            });     
            
            this.client.publish({
                destination: '/exchange/request', 
            });

        };

        this.client.activate();


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

    render() {
        return (
            <div>
                <h3>채팅방리스트</h3>
                <Header docName = "" headerType = {etype.HeaderType.ETC}/>
            </div>
        )
    }
}

export default ServerTest;