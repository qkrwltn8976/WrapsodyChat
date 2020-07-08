import { Client, IMessage } from "@stomp/stompjs";

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
    })
}

export function subscribe(client: Client, userId: string, uuid: string, callback: any) {
    let obj;
    client.subscribe(`/exchange/user-${userId}`, (message:IMessage) =>  {
        if (message.body || message.isBinaryBody || message.command) {        
            obj = JSON.parse(message.body);
            // callbackify(obj);
            // console.log(obj)
            callback(obj.payload)
        }
        else {
            obj = {}
            console.log("got empty message");
        }
        
            
        return obj;
    }, {
        "x-queue-name": `user-${userId}-${uuid}`
    });

    console.log(obj);
    return obj;
}

export function publish(client: Client, api: string, userId: string, uuid: string, payload: {}) {
    client.publish({
        destination: `/exchange/request/${api}`,
        body: JSON.stringify({
            senderId: userId, locale: "ko-KR", payload,
        }),
        headers: { "reply-to": `user-admin-${uuid}`, "content-type": "application/json", "correlation_id ": api }
    })
}

