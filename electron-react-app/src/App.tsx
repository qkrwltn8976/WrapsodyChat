import * as React from 'react';
import { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { Chat, DocumentChatRoom, ChatList } from './app/pages'
import CreateChatRoom from './app/pages/CreateChatRoom'
import {Header} from './app/components';
import "src/assets/css/wrapmsgr.css";
import "src/assets/css/wrapmsgr-components.css";
import "src/assets/css/wrapmsgr-icons.css";
import {HeaderType} from 'src/libs/enum-type';

function App() {
    return (
      <Fragment> 
        <div id="wrapmsgr" className="ng-scope">
          <div className = "wrapmsgr_content" >
            <ChatList/>
        </div>
        </div>  
        {/* <DocumentChatRoom convoId="91fc0628c5fe4af4a14564f46f8ed17f"/> */}
        {/* <BotChatRoom /> */}
      </Fragment>
    );
}
export default App;