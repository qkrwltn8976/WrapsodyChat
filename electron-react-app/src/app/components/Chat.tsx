import * as React from 'react';

function Chat() {
    return (
        <li className = "ng-scope">
            <document-icon className = "ng-scope ng-isolate-scope">
                <i className = "icon_txt">
                    <span className = "path1"></span>
                    <span className = "path2"></span>
                    <span className = "path3"></span>
                </i>
            </document-icon>
            <div className = "title_5">
                <span className = "chatroom-name ng-binding">Wrapsody Chat</span>
                <span className = "chatroom-message-contents ng-binding"></span>
                <i></i>
                <span className = "chatroom-message-contents ng-binding"></span>
            </div>
            <div className = "wrapmsgr_right">
                <span className = "chatroom-date ng-binding">2020-05-01</span>
                <span className = "wrapmsgr_unread_outer wrapmsgr_right ng-hide">
                    <span className = "wrapmsgr_unread wrapmsgr_right ng-binding"></span>
                </span>
            </div>
            
        </li>
        
    );
}

export default Chat;