import React, { Component, Fragment } from 'react';
import { Client, Message, StompSubscription, Stomp, StompConfig } from "@stomp/stompjs";

interface Props {
    client: Client,
    name: String,
}

interface State { user: [], message: [] }


class ServerTest extends React.PureComponent {

    constructor(props: {}, state: {}) {
        super(props, state);



        const client = new Client({
            brokerURL: "ws://192.168.100.30:9500/ws",
            connectHeaders: {
                login: "admin",
                passcode: "1111",
                host: "/wrapsody-oracle",
            },
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 500000,
            heartbeatIncoming: 100000,
            heartbeatOutgoing: 100000
        });


        // client.onReceive = function() {

        // }

        // var callback = function (message: Message) {
        //     // called when the client receives a STOMP message from the server
        //     if (message.body || message.isBinaryBody || message.command) {
        //         console.log("got message with body " + message.body)
        //     }
        //     console.log("got empty message");
        // };

        client.onConnect = function () {
            console.log("connected to Stomp");
            let callback = function (message: Message) {
                // called when the client receives a STOMP message from the server
                if (message.body || message.isBinaryBody || message.command) {
                    console.log("got message with body " + message.body)
                }
                console.log("got empty message");
            };

            client.watchForReceipt("test", function(frame) {
                console.log('Receipt: ', frame);
            })
            client.subscribe("/exchange/user-admin", callback, { "x-queue-name": "user-admin-98f7e404-f6b7-4513-84b4-31aa1647bc6d" });

            let body = { senderId: "admin", locale: "ko-KR", payload: {} };
            client.publish({ 
                destination: "/exchange/request/api.user.info", 
                body: JSON.stringify(body), 
                headers: { "reply-to": "/temp-queue/api.user.info", "content-type": "application/json" } 
            });
            //  "content_encoding": "UTF-8", "__TypeId__": "com.wrapsody.messaging.model.ApiRequest", "receipt":"test"
            //     var locale = navigator.language || navigator.userLanguage || 'ko-kr';

            // $scope.client.send(
            // 		"/exchange/request/" + api, 
            // 		{"reply-to": "/temp-queue/" + api, "content-type" : "application/json"}, 
            // 		JSON.stringify({senderId : $scope.user.id, locale: locale, payload : payload}));
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