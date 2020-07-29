import * as React from 'react';
import { Member } from '../../models/Member';
import { getShortName } from '../../libs/messengerLoader';
import { TreeMember } from '../../models/TreeMember';
import { TreeDept } from '../../models/TreeDept';
import { client , subscribe, publishApi } from '../../libs/stomp'
import { v4 } from "uuid";
import { MemberComponent, Dept } from '../components'
const Store = require('electron-store')
const store = new Store()

interface Group {
    longName: string;
    shortName: string;
}

interface Props {
    memberListType: string;
    convoId?: string;
    search?:string;
    members?: Member[];
    treeData?: any;
    clickCheckBox? : any;
    viewAuthAllUsers?: boolean;
    checkoutAuthList?: TreeMember[];
    checkoutDeptAuthList?: TreeDept[];
    viewAuthList?: TreeMember[];
    viewDeptAuthList?: TreeDept[];
    tMembers?: TreeMember[];
    master?: TreeMember;
    isAllChecked?: boolean,
    childNodes?: any,
}

interface State{
    uuid: string
}


class MemberList extends React.Component<Props, State>{
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = ({
            uuid: v4(),
        })
    }
    render() {
        const { memberListType, convoId} = this.props
        let ownerComponent;
        let checkoutAuthListComponent;
        let checkoutDeptAuthListComponent;
        let viewAuthListComponent;
        let viewDeptAuthListComponent;
        let rootTreeComponent;

        if(this.props.checkoutAuthList){
            checkoutAuthListComponent = 
                this.props.checkoutAuthList.map(member => 
                {
                    return(
                        <MemberComponent clickCheckBox = {this.props.clickCheckBox} userId = {member.userId} userName = {member.userName} master = {this.props.master} />
                    )
                })    
        }
        if(this.props.checkoutDeptAuthList){
            checkoutDeptAuthListComponent = 
                this.props.checkoutDeptAuthList.map(dept => 
                {
                    console.log(dept)
                    return(
                        <Dept clickCheckBox = {this.props.clickCheckBox} deptCode = {dept.deptCode} deptName = {dept.deptName} master = {this.props.master}/> 
                    )
                })
        }

        if(this.props.viewAuthList){
            viewAuthListComponent =  
                this.props.viewAuthList.map(member => 
                {
                    return(
                        <MemberComponent clickCheckBox = {this.props.clickCheckBox} userId = {member.userId} userName = {member.userName} master = {this.props.master} />
                    )
                })
        }
        if(this.props.viewDeptAuthList){
            viewDeptAuthListComponent = 
                this.props.viewDeptAuthList.map(dept => 
                {   console.log(dept)
                    return(
                        <Dept clickCheckBox = {this.props.clickCheckBox} deptName = {dept.deptName} deptCode = {dept.deptCode} master = {this.props.master}/>
                    )
                })
        }
        if (memberListType == 'chat' || this.props.members) {
            return (
                <ul id="forMemberList">
                    {this.props.members.map(member => 
                    {
                        if(member.userName && (this.props.search === null || member.userName.toLowerCase().includes(this.props.search.toLowerCase()) || member.userId.toLowerCase().includes(this.props.search.toLowerCase()))) {
                        return(<li id={member.userId} ng-repeat="member in current.members | memberFilter:search.user:users | orderBy:'userName'" ng-class="{'has-grn-dot': false, 'has-red-dot': false}" wrapmsgr-user-profile="users[member.userId]" className="ng-scope ng-isolate-scope">
                            <span className="user-photo ng-binding ng-isolate-scope no-photo green">{getShortName(member.userName)}</span>
                            <div className="ng-binding">{member.userName} ({member.userId})</div>
                            <div className="sub-info ng-binding">dept1</div>
                        </li>)
                        }
                    })}
                </ul>
            );
        } else if (memberListType == 'select') {
            return (
                <React.Fragment>
                    <div className="wrapmsgr_organ_tree_header">
                        <input type="checkbox" id="manage_doc_room_select_all" ng-disabled="!loggedIn || organTreeOptions.disabled" ng-checked="checkAllMembers()" ng-click="toggleAllMembers($event)" checked = {this.props.isAllChecked}/>
                        <label htmlFor="manage_doc_room_select_all">
                            <i className="icon_checkbox" ng-class="{disabled: organTreeOptions.disabled}" onClick={this.props.clickCheckBox("All") }></i>
                        </label>
                        <span>Select All</span>
                    </div>
                    <ol ui-tree-nodes="" ng-model="docInfo.organ" ng-show="docInfo.organ.length > 0" className="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty">  
                        { this.props.tMembers.map(member => 
                        {
                            return(
                                <MemberComponent clickCheckBox = {this.props.clickCheckBox} userId = {member.userId} userName = {member.userName} master = {this.props.master}/>
                            )
                        })}
                        {checkoutAuthListComponent}
                        {viewAuthListComponent}
                        {checkoutDeptAuthListComponent}
                        {viewDeptAuthListComponent}
                    </ol>
                </React.Fragment>
            );
        } else if (memberListType == 'selected') {
            return (
                <ol ui-tree-nodes="" ng-model="inviteMembers" ng-show="inviteMembers.length > 0" className="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty">
                    {this.props.tMembers.map(member => 
                    {
                        return(
                            <li ng-repeat="member in inviteMembers | orderBy:['-disabled', 'userName']" ui-tree-node="" data-collapsed="true" className="ng-scope angular-ui-tree-node" expand-on-hover="false">
                                <div wrapmsgr-user-profile="users[member.userId] || member.userId" className="ng-isolate-scope">
                                    <span className="user-photo ng-binding ng-isolate-scope no-photo green">{getShortName(member.userName)}</span>
                                    <span className="wrapmsgr_member ng-binding">
                                        {member.userName}
                                        <a href=""></a>
                                    </span>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            );
        }
    }
}

export default MemberList;


