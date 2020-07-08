import * as React from 'react';

interface Member{
    longName: string;
    shortName: string;
    dept: string;
}

interface Props{
    memberListType: string;
    members: Member[];
}

class MemberList extends React.Component<Props>{
    constructor(props: Props){
        super(props);
    } // 생성자
    render(){
        const {memberListType, members} = this.props;
        if(memberListType == 'chat'){
            return(
                <ul>
                {
                    members.map( member =>
                        // <li ng-repeat="member in current.members | memberFilter:search.user:users | orderBy:'userName'" ng-class="{'has-grn-dot': false, 'has-red-dot': false}" wrapmsgr-user-profile="users[member.userId]" className="ng-scope ng-isolate-scope">
                        //     <span className="user-photo ng-binding ng-isolate-scope no-photo green">{member.shortName}</span>
                        //     <div className="ng-binding">{member.longName} ({member.shortName})</div>
                        //     <div className="sub-info ng-binding">{member.dept}</div>
                        // </li>
                        <li ng-repeat="member in current.members | memberFilter:search.user:users | orderBy:'userName'" ng-class="{'has-grn-dot': false, 'has-red-dot': false}" wrapmsgr-user-profile="users[member.userId]" className="ng-scope ng-isolate-scope">
                            <span className="user-photo ng-binding ng-isolate-scope no-photo green">1</span>
                            <div className="ng-binding">1 (1)</div>
                            <div className="sub-info ng-binding">MJ Dept.</div>
                        </li>
                    )
                }
                </ul>
            );
        }else if(memberListType == 'select'){
            return(
                <ol ui-tree-nodes="" ng-model="docInfo.organ" ng-show="docInfo.organ.length > 0" className="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty">
                    {/* {
                        members.map( member => (
                            <li ui-tree-node="" data-collapsed="true" className="selected" expand-on-hover="false">
                                <div className="organ_wrapper ng-scope">
                                    <span>
                                        <input type="checkbox" id="member-adminobject:1713" de.disabled" disabled="disabled" checked="checked">
                                        <label htmlFor="member-adminobject:1713" data-nodrag="">
                                            <i className="icon_checkbox disabled"></i>
                                        </label>
                                    </span>
                                    <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" className="ng-isolate-scope">
                                        <span className="user-photo no-photo cyan" user="{userName: node.columnText, userId: node.value, type: node.type}" "="">ad</span>
                                        <span className="wrapmsgr_member">administrator</span>
                                    </div>
                                    <span className="wrapmsgr_master">Owner</span>
                                    <ol ui-tree-nodes="" className="angular-ui-tree-nodes">
                                    </ol>
                                </div>
                            </li>
                        ))
                    } */}
                </ol>
            );
        }else if(memberListType == 'selected'){
            return(
                <ol ui-tree-nodes="" className="angular-ui-tree-nodes">
                    {
                        members.map( member => (
                            <li ng-repeat="member in inviteMembers | orderBy:['-disabled', 'userName']" ui-tree-node="" data-collapsed="true" className="angular-ui-tree-node" expand-on-hover="false">
                                <div wrapmsgr-user-profile="users[member.userId] || member.userId" className="ng-isolate-scope">
                                <span className="user-photo no-photo cyan">{member.shortName}</span>
                                    <span className="wrapmsgr_member">
                                        {member.dept}
                                        <a href=""></a>
                                    </span>
                                </div>
                            </li>
                        ))
                    }
                </ol>
            );
        }
    }
}

export default MemberList;
