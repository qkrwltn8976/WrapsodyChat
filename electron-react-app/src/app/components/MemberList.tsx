import * as React from 'react';

interface Props{
    memberListType: string;
}

class MemberList extends React.Component<Props>{
    constructor(props: Props){
        super(props);
    }
    render(){
        const { memberListType } = this.props;
        if(memberListType == 'chat'){
            return(
                <div>

                </div>
            );
        }else if(memberListType == 'select'){
            return(
                <div>
                    <li className="selected" expand-on-hover="false">
                    <div className="organ_wrapper">
                        <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
                            <input type="checkbox" id="member-adminobject:1515" disabled="disabled" checked="checked">
                            <label htmlFor="member-adminobject:1515" data-nodrag="">
                                <i className="icon_checkbox disabled"></i>
                            </label>
                        </span>
                        <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'">
                            <span className="user-photo no-photo cyan" user="{userName: node.columnText, userId: node.value, type: node.type}" "="">ad</span>
                            <span className="wrapmsgr_member">administrator</span>
                        </div>
                        <span className="wrapmsgr_master">Owner</span>
                        <ol ui-tree-nodes="">
                        </ol>
                    </div>
			        </li>
                </div>
            );
        }else if(memberListType == 'selected'){
            return(
                <div>

                </div>
            );
        }
    }
}

export default MemberList;