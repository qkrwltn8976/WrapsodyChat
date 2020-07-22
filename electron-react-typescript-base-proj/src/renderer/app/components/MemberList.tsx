import * as React from 'react';
import { Member } from '../../models/Member';
import { getShortName } from '../../libs/messengerLoader';
import TreeMenu from 'react-simple-tree-menu';

interface Group {
    longName: string;
    shortName: string;
}

interface Props {
    memberListType: string;
    convoId?: string;
    search:string;
    members?: Member[];
    treeData?: any;
}


class MemberList extends React.Component<Props>{


    constructor(props: Props) {
        super(props);
    }
    render() {
        const { memberListType, convoId } = this.props;
        if (memberListType == 'chat') {
            return (
                <ul id="forMemberList">
                    {this.props.members.map(member => 
                    
                    {
                        if(member.userName&& this.props.search === null || member.userName.toLowerCase().includes(this.props.search.toLowerCase()) || member.userId.toLowerCase().includes(this.props.search.toLowerCase())) {
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
                // <ol ui-tree-nodes="" ng-model="docInfo.organ" ng-show="docInfo.organ.length > 0" className="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty">
                //     {
                        // members.map( member => 
                        //     <li ng-repeat="node in docInfo.organ" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" className="ng-scope angular-ui-tree-node" expand-on-hover="false">
                        //         <div className="organ_wrapper ng-scope">
                        //             <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
                        //                 <input type="checkbox" id="member-maverickobject:3299" ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)"/>
                        //                 <label htmlFor="member-maverickobject:3299" data-nodrag="">
                        //                     <i className="icon_checkbox" ng-class="{disabled: node.disabled}"></i>
                        //                 </label>
                        //             </span>
                        //             <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" className="ng-isolate-scope">
                        //                 <span className="user-photo ng-binding ng-isolate-scope no-photo yellow">{member.shortName}</span>
                        //                 <span className="wrapmsgr_member ">{member.longName}</span>
                        //             </div>
                        //             <span className="wrapmsgr_master " >Owner</span>
                        //             {/* <ol ui-tree-nodes=""  ng-class="{expanded: !collapsed}" className="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ">
                        //             </ol> */}
                        //         </div>
                        //     </li>
                        // )
                    // }
                    // {
                        // groups.map( group =>
                        //     <li ng-repeat="node in docInfo.organ" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" className="ng-scope angular-ui-tree-node" expand-on-hover="false">
                        //         <div className="organ_wrapper ng-scope">
                        //             <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
                        //                 <input type="checkbox" id="member-2300100object:3300" ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)"/>
                        //                     <label htmlFor="member-2300100object:3300" data-nodrag="">
                        //                         <i className="icon_checkbox" ng-class="{disabled: node.disabled}"></i>
                        //                     </label>
                        //             </span>
                        //             <span className="wrapmsgr_treeicon ng-scope" data-nodrag="" ng-click="toggleOrgan(this)" ng-if="node.type === 'dept'" ng-style="!node.hasChildren &amp;&amp; {'visibility': 'hidden', 'cursor': 'auto'}">
                        //                 <i className="icon_triangle wrapmsgr_collapse" ng-class="{true: 'wrapmsgr_collapse', false: 'wrapmsgr_expand'}[collapsed]"></i>
                        //             </span>
                        //             <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" className="ng-isolate-scope">
                        //                 <span className="user-photo ng-binding ng-isolate-scope group no-photo green">{group.shortName}</span>
                        //                 <span className="wrapmsgr_member ng-binding">{group.longName}</span>
                        //             </div>
                        //             <span className="wrapmsgr_master ng-hide" ng-show="node.value == docInfo.detail.masterUserId">Owner</span>
                        //             <ol ui-tree-nodes="" ng-model="node.subTree" ng-class="{expanded: !collapsed}" className="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty">
                        //             </ol>
                        //         </div>
                        //     </li>
                        // )
                //     }
                // </ol>
                <TreeMenu hasSearch = {false} data = {this.props.treeData}/>
            );
        } else if (memberListType == 'selected') {
            return (
                <ol ui-tree-nodes="" className="angular-ui-tree-nodes">
                    {
                        // members.map(member => (
                        //     <li ng-repeat="member in inviteMembers | orderBy:['-disabled', 'userName']" ui-tree-node="" data-collapsed="true" className="angular-ui-tree-node" expand-on-hover="false">
                        //         <div wrapmsgr-user-profile="users[member.userId] || member.userId" className="ng-isolate-scope">
                        //             <span className="user-photo no-photo cyan">{member.shortName}</span>
                        //             <span className="wrapmsgr_member">
                        //                 {member.dept}
                        //                 <a href=""></a>
                        //             </span>
                        //         </div>
                        //     </li>
                        // ))
                    }
                </ol>
            );
        }
    }
}

export default MemberList;



// <div class="wrapmsgr_organ_tree ng-scope angular-ui-tree" ui-tree="organTreeOptions" data-clone-enabled="true" data-nodrop-enabled="true" data-drag-delay="100">
//     <div class="wrapmsgr_organ_tree_header">
//         <input type="checkbox" id="manage_doc_room_select_all" ng-disabled="!loggedIn || organTreeOptions.disabled" ng-checked="checkAllMembers()" ng-click="toggleAllMembers($event)"/>
//         <label for="manage_doc_room_select_all">
//             <i class="icon_checkbox" ng-class="{disabled: organTreeOptions.disabled}" style=""></i>
//         </label>
//         <span>Select All</span>
// 	</div>
//     <ol ui-tree-nodes="" ng-model="docInfo.organ" ng-show="docInfo.organ.length > 0" class="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty" style="">
//        {/* members에서 돌면서 li처리 */}
//         <li ng-repeat="node in docInfo.organ" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" class="ng-scope angular-ui-tree-node" expand-on-hover="false">
//             <div class="organ_wrapper ng-scope">
//                 <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
//                     <input type="checkbox" id="member-maverickobject:3299" ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)">
//                         <label for="member-maverickobject:3299" data-nodrag="">
//                             <i class="icon_checkbox" ng-class="{disabled: node.disabled}"></i>
//                         </label>
//                 </span>
//                     <!-- ngIf: node.type === 'dept' -->
//                 <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" class="ng-isolate-scope">
//                         <span class="user-photo ng-binding ng-isolate-scope no-photo yellow" user="{userName: node.columnText, userId: node.value, type: node.type}" "="">영민</span>
//                     <span class="wrapmsgr_member ng-binding">윤영민</span>
//                 </div>
//                 <span class="wrapmsgr_master" ng-show="node.value == docInfo.detail.masterUserId">Owner</span>
//                 <ol ui-tree-nodes="" ng-model="node.subTree" ng-class="{expanded: !collapsed}" class="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-empty">
//                     <!-- ngRepeat: node in node.subTree -->
//                 </ol>
//             </div>
//         </li><!-- end ngRepeat: node in docInfo.organ --><!-- ngInclude: 'organ_renderer' -->

//         {/* 멤버끝, 그룹시작 */}

//         <li ng-repeat="node in docInfo.organ" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" className="ng-scope angular-ui-tree-node" expand-on-hover="false">
//             <div className="organ_wrapper ng-scope">
//                 <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
//                     <input type="checkbox" id="member-2300100object:3300" ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)"/>
//                         <label htmlFor="member-2300100object:3300" data-nodrag="">
//                             <i className="icon_checkbox" ng-class="{disabled: node.disabled}"></i>
//                         </label>
//                 </span>
//                 <span className="wrapmsgr_treeicon ng-scope" data-nodrag="" ng-click="toggleOrgan(this)" ng-if="node.type === 'dept'" ng-style="!node.hasChildren &amp;&amp; {'visibility': 'hidden', 'cursor': 'auto'}">
//                     <i className="icon_triangle wrapmsgr_collapse" ng-class="{true: 'wrapmsgr_collapse', false: 'wrapmsgr_expand'}[collapsed]"></i>
//                 </span><!-- end ngIf: node.type === 'dept' -->
//                 <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" className="ng-isolate-scope">
//                     <span className="user-photo ng-binding ng-isolate-scope group no-photo green">{group.shortName}</span>
//                     <span className="wrapmsgr_member ng-binding">{group.longName}</span>
//                 </div>
//                 <span className="wrapmsgr_master ng-hide" ng-show="node.value == docInfo.detail.masterUserId">Owner</span>
//                 <ol ui-tree-nodes="" ng-model="node.subTree" ng-class="{expanded: !collapsed}" className="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty">
//                 </ol>
//             </div>
//         </li>


//         <li ng-repeat="node in docInfo.organ" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" class="ng-scope angular-ui-tree-node" expand-on-hover="false">
//             <div class="organ_wrapper ng-scope">
//                 <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
//                     <input type="checkbox" id="member-3100400object:3301" ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)">
//                         <label for="member-3100400object:3301" data-nodrag="">
//                             <i class="icon_checkbox" ng-class="{disabled: node.disabled}"></i>
//                         </label>
//                 </span>
//                     <!-- ngIf: node.type === 'dept' --><span class="wrapmsgr_treeicon ng-scope" data-nodrag="" ng-click="toggleOrgan(this)" ng-if="node.type === 'dept'" ng-style="!node.hasChildren &amp;&amp; {'visibility': 'hidden', 'cursor': 'auto'}">
//                         <i class="icon_triangle wrapmsgr_collapse" ng-class="{true: 'wrapmsgr_collapse', false: 'wrapmsgr_expand'}[collapsed]"></i>
//                     </span><!-- end ngIf: node.type === 'dept' -->
//                 <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" class="ng-isolate-scope">
//                         <span class="user-photo ng-binding ng-isolate-scope group no-photo red" user="{userName: node.columnText, userId: node.value, type: node.type}" "="">랩소</span>
//                     <span class="wrapmsgr_member ng-binding">랩소디개발팀</span>
//                 </div>
//                 <span class="wrapmsgr_master ng-hide" ng-show="node.value == docInfo.detail.masterUserId">Owner</span>
//                 <ol ui-tree-nodes="" ng-model="node.subTree" ng-class="{expanded: !collapsed}" class="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty">
//                     <!-- ngRepeat: node in node.subTree -->
//                 </ol>
//             </div>
//         </li><!-- end ngRepeat: node in docInfo.organ --><!-- ngInclude: 'organ_renderer' -->


//         <li ng-repeat="node in docInfo.organ" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" class="ng-scope angular-ui-tree-node" expand-on-hover="false">
//             <div class="organ_wrapper ng-scope">
//                 <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
//                     <input type="checkbox" id="member-3100500object:3302" ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)">
//                         <label for="member-3100500object:3302" data-nodrag="">
//                             <i class="icon_checkbox" ng-class="{disabled: node.disabled}"></i>
//                         </label>
//                 </span>
//                     <!-- ngIf: node.type === 'dept' --><span class="wrapmsgr_treeicon ng-scope" data-nodrag="" ng-click="toggleOrgan(this)" ng-if="node.type === 'dept'" ng-style="!node.hasChildren &amp;&amp; {'visibility': 'hidden', 'cursor': 'auto'}">
//                         <i class="icon_triangle wrapmsgr_collapse" ng-class="{true: 'wrapmsgr_collapse', false: 'wrapmsgr_expand'}[collapsed]"></i>
//                     </span><!-- end ngIf: node.type === 'dept' -->
//                 <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" class="ng-isolate-scope">
//                         <span class="user-photo ng-binding ng-isolate-scope group no-photo red" user="{userName: node.columnText, userId: node.value, type: node.type}" "="">클라</span>
//                     <span class="wrapmsgr_member ng-binding">클라우드개발팀</span>
//                 </div>
//                 <span class="wrapmsgr_master ng-hide" ng-show="node.value == docInfo.detail.masterUserId">Owner</span>
//                 <ol ui-tree-nodes="" ng-model="node.subTree" ng-class="{expanded: !collapsed}" class="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty">
//                     <!-- ngRepeat: node in node.subTree -->
//                 </ol>
//             </div>
//         </li><!-- end ngRepeat: node in docInfo.organ --><!-- ngInclude: 'organ_renderer' -->


//         <li ng-repeat="node in docInfo.organ" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" class="ng-scope angular-ui-tree-node" expand-on-hover="false">
//             <div class="organ_wrapper ng-scope">
//                 <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
//                     <input type="checkbox" id="member-3100100object:3303" ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)">
//                         <label for="member-3100100object:3303" data-nodrag="">
//                             <i class="icon_checkbox" ng-class="{disabled: node.disabled}"></i>
//                         </label>
//                 </span>
//                     <!-- ngIf: node.type === 'dept' --><span class="wrapmsgr_treeicon ng-scope" data-nodrag="" ng-click="toggleOrgan(this)" ng-if="node.type === 'dept'" ng-style="!node.hasChildren &amp;&amp; {'visibility': 'hidden', 'cursor': 'auto'}">
//                         <i class="icon_triangle wrapmsgr_collapse" ng-class="{true: 'wrapmsgr_collapse', false: 'wrapmsgr_expand'}[collapsed]"></i>
//                     </span><!-- end ngIf: node.type === 'dept' -->
//                 <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" class="ng-isolate-scope">
//                         <span class="user-photo ng-binding ng-isolate-scope group no-photo red" user="{userName: node.columnText, userId: node.value, type: node.type}" "="">질팀</span>
//                     <span class="wrapmsgr_member ng-binding">품질팀</span>
//                 </div>
//                 <span class="wrapmsgr_master ng-hide" ng-show="node.value == docInfo.detail.masterUserId">Owner</span>
//                 <ol ui-tree-nodes="" ng-model="node.subTree" ng-class="{expanded: !collapsed}" class="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty">
//                     <!-- ngRepeat: node in node.subTree -->
//                 </ol>
//             </div>
//         </li><!-- end ngRepeat: node in docInfo.organ -->
//     </ol>
// </div>