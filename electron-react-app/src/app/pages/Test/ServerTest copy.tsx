import React from 'react';
import { createClient, subscribe, publish } from 'src/libs/stomp';
import {v4} from 'uuid'
import { setTimeout } from 'timers';
import { wait } from '@testing-library/react';

function ServerTestCopy () {

    var a:any;
    const client = createClient("admin", "1111");
        const queue = v4();
        

        client.onConnect = function () {
            console.log("connected to Stomp");


            subscribe(client, 'admin', queue, (payload: {}) => { 
                //console.log(payload) 
                a = payload;
                a = a.UserInfo.userId
                //console.log(a)
            });


            publish(client, 'api.user.info', 'admin', queue, {});
            //publish(client, 'api.conversation.list', 'admin', queue, {});

        }

        client.activate();

        wait()

        setTimeout(()=> {return(<div>{a}</div>)},5000)
        
        return (<div>{a}</div>)

}

export default ServerTestCopy;