import React, { Component, Fragment } from 'react';
import { Client, Message, StompSubscription, Stomp, StompConfig } from "@stomp/stompjs";

interface Props {
    client: Client,
    name: String,
}

interface State { user: [], message: [] }


class ServerTest extends React.PureComponent {
    
    constructor(props: { }, state: {}) {
        super(props, state);
        


        const client = new Client({
            brokerURL: "ws://192.168.100.30:9500/ws",
            connectHeaders: {
                login: "admin",
                passcode: "1111",
                host:"/wrapsody-oracle",
            },
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 500000,
            heartbeatIncoming: 100000,
            heartbeatOutgoing: 100000
        });



        

        var callback = function(message: Message) {
            // called when the client receives a STOMP message from the server
            if (message.body||message.isBinaryBody||message.command) {
              console.log("got message with body " + message.body)
            } 
              console.log("got empty message");
          };

        client.onConnect = function(){
            console.log("connected to Stomp");

            client.subscribe("/exchange/user-admin", callback, {"x-queue-name": "98f7e404-f6b7-4513-84b4-31aa1647bc6d"});
        }

         client.onStompError = function(){

         }

         client.activate();

         
        
    }

    componentDidMount(){
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
        },
            transformRequest: "",
            data: {userId: "admin"}
        }

        const url = "https://ecm.dev.fasoo.com/filesync/user/getLoginToken.do";

        fetch(url)
        .then(response => response.json())
        .then(data => this.setState({ postId: data.id }));
    }

    

    render() {
        return (
            <div>
            </div>
        )
    }
}

export default ServerTest;