import * as React from 'react';
import { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { ChatList, BotChatRoom, DocumentChatRoom} from './app/pages';
import {Header} from './app/components';
import { render } from '@testing-library/react';
import {Client, Message} from '@stomp/stompjs';
import "./assets/css/wrapmsgr.css";
import "./assets/css/wrapmsgr-components.css";
import "./assets/css/wrapmsgr-icons.css";
import * as etype from './libs/enum-type';

function App() {
  // let StompJs = require('@stomp/stompjs');
  // const client = new StompJs.Client();
  // client.brokerURL = "ws://localhost:15674/ws";
  // console.log(client.brokerURL);

    const script = document.createElement('script');
    return (
      <Fragment>   
         <Header docName = "" headerType = {etype.HeaderType.ETC}/>
        <h1>테스트</h1>
        <div className = "wrapmsgr_container">
          <div className = "wrapmsgr_chat_list">
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
