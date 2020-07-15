import * as React from 'react';
import * as ReactDOM from 'react-dom';

const {remote} = require('electron')
const {BrowserWindow} = remote
const win = new BrowserWindow()

export function Test(){
    return (<div>sdkfjla</div>)
}

export default Test