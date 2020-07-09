import {Component, Fragment} from 'react';
import React from 'react';
import {InfoHeaderType} from "src/libs/enum-type"
import { Client, Message, StompSubscription, Stomp, StompConfig, IMessage } from "@stomp/stompjs";
import { createClient, subscribe, publish } from 'src/libs/stomp';

interface Props{ 
    headerType: string;
}

class page extends Component{
    client: any;
    payload: any;
   
    stompConnection = () => {
        this.client = createClient("admin", "1111");
        let obj = {};
        this.client.onConnect = () => {
            console.log("connected to Stomp");

            subscribe(this.client, 'admin', '98f7e404-f6b7-4513-84b4-31aa1647bc6d');
            publish(this.client, 'api.conversation.view', 'admin', '98f7e404-f6b7-4513-84b4-31aa1647bc6d', {});   
        }
        this.client.activate();
    }

    constructor(props: Props){
        super(props);
        this.stompConnection();
    }

    render(){
        return(
            <Fragment>

            </Fragment>
        )
    }

}

export default page;
    