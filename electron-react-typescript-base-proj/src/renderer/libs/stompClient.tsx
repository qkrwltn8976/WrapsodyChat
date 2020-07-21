import { Client, IMessage } from "@stomp/stompjs";
import { v4 } from "uuid";

export class StompClient {
    /**
     * Connection Variable Declaration
     */
    conn: Client;

    /**
     * Result Variable Declaration
     */
    result;

    /**
     *
     * Creates an instance of CommercialDAO.
     * To Initiate Connection and Make the connection utilized by @memberof CommercialDAO
     * @memberof CommercialDAO
     */
    constructor(login, passcode) {
        this.conn = new Client({
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

        this.conn.onConnect = () => {
            console.log("connected to Stomp");
            this.subscribe('admin', v4(), (obj: any) => {
                let payload = obj.payload;
                console.log(payload);
            });
        }
    
        this.conn.activate();
    }

    public subscribe(userId: string, uuid: string, callback: any) {
        let obj: any;
        this.conn.subscribe(`/exchange/user-${userId}`, (message: IMessage) => {
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
    }

    public getConnection () {
        return this.conn;
    }

    public publishApi(api: string, userId: string, uuid: string, payload: {}) {
        this.conn.publish({
            destination: `/exchange/request/${api}`,
            body: JSON.stringify({
                senderId: userId, locale: "ko-KR", payload,
            }),
            headers: { "reply-to": `user-admin-${uuid}`, "content-type": "application/json", "correlation_id ": api }
        });
    }

    public publishChat(api: string, uuid: string, payload: any) {
        this.conn.publish({
            destination: `/exchange/request/${api}.${uuid}`,
            body: JSON.stringify({
                sendUserId: payload.sendUserId, recvConvoId: payload.recvConvoId, body: payload.body, messageType: 0
            }),
            headers: { __TypeId__: `com.wrapsody.messaging.model.Message`,"content-type": "application/json"}
        });
    }
}

export default new StompClient('admin', 1111);