import React, { Component, Fragment } from 'react';
import { Client, Message, StompSubscription, Stomp, StompConfig } from "@stomp/stompjs";
import {createClient, subscribe, publish} from 'src/libs/stomp';
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

            subscribe(client, 'admin', '98f7e404-f6b7-4513-84b4-31aa1647bc6d', (payload:{})=>{console.log(payload)});

            publish(client, 'api.user.info', 'admin', '98f7e404-f6b7-4513-84b4-31aa1647bc6d', {});
            publish(client, 'api.conversation.list', 'admin', '98f7e404-f6b7-4513-84b4-31aa1647bc6d', {});

        }

        client.onStompError = function () {
        }

        client.activate();



    }

    componentDidMount() {
        // const requestOptions = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         'Access-Control-Allow-Credentials': 'true',
        //         'Access-Control-Expose-Headers': '*'
        //     },
        //     transformRequest: "",
        //     data: { userId: "admin" }
        // }

        // //host= http://192.168.100.30:9099/filesync
        // //http://ecm.dev.fasoo.com:9099/filesync
        // const proxyurl = "https://cors-anywhere.herokuapp.com/";
        // const url = "http://ecm.dev.fasoo.com:9099/filesync/notice/getList.do";

        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         'Access-Control-Allow-Credentials': 'true',
        //         'Access-Control-Expose-Headers': '*',
        //         "Access-Control-Allow-Origin": "*",
        //         "credentials": 'include',
        //         "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        //         "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        //     },
        //     // transformRequest: "",
        //     // data: { userId: "admin" }
        // })
        //     .then(function (response) {
        //         console.log(response);
        //     }).catch(function (error) {
        //         console.log('Request failed', error)
        //     });
    }



    render() {
        return (
            <div>
            </div>
        )
    }
}

export default ServerTest;