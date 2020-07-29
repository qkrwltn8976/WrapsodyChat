import * as React from 'react';
import { v4 } from 'uuid';
import { publishApi, subscribe, client } from '@/renderer/libs/stomp';

const Store = require('electron-store')
const store = new Store()

export function hasChildren(deptCode : string):boolean{
    let uuid = v4();
    let payload;
    subscribe(client, store.get("username"), uuid, (obj:any) =>{
        payload = obj.payload;
    })
    if(payload){
        if(payload.Nodes.length == 0){
            return false;
        }else{
            return true;
        }
    }
    publishApi(client, 'api.organ.tree', store.get("username"), uuid, {"root": "N", "path": deptCode})
}





