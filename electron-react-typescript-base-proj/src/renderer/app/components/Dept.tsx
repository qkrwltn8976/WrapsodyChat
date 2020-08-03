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
    oldMembers?: TreeMember[],
    hasChildren?: boolean,
    isAllChecked?: boolean,
    tempMembers?:TreeMember[],
}

interface State{
    isExpanded : boolean,
    isChecked: boolean,
    onlyCheck: boolean,
    uuid: string,
    childNodes: Nodes[],
    memberIsChecked:boolean,
}

class Dept extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this.state = {
            isExpanded: false,
            isChecked: false,
            onlyCheck: false,
            uuid: v4(),
            childNodes : [],
            memberIsChecked: false,
        }
        this.changeIsChecked = this.changeIsChecked.bind(this);
    }

    componentDidMount() {
        subscribe(client, store.get("username"), this.state.uuid, (obj:any) =>{
            let payload = obj.payload;
            if(payload){
                if(this.state.onlyCheck){
                    this.setState({
                        childNodes: payload.Nodes
                    },this.changeIsChecked) 
                }else{
                    this.setState({
                        childNodes: payload.Nodes
                    }) 
                }
                
            }
        })
    }

    expandTree = (deptCode : any) => {
        // console.log(e.target)
        publishApi(client, 'api.organ.tree', store.get("username"), this.state.uuid, {"root": "N", "path": deptCode})
        this.setState({
            isExpanded : !this.state.isExpanded,
            onlyCheck: false,
        })
    }
    ////// 부서 클릭
    expandTreeAndClick = (deptCode : any)=> {
        publishApi(client, 'api.organ.tree', store.get("username"), this.state.uuid, {"root": "N", "path": deptCode})
        this.setState({
            isChecked: !this.state.isChecked,
            onlyCheck: true,
        })
    }
    
    changeIsChecked = () => {
        let newMembers = [];
        if(this.state.childNodes){
            this.state.childNodes.map(node =>{
                if(node.type == "user"){
                    console.log("node.type"+ node.type + "node.userName" + node.columnText)
                    let newMember : TreeMember;
                    newMember = {userId: node.value, userName : node.columnText, password : "", type: node.type, isChecked:true};
                    newMembers.push(newMember);
                    console.log(newMembers)
                    this.setState({
                        memberIsChecked: true,
                    })
                }
            })
        }
        this.props.clickCheckBox("Dept", this.state.isChecked, newMembers);
    }

    deleteFromSelected = (e) => {
        e.preventDefault()
        let newMember : TreeMember[];

        this.setState({
            isChecked : true
        },this.props.clickCheckBox("Member", true, newMember,e))
    }

    
    render(){
        let nodesComponent;
        if(this.state.childNodes){
            nodesComponent = this.state.childNodes.map(node=>{
                if(node.parentCode == this.props.deptCode && node.type == "dept"){
                    return(
                        <Dept clickCheckBox = {this.props.clickCheckBox} deptName = {node.columnText} deptCode = {node.value} master = {this.props.master} oldMembers = {this.props.oldMembers} hasChildren = {node.hasChildren} isAllChecked = {this.props.isAllChecked} tempMembers = {this.props.tempMembers}/>
                    )
                }
                if(node.parentCode == this.props.deptCode && node.type == "user"){
                    return(
                        <MemberComponent type = {"select"} clickCheckBox = {this.props.clickCheckBox} userId = {node.value} userName = {node.columnText} master = {this.props.master} oldMembers = {this.props.oldMembers}isAllChecked = {this.props.isAllChecked} tempMembers = {this.props.tempMembers} memberIsChecked = {this.state.memberIsChecked}/>
                    )
                   
                }
            })
        }
        const checkboxId = "dept-"+ this.props.deptName+"object:"+ Math.random()
        var triangleVisibility;
        if(!this.props.hasChildren){
            triangleVisibility = { visibility : "hidden" }
        }
        return(
            <li ng-repeat={this.props.hasChildren ? "node in docInfo.organ" : "node in node.subTree" } ng-class="{selected: isInviteMembers(node) >= 0}" ui-tree-node="" data-collapsed="true" ng-include="'organ_renderer'" className={this.props.hasChildren ? "ng-scope angular-ui-tree-node" : "ng-scope angular-ui-tree-node selected"} expand-on-hover="false">
                <div className="organ_wrapper ng-scope">
                    <span ng-style="node.type === 'dept' &amp;&amp; !node.hasChildren &amp;&amp; {'visibility': 'hidden'}" style = {triangleVisibility}>
                        <input type="checkbox" id={checkboxId} ng-disabled="node.disabled" ng-checked="isInviteMembers(node) >= 0" ng-click="toggleMember(node, $event)" checked = {this.state.isChecked}/>
                        <label htmlFor={checkboxId} data-nodrag="">
                            <i className="icon_checkbox" ng-class="{disabled: node.disabled}" onClick={(e) => this.expandTreeAndClick(this.props.deptCode)}></i>
                        </label>
                    </span>
                    <span className="wrapmsgr_treeicon ng-scope" data-nodrag="" ng-click="toggleOrgan(this)" ng-if="node.type === 'dept'" ng-style="!node.hasChildren &amp;&amp; {'visibility': 'hidden', 'cursor': 'auto'}" onClick = {(e) => this.expandTree(this.props.deptCode)} style = {triangleVisibility}>
                        <i className="icon_triangle wrapmsgr_collapse" ng-class="{true: 'wrapmsgr_collapse', false: 'wrapmsgr_expand'}[collapsed]"></i>
                    </span>
                    <div wrapmsgr-user-profile="users[node.value] || node.value" user-profile-disabled="node.type === 'dept'" className="ng-isolate-scope">
                        <span className="user-photo ng-binding ng-isolate-scope group no-photo green">{getShortName(this.props.deptName)}</span>
                        <span className="wrapmsgr_member ng-binding">{this.props.deptName}</span>
                    </div>
                    <ol ui-tree-nodes="" ng-model="node.subTree" ng-class="{expanded: !collapsed}"  className={this.state.isExpanded ? "ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty expanded": "ng-pristine ng-untouched ng-valid ng-scope angular-ui-tree-nodes ng-not-empty"} >
                        { nodesComponent }
                    </ol>
                </div>
            </li>
        )
    }
}

export default Dept;


