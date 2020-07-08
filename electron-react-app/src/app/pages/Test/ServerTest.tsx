import React, { Component, Fragment } from 'react';
import { Client, Message, StompSubscription, Stomp, StompConfig } from "@stomp/stompjs";
import { createClient, subscribe, publish } from 'src/libs/stomp';
import {v4} from "uuid"

interface Props {
    client: Client,
    name: String,
}

interface State { user: [], message: [] }


class ServerTest extends React.PureComponent {

    constructor(props: {}, state: {}) {
        super(props, state);

        const client = createClient("admin", "1111");
        const queue = v4();

        client.onConnect = function () {
            console.log("connected to Stomp");

            subscribe(client, 'admin', queue, (payload: {}) => { console.log(payload) });

            publish(client, 'api.user.info', 'admin', queue, {});
            publish(client, 'api.conversation.list', 'admin', queue, {});

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
