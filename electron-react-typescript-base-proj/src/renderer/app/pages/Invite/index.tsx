import * as React from 'react';
import { MsgList, MsgInput, Header, MemberList, InfoHeader, SearchBar, Footer } from '../../components';
import { HeaderType, MemberListType, RoomType, InfoHeaderType, CIType, ConvoType } from '../../../libs/enum-type';
import { Room } from '../../../models/Room'
import { subscribe, publishApi, publishChat, client } from '@/renderer/libs/stomp';
import { v4 } from "uuid";
import { TreeMember } from '../../../models/TreeMember';
import { TreeDept } from '../../../models/TreeDept';
import { Nodes } from '../../../models/Nodes';

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
    tempMembers: TreeMember[],
    oldMembers: TreeMember[],
    viewAuthAllUsers: boolean,
    checkoutAuthList: TreeMember[] ,
    checkoutDeptAuthList: TreeDept[],
    viewAuthList: TreeMember[],
    viewDeptAuthList: TreeDept[],
    isAllChecked: boolean,
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
            tempMembers:[],
            oldMembers:[],
            isAllChecked: false,
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
                    }
                    if(payload.Members){
                        this.setState({
                            oldMembers: payload.Members,
                        }) 
                    }// 채팅방 참여자
                    
                }else{
                    
                }// payload없으면...
            });
            publishApi(client, 'api.conversation.view', store.get("username"), this.state.uuid, { 'convoId': this.state.convoId });
        }  
    }
    
    clickCheckBox = (checkBoxType: string, isChecked:boolean, newMembers: TreeMember[]) =>{
        
        if(checkBoxType == "All"){
            // let all = 0;
            // if(this.state.isAllChecked){
            //     all : this.state.participants
            // }else{
            //     all = this.state.checkoutAuthList.length + this.state.checkoutDeptAuthList.length 
            //     + this.state.viewAuthList.length + this.state.viewDeptAuthList.length
            // }
            // this.setState({ 
            //     participants : all,
            //     isAllChecked : !this.state.isAllChecked
            // })
        }else if(checkBoxType == "Member" && newMembers){
            if(!isChecked){
                if(this.state.tempMembers.length == 0){
                    this.setState({
                        tempMembers: newMembers
                    })
                }else{
                    this.setState({
                        tempMembers: this.state.tempMembers.concat(newMembers),
                    })
                }
            }else{
                const idx = this.state.tempMembers.findIndex( obj => obj.userName === newMembers[0].userName) 
                
                if (idx > -1) {
                    this.state.tempMembers.splice(idx,1)
                    this.setState({
                        tempMembers: this.state.tempMembers
                    })
                }
            }
           
        }else if(checkBoxType == "Dept"){
            // let deptNum = 0;
            // if(isChecked){ // 이미 체크되어있었음 -> 체크해제
            //     this.setState({ 
            //         participants: this.state.participants - deptNum,
            //     })
            // }else{
            //     this.setState({ 
            //         participants: this.state.participants + deptNum,
            //     })
            // }
        }// dept코드 받아서 dept숫자 더해야할듯 나중에..
    }

    render(){
        let aside, viewModeClass;
        var organ_tree_calc_width = { width: 'calc(100% - 300px)' };
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
                                                <MemberList memberListType = {MemberListType.SELECT} clickCheckBox = {this.clickCheckBox} oldMembers = {this.state.oldMembers} checkoutAuthList = {this.state.checkoutAuthList} checkoutDeptAuthList = {this.state.checkoutDeptAuthList} viewAuthList = {this.state.viewAuthList} viewDeptAuthList = {this.state.viewDeptAuthList} master = {this.state.master} isAllChecked = {this.state.isAllChecked} />
                                            </div>    
                                            <div className="wrapmsgr_organ_tree right-list-col ng-scope angular-ui-tree" ui-tree="inviteTreeOptions">
                                                <MemberList memberListType = {MemberListType.SELECTED} oldMembers = {this.state.oldMembers} tempMembers = {this.state.tempMembers} clickCheckBox = {this.clickCheckBox} master = {this.state.master}/>
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

