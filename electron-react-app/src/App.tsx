import * as React from 'react';
import { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { ChatList, BotChatRoom } from './app/pages'
import { render } from '@testing-library/react';
import {Client, Message} from '@stomp/stompjs';

function App() {
  // let StompJs = require('@stomp/stompjs');
  // const client = new StompJs.Client();
  // client.brokerURL = "ws://localhost:15674/ws";
  // console.log(client.brokerURL);

    const script = document.createElement('script');
    return (
      <Fragment>   
        <h1>테스트</h1>
        <ChatList name = "랩소디"/>
        <BotChatRoom />
      </Fragment>
    );
}

export default App;
