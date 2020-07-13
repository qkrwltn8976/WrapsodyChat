import * as React from 'react';

declare global{ namespace JSX{
        interface IntrinsicElements{
            "document-icon": any;
        }
    }
}

function Chat() {
    return (
        <li className = "ng-scope">
            <document-icon></document-icon>
            <div className = "title_5" id = "title_5">
                <span className = "chatroom-name ng-binding"></span>
                <span className = "chatroom-message-contents ng-binding"></span>
                <i></i>
                <span className = "chatroom-message-contents ng-binding"></span>
            </div>
            <div className = "wrapmsgr_right">
                <span className = "chatroom-date ng-binding"></span>
                <span className = "wrapmsgr_unread_outer wrapmsgr_right ng-hide">
                    <span className = "wrapmsgr_unread wrapmsgr_right ng-binding"></span>
                </span>
            </div>
            
        </li>
        
    );
}

export default Chat;