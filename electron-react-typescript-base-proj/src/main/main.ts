/**
 * Entry point of the Election app.
 */
import { app, BrowserWindow, ipcMain } from 'electron';
import { createClient, publishApi, subscribe, client, setClient} from '@/renderer/libs/stomp';
import { Stomp } from "@stomp/stompjs";
import { Client, IMessage } from "@stomp/stompjs";
import '@public/icon_bot_wrapsody.png'
const {download} = require("electron-dl")
import * as path from 'path';
import * as url from 'url';
import { createStore } from 'redux';
import { conversationHandler } from '@/renderer/libs/stompData';
const remote = require('electron').remote
const Store = require('electron-store')
const electronStore = new Store()
let mainWindow: Electron.BrowserWindow | null;
let chatWindow: Electron.BrowserWindow;
let globalClient: Client;

function createMainWindow(): void {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        height: 600,
        width: 400,
        frame:false,
        minHeight:180,
        minWidth: 360,
        titleBarStyle:'hidden',
        hasShadow:true,
        icon: __dirname + './public/icon_bot_wrapsody.png',
    });

    // and load the index.html of the app.
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, './index.html'),
            protocol: 'file:',
            slashes: true
        })
    );

    ipcMain.on("download", (event, info) => {
        console.log("알았다")
        info.properties.onProgress = status => mainWindow.webContents.send("download progress", status);
        download(BrowserWindow.getFocusedWindow(), info.url, info.properties)
            .then(dl => mainWindow.webContents.send("download complete", dl.getSavePath()));
    });

    // ipcMain.on('requestClient', (event, argument)=>{
    //     console.log("requestClient");
    //     console.log(globalClient)
    //     globalClient.onConnect = () => {
    //         publishApi(globalClient, 'api.conversation.list', electronStore.get("username"), electronStore.get("uuid"), {});
    //     }
    //     event.sender.send('sendClient', globalClient)
    // });

    mainWindow.setTitle("Wrapsody Chat")
    mainWindow.show()

    // // Emitted when the window is closed.
    // mainWindow.on('closed', () => {
    //     // Dereference the window object, usually you would store windows
    //     // in an array if your app supports multi windows, this is the time
    //     // when you should delete the corresponding element.
    //     console.log('bye')
    //     mainWindow = null;
    // });
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createMainWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createMainWindow();
    }
});

ipcMain.on('setClient', async (event, argument) => {
    let login = electronStore.get("username")
    let passcode = electronStore.get("password")
    globalClient = new Client({
        brokerURL: "ws://192.168.100.30:9500/ws",
        connectHeaders: {
            login,
            passcode,
            host: "/wrapsody-oracle",
        },
        debug: function (str) {
            console.log(str);
        },
        reconnectDelay: 500000,
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000,
        onUnhandledMessage: (messages: IMessage) => {
            console.log(messages)
        } 
    });
    console.log('1------------------------------')
    console.log(globalClient)
    console.log('2------------------------------')
    globalClient.onConnect = () => {
        console.log("connected to Stomp");
        subscribe(client, login, electronStore.get("uuid"));
    }
    globalClient.activate()
    //globalAny.globalClient = {globalClient: globalClient};
    console.log("----------------------setClient and publish-----------------------")
    console.log(globalClient.connected)
    publishApi(client, 'api.conversation.list', electronStore.get("username"), electronStore.get("uuid"), {});
    mainWindow.loadURL("file://"+__dirname+"/index.html#/chatlist/")
});
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
