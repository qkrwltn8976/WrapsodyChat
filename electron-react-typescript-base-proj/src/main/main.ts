/**
 * Entry point of the Election app.
 */
import { app, BrowserWindow } from 'electron';
import '@public/icon_bot_wrapsody.png'
import * as path from 'path';
import * as url from 'url';

let mainWindow: Electron.BrowserWindow | null;
let chatWindow: Electron.BrowserWindow;

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
        icon: __dirname + './public/icon_bot_wrapsody.png'
    });

    // and load the index.html of the app.
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, './index.html'),
            protocol: 'file:',
            slashes: true
        })
    );

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

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
