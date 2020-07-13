import * as React from 'react';

interface MemberInfo{
    longName: string;
    shortName: string;
    dept: string;
}

class Member extends React.Component<MemberInfo>{
    constructor(props: MemberInfo){
        super(props);
    }
    render(){
        const { longName, shortName, dept} = this.props;
        return(
            <li ng-repeat="member in current.members | memberFilter:search.user:users | orderBy:'userName'" ng-class="{'has-grn-dot': false, 'has-red-dot': false}" wrapmsgr-user-profile="users[member.userId]" className="ng-scope ng-isolate-scope">
                <span className="user-photo ng-binding ng-isolate-scope no-photo green">{shortName}</span>
                <div className="ng-binding">{longName} ({shortName})</div>
                <div className="sub-info ng-binding">{dept}</div>
            </li>
        );
       
    }
}
export default Member;
