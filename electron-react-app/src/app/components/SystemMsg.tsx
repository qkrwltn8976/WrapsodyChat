import * as React from 'react';
import { render } from '@testing-library/react';

interface Props {
    userId: string;
    userPhoto: string;
    msgBody: string;
    time: string;
}

class SystemMsg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    
    render() {
        return (
            <div className="wrapmsgr_msg ng-scope">
                <div className="wrapmsgr_msg_user ng-isolate-scope" wrapmsgr-user-profile="users[message.sendUserId]" user-profile-disabled="message.sendUserId.substr(0, 5) == '@BOT@'" title="조상원">
                    <span className="user-photo ng-binding ng-isolate-scope no-photo orange">상원</span>
                </div>
                <div className="wrapmsgr_msg_userid ng-binding">조상원</div>
                <div className="wrapmsgr_msg_bubble-wrap">
                    <div className="wrapmsgr_msg_bubble">

                        <div className="wrapmsgr_msg_body ng-binding">새로운 타입의 푸시... 채팅이 도착함</div>
                    </div>
                    <div className="wrapmsgr_msg_time">
                        <span className="ng-binding">오후 2:40</span>
                    </div>
                </div>
            </div>
        );
    }

}

export default SystemMsg;