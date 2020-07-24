{/* <li ng-repeat="node in docInfo.organ" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="false" ng-include="'organ_renderer'" class="ng-scope angular-ui-tree-node" expand-on-hover="false" >
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
</li> */}