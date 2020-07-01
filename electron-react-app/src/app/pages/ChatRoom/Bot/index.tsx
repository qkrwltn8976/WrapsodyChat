import React, { Component, Fragment } from 'react';
import { Client } from "@stomp/stompjs";
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
    state: any = {user: [], message: []};
    constructor(props: {client: any, name: string;}, state: {}) {
        super(props, state);
        this.client = new Client();
        this.client.brokerURL = "ws://192.168.100.30:9099/";
        this.client.onConnect = () => {
            console.log("성공")
            // this.client.subscribe("/topic/user", f => {
            //     this.setState({
            //         ...this.state,
            //         user: JSON.parse(f.body)
            //     });
            // });

            this.client.publish({
                destination: `/app/init`,
                body: ""
            });
        };
        
        this.client.activate();
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