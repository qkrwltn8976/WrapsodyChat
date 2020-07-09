import React, { Component, Fragment } from 'react';
import { Client, Message, StompSubscription, Stomp, StompConfig } from "@stomp/stompjs";
import { createClient, subscribe, publish } from 'src/libs/stomp';
import {v4} from "uuid"
import { MsgList, MsgInput, Header, MemberList, InfoHeader, SearchBar } from '../../components';
import {HeaderType} from '../../../libs/enum-type';
import ReactDOM from 'react-dom';

interface Props {
    client: Client,
    name: String,
}

interface State { user: [], message: []}


class ServerTest extends React.PureComponent {
    constructor(props: {}, state: {}) {
        super(props, state);
        const client = createClient("admin", "1111");
        const queue = v4();

        client.onConnect = function () {
            console.log("connected to Stomp");
            subscribe(client, 'admin', queue, (payload: any) => { 
                console.log(payload)
                let list;
                let messages = <h1>a</h1>
                payload.Conversations.map((item:any) => {
                    console.log(item.name)
                    ReactDOM.render(<h6>{item.name}</h6>, document.getElementById('root'));
                });
                console.log(messages)
                ReactDOM.render(<div>{payload.Conversations.map((item:any) => <div>{item.name}</div>)}</div>, document.getElementById('root'));
            });
            // publish(client, 'api.user.info', 'admin', queue, {});
            publish(client, 'api.conversation.list', 'admin', queue, {});
        }
        client.activate();

    }

    componentDidMount() {
       
    }

    render() {
        return (
            <div>
                <h1></h1>
            </div>
        )
    }
}

export default ServerTest;

