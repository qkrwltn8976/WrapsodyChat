import * as React from 'react';
import { getShortName } from '../../libs/messengerLoader';
import { TreeDept } from '../../models/TreeDept';
import { Nodes } from '../../models/Nodes'
import { TreeMember } from '../../models/TreeMember'
import { v4 } from 'uuid';
import { publishApi, subscribe, client } from '@/renderer/libs/stomp';
import MemberComponent from './MemberComponent';

const Store = require('electron-store')
const store = new Store()

interface Props{
    clickCheckBox?: any, // 체크박스 클릭 함수
    master?: TreeMember,
    deptName: string,
    deptCode: any,
    hasChildren?: boolean,
    tMembers?: TreeMember[],
}

interface State{
    isExpanded : boolean,
    uuid: string,
    childNodes: Nodes[],
}

class Dept extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            uuid: v4(),
            isExpanded: false,
            childNodes : [],

        }
    }

    componentDidMount() {
        subscribe(client, store.get("username"), this.state.uuid, (obj:any) =>{
            let payload = obj.payload;
            console.log("ddddddddddddddddddddddddddddd")
            console.log(payload)
            if(payload){
                this.setState({
                    childNodes: payload.Nodes
                })
            }
        })
    }

    expandTree = (deptCode : any) => {
        publishApi(client, 'api.organ.tree', store.get("username"), this.state.uuid, {"root": "N", "path": deptCode})
        this.setState({
            isExpanded : !this.state.isExpanded
        })
    }
    
    
    render(){
        let nodesComponent;
        if(this.state.childNodes){
            nodesComponent = this.state.childNodes.map(node=>{
                if(node.parentCode == this.props.deptCode && node.type == "dept"){
                    return(
                        <Dept clickCheckBox = {this.props.clickCheckBox} deptName = {node.columnText} deptCode = {node.value} master = {this.props.master} tMembers = {this.props.tMembers}/>
                    )
                }
                if(node.parentCode == this.props.deptCode && node.type == "user"){
                    return(
                        <MemberComponent clickCheckBox = {this.props.clickCheckBox} userId = {node.value} userName = {node.columnText} master = {this.props.master} tMembers = {this.props.tMembers}/>
                    )
                   
                }
            })
        }
        console.log("chchchhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
        console.log(this.props.deptName)
        console.log(this.props.hasChildren)
        const checkboxId = "dept-"+ this.props.deptName+"object:"+ Math.random()
        return(
            <li ng-repeat="node in docInfo.organ" ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" className="ng-scope angular-ui-tree-node" expand-on-hover="false">
                <div className="organ_wrapper ng-scope">
                    <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}">
                        <input type="checkbox" id={checkboxId} ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)"/>
                        <label htmlFor={checkboxId} data-nodrag="">
                            <i className="icon_checkbox" ng-class="{disabled: node.disabled}" onClick={this.props.clickCheckBox("Dept")}></i>
                        </label>
                    </span>
                    <span className="wrapmsgr_treeicon ng-scope" data-nodrag="" ng-click="toggleOrgan(this)" ng-if="node.type === 'dept'" ng-style="!node.hasChildren &amp;&amp; {'visibility': 'hidden', 'cursor': 'auto'}" onClick = {(e) => this.expandTree(this.props.deptCode)}>
                        <i className="icon_triangle wrapmsgr_collapse" ng-class="{true: 'wrapmsgr_collapse', false: 'wrapmsgr_expand'}[collapsed]"></i>
                    </span>
                    <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" className="ng-isolate-scope">
                        <span className="user-photo ng-binding ng-isolate-scope group no-photo green">{getShortName(this.props.deptName)}</span>
                        <span className="wrapmsgr_member ng-binding">{this.props.deptName}</span>
                    </div>
                    <ol ui-tree-nodes="" ng-model="node.subTree" ng-class="{expanded: !collapsed}"  className={this.state.isExpanded ? "ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty expanded": "ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty"}>
                        { nodesComponent }
                    </ol>
                </div>
            </li>
        )
    }
}

export default Dept;




