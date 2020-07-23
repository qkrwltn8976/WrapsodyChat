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
var checkoutAuthListData = [
    {"userId":"admin","userName":"administrator","password":null},
    {"userId":"lunarcell9","userName":"김주훈","password":null},
    {"userId":"mhkang","userName":" ","password":null},
    {"userId":"minji","userName":"김민지","password":null},
    {"userId":"nas1","userName":" ","password":null},
    {"userId":"nas2","userName":" ","password":null},
    {"userId":"sangwon.jo","userName":"조상원","password":null},
    {"userId":"yhj","userName":"양현준","password":null}
]
var checkoutDeptAuthListData = [
    {"deptCode":"b04bb21edf184ab8b3e9d79b709fde33","deptName":"EDP개발팀","managerId":null,"managerName":null}
]
var viewAuthListData = [

]
var viewAuthListData = [

]
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
        const { memberListType, convoId } = this.props;
        
        
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
                        membersData.map(member => 
                        {
                            return(
                                <li ng-repeat="node in docInfo.organ" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" className="ng-scope angular-ui-tree-node selected" expand-on-hover="false">
                                    <div className="organ_wrapper ng-scope">
                                        <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
                                            <input type="checkbox" id="member-yhj2object:2026" ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)"/>
                                            <label htmlFor="member-yhj2object:2026" data-nodrag="">
                                                <i className="icon_checkbox disabled" ng-class="{disabled: node.disabled}" onClick={this.props.clickCheckBox("Member")}></i>
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
                        })
                        }
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
                                    <i className="icon_triangle wrapmsgr_collapse" ng-class="{true: 'wrapmsgr_collapse', false: 'wrapmsgr_expand'}[collapsed]" onClick = {this.expandDept}></i>
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
                </React.Fragment>
            );
        } else if (memberListType == 'selected') {
            return (
                <ol ui-tree-nodes="" ng-model="inviteMembers" ng-show="inviteMembers.length > 0" className="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty">
                    {
                        membersData.map(member => {
                            return(
                                <li ng-repeat="member in inviteMembers | orderBy:['-disabled', 'userName']" ui-tree-node="" data-collapsed="true" className="ng-scope angular-ui-tree-node" expand-on-hover="false">
                                    <div wrapmsgr-user-profile="users[member.userId] || member.userId" className="ng-isolate-scope">
                                        <span className="user-photo ng-binding ng-isolate-scope no-photo green">{getShortName(member.userName)}</span>
                                        <span className="wrapmsgr_member ng-binding">
                                            랩소디
                                            <a href=""></a>
                                        </span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ol>
            );
        }
    }
}

export default MemberList;



<li ng-repeat="node in docInfo.organ" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="false" ng-include="'organ_renderer'" class="ng-scope angular-ui-tree-node" expand-on-hover="false" >
    <div className="organ_wrapper ng-scope">
        <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
            <input type="checkbox" id="member-34397c16f61548abb2b99c448f60d1a7object:909" ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)"/>
            <label htmlFor="member-34397c16f61548abb2b99c448f60d1a7object:909" data-nodrag="">
                <i className="icon_checkbox" ng-class="{disabled: node.disabled}"></i>
            </label>
        </span>
		<span className="wrapmsgr_treeicon ng-scope" data-nodrag="" ng-click="toggleOrgan(this)" ng-if="node.type === 'dept'" ng-style="!node.hasChildren &amp;&amp; {'visibility': 'hidden', 'cursor': 'auto'}">
            <i className="icon_triangle wrapmsgr_expand" ng-class="{true: 'wrapmsgr_collapse', false: 'wrapmsgr_expand'}[collapsed]" ></i>
        </span><!-- end ngIf: node.type === 'dept' -->
        <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" className="ng-isolate-scope">
            <span className="user-photo ng-binding ng-isolate-scope group no-photo red" >SP</span>
            <span className="wrapmsgr_member ng-binding">S P</span>
        </div>
		<span className="wrapmsgr_master ng-hide" ng-show="node.value == docInfo.detail.masterUserId">Owner</span>
        // 여기까지 상위 부서 셀(SP level0)
        ol에 하위로 초록 01부서랑 품질팀 넣음 
		<ol ui-tree-nodes="" ng-model="node.subTree" ng-class="{expanded: !collapsed}" className="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty expanded" >
			아래가 01 초록팀 초록팀에도 하위 있음 ol에 다시 넣음
            <li ng-repeat="node in node.subTree" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="false" ng-include="'organ_renderer'" className="ng-scope angular-ui-tree-node" expand-on-hover="false" >
				<div className="organ_wrapper ng-scope">
					<span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
						<input type="checkbox" id="member-826e574dff284529b70df6a1f3d25855object:921" ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)"/>
						<label htmlFor="member-826e574dff284529b70df6a1f3d25855object:921" data-nodrag="">
							<i className="icon_checkbox" ng-class="{disabled: node.disabled}"></i>
						</label>
					</span>
					<span className="wrapmsgr_treeicon ng-scope" data-nodrag="" ng-click="toggleOrgan(this)" ng-if="node.type === 'dept'" ng-style="!node.hasChildren &amp;&amp; {'visibility': 'hidden', 'cursor': 'auto'}">
						<i className="icon_triangle wrapmsgr_expand" ng-class="{true: 'wrapmsgr_collapse', false: 'wrapmsgr_expand'}[collapsed]" ></i>
					</span>
					<div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" className="ng-isolate-scope">
						<span className="user-photo ng-binding ng-isolate-scope group no-photo cyan">01</span>
						<span className="wrapmsgr_member ng-binding">012345678901234567890123456789012345678901234567890123456789</span>
					</div>
					<span className="wrapmsgr_master ng-hide" ng-show="node.value == docInfo.detail.masterUserId">Owner</span>
                    빨강 01네모, 분홍 01 동그라미 li도로 들어간다.
					<ol ui-tree-nodes="" ng-model="node.subTree" ng-class="{expanded: !collapsed}" className="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty expanded" >
                        <li ng-repeat="node in node.subTree" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" className="ng-scope angular-ui-tree-node selected" expand-on-hover="false" >
                            <div className="organ_wrapper ng-scope">
                                <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}" style={visibility : hidden}>
                                    <input type="checkbox" id="member-c098ed076b6c4bc7b34979ef1f87842bobject:941" ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)" checked="checked">
                                    <label htmlFor="member-c098ed076b6c4bc7b34979ef1f87842bobject:941" data-nodrag="">
                                        <i className="icon_checkbox" ng-class="{disabled: node.disabled}"></i>
                                    </label>
                                </span>
                                <span className="wrapmsgr_treeicon ng-scope" data-nodrag="" ng-click="toggleOrgan(this)" ng-if="node.type === 'dept'" ng-style="!node.hasChildren &amp;&amp; {'visibility': 'hidden', 'cursor': 'auto'}" style="visibility: hidden; cursor: auto;">
                                    <i className="icon_triangle wrapmsgr_collapse" ng-class="{true: 'wrapmsgr_collapse', false: 'wrapmsgr_expand'}[collapsed]"></i>
                                </span>
                                <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" class="ng-isolate-scope">
                                    <span className="user-photo ng-binding ng-isolate-scope group no-photo red" user="{userName: node.columnText, userId: node.value, type: node.type}" "="">01</span>
                                    <span className="wrapmsgr_member ng-binding">01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567</span>
                                </div>
                                <span className="wrapmsgr_master ng-hide" ng-show="node.value == docInfo.detail.masterUserId">Owner</span>
                                <ol ui-tree-nodes="" ng-model="node.subTree" ng-class="{expanded: !collapsed}" className="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty">
                                    <!-- ngRepeat: node in node.subTree -->
                                </ol>
                            </div>
                        </li>
                        <li ng-repeat="node in node.subTree" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" className="ng-scope angular-ui-tree-node" expand-on-hover="false" >
                            <div className="organ_wrapper ng-scope">
                                <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
                                    <input type="checkbox" id="member-0123012301230123012301230123012301230123012301230123012301230123object:942" ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)">
                                    <label htmlFor="member-0123012301230123012301230123012301230123012301230123012301230123object:942" data-nodrag="">
                                        <i className="icon_checkbox" ng-class="{disabled: node.disabled}"></i>
                                    </label>
                                </span>
                                <!-- ngIf: node.type === 'dept' -->
                                <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" className="ng-isolate-scope">
                                    <span className="user-photo ng-binding ng-isolate-scope no-photo red" user="{userName: node.columnText, userId: node.value, type: node.type}" "="">01</span>
                                    <span className="wrapmsgr_member ng-binding">012301230123012301230123012301230123012301230123012301230123</span>
                                </div>
                                <span className="wrapmsgr_master ng-hide" ng-show="node.value == docInfo.detail.masterUserId">Owner</span>
                                <ol ui-tree-nodes="" ng-model="node.subTree" ng-class="{expanded: !collapsed}" className="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty">
                                    <!-- ngRepeat: node in node.subTree -->
                                </ol>
                            </div>
                        </li><!-- end ngRepeat: node in node.subTree -->
					</ol>
				</div>
			</li><!-- end ngRepeat: node in node.subTree --><!-- ngInclude: 'organ_renderer' -->
            아래가 품질팀 즉 level1
            <li ng-repeat="node in node.subTree" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" className="ng-scope angular-ui-tree-node selected" expand-on-hover="false" >
                <div className="organ_wrapper ng-scope">
                    <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}" style="visibility: hidden;">
                        <input type="checkbox" id="member-891a86c5ed484a628af74ea42645a31fobject:922" ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)" checked="checked">
                        <label htmlFor="member-891a86c5ed484a628af74ea42645a31fobject:922" data-nodrag="">
                            <i className="icon_checkbox" ng-class="{disabled: node.disabled}"></i>
                        </label>
                    </span>
                    <!-- ngIf: node.type === 'dept' --><span class="wrapmsgr_treeicon ng-scope" data-nodrag="" ng-click="toggleOrgan(this)" ng-if="node.type === 'dept'" ng-style="!node.hasChildren &amp;&amp; {'visibility': 'hidden', 'cursor': 'auto'}" style="visibility: hidden; cursor: auto;">
                        <i className="icon_triangle wrapmsgr_collapse" ng-class="{true: 'wrapmsgr_collapse', false: 'wrapmsgr_expand'}[collapsed]"></i>
                    </span><!-- end ngIf: node.type === 'dept' -->
                    <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" className="ng-isolate-scope">
                        <span className="user-photo ng-binding ng-isolate-scope group no-photo cyan" user="{userName: node.columnText, userId: node.value, type: node.type}" "="">질팀</span>
                        <span className="wrapmsgr_member ng-binding">품질팀</span>
                    </div>
                    <span className="wrapmsgr_master ng-hide" ng-show="node.value == docInfo.detail.masterUserId">Owner</span>
                    <ol ui-tree-nodes="" ng-model="node.subTree" ng-class="{expanded: !collapsed}" className="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty">
                        <!-- ngRepeat: node in node.subTree -->
                    </ol>
                </div>
            </li><!-- end ngRepeat: node in node.subTree --><!-- ngInclude: 'organ_renderer' -->
            여기가 분홍01 즉 레벨1
            <li ng-repeat="node in node.subTree" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" className="ng-scope angular-ui-tree-node" expand-on-hover="false">
                <div className="organ_wrapper ng-scope">
                    <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
                        <input type="checkbox" id="member-0123456789012345678901234567890123456789012345678901234567890123object:923" ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)">
                        <label htmlFor="member-0123456789012345678901234567890123456789012345678901234567890123object:923" data-nodrag="">
                            <i className="icon_checkbox" ng-class="{disabled: node.disabled}"></i>
                        </label>
                    </span>
                    <!-- ngIf: node.type === 'dept' -->
                    <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" className="ng-isolate-scope">
                        <span className="user-photo ng-binding ng-isolate-scope no-photo red" user="{userName: node.columnText, userId: node.value, type: node.type}" "="">01</span>
                        <span className="wrapmsgr_member ng-binding">01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567</span>
                    </div>
                    <span className="wrapmsgr_master ng-hide" ng-show="node.value == docInfo.detail.masterUserId">Owner</span>
                    <ol ui-tree-nodes="" ng-model="node.subTree" ng-class="{expanded: !collapsed}" className="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty">
                        <!-- ngRepeat: node in node.subTree -->
                    </ol>
                </div>
            </li><!-- end ngRepeat: node in node.subTree -->
		</ol>
	</div>
</li>