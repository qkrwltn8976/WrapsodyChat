import { Client, IMessage } from "@stomp/stompjs";
import { render } from "@testing-library/react";
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

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
        onUnhandledMessage: (messages: IMessage) => {
            console.log(messages)
        }
    })
}

export  function subscribe(client: Client, userId: string, uuid: string) {
    
    client.subscribe(`/exchange/user-${userId}`, (message: IMessage) => {
        if (message.body || message.isBinaryBody || message.command) {
            console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
            console.log(message);
            console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbb");
            console.log(message.body); 
            
            let obj = JSON.parse(message.body);

            console.log("pppppppppppppppppppp");
            console.log(obj.payload);
            console.log("first first first");
            // console.log(obj.payload.Conversations[0]);

            let docName;
            let docIconName;
            docName = obj.payload.Converstaions[0].Name;
            docIconName = "icon_"+ docName.substr(docName.lastIndexOf('.')+1, 3).toLowerCase() + ".svg";
            
            
            ReactDOM.render(
                    <div className="chatroom-name ng-binding" title="Sample Text .DotInMiddle.txt">{obj.payload.Conversations[0].Name}</div>
                ,document.getElementById('forDocTitle'));
            // 문서이름
        
            // if(!obj) {
            //     if(!obj.payload.Conversations){
            //         ReactDOM.render(
            //             <span className="chatroom-user-cnt ng-binding">{obj.payload.Conversations[0].memberCount}명</span>
            //         ,document.getElementById('forDocUserCount')
            //         )
            //     }
            // }// 대화참여자 수 

            // if(!obj){
            //     if(!obj.payload.Conversations){
            //         ReactDOM.render(
            //             <document-icon name={docIconName} className="ng-isolate-scope">
            //                 <i className="icon_txt">            <span className="path1"></span>         <span className="path2"></span>         <span className="path3"></span>         <span className="path4"></span>         <span className="path5"></span>         <span className="path6"></span>         <span className="path7"></span>         <span className="path8"></span>         <span className="path9"></span>         <span className="path10"></span>            <span className="path11"></span>            </i>
            //             </document-icon>
            //             ,document.getElementById("forDocIcon") 
            //         )
            //     }
            // }//문서아이콘
            
        }       
        else {
            console.log("got empty message");
        }
    }, {
        "x-queue-name": `user-${userId}-${uuid}`
    });
    // return obj;
}

export function publish(client: Client, api: string, userId: string, uuid: string, payload: {}) {
    client.publish({
        destination: `/exchange/request/${api}`,
        body: JSON.stringify({
            senderId: userId, locale: "ko-KR", payload,
        }),
        headers: { "reply-to": `user-admin-${uuid}`, "content-type": "application/json", "correlation_id ": api }
    });
}

