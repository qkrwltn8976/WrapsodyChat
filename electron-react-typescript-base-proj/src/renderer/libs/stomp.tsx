import { Stomp } from "@stomp/stompjs";
import { Client, IMessage } from "@stomp/stompjs";
import { v4 } from "uuid";
import * as stompData from "@/renderer/libs/stompData"
const Store = require('electron-store')
const store = new Store()


export function createClient(login: string, passcode: string) {
    console.log(login)
    console.log(passcode)
    let client = new Client({
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
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000,
        onUnhandledMessage: (messages: IMessage) => {
            console.log(messages)
        }
    });

    client.onConnect = () => {
        let response: any;
        let sub: any;
        let apis: any;
        let uuid: string = store.get("uuid");
        let userId: string = store.get("username");
        client.subscribe(`/exchange/user-${userId}`, (message: IMessage) => {
            if (message.headers['correlation-id']) {
                console.log(message)
                sub = message.headers['correlation-id'];
                apis = sub.split('.');
                if (message.body || message.isBinaryBody || message.command) {
                    response = JSON.parse(message.body);
                    switch (apis[1]) {
                        case 'user':
                            stompData.userHandler(apis, response);
                            break;
                        case 'conversation':
                            stompData.conversationHandler(apis, response);
                            break;
                        case 'room':
                            stompData.roomHandler(apis, response);
                            break;
                        case 'oneToOne':
                            stompData.oneToOneHandler(apis, response);
                            break;
                        case 'message':
                            stompData.messageHandler(apis, response);
                            break;
                        case 'bot':
                            stompData.botHandler(apis, response);
                            break;
                        case 'event':
                            stompData.eventHandler(apis, response);
                    }
                    // callback(response); 
                }
                else {
                    console.log("got empty message");
                }
                // sub = 
                // dest/exchange/chat.short.room.8954b0fc574d4423adc422b0017cfc3e

            } else {
                if (message.headers['destination']) {
                    sub = message.headers['destination'];
                    let routes = sub.split('/');
                    console.log(routes);
                    let api = routes[2];
                    // let api = routes[2].substring(sub.indexOf('/chat.') + 1);
                    console.log(api)

                    console.log(sub.indexOf('/') + 1)
                    apis = api.split('.');
                    if (message.body || message.isBinaryBody || message.command) {
                        response = JSON.parse(message.body);
                        console.log(response)
                        console.log(apis)
                        switch (apis[0]) {
                            case 'chat':
                                stompData.chatHandler(apis, response);
                            case 'event':
                                stompData.eventHandler(apis, response);
                        }
                    }
                }
            }
        }, {
            "x-queue-name": `user-${userId}-${uuid}`
        });

    }

    client.activate();
    return client;
}

export var client = createClient(store.get("username"), store.get("password"))

export function setClient() {
    client = createClient(store.get("username"), store.get("password"))
}

export function subscribe(client: Client, userId: string, uuid: string) {
    let response: any;
    let sub: any;
    let apis: any;
    client.subscribe(`/exchange/user-${userId}`, (message: IMessage) => {
        console.log(message)
        if (message.headers['correlation-id']) {
            sub = message.headers['correlation-id'];
            apis = sub.split('.');
            if (message.body || message.isBinaryBody || message.command) {
                response = JSON.parse(message.body);
                switch (apis[1]) {
                    case 'user':
                        stompData.userHandler(apis, response);
                        break;
                    case 'conversation':
                        stompData.conversationHandler(apis, response);
                        break;
                    case 'room':
                        stompData.roomHandler(apis, response);
                        break;
                    case 'oneToOne':
                        stompData.oneToOneHandler(apis, response);
                        break;
                    case 'message':
                        stompData.messageHandler(apis, response);
                        break;
                    case 'bot':
                        stompData.botHandler(apis, response);
                        break;
                }
                // callback(response); 
            }
            else {
                console.log("got empty message");
            }
            // sub = 
            // dest/exchange/chat.short.room.8954b0fc574d4423adc422b0017cfc3e

        } else {
            if (message.headers['destination']) {
                sub = message.headers['destination'];
                let routes = sub.split('/');
                console.log(routes);
                let api = routes[3];
                // let api = routes[2].substring(sub.indexOf('/chat.') + 1);
                console.log(api)

                console.log(sub.indexOf('/') + 1)
                apis = api.split('.');
                if (message.body || message.isBinaryBody || message.command) {
                    response = JSON.parse(message.body);
                    console.log(response)
                    console.log(apis)
                    switch (apis[0]) {
                        case 'chat':
                            stompData.chatHandler(apis, response);
                        case 'event':
                            stompData.eventHandler(apis, response);
                    }
                }
            }
        }



    }, {
        "x-queue-name": `user-${userId}-${uuid}`
    });
    // return obj;
}

export function subscribeCmd(client: Client, callback: any) {
    let obj: any;
    client.subscribe(`/exchange/chat`, (message: IMessage) => {
        if (message.body || message.isBinaryBody || message.command) {
            obj = JSON.parse(message.body);
            callback(obj);
        }
        else {
            console.log("got empty message");
        }

    }, {
        "x-queue-name": `module-command`
    });
}

export function publishApi(client: Client, api: string, userId: string, uuid: string, payload: {}) {
    client.publish({
        destination: `/exchange/request/${api}`,
        body: JSON.stringify({
            senderId: userId, locale: store.get("language"), payload,
        }),
        headers: { "user-id": userId, "reply-to": "user-" + userId + "-" + uuid, "content-type": "application/json", "correlation-id": api }
    });
    console.log(JSON.stringify({
        senderId: userId, locale: store.get("language"), payload,
    }))
}

export function publishChat(client: Client, api: string, userId: string, uuid: string, payload: any) {
    client.publish({
        destination: `/exchange/request/${api}.${uuid}`,
        body: JSON.stringify({
            sendUserId: payload.sendUserId, recvConvoId: payload.recvConvoId, body: payload.body, messageType: payload.messageType
        }),
        headers: { __TypeId__: `com.wrapsody.messaging.model.Message`, "content-type": "application/json", "user-id": userId }
    });
    console.log(JSON.stringify({
        sendUserId: payload.sendUserId, recvConvoId: payload.recvConvoId, body: payload.body, messageType: payload.messageType
    }))
}

// {"senderId":"admin","locale":"ko-KR","payload":{"convoId":"91fc0628c5fe4af4a14564f46f8ed17f"}}
// {"sendUserId":"admin","recvConvoId":"91fc0628c5fe4af4a14564f46f8ed17f","body":"asdf","messageType":0}