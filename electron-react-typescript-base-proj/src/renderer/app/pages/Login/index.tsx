import React, { Fragment, useState, createContext, useContext } from 'react'
import { createClient, ccc } from '@/renderer/libs/stomp'
import { Client } from '@stomp/stompjs'

const remote = require('electron').remote
const Store = require('electron-store')
const store = new Store()

async function handleClick (userinfo: any){

    const client = createClient(userinfo.username, userinfo.password)
    store.set("username", userinfo.username)
    store.set("password", userinfo.password)
    

    if(client){
        console.log("yess")
        var win  = remote.getCurrentWindow()
         win.loadURL(__dirname+"/index.html#/chatlist/")
        return(
            <Fragment>
                <ccc.Provider value = {client}>
                </ccc.Provider>
            </Fragment>
            
        )
    }

    

}

function Login(){
    const [userinfo, setUser] = useState({username: "", password: ""})

    return (
        <Fragment>
                <input type = "text" className="username" placeholder = "user name"
                onChange = {({target:{value}}) => setUser({...userinfo, username: value})}    
            />
            <input type = "password" className = "password" placeholder = "password"
                onChange = {({target:{value}}) => setUser({...userinfo, password: value})}
            />

        <div>
            <button className="wrapmsgr_button" name ="Login" value="Login" onClick = {(e) =>handleClick(userinfo)}/>
        </div>

        </Fragment>
    )
}

export default Login