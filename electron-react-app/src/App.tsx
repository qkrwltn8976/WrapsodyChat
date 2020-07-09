import * as React from 'react';
import { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { ChatList, BotChatRoom, DocumentChatRoom, ServerTest, ServerTestCopy} from './app/pages';
import CreateChatRoom from './app/pages/CreateChatRoom'
import {Header} from './app/components';
import "src/assets/css/wrapmsgr.css";
import "src/assets/css/wrapmsgr-components.css";
import "src/assets/css/wrapmsgr-icons.css";
import {HeaderType} from 'src/libs/enum-type';

function App() {
    return (
      <Fragment>   
        <h1>server test</h1>
        <ServerTestCopy/>
      </Fragment>
    );
}
export default App;
