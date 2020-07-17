import * as React from 'react';
import { Component, Fragment } from 'react';
import {ChatList, DocumentChatRoom} from './app/pages'
import "@public/wrapmsgr.css"
import "@public/wrapmsgr-components.css"
import "@public/wrapmsgr-icons.css"
import {Route, HashRouter, Switch, BrowserRouter} from 'react-router-dom'

export function App(){
    console.log(window.location.href)
    return(
        <Fragment>
            <HashRouter >
            <Switch>
                <Route path="/document/:convo" component = {DocumentChatRoom} />
                <Route path="/" component = {ChatList} />
            </Switch>
            </HashRouter>
            
            {/* <ViewManager /> */}
            {/* <ViewManager> */}
                {/* <ChatList/> */}
            {/* </ViewManager> */}
            
        </Fragment>
    )
}

export default App