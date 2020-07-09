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

export  function subscribe(client: Client, userId: string, uuid: string) {
    
    client.subscribe(`/exchange/user-${userId}`, (message: IMessage) => {
        if (message.body || message.isBinaryBody || message.command) {
            // console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
            // console.log(message);
            // console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbb");
            // console.log(message.body); 
            
            let obj = JSON.parse(message.body);
            // console.log("pppppppppppppppppppp");
            // console.log(obj.payload);
            // console.log("first first first");
            console.log(obj.payload.Conversations[0]);

            
        }       
        else {
            console.log("got empty message");
        }
    }, {
        "x-queue-name": `user-${userId}-${uuid}`
    });
    // return obj;
}

export function publish(client: Client, api: string, userId: string, uuid: string, payload: {}) {
    client.publish({
        destination: `/exchange/request/${api}`,
        body: JSON.stringify({
            senderId: userId, locale: "ko-KR", payload,
        }),
        headers: { "reply-to": `user-admin-${uuid}`, "content-type": "application/json", "correlation_id ": api }
    });
}

