import {Component, Fragment, useEffect} from 'react';
import {useState} from 'react';
import React from 'react'
import { client, subscribe, publishApi } from 'src/libs/stomp';
import {v4} from "uuid"

function ServerTest(){    
    const queue = v4();
    const [valueA, setValueA]= useState()

    useEffect(() => {
        client.onConnect = function () {
            subscribe(client, 'admin', queue, (payload:any) => { 
                if(payload.Conversations!==null){
                    setValueA(payload.Conversations.map((item:any)=>item.name))
                }
                
            });
            publishApi(client, 'api.conversation.list', 'admin', queue, {});
        }
        client.activate();
    }, [])
    
    return (         
    <div>A: {valueA} </div>
    )
}

export default ServerTest


                        // tmp = item,
                        // c.convoId = tmp.convoId,
                        // c.convoType = tmp.convoType,
                        // c.createdAt = tmp.createdAt,
                        // c.latestMessage = tmp.latestMessage,
                        // c.latestMessageAt = tmp.latestMessageAt,
                        // c.memberCount = tmp.memberCount,
                        // c.name = tmp.name,
                        // c.notificationType = tmp.notificationType,
                        // c.readAt = tmp.readAt,
                        // c.roomType = tmp.roomType,
                        // c.unread = tmp.unread,
                        // c.updatedAt = tmp.updatedAt,
                        // cl.push(c),
                        //console.log(item.name)