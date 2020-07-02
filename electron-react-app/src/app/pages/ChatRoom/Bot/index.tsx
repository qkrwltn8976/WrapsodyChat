import React, { Component, Fragment } from 'react';
import { Client, IPublishParams } from "@stomp/stompjs";
interface Props {
    client: Client,
    name: String,
}

interface State { user: [], message: [] }
// const StompElement = (
//     <script>
//         var ws = new WebSocket('ws://127.0.0.1:15674/ws');
//         var client = Stomp.over(ws);
//         var on_connect = function() {
//             console.log(`connected`)
//         };
//         var on_error =  function() {
//             console.log(`error`)
//         };
//         client.connect('guest', 'guest', on_connect, on_error, '/');
//     </script>
// )

class BotChatRoom extends React.PureComponent {
    client: any = "";
    name: String = "";
    state: any = { user: [], message: [] };
    constructor(props: { client: Client, name: string; }, state: {}) {
        super(props, state);
        this.client = new Client({
            brokerURL: "ws://192.168.100.30:9500/ws",
            connectHeaders: {
                login: "admin",
                passcode: "1111",
            },
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000
        });
    
        this.client.brokerURL = "ws://192.168.100.30:9500/ws";
        this.client.onConnect = () => {
            
            console.log("connected to Stomp");
            this.client.subscribe("/exchange/user", () => {
                this.setState({
                    ...this.state,
                    // user: JSON.parse(f.body)
                });
                console.log('asdf')
            });


            // this.client.publish({
            //     destination: `/app/init`,
            //     body: ""
            // });
        };
        // this.client.publish({
        //     destination: `/app/init`,
        //     body: ""
        // });
        // this.client.publish({destination: '/topic/general', body: 'Hello world'});
        console.log(this.client)
        this.client.onStompError = () => {
            console.log('stomp error occured')
        }
        // this.client.onConnect();
        // 

        this.client.activate();

        this.client.onopen = () => {
            console.log('WebSocket Client Connected');
        }

        let parmasd : IPublishParams = {
            destination: '/app/login/admin',
            body: ""
        };

        this.client.publish = () => parmasd;
        console.log(this.client)
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
        // const script = document.createElement("script");
        // const stomp = document.createElement("script");
        // // stomp.id = "stomp-script"
        // script.src = "https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.js";

        // var ws = new WebSocket('ws://127.0.0.1:15674/ws');
        // var client = Stomp.client("ws://localhost:61614/stomp");
        // // script.async = true;
        // // stomp.innerHTML =
        // //     "var ws = new WebSocket('ws://127.0.0.1:15674/ws');var client = Stomp.over(function(){return new SockJS(ws);});var on_connect = function() {console.log(`connected`)};var on_error =  function() {console.log(`error`)};client.connect('guest', 'guest', on_connect, on_error, '/');";
        // document.body.appendChild(script);

        // document.body.appendChild(stomp);
        // this.client.onConnect();
        // this.loginOnSubmit()
        // console.log(this.client)
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