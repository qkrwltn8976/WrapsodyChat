import * as React from 'react';
import { Component, Fragment } from 'react';
import {Header} from './app/components';
import {HeaderType} from './libs/enum-type';
import {ChatList} from './app/pages'
import "@public/wrapmsgr.css"
import "@public/wrapmsgr-components.css"
import "@public/wrapmsgr-icons.css"

export function App(){
    var remote = require('remote')
    var windowManager = remote.require('electron-window-manager');
 
    // Create a new window
    var win = windowManager.createNew('win2', 'Windows #2');
    win.open();

    return(
        <Fragment>
            <ChatList/>
        </Fragment>
    )
}

export default App