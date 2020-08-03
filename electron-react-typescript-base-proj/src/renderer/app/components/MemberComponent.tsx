import * as React from 'react';
import { getShortName } from '../../libs/messengerLoader';
import { TreeMember } from '../../models/TreeMember';
import MemberList from './MemberList';
import { Node } from '../../models/Node';

interface Props{
    clickCheckBox?: any,
    master?: TreeMember,
    oldMember?: TreeMember,
    isAllChecked?: boolean,
    memberIsChecked?: boolean,
    member?: Node,
    tempMembers ?: TreeMember[],
}
interface State{
    isChecked: boolean,
}


class MemberComponent extends React.Component<Props, State>{
    constructor(props: Props, state: State){
        super(props);
        this.state = ({
            isChecked : false
        })
        this.changeIsChecked = this.changeIsChecked.bind(this);
    }

    changeIsChecked = (e) => {
        e.preventDefault()
        let newMember : TreeMember[];
        newMember = [{
            userId : this.props.member.id,
            userName : this.props.member.name,
            password : null,
        }]
        this.setState({
            isChecked : !this.state.isChecked
        },this.props.clickCheckBox(this.state.isChecked, newMember,e))
    }

    deleteFromSelected = (e) => {
        e.preventDefault()
        let newMember : TreeMember[];
        newMember = [{
            userId : this.props.member.id,
            userName : this.props.member.name,
            password : null,
        }]
        this.setState({
            isChecked : true
        },this.props.clickCheckBox("Member", true, newMember,e))
    }


    render() {
        let ownerComponent;
        if(this.props.member){
            if(this.props.member.name == this.props.master.userName){
                ownerComponent = <span className="wrapmsgr_master" ng-show="node.value == docInfo.detail.masterUserId">Owner</span>
            }else{
                ownerComponent = <div></div>
            }
        }
        if(this.props.member){
            if(this.props.member.status == "select"){
                let idx = this.props.tempMembers.findIndex( obj => obj.userName === this.props.member.name) 
                const checkboxId = "member-"+ this.props.member.id+"object:"+ Math.random()
                return(
                    <li ng-repeat="node in docInfo.organ" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" className={idx != -1 ? "ng-scope angular-ui-tree-node selected" : "ng-scope angular-ui-tree-node"} expand-on-hover="false">
                        <div className="organ_wrapper ng-scope">
                            <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
                                <input type="checkbox" id={checkboxId} ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)" checked = {idx != -1}/>
                                <label htmlFor={checkboxId} data-nodrag="">
                                    <i className={idx != -1 ? "icon_checkbox disabled" : "icon_checkbox"} ng-class="{disabled: node.disabled}" onClick={this.changeIsChecked}></i>
                                </label>
                            </span>
                            <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" className="ng-isolate-scope">
                                <span className="user-photo ng-binding ng-isolate-scope no-photo cyan">{getShortName(this.props.member.name)}</span>
                                <span className="wrapmsgr_member ng-binding">{this.props.member.name}</span>
                            </div>
                            {ownerComponent}
                            <ol ui-tree-nodes="" ng-model="node.subTree" ng-class="{expanded: !collapsed}" className="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-empty">
                            </ol>
                        </div>
                    </li>
                );
            }else if(this.props.member.status == "selected"){
                return(
                    <li ng-repeat="member in inviteMembers | orderBy:['-disabled', 'userName']" ui-tree-node="" data-collapsed="true" className="ng-scope angular-ui-tree-node" expand-on-hover="false">
                        <div wrapmsgr-user-profile="users[member.userId] || member.userId" className="ng-isolate-scope">
                            <span className="user-photo ng-binding ng-isolate-scope no-photo green">{getShortName(this.props.member.name)}</span>
                            <span className="wrapmsgr_member ng-binding">
                                {this.props.member.name}
                                <a href=""></a>
                            </span>
                        </div>
                    </li>
                )
            }
        }
        else{
            return(
                <li ng-repeat="member in inviteMembers | orderBy:['-disabled', 'userName']" ui-tree-node="" data-collapsed="true" className="ng-scope angular-ui-tree-node" expand-on-hover="false" >
                    <div wrapmsgr-user-profile="users[member.userId] || member.userId" className="ng-isolate-scope">
                        <span className="user-photo ng-binding ng-isolate-scope no-photo red">{getShortName(this.props.oldMember.userName)}</span>
                        <span className="wrapmsgr_member ng-binding">
                            {this.props.oldMember.userName}
                            <a href="">
                                <i className="icon_times ng-scope" ng-if="member.userId != user.id &amp;&amp; !member.disabled" ng-click="removeInviteMember(member, $event)" onClick = {this.deleteFromSelected}></i>
                            </a>
                        </span>
                    </div>
                </li>
            )

        }
        
    }
}
export default MemberComponent;

