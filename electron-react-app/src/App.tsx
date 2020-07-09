import * as React from 'react';
import { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { ChatList, BotChatRoom, DocumentChatRoom, ServerTest} from './app/pages';
import CreateChatRoom from './app/pages/CreateChatRoom'
import {Header} from './app/components';
import "src/assets/css/wrapmsgr.css";
import "src/assets/css/wrapmsgr-components.css";
import "src/assets/css/wrapmsgr-icons.css";
import {HeaderType} from 'src/libs/enum-type';

function App() {
    return (
      <Fragment>   
                <h1>테스트</h1>
        <div className = "wrapmsgr_container">
          <div className = "wrapmsgr_chat_list">
            <Header docName = "" headerType = {HeaderType.CHAT}/>
          <div className = "wrapmsgr_content">
          {/* <ChatList/> */}
          <DocumentChatRoom/>
          {/* <ServerTest/> */}
        </div>
          </div>
        </div>
        
        {/* <BotChatRoom /> */}
      </Fragment>
    );
}
export default App;
