import * as React from 'react';
import { getShortName } from '../../libs/messengerLoader';
import { TreeMember } from '../../models/TreeMember';
import MemberList from './MemberList';
import { Node } from '../../models/Node';
import store from '../../../store'

interface Props{
    clickMember?: any,
    master?: TreeMember,
    oldMember?: TreeMember,
    oldMembers?:TreeMember[],
    isAllChecked?: boolean,
    memberIsChecked?: boolean,
    member?: Node,
    tempMember ?: TreeMember,
    selectedMember?: TreeMember,
    selectedMemberType?: string,
}
interface State{
    tempMembers: TreeMember[],
}


class MemberComponent extends React.Component<Props, State>{
    constructor(props: Props, state: State){
        super(props);
        this.state = ({
            tempMembers : store.getState().tempMembers
        })
        store.subscribe(function(this:MemberList){
            this.setState({ tempMembers : store.getState().tempMemebers})
        }.bind(this));
        this.clickMember = this.clickMember.bind(this);
        this.deleteMember = this.deleteMember.bind(this);
    }

    clickMember = (e) => {
        e.preventDefault()
        let newMember : TreeMember[];
        newMember = [{
            userId : this.props.member.id,
            userName : this.props.member.name,
            password : null,
        }]
        store.dispatch({type: 'clickMember', newMember : newMember})
    }
    deleteMember = (e) => {
        e.preventDefault()
        let newMember : TreeMember[];
        newMember = [{
            userId : this.props.tempMember.userId,
            userName : this.props.tempMember.userName,
            password : null,
        }]
        store.dispatch({type: 'clickMember', newMember : newMember})
    }

    render() {
        let ownerComponent;
        if(this.props.member && this.props.master && this.props.oldMembers){
            if(this.props.member.name == this.props.master.userName){
                ownerComponent = <span className="wrapmsgr_master" ng-show="node.value == docInfo.detail.masterUserId">Owner</span>
            }else{
                ownerComponent = <div></div>
            }
            let idx, idx2;
            if(this.state.tempMembers != undefined){
                idx = this.state.tempMembers.findIndex( obj => obj.userId === this.props.member.id) 
            }
            if(this.state.tempMembers === undefined){
                idx = -1;
            }
            if(this.props.oldMembers != undefined){
                idx2 = this.props.oldMembers.findIndex( obj => obj.userId === this.props.member.id)
            }
            if(this.props.oldMembers === undefined){
                idx2 = -1;
            }
            let clickComponent;
            if(idx2 == -1){ // 둘다 아닌경우에만
                clickComponent = <i className="icon_checkbox" ng-class="{disabled: node.disabled}" onClick={this.clickMember}></i>
            }else{
                clickComponent = <i className="icon_checkbox disabled" ng-class="{disabled: node.disabled}"></i>
            }
            console.log("왜 선택안되는지 궁금")
            console.log(this.props.member.name + "//////////" + idx + "///////" + idx2)
            const checkboxId = "member-"+ this.props.member.id+"object:"+ Math.random()
            return(
                <li ng-repeat="node in docInfo.organ" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" className={(idx == -1 && idx2 == -1) ?  "ng-scope angular-ui-tree-node":"ng-scope angular-ui-tree-node selected"} expand-on-hover="false">
                    <div className="organ_wrapper ng-scope">
                        <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
                            <input type="checkbox" id={checkboxId} ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)" checked = {idx != -1}/>
                            <label htmlFor={checkboxId} data-nodrag="">
                                {clickComponent}
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
        }
        if(this.props.selectedMemberType == "oldMembers" && this.props.oldMember){
            return(
                <li ng-repeat="member in inviteMembers | orderBy:['-disabled', 'userName']" ui-tree-node="" data-collapsed="true" className="ng-scope angular-ui-tree-node" expand-on-hover="false">
                    <div wrapmsgr-user-profile="users[member.userId] || member.userId" className="ng-isolate-scope">
                        <span className="user-photo ng-binding ng-isolate-scope no-photo green">{getShortName(this.props.oldMember.userName)}</span>
                        <span className="wrapmsgr_member ng-binding">
                            {this.props.oldMember.userName}
                            <a href=""></a>
                        </span>
                    </div>
                </li>
            )
        }
        if(this.props.selectedMemberType == "tempMembers" && this.props.tempMember){
            return(
                <li ng-repeat="member in inviteMembers | orderBy:['-disabled', 'userName']" ui-tree-node="" data-collapsed="true" className="ng-scope angular-ui-tree-node" expand-on-hover="false" >
                    <div wrapmsgr-user-profile="users[member.userId] || member.userId" className="ng-isolate-scope">
                        <span className="user-photo ng-binding ng-isolate-scope no-photo red">{getShortName(this.props.tempMember.userName)}</span>
                        <span className="wrapmsgr_member ng-binding">
                            {this.props.tempMember.userName}
                            <a href="">
                                <i className="icon_times ng-scope" ng-if="member.userId != user.id &amp;&amp; !member.disabled" ng-click="removeInviteMember(member, $event)" onClick = {this.deleteMember}></i>
                            </a>
                        </span>
                    </div>
                </li>
            )
        }
        else{
            return(
                <div></div>
            )
        }
        return(
            <div></div>
        )
        
    }
}
export default MemberComponent;

