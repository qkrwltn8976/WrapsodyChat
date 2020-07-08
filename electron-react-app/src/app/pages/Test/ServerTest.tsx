import React, { Component, Fragment } from 'react';
import { Client, Message, StompSubscription, Stomp, StompConfig } from "@stomp/stompjs";
import { createClient, subscribe, publish } from 'src/libs/stomp';
import { rejects } from 'assert';
import { resolve } from 'url';

interface Props {
    client: Client,
    name: String,
}

interface State { user: [], message: [] }


class ServerTest extends React.PureComponent {

    constructor(props: {}, state: {}) {
        super(props, state);

        const client = createClient("admin", "1111");

        client.onConnect = function () {
            console.log("connected to Stomp");

            subscribe(client, 'admin', '98f7e404-f6b7-4513-84b4-31aa1647bc6d', (payload: {}) => { console.log(payload) });

            publish(client, 'api.user.info', 'admin', '98f7e404-f6b7-4513-84b4-31aa1647bc6d', {});
            publish(client, 'api.conversation.list', 'admin', '98f7e404-f6b7-4513-84b4-31aa1647bc6d', {});

            var uuidv4 = function () {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }
        }

        client.activate();

    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
            </div>
        )
    }
}

export default ServerTest;
