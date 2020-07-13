import { Stomp } from "@stomp/stompjs";
import { Client, IMessage } from "@stomp/stompjs";
import { render } from "@testing-library/react";
import React, { Component, Fragment } from 'react';

export function createClient(login: string, passcode: string) {
    return new Client({
        brokerURL: "ws://192.168.100.30:9500/ws",
        connectHeaders: {
            login,
            passcode,
            host: "/wrapsody-oracle",
        },
        debug: function (str) {
            console.log(str);
        },
        reconnectDelay: 500000,
        heartbeatIncoming: 100000,
        heartbeatOutgoing: 100000,
        onUnhandledMessage: (messages: IMessage) => {
            console.log(messages)
        }
    })
}

export function subscribe(client: Client, userId: string, uuid: string, callback: any) {
    let obj : any;
    client.subscribe(`/exchange/user-${userId}`, (message: IMessage) => {
        if (message.body || message.isBinaryBody || message.command) {
            obj = JSON.parse(message.body);
            console.log(obj)
            let payload = obj.payload;

            // payload.Conversations.map((item: any) => {
            //     console.log(item.name)
            //     // ReactDOM.render(<h6>{item.name}</h6>, document.getElementById('root'));
            // });
            // // console.log(messages)
            // ReactDOM.render(<div>{payload.Conversations.map((item: any) => <h6>{item.name}</h6>)}</div>, document.getElementById('wrapmsgr'));
            // if(payload.Messages) {
            //     ReactDOM.render(<div>{payload.Conversations.map((msg: Msg) => <h6>{item.name}</h6>)}</div>, document.getElementById('messageList'));
            // };
            // console.log(messages)
            callback(payload);
            
        }
        else {
            console.log("got empty message");
            // return message.body;
        }

    }, {
        "x-queue-name": `user-${userId}-${uuid}`
    });
    // return obj;
}

export function publishApi(client: Client, api: string, userId: string, uuid: string, payload: {}) {
    client.publish({
        destination: `/exchange/request/${api}`,
        body: JSON.stringify({
            senderId: userId, locale: "ko-KR", payload,
        }),
        headers: { "reply-to": `user-admin-${uuid}`, "content-type": "application/json", "correlation_id ": api }
    });
}

export function publishChat(client: Client, api: string, uuid: string, payload: any) {
    client.publish({
        destination: `/exchange/request/${api}.${uuid}`,
        body: JSON.stringify({
            sendUserId: payload.sendUserId, recvConvoId: payload.recvConvoId, body: payload.body, messageType: 0
        }),
        headers: { __TypeId__: `com.wrapsody.messaging.model.Message`,"content-type": "application/json"}
    });
}

// {"senderId":"admin","locale":"ko-KR","payload":{"convoId":"91fc0628c5fe4af4a14564f46f8ed17f"}}
// {"sendUserId":"admin","recvConvoId":"91fc0628c5fe4af4a14564f46f8ed17f","body":"asdf","messageType":0}
