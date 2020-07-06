import * as React from 'react';
import { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { ChatList, BotChatRoom, DocumentChatRoom, ServerTest} from './app/pages';
import {Header} from './app/components';
import { render } from '@testing-library/react';
import {Client, Message} from '@stomp/stompjs';
import "src/assets/css/wrapmsgr.css";
import "src/assets/css/wrapmsgr-components.css";
import "src/assets/css/wrapmsgr-icons.css";
import {HeaderType} from 'src/libs/enum-type';

function App() {
  // let StompJs = require('@stomp/stompjs');
  // const client = new StompJs.Client();
  // client.brokerURL = "ws://localhost:15674/ws";
  // console.log(client.brokerURL);

    const script = document.createElement('script');
    return (
      <Fragment>   
        <h1>테스트</h1>
        <div className = "wrapmsgr_container">
          <div className = "wrapmsgr_chat_list">
            <Header docName = "" headerType = {HeaderType.CHATLIST}/>
          <div className = "wrapmsgr_content">
          {/* <ChatList/> */}
          <DocumentChatRoom/>
        </div>
          </div>
        </div>
        
        {/* <BotChatRoom /> */}
      </Fragment>
    );
}
export default App;
