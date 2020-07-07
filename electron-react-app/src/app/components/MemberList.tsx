import * as React from 'react';

interface Props{
    memberListType: string;
    members: object[];
}

function MemberList({memberListType, members}: Props){
//     if(memberListType == 'chat'){
//         return(
//             <div>
//                 <ul>
//                 {
//                     members.map( member =>
//                         <li wrapmsgr-user-profile="users[member.userId]" className="ng-scope ng-isolate-scope">
//                             <span className="user-photo ng-binding ng-isolate-scope no-photo cyan" user="users[member.userId]">{member.shortName}</span>
//                             <div className="">{member.Name} ({member.midName})</div>
//                             <div className="sub-info">{member.dept}</div>
//                         </li>
//                     )
//                 }
// 				</ul>
//             </div>
//         );
//     }else if(memberListType == 'select'){
//         return(
//             <ol ui-tree-nodes="" ng-model="docInfo.organ" ng-show="docInfo.organ.length > 0" class="ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty">
//                 {
//                     members.map( member => (
//                         <li ui-tree-node="" data-collapsed="true" className="selected" expand-on-hover="false">
//                             <div className="organ_wrapper ng-scope">
//                                 <span>
//                                     <input type="checkbox" id="member-adminobject:1713" de.disabled" disabled="disabled" checked="checked">
//                                     <label htmlFor="member-adminobject:1713" data-nodrag="">
//                                         <i className="icon_checkbox disabled"></i>
//                                     </label>
//                                 </span>
//                                 <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" className="ng-isolate-scope">
//                                     <span className="user-photo no-photo cyan" user="{userName: node.columnText, userId: node.value, type: node.type}" "="">ad</span>
//                                     <span className="wrapmsgr_member">administrator</span>
//                                 </div>
//                                 <span className="wrapmsgr_master">Owner</span>
//                                 <ol ui-tree-nodes="" className="angular-ui-tree-nodes">
//                                 </ol>
//                             </div>
//                         </li>
//                     ))
//                 }
// 		    </ol>
//         );
//     }else if(memberListType == 'selected'){
//         return(
//             <ol ui-tree-nodes="" className="angular-ui-tree-nodes">
//                 {
//                     members.map( member => (
//                         <li ng-repeat="member in inviteMembers | orderBy:['-disabled', 'userName']" ui-tree-node="" data-collapsed="true" className="angular-ui-tree-node" expand-on-hover="false">
//                             <div wrapmsgr-user-profile="users[member.userId] || member.userId" class="ng-isolate-scope">
//                             <span className="user-photo no-photo cyan" user="member">{member.shotName}</span>
//                                 <span className="wrapmsgr_member">
//                                     {member.dept}
//                                     <a href=""></a>
//                                 </span>
//                             </div>
//                         </li>
//                     ))
//                 }
//             </ol>
//         );
//     }
}

export default MemberList;
