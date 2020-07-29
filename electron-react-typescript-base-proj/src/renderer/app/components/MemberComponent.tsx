import * as React from 'react';
import { getShortName } from '../../libs/messengerLoader';
import { TreeMember } from '../../models/TreeMember';
import MemberList from './MemberList';

interface Props{
    clickCheckBox?: any,
    userId: string,
    userName: string,
    master?: TreeMember,
}
interface State{

}


class MemberComponent extends React.Component<Props>{
    constructor(props: Props){
        super(props);
    }
    
    render(){
        let ownerComponent;
        if(this.props.userName == this.props.master.userName){
            ownerComponent = <span className="wrapmsgr_master" ng-show="node.value == docInfo.detail.masterUserId">Owner</span>
        }else{
            ownerComponent = <div></div>
        }
        const checkboxId = "member-"+ this.props.userId+"object:"+ Math.random()
        return(
            <li ng-repeat="node in docInfo.organ" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" className="ng-scope angular-ui-tree-node" expand-on-hover="false">
                <div className="organ_wrapper ng-scope">
                    <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
                        <input type="checkbox" id={checkboxId} ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)" />
                        <label htmlFor={checkboxId} data-nodrag="">
                            <i className="icon_checkbox" ng-class="{disabled: node.disabled}" ></i>
                        </label>
                    </span>
                    <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" className="ng-isolate-scope">
                        <span className="user-photo ng-binding ng-isolate-scope no-photo cyan">{getShortName(this.props.userName)}</span>
                        <span className="wrapmsgr_member ng-binding">{this.props.userName}</span>
                    </div>
                    {ownerComponent}
                    <ol ui-tree-nodes="" ng-model="node.subTree" ng-class="{expanded: !collapsed}" className="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-empty">
                    </ol>
                </div>
            </li>
        );
    }
}
export default MemberComponent;

