import React, { Component, Fragment } from 'react';
import stompjs from '@stomp/stompjs';

class BotChatRoom extends Component {
    componentDidMount() {
        const script = document.createElement("script");

        script.src = "https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.js";
        script.async = true;

        document.body.appendChild(script);
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