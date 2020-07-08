import React, { Component, Fragment } from 'react';
import { Client, Message, StompSubscription, Stomp, StompConfig, IMessage } 
from "@stomp/stompjs";
import * as etype from '../../../libs/enum-type';
// import { MemberList, Header } from '@components/*';

interface Props {
    client: Client,
    name: String,
}

// interface MemberInfo{
//     longName: string;
//     shortName: string;
//     dept: string;
// }

// interface State { user: [], message: [] }

// class ServerTest extends React.PureComponent {
//     constructor(props: { }, state: {}) {
//         super(props, state);
//         const client = new Client({
//             brokerURL: "ws://192.168.100.30:9500/ws",
//             connectHeaders: {
//                 login: "admin",
//                 passcode: "1111",
//                 host:"/wrapsody-oracle",
//             },
//             debug: function (str) {
//                 console.log(str);
//             },
//             reconnectDelay: 500000,
//             heartbeatIncoming: 100000,
//             heartbeatOutgoing: 100000,
//             onUnhandledMessage: (messageReply) => {
//                 var reply = JSON.parse(messageReply.body);
//                 console.log(reply)
//             }
//         });
       
//         var callback = function(message: IMessage) {
//             // called when the client receives a STOMP message from the server
//             if (message.body||message.isBinaryBody||message.command) {
//               console.log("got message with body " + message.body.toString)
//             } 
//               console.log("got empty message");
//           };
//           var uuidv4 = function() {
//             return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//                 var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//                 return v.toString(16);
//             });
//         }

//         var onMessage = function(m:Message){
//             const changeObject = JSON.parse(m.body);
//         }
        
//         client.onConnect = function(){
//             console.log("connected to Stomp");
//             // client.subscribe("/exchange/user-admin",callback, {"x-queue-name": "user-admin-98f7e404-f6b7-4513-84b4-31aa1647bc6d"});
//             // client.subscribe("/exchange/user-admin",client.onUnhandledMessage, {"x-queue-name": "user-admin-98f7e404-f6b7-4513-84b4-31aa1647bc6d"});
//             // client.publish({ 
//             //     destination: "/exchange/request/api.user.info", 
//             //     body: JSON.stringify({ senderId: "admin", locale: "ko-KR", payload: {} }), 
//             //     headers: { "reply-to": "/temp-queue/api.user.info", "content-type": "application/json" } 
//             // });

//             // client.publish({
//             //     destination: "/exchange/request/api.user.info",
//             //     // body: JSON.stringify(body),
//             //     body: JSON.stringify({ senderId: "admin", locale: "ko-KR", payload: {} }), 
//             //     headers: { "reply-to": "user-admin-98f7e404-f6b7-4513-84b4-31aa1647bc6d", "content-type": "application/json", "correlation_id ": "api.user.info" }
//             // });

//             client.subscribe("/exchange/user-admin", client.onUnhandledMessage, { "x-queue-name": "user-admin-98f7e404-f6b7-4513-84b4-31aa1647bc6d" });
//             // client.subscribe("/temp-queue/api.conversation.list", callback);
//             let body = { senderId: "admin", locale: "ko-KR", payload: {} };
//             client.publish({
//                 destination: "/exchange/request/api.user.info",
//                 body: JSON.stringify(body),
//                 headers: { "reply-to": "user-admin-98f7e404-f6b7-4513-84b4-31aa1647bc6d", "content-type": "application/json", "correlation_id ": "api.user.info" }
//             });

//         }
//         client.activate();
//     }
//     render() {
//         // const members : MemberInfo = [
//         //     [longName = "aaaa", shortName = "a", dept = "랩소디"],
//         //     {longName = "bbbb", shortName = "b", dept = "랩소디"},
//         //     {longName = "cccc", shortName = "c", dept = "랩소디"},
//         // ]

//         return (
//             <div className = "wrapmsgr_container">
//                 <div className = "wrapmsgr_popup_contrainer active">
//                     <div className = "wrapmsgr_popup manage_doc_room">
//                         <Header docName ="" headerType = {etype.HeaderType.CHAT}/>
//                         <MemberList memberListType = {etype.MemberListType.CHAT}/>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
// export default ServerTest;



  
				