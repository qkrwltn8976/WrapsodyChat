import * as React from 'react';
import { Component, Fragment } from 'react';
import {Header} from './app/components';
import {HeaderType} from './libs/enum-type';
import {ChatList} from './app/pages'
import "@public/wrapmsgr.css"
import "@public/wrapmsgr-components.css"
import "@public/wrapmsgr-icons.css"

export function App(){
    return(
        <Fragment>
            <ChatList/>
        </Fragment>
    )
}

export default App