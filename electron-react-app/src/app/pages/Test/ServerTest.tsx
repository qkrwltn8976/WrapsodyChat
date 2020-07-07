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


        var stomp_on_receive = function(message:Message){
            var response = JSON.parse(message.body)
            console.log(response)
        }

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

        client.onConnect = function(){
            console.log("connected to Stomp");
            
            client.subscribe("/exchange/user-admin", callback, {"x-queue-name": "user-admin-98f7e404-f6b7-4513-84b4-31aa1647bc6d"});
            console.log(client.onUnhandledMessage.toString);

            client.publish({ 
                destination: "/exchange/request/api.user.info", 
                body: JSON.stringify({ senderId: "admin", locale: "ko-KR", payload: {} }), 
                headers: { "reply-to": "/temp-queue/api.user.info", "content-type": "application/json" } 
            });

            console.log(client.onUnhandledMessage);
        }

         client.onStompError = function(){

         }

         client.activate();
        
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}

export default ServerTest;