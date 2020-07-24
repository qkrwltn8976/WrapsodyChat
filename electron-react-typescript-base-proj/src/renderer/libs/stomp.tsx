import { Stomp } from "@stomp/stompjs";
import { Client, IMessage } from "@stomp/stompjs";
import { v4 } from "uuid";
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
        console.log("connected to Stomp");
        subscribe(client, login, v4(), (obj: any) => {
            let payload = obj.payload;
            console.log(payload);
        });
    }

    client.activate();
    return client;
}

export var client = createClient(store.get("username"), store.get("password"))

export function setClient(){
    client = createClient(store.get("username"), store.get("password"))
}

export function subscribe(client: Client, userId: string, uuid: string, callback: any) {
    let obj : any;
    client.subscribe(`/exchange/user-${userId}`, (message: IMessage) => {
        if (message.body || message.isBinaryBody || message.command) {
            obj = JSON.parse(message.body);
            callback(obj); 
        }
        else {
            console.log("got empty message");
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
            senderId: userId, locale: store.get("language"), payload,
        }),
        headers: { "reply-to": "user-"+userId+"-"+uuid, "content-type": "application/json", "correlation_id ": api }
    });
    console.log(JSON.stringify({
        senderId: userId, locale: store.get("language"), payload,
    }))
}

export function publishChat(client: Client, api: string, uuid: string, payload: any) {
    client.publish({
        destination: `/exchange/request/${api}.${uuid}`,
        body: JSON.stringify({
            sendUserId: payload.sendUserId, recvConvoId: payload.recvConvoId, body: payload.body, messageType: payload.messageType
        }),
        headers: { __TypeId__: `com.wrapsody.messaging.model.Message`,"content-type": "application/json"}
    });
    console.log(JSON.stringify({
        sendUserId: payload.sendUserId, recvConvoId: payload.recvConvoId, body: payload.body, messageType: payload.messageType
    }))
}

// {"senderId":"admin","locale":"ko-KR","payload":{"convoId":"91fc0628c5fe4af4a14564f46f8ed17f"}}
// {"sendUserId":"admin","recvConvoId":"91fc0628c5fe4af4a14564f46f8ed17f","body":"asdf","messageType":0}