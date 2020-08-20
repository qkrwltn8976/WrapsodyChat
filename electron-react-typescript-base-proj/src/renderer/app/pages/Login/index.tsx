import React, { Fragment, useState, createContext, useContext } from 'react'
import { client ,subscribe,publishApi, setClient} from '@/renderer/libs/stomp';
import { v4 } from 'uuid';
import store from '@/store';
const remote = require('electron').remote

//electron-store 라이브러리 사용하여 id / pw 저장
const Store = require('electron-store')
const electronStore = new Store()

async function handleClick (userinfo: any, uuid:string, lang:string){
    electronStore.set("username", userinfo.username)
    electronStore.set("password", userinfo.password)
    electronStore.set("uuid", uuid)
    electronStore.set("language", lang)
    

    setClient()

    console.log(client.connected)
    electronStore.set("stmp", JSON.stringify(client))
    client.onConnect=()=>{
        console.log('hihiihi')
        let win  = remote.getCurrentWindow();
        
        store.dispatch({ type: "setClient" , client });
        win.loadURL("file://"+__dirname+"/index.html#/chatlist/")
    }

}

const minimizeWindow = (event:any)=>{
    var win = remote.getCurrentWindow()
    win.minimize()
}

const closeWindow = (event:any)=>{
    var win = remote.getCurrentWindow()
    win.close()
}

function Login(){
    const [userinfo, setUser] = useState({username: "", password: ""})
    const [lang, setLang] = useState("ko-KR")
    const uuid = v4()

    electronStore.clear()
    
    return (
        <Fragment>
            <div className = "login-body">
                <div className = "header">
                    <h2 className = "close" onClick = {closeWindow}>x</h2>
                    <h2 className = "min" onClick = {minimizeWindow}>-</h2>
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
                    <button className="login-submit" name ="Login" value="Log in" onClick = {(e) =>handleClick(userinfo, uuid, lang)}>Login</button>
                </div>
                <div>
                    <a className = "lang" href="" id = "en" style = {{color: "#2ecc71"}} onClick = {(e)=> {
                        e.preventDefault();
                        setLang("en-US")
                        document.getElementById("en").style.color = "white";
                        document.getElementById("ko").style.color = "#2ecc71";
                        }}>
                        <li>English</li>
                    </a>
                    <a className = "lang" href = "" id = "ko" onClick = {(e)=>{
                        e.preventDefault();
                        setLang("ko-KR")
                        document.getElementById("ko").style.color = "white";
                        document.getElementById("en").style.color = "#2ecc71";
                    }

                    }>
                        <li>Korean</li>
                    </a>
                </div>
            </div>
            
            </div>
        </Fragment>
    )
}

export default Login;