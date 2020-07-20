import React, { Fragment, useState } from 'react'
import  { client, setUserInfo} from '@/renderer/libs/stomp'
import * as Stomp from '@/renderer/libs/stompClient';
import { Redirect } from 'react-router'
import { Header } from '../../components'
const remote = require('electron').remote

function handleClick (userinfo: any){
    // setUserInfo(userinfo.username, userinfo.password)
    let stomp = new Stomp.StompClient(userinfo.username, userinfo.password);
    console.log(Stomp)
    setTimeout(() => { 
        if(Stomp.StompClient){
            console.log("yeyeyeye")
            var win = remote.getCurrentWindow()
            win.loadURL(__dirname+"/index.html#/chatlist/")
            win.show()
        }
        else 
            console.log("nononono")
     }, 5000)

    
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
            <button className="login_btn" name ="Login" value="Login" onClick = {(e) =>handleClick(userinfo)}/>
        </div>

        </Fragment>
        
    )
}

export default Login