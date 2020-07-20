import * as React from 'react';
import { Component, Fragment } from 'react';
import {ChatList, DocumentChatRoom} from './app/pages'
import "@public/wrapmsgr.css"
import "@public/wrapmsgr-components.css"
import "@public/wrapmsgr-icons.css"
import {Route, HashRouter, Switch, BrowserRouter, Redirect} from 'react-router-dom'
import Login from './app/pages/Login';

export function App(){
    return(
        <Fragment>
            <HashRouter >
            <Switch>
                <Route path="/document/:convo" component = {DocumentChatRoom} />
                <Route path="/chatlist" component = {ChatList} />
                <Route path="/" component = {Login}/>
                <Route render={() => <Redirect to="/"/>}/>
            </Switch>
            </HashRouter>            
        </Fragment>
    )
}

export default App