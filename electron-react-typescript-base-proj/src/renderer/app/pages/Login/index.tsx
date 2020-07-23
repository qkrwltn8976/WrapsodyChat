import React, { Fragment, useState, createContext, useContext } from 'react'
import { client ,subscribe,publishApi, setClient} from '@/renderer/libs/stomp';
import { v4 } from 'uuid';
const remote = require('electron').remote

//electron-store 라이브러리 사용하여 id / pw 저장
const Store = require('electron-store')
const store = new Store()

async function handleClick (userinfo: any, uuid:string){
    store.set("username", userinfo.username)
    store.set("password", userinfo.password)

    setClient()

    console.log(client.connected)

    client.onConnect=()=>{
        console.log("yess")
        var win  = remote.getCurrentWindow()
        win.loadURL(__dirname+"/index.html#/chatlist/")
    }
}

const closeWindow = (event:any)=>{
    console.log('bye')
    var win = remote.getCurrentWindow()
    win.close()
}

function Login(){
    const [userinfo, setUser] = useState({username: "", password: ""})
    const uuid = v4()

    store.clear()
    
    return (
        <Fragment>
                <div className = "header">
                    <h2 className = "close" onClick = {closeWindow}>x</h2>
                </div>            
            <div className = "login-form">
                <h1>Wrapsody Chat</h1>
                <div className = "form-group">
                    <input type = "text" className="login-username" placeholder = "user name"
                        onChange = {({target:{value}}) => setUser({...userinfo, username: value})}    
                    />                
                </div>
                <div className = "form-group">
                    <input type = "password" className = "login-password" placeholder = "password"
                        onChange = {({target:{value}}) => setUser({...userinfo, password: value})}
                    />          
                </div>

                <div className = "form-group">
                    <button className="login-submit" name ="Login" value="Log in" onClick = {(e) =>handleClick(userinfo, uuid)}>Login</button>
                </div>
            </div>
            

        </Fragment>
    )
}

export default Login;