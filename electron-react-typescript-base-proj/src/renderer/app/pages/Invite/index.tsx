import * as React from 'react';
import { MsgList, MsgInput, Header, MemberList, InfoHeader, SearchBar, Footer } from '../../components';
import { HeaderType, MemberListType, RoomType, InfoHeaderType, CIType, ConvoType } from '../../../libs/enum-type';
import { Room } from '../../../models/Room'
import { subscribe, publishApi, publishChat, client } from '@/renderer/libs/stomp';
import { v4 } from "uuid";
import { TreeMember } from '../../../models/TreeMember';
import { TreeDept } from '../../../models/TreeDept';
import { Nodes } from '../../../models/Nodes';
import {Node} from '../../../models/Node';
import update from 'react-addons-update';

const Store = require('electron-store');
const store = new Store();

interface inviteProps{
    match: any,
}

interface inviteState{
    uuid: string,
    convoId: string,
    docName: string,
    master: TreeMember,
    tempDepts: TreeMember[],
    tempMembers: TreeMember[],
    oldMembers: TreeMember[],
    viewAuthAllUsers: boolean,
    checkoutAuthList: TreeMember[] ,
    checkoutDeptAuthList: TreeDept[],
    viewAuthList: TreeMember[],
    viewDeptAuthList: TreeDept[],
    isAllChecked: boolean,
    nodeList: Node[],
    childNodes: Nodes[],
}

class Invite extends React.Component<inviteProps, inviteState>{
    constructor(props:inviteProps, state:{}){
        super(props,state);
        this.state = ({
            uuid: v4(),
            convoId: this.props.match.params.convo,
            docName: "",
            master: {
                userId : "",
                userName : "",
                password : "",
            }, 
            viewAuthAllUsers: false,
            checkoutAuthList : [],
            checkoutDeptAuthList: [],
            viewAuthList: [],
            viewDeptAuthList: [],
            tempDepts:[],
            tempMembers:[],
            oldMembers:[],
            nodeList:[],
            isAllChecked: false,
            childNodes : [],
        })
    }

    componentDidMount(){
       client.onConnect = () => {
            subscribe(client, store.get("username"), this.state.uuid, (obj:any) => {
                
                let payload = obj.payload;
                console.log(payload)
                
                if(payload){
                    if(payload.Room){
                        this.setState({
                            docName: payload.Room.name
                        })
                    }
                    if(payload.SyncInfo){
                        this.setState({
                            master : payload.SyncInfo.master,
                            viewAuthAllUsers: payload.SyncInfo.viewAuthAllUsers,
                            checkoutAuthList : payload.SyncInfo.checkoutAuthList.user,
                            checkoutDeptAuthList : payload.SyncInfo.checkoutDeptAuthList.dept,
                            viewAuthList : payload.SyncInfo.viewAuthList.user,
                            viewDeptAuthList : payload.SyncInfo.viewDeptAuthList.dept,
                        })
                        this.state.checkoutAuthList.map(member =>{
                            this.state.nodeList.push({"name": member.userName, "id" : member.userId, "status": "select", "type": "user"})
                        })
                        this.state.viewAuthList.map(member => {
                            this.state.nodeList.push({"name": member.userName, "id" : member.userId, "status": "select", "type": "user"})
                        })
                        this.state.checkoutDeptAuthList.map(dept=>{
                            this.state.nodeList.push({"name": dept.deptName, "id": dept.deptCode, "hasChildren": true, "isExpanded": false, "status": "select", "type":"dept"})
                        })
                        this.state.viewDeptAuthList.map(dept=>{
                            this.state.nodeList.push({"name": dept.deptName, "id": dept.deptCode, "hasChildren": true, "isExpanded": false, "status": "select", "type":"dept"})
                        })
                    }
                    if(payload.Members){
                        this.setState({
                            oldMembers: payload.Members,
                        }) 
                    }
                }else{
                    
                }// payload없으면...
            });
            publishApi(client, 'api.conversation.view', store.get("username"), this.state.uuid, { 'convoId': this.state.convoId });
        }  
    }


    clickMember = (isChecked : boolean, newMembers: TreeMember[])=>{
        if(isChecked && newMembers){ // true
            this.setState({
                tempMembers: this.state.tempMembers.concat(newMembers),
            })
            console.log("**********************************")
            console.log(this.state.tempMembers)
        }else{ // false
            console.log("설마 여기서 다 잘라버리는건 아니겠지?!")
            const idx = this.state.tempMembers.findIndex( obj => obj.userName === newMembers[0].userName) 
            if (idx > -1) {
                this.state.tempMembers.splice(idx,1)
                this.setState({
                    tempMembers: this.state.tempMembers
                })
            }
        }
        console.log("clickMember호출함!!!!!!!!!!!!!!!!!!!!!" + isChecked)
        console.log(newMembers)
        console.log(this.state.tempMembers)
    }

    clickDept = (id: string, isChecked: boolean, nodes: Node[]) =>{
        console.log("clickDept호출됨" + id + "/" + isChecked)
        if(isChecked == true){ // 체크 -> 멤버 tempMember에 넣어
            console.log("-------------------true--------------------")
            console.log(nodes)
            var newMembers: TreeMember[];
            newMembers = [];
            nodes.map(node=>{
                console.log("-------------------map--------------------")
                if(node.type == "user"){
                    var newMember: TreeMember[];
                    newMember = [{
                        userId : node.id,
                        userName : node.name,
                        password : null,
                    }]
                    newMembers = newMembers.concat(newMember)
                    console.log("-------------------tempMember--------------------")
                    console.log(newMembers)
                }
            })
            this.setState({
                tempMembers: this.state.tempMembers.concat(newMembers)
            })
        }else if(isChecked == false){ // 체크해제
           nodes.map(node=>{
            const idx = this.state.tempMembers.findIndex( obj => obj.userId === node.id) 
            if (idx > -1) {
                this.state.tempMembers.splice(idx,1)
                this.setState({
                    tempMembers: this.state.tempMembers
                })
            }
           })
        }
    }

    render(){
        let aside, viewModeClass;
        var organ_tree_calc_width = { width: 'calc(100% - 300px)' };
        console.log("............................................nodeList............................................")
        console.log(this.state.nodeList)
        console.log("tempMembers초기값 뭐가 들어가는지")
        console.log(this.state.tempMembers)
        return(
            aside = <React.Fragment>
                <div id="wrapmsgr" className="ng-scope">
                    <div id="wrapmsgr_body" ng-controller="WrapMsgrController" className="wrapmsgr_container ng-scope" data-ws="ws://ecm.dev.fasoo.com:9500/ws" data-vhost="/wrapsody-oracle" data-fpns-enabled="true" data-weboffice-enabled="true">
                        {/* <div className="wrapmsgr_popup_container active" ng-class="{active: activePopup}"> */}
                            <div className="wrapmsgr_popup manage_doc_room" ng-class="{disabled: !loggedIn}" ng-show="activePopup == 'manage_doc_room'"> 
                                <Header docName = "" headerType={HeaderType.INVITE}/>
                                <form name="manageDocRoomForm" ng-submit="submitDocRoom()" className="ng-pristine ng-valid">
                                    <div className="wrapmsgr_popup_body">
                                        <InfoHeader convoType= {ConvoType.IC} memberCount = {this.state.oldMembers.length} docName = {this.state.docName} tempMembers = {this.state.tempMembers}/>
                                        <div className="group">
                                            <div className="wrapmsgr_organ_tree ng-scope angular-ui-tree" ui-tree="organTreeOptions" data-clone-enabled="true" data-nodrop-enabled="true" data-drag-delay="100" style = {organ_tree_calc_width}>
                                                <MemberList memberListType = {MemberListType.SELECT} clickMember = {this.clickMember} clickDept = {this.clickDept} oldMembers = {this.state.oldMembers}  master = {this.state.master} nodeList = {this.state.nodeList} tempMembers = {this.state.tempMembers}/>
                                            </div>    
                                            <div className="wrapmsgr_organ_tree right-list-col ng-scope angular-ui-tree" ui-tree="inviteTreeOptions">
                                                <MemberList memberListType = {MemberListType.SELECTED} clickMember = {this.clickMember} clickDept = {this.clickDept} oldMembers = {this.state.oldMembers} master = {this.state.master} tempMembers = {this.state.tempMembers}/>
                                            </div>
                                        </div>
                                    </div>
                                    <Footer />
                                </form>
                            </div>
                        {/* </div> */}
                    </div>
                </div>
            </React.Fragment>
        ); 
    }
}

export default Invite;

