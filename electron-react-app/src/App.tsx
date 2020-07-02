import * as React from 'react';
import { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { ChatList, BotChatRoom } from './app/pages'
import { render } from '@testing-library/react';

function App() {
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
