import * as React from 'react';
import { Component, Fragment } from 'react';
import {ChatList, DocumentChatRoom, CreateOrInvite} from './app/pages'
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
                <Route exact path="/document/:convo" component = {DocumentChatRoom} />
                <Route exact path="/chatlist" component = {ChatList} />
                <Route exact path="/" component = {Login}/> 
                {/* <Route render={() => <Redirect to="/"/> }/> */}
                <Route exact path="/invite/:convo" component = {CreateOrInvite} />
            </Switch>
            </HashRouter>            
        </Fragment>
    )
}

export default App