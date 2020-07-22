import { BrowserWindow, Tray }from 'electron';

// const appIcon = new Tray(__dirname + './icon/AppIcon.jpg');
// const win = new BrowserWindow({ icon: '/Users/somebody/images/window.png' })
// console.log(appIcon, win)

export function sendNotification(title: string, userId: string, body: string) {
    let myNotification = new Notification(title, {
        body: userId + ' : ' + body,
        icon: 'http://ecm.dev.fasoo.com:9400/images/icon_bot_wrapsody.png'
    })

    myNotification.onclick = () => {
        console.log('Notification clicked')
    }
}


