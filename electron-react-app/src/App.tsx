import * as React from 'react';
import { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { ChatList, DocumentChatRoom } from './app/pages'
import CreateChatRoom from './app/pages/CreateChatRoom'
import {Header} from './app/components';
import "src/assets/css/wrapmsgr.css";
import "src/assets/css/wrapmsgr-components.css";
import "src/assets/css/wrapmsgr-icons.css";
import {HeaderType} from 'src/libs/enum-type';
import {ServerTest} from './app/pages'

function App() {
    return (
      <Fragment>   
        <div className = "wrapmsgr_container">
          <div className = "wrapmsgr_chat_list">
            <Header docName = "" headerType = {HeaderType.LIST}/>
          <div className = "wrapmsgr_content" >
            <ChatList/>
            {/* <ChatPage/> */}
        </div>
          </div>
        </div>
        
        {/* <BotChatRoom /> */}
      </Fragment>
    );
}
export default App;
