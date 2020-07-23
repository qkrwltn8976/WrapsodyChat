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
    search?:string;
    members?: Member[];
    treeData?: any;
    clickCheckBox? : any;
}


class MemberList extends React.Component<Props, ClickState>{
    

    constructor(props: Props) {
        super(props);
    }
    render() {
        const { memberListType, convoId } = this.props;
        var organ_tree_calc_width = { width: 'calc(100% - 300px)' };
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
                    <div className="wrapmsgr_organ_tree ng-scope angular-ui-tree" ui-tree="organTreeOptions" data-clone-enabled="true" data-nodrop-enabled="true" data-drag-delay="100" style = {organ_tree_calc_width}>
                        <div className="wrapmsgr_organ_tree_header">
                            <input type="checkbox" id="manage_doc_room_select_all" ng-disabled="!loggedIn || organTreeOptions.disabled" ng-checked="checkAllMembers()" ng-click="toggleAllMembers($event)"/>
                            <label htmlFor="manage_doc_room_select_all">
                                <i className="icon_checkbox" ng-class="{disabled: organTreeOptions.disabled}" onClick={this.props.clickCheckBox("All") }></i>
                            </label>
                            <span>Select All</span>
                        </div>
                        <ol ui-tree-nodes="" ng-model="docInfo.organ" ng-show="docInfo.organ.length > 0" className="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty">  
                            <li ng-repeat="node in docInfo.organ" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" className="ng-scope angular-ui-tree-node selected" expand-on-hover="false">
                                <div className="organ_wrapper ng-scope">
                                    <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
                                        <input type="checkbox" id="member-yhj2object:2026" ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)"/>
                                        <label htmlFor="member-yhj2object:2026" data-nodrag="">
                                            <i className="icon_checkbox disabled" ng-class="{disabled: node.disabled}" onClick={this.props.clickCheckBox("Member")}></i>
                                        </label>
                                    </span>
                                    <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" className="ng-isolate-scope">
                                        <span className="user-photo ng-binding ng-isolate-scope no-photo purple">양현</span>
                                        <span className="wrapmsgr_member ng-binding">양현준B</span>
                                    </div>
                                    <span className="wrapmsgr_master" ng-show="node.value == docInfo.detail.masterUserId">Owner</span>
                                    <ol ui-tree-nodes="" ng-model="node.subTree" ng-class="{expanded: !collapsed}" className="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-empty">
                                    </ol>
                                </div>
                            </li>
                            {/* 멤버 */}
                            <li ng-repeat="node in docInfo.organ" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" className="ng-scope angular-ui-tree-node" expand-on-hover="false">
                                <div className="organ_wrapper ng-scope">
                                    <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
                                        <input type="checkbox" id="member-6d167acbb24a4841921986701622842dobject:2027" ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)"/>
                                        <label htmlFor="member-6d167acbb24a4841921986701622842dobject:2027" data-nodrag="">
                                            <i className="icon_checkbox" ng-class="{disabled: node.disabled}" onClick={this.props.clickCheckBox("Dept")}></i>
                                        </label>
                                    </span>
                                    <span className="wrapmsgr_treeicon ng-scope" data-nodrag="" ng-click="toggleOrgan(this)" ng-if="node.type === 'dept'" ng-style="!node.hasChildren &amp;&amp; {'visibility': 'hidden', 'cursor': 'auto'}">
                                        <i className="icon_triangle wrapmsgr_collapse" ng-class="{true: 'wrapmsgr_collapse', false: 'wrapmsgr_expand'}[collapsed]"></i>
                                    </span>
                                    <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" className="ng-isolate-scope">
                                        <span className="user-photo ng-binding ng-isolate-scope group no-photo green">DT</span>
                                        <span className="wrapmsgr_member ng-binding">Dain Team</span>
                                    </div>
                                    <span className="wrapmsgr_master ng-hide" ng-show="node.value == docInfo.detail.masterUserId">Owner</span>
                                    <ol ui-tree-nodes="" ng-model="node.subTree" ng-class="{expanded: !collapsed}" className="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty">
                                    <li>ddd</li>
                                    <li>ddd</li>
                                    </ol>
                                </div>
                            </li>
                        </ol>
                    </div> 
                </React.Fragment>
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


 {/* <TreeMenu hasSearch = {false} data = {this.props.treeData}/> */}




//  $scope.checkAllMembers = function() {
//     if (!$scope.docInfo || !$scope.docInfo.organ) {
//         return false;
//     }
    
//     var result = $scope.docInfo.organ.every(function(node) {
//         return $scope.isInviteMembers(node, false) >= 0;
//     });
    
//     $scope.organTreeOptions.disabled = $scope.docInfo.organ.every(function(node) {
//         return node.disabled;
//     });
    
//     return result;
// };

// $scope.toggleAllMembers = function($event) {
    
//     if ($event.currentTarget.checked) {
//         addChildrenToInviteMembers($scope.docInfo.organ);
//     } else {
//         $scope.removeAllInviteMembers();
//     }
    
// };
