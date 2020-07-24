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


class MemberList extends React.Component<Props>{
    constructor(props: Props) {
        super(props);
    }
    expandDept = () => {

    }// 부서 펼침
    
    render() {
        const { memberListType, convoId} = this.props
        console.log("dksl dho dksskdhk wlsWK ghksk!!!!!!!!")
        console.log(this.props.checkoutAuthList)

        let checkoutAuthListComponent;
        let checkoutDeptAuthListComponent;
        let viewAuthListComponent;
        let viewDeptAuthListComponent;

        if(this.props.checkoutAuthList){
            checkoutAuthListComponent = 
                this.props.checkoutAuthList.map(member => 
                {
                    return(
                        <li ng-repeat="node in docInfo.organ" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" className="ng-scope angular-ui-tree-node" expand-on-hover="false">
                            <div className="organ_wrapper ng-scope">
                                <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
                                    <input type="checkbox" id="member-lunarcell9object:891" ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)" />
                                    <label htmlFor="member-lunarcell9object:891" data-nodrag="">
                                        <i className="icon_checkbox" ng-class="{disabled: node.disabled}" ></i>
                                    </label>
                                </span>
                                <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" className="ng-isolate-scope">
                                    <span className="user-photo ng-binding ng-isolate-scope no-photo cyan">{getShortName(member.userName)}</span>
                                    <span className="wrapmsgr_member ng-binding">{member.userName}</span>
                                </div>
                                <span className="wrapmsgr_master ng-hide" ng-show="node.value == docInfo.detail.masterUserId">Owner</span>
                                <ol ui-tree-nodes="" ng-model="node.subTree" ng-class="{expanded: !collapsed}" className="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-empty">
                                </ol>
                            </div>
                        </li>
                    )
                })       
        }
        if(this.props.checkoutDeptAuthList){
            checkoutDeptAuthListComponent = 
                this.props.checkoutDeptAuthList.map(dept => 
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
        if(this.props.viewAuthList){
            viewAuthListComponent =  
                this.props.viewAuthList.map(member => 
                {
                    return(
                        <li ng-repeat="node in docInfo.organ" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" className="ng-scope angular-ui-tree-node" expand-on-hover="false">
                            <div className="organ_wrapper ng-scope">
                                <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
                                    <input type="checkbox" id="member-lunarcell9object:891" ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)" />
                                    <label htmlFor="member-lunarcell9object:891" data-nodrag="">
                                        <i className="icon_checkbox" ng-class="{disabled: node.disabled}" onClick = {this.props.clickCheckBox("Member")}></i>
                                    </label>
                                </span>
                                <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" className="ng-isolate-scope">
                                    <span className="user-photo ng-binding ng-isolate-scope no-photo cyan">{getShortName(member.userName)}</span>
                                    <span className="wrapmsgr_member ng-binding">{member.userName}</span>
                                </div>
                                <span className="wrapmsgr_master ng-hide" ng-show="node.value == docInfo.detail.masterUserId">Owner</span>
                                <ol ui-tree-nodes="" ng-model="node.subTree" ng-class="{expanded: !collapsed}" className="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-empty">
                                </ol>
                            </div>
                        </li>
                    )
                })
        }
        if(this.props.viewDeptAuthList){
            viewDeptAuthListComponent = 
                this.props.viewDeptAuthList.map(dept => 
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
                        { 
                        this.props.tMembers.map(member => 
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
                        {/* 1. 이미 채팅방에 포함된 멤버 */}
                        { checkoutAuthListComponent }
                        {/* 2. checkout권한 가진 멤버 */}
                        { viewAuthListComponent}
                        {/* 3. view권한 가진 멤버 */}
                        { checkoutDeptAuthListComponent }
                        {/* 3. checkout 권한 가진 부서 */}
                        { viewDeptAuthListComponent }
                        {/* 4. view 권한 가진 부서 */}
                        {/* 5. Fasso.com 나중에 추가할거임*/}
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



// <li ng-repeat="node in docInfo.organ" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" class="ng-scope angular-ui-tree-node" expand-on-hover="false" style="">
//     <div class="organ_wrapper ng-scope">
//         <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
//             <input type="checkbox" id="member-lunarcell9object:891" ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)">
//             <label for="member-lunarcell9object:891" data-nodrag="">
//                 <i class="icon_checkbox" ng-class="{disabled: node.disabled}"></i>
//             </label>
//         </span>
//         <!-- ngIf: node.type === 'dept' -->
//         <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" class="ng-isolate-scope">
//             <span class="user-photo ng-binding ng-isolate-scope no-photo cyan" user="{userName: node.columnText, userId: node.value, type: node.type}" "="">주훈</span>
//             <span class="wrapmsgr_member ng-binding">김주훈</span>
//         </div>
//         <span class="wrapmsgr_master ng-hide" ng-show="node.value == docInfo.detail.masterUserId">Owner</span>
//         <ol ui-tree-nodes="" ng-model="node.subTree" ng-class="{expanded: !collapsed}" class="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-empty">
//             <!-- ngRepeat: node in node.subTree -->
//         </ol>
//     </div>
// </li>



// <li ng-repeat="node in docInfo.organ" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" class="ng-scope angular-ui-tree-node selected" expand-on-hover="false">
//     <div class="organ_wrapper ng-scope">
//         <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
//             <input type="checkbox" id="member-minjiobject:890" ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)" disabled="disabled" checked="checked">
//             <label for="member-minjiobject:890" data-nodrag="">
//                 <i class="icon_checkbox disabled" ng-class="{disabled: node.disabled}"></i>
//             </label>
//         </span>
//         <!-- ngIf: node.type === 'dept' -->
//         <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" class="ng-isolate-scope">
//             <span class="user-photo ng-binding ng-isolate-scope no-photo cyan" user="{userName: node.columnText, userId: node.value, type: node.type}" "="">민지</span>
//             <span class="wrapmsgr_member ng-binding">김민지</span>
//         </div>
//         <span class="wrapmsgr_master ng-hide" ng-show="node.value == docInfo.detail.masterUserId">Owner</span>
//         <ol ui-tree-nodes="" ng-model="node.subTree" ng-class="{expanded: !collapsed}" class="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-empty">
//             <!-- ngRepeat: node in node.subTree -->
//         </ol>
//     </div>
// </li>


// {/* <li ng-repeat="node in docInfo.organ" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" className="ng-scope angular-ui-tree-node selected" expand-on-hover="false">
//                             <div className="organ_wrapper ng-scope">
//                                 <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
//                                     <input type="checkbox" id="member-yhj2object:2026" ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)"/>
//                                     <label htmlFor="member-yhj2object:2026" data-nodrag="">
//                                         <i className="icon_checkbox disabled" ng-class="{disabled: node.disabled}"></i>
//                                     </label>
//                                 </span>
//                                 <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" className="ng-isolate-scope">
//                                     <span className="user-photo ng-binding ng-isolate-scope no-photo purple">{getShortName(member.userName)}</span>
//                                     <span className="wrapmsgr_member ng-binding">{member.userName}</span>
//                                 </div>
//                                 <span className="wrapmsgr_master" ng-show="node.value == docInfo.detail.masterUserId">Owner</span>
//                                 <ol ui-tree-nodes="" ng-model="node.subTree" ng-class="{expanded: !collapsed}" className="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-empty">
//                                 </ol>
//                             </div>
//                         </li> */}