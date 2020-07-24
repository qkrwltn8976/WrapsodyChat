import * as React from 'react';
import { Member } from '../../models/Member';
import { getShortName } from '../../libs/messengerLoader';
import { TreeUser } from '../../models/TreeUser';
import { TreeDept } from '../../models/TreeDept';


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
    checkoutAuthList?: TreeUser[];
    checkoutDeptAuthList?: TreeDept[];
    viewAuthList?: TreeUser[];
    viewDeptAuthList?: TreeDept[];
    tMembers?: TreeUser[];
}
// var checkoutAuthListData = [
//     {"userId":"admin","userName":"administrator","password":null},
//     {"userId":"lunarcell9","userName":"김주훈","password":null},
//     {"userId":"mhkang","userName":" ","password":null},
//     {"userId":"minji","userName":"김민지","password":null},
//     {"userId":"nas1","userName":" ","password":null},
//     {"userId":"nas2","userName":" ","password":null},
//     {"userId":"sangwon.jo","userName":"조상원","password":null},
//     {"userId":"yhj","userName":"양현준","password":null}
// ]
var checkoutDeptAuthListData = [
    {"deptCode":"b04bb21edf184ab8b3e9d79b709fde33","deptName":"EDP개발팀","managerId":null,"managerName":null}
]
// var viewAuthListData = [

// ]
// var viewAuthListData = [

// ]
var membersData = [
    {"createdAt":1572934295000,"updatedAt":1595394002000,"userId":"admin","convoType":1,"readAt":1595399817957,"notificationType":1,"userName":"administrator"},
    {"createdAt":1572934295000,"updatedAt":1594974917000,"userId":"minji","convoType":1,"readAt":1594974917884,"notificationType":1,"userName":"김민지"},
    {"createdAt":1572934295000,"updatedAt":1572934295000,"userId":"sangwon.jo","convoType":1,"readAt":null,"notificationType":1,"userName":"조상원"}
]

class MemberList extends React.Component<Props>{
    constructor(props: Props) {
        super(props);
    }
    expandDept = () =>{

    }// 부서 펼침
    render() {
        const { memberListType, convoId} = this.props
        // console.log("props잘 넘어오는지 확인!!!!!!!!!!!!!!!!!!!!!!!!!!!1")
        // console.log(this.props.tMembers)
        // console.log(this.props.checkoutAuthList)
        // console.log(this.props.checkoutDeptAuthList)

        if (memberListType == 'chat' || this.props.members) {
            return (
                <ul id="forMemberList">
                    {this.props.members.map(member => 
                    {
                        if(member.userName && (this.props.search === null || member.userName.toLowerCase().includes(this.props.search.toLowerCase()) || member.userId.toLowerCase().includes(this.props.search.toLowerCase()))) {
                        return(<li ng-repeat="member in current.members | memberFilter:search.user:users | orderBy:'userName'" ng-class="{'has-grn-dot': false, 'has-red-dot': false}" wrapmsgr-user-profile="users[member.userId]" className="ng-scope ng-isolate-scope">
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
                        <input type="checkbox" id="manage_doc_room_select_all" ng-disabled="!loggedIn || organTreeOptions.disabled" ng-checked="checkAllMembers()" ng-click="toggleAllMembers($event)"/>
                        <label htmlFor="manage_doc_room_select_all">
                            <i className="icon_checkbox" ng-class="{disabled: organTreeOptions.disabled}" onClick={this.props.clickCheckBox("All") }></i>
                        </label>
                        <span>Select All</span>
                    </div> 
                    <ol ui-tree-nodes="" ng-model="docInfo.organ" ng-show="docInfo.organ.length > 0" className="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty">  
                        {this.props.tMembers.map(member => 
                        {
                            return(
                                <li ng-repeat="node in docInfo.organ" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" className="ng-scope angular-ui-tree-node selected" expand-on-hover="false">
                                    <div className="organ_wrapper ng-scope">
                                        <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
                                            <input type="checkbox" id="member-yhj2object:2026" ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)"/>
                                            <label htmlFor="member-yhj2object:2026" data-nodrag="">
                                                <i className="icon_checkbox disabled" ng-class="{disabled: node.disabled}"></i>
                                            </label>
                                        </span>
                                        <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" className="ng-isolate-scope">
                                            <span className="user-photo ng-binding ng-isolate-scope no-photo purple">{getShortName(member.userName)}</span>
                                            <span className="wrapmsgr_member ng-binding">{member.userName}</span>
                                        </div>
                                        <span className="wrapmsgr_master" ng-show="node.value == docInfo.detail.masterUserId">Owner</span>
                                        <ol ui-tree-nodes="" ng-model="node.subTree" ng-class="{expanded: !collapsed}" className="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-empty">
                                        </ol>
                                    </div>
                                </li>
                            )
                        })}
                        {/* 이미 채팅방에 포함된 멤버 */}
                        {
                            checkoutDeptAuthListData.map(dept => 
                            {
                                return(
                                    <li ng-repeat="node in docInfo.organ" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" className="ng-scope angular-ui-tree-node" expand-on-hover="false">
                                        <div className="organ_wrapper ng-scope">
                                            <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
                                                <input type="checkbox" id="member-6d167acbb24a4841921986701622842dobject:2027" ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)"/>
                                                <label htmlFor="member-6d167acbb24a4841921986701622842dobject:2027" data-nodrag="">
                                                    <i className="icon_checkbox" ng-class="{disabled: node.disabled}" onClick={this.props.clickCheckBox("Dept")}></i>
                                                </label>
                                            </span>
                                            <span className="wrapmsgr_treeicon ng-scope" data-nodrag="" ng-click="toggleOrgan(this)" ng-if="node.type === 'dept'" ng-style="!node.hasChildren &amp;&amp; {'visibility': 'hidden', 'cursor': 'auto'}">
                                                <i className="icon_triangle wrapmsgr_collapse" ng-class="{true: 'wrapmsgr_collapse', false: 'wrapmsgr_expand'}[collapsed]" onClick = {this.expandDept}></i>
                                            </span>
                                            <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" className="ng-isolate-scope">
                                                <span className="user-photo ng-binding ng-isolate-scope group no-photo green">{getShortName(dept.deptName)}</span>
                                                <span className="wrapmsgr_member ng-binding">{dept.deptName}</span>
                                            </div>
                                            <span className="wrapmsgr_master ng-hide" ng-show="node.value == docInfo.detail.masterUserId">Owner</span>
                                            <ol ui-tree-nodes="" ng-model="node.subTree" ng-class="{expanded: !collapsed}" className="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty">
                                                <li>ddd</li>
                                                <li>ddd</li>
                                            </ol>
                                        </div>
                                    </li>
                                )
                            })
                        }
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

