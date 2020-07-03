
import * as React from 'react';

interface Props{
    member: object;
}

class Member extends React.Component<Props>{
    constructor(props: Props){
        super(props);
    }
    remder(){
        const { member } = this.props;
        <li wrapmsgr-user-profile="users[member.userId]">
        <span className="user-photo  no-photo cyan" user="users[member.userId]">{member.userName}</span>
        <div className="ng-binding">{member.userId} ({member.userAccount})</div>
        <div className="sub-info ng-binding">{member.dept}</div>
        </li>
    }
}
export default Member;