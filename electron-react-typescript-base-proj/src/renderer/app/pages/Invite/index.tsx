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

    clickExpandTree = (deptCode : string, isExpanded) => {
        let newValue = !isExpanded
        const idx = this.state.nodeList.findIndex( obj => obj.id === deptCode)
        this.setState({
            nodeList : update(
                this.state.nodeList,
                {
                    [idx]:{
                        isExpanded : {$set: newValue}
                    }
                }
            )
        })
    }

    clickMember = (isChecked : string, newMembers: TreeMember)=>{
        if(!isChecked){
            this.setState({
                tempMembers: this.state.tempMembers.concat(newMembers),
            })
            this.setState(prevState =>({
               checkoutAuthList:{
                   ...prevState.checkoutAuthList,
                    isChecked: true
               },
               viewAuthList:{
                   ...prevState.viewAuthList,
                   isChecked: true
               } 
            }))
        }else{
            const idx = this.state.tempMembers.findIndex( obj => obj.userName === newMembers[0].userName) 
            if (idx > -1) {
                this.state.tempMembers.splice(idx,1)
                this.setState({
                    tempMembers: this.state.tempMembers
                })
            }
        }
    }

    clickCheckBox = (checkBoxType: string, id: string, status: string, nodes: Node[]) =>{
        
        if(checkBoxType == "All"){
            
        }else if(checkBoxType == "Member"){
            
        }else if(checkBoxType == "Dept"){
            if(status == "selected"){ //체크해제 

            }else if(status == "select"){ // 체크 -> 멤버는 select -> selected로 바꾸고 / 부서는 클릭
                // nodes.map(node=>{
                //     if(node.type == "user"){

                //     }
                // })
                // this.setState({
                //     nodeList : update(
                //         this.state.nodeList,
                //         {
                //             [idx]:{
                //                 status : {$set: "selected"}
                //             }
                //         }
                //     )
                // })
            }
        }
    }

    render(){
        let aside, viewModeClass;
        var organ_tree_calc_width = { width: 'calc(100% - 300px)' };
        console.log("............................................nodeList............................................")
        console.log(this.state.nodeList)
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
                                                <MemberList memberListType = {MemberListType.SELECT} clickCheckBox = {this.clickCheckBox} clickExpandTree = {this.clickExpandTree} oldMembers = {this.state.oldMembers}  master = {this.state.master} nodeList = {this.state.nodeList} tempMembers = {this.state.tempMembers}/>
                                            </div>    
                                            <div className="wrapmsgr_organ_tree right-list-col ng-scope angular-ui-tree" ui-tree="inviteTreeOptions">
                                                <MemberList memberListType = {MemberListType.SELECTED} clickCheckBox = {this.clickCheckBox} oldMembers = {this.state.oldMembers} master = {this.state.master} nodeList = {this.state.nodeList}/>
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

