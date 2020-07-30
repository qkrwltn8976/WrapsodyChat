import * as React from 'react';
import { Component, Fragment } from 'react';
import {ChatList, ChatRoom, Invite, BookmarkPage} from './app/pages'
import "@public/wrapmsgr.css"
import "@public/wrapmsgr-components.css"
import "@public/wrapmsgr-icons.css"
import "@public/login.css"
import {Route, HashRouter, Switch, BrowserRouter, Redirect} from 'react-router-dom'
import Login from './app/pages/Login';
    
export function App(){
    return(
        <Fragment>
            <HashRouter >
            <Switch>
                <Route exact path="/chatroom/:convo/:unread/:readAt" component = {ChatRoom} />
                <Route exact path="/chatlist" component = {ChatList} />
                <Route exact path="/" component = {Login}/> 
                {/* <Route render={() => <Redirect to="/"/> }/> */}
                <Route exact path="/invite/:convo" component = {Invite} />
                <Route exact path="/bookmark/:convo" component = {BookmarkPage} />
            </Switch>
            </HashRouter>            
        </Fragment>
    )
}

export default App