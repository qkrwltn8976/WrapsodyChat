import * as React from 'react';
import { MsgList, MsgInput, Header, MemberList, InfoHeader, SearchBar, Footer } from '../../components';
import { HeaderType, MemberListType, RoomType, InfoHeaderType, CIType, ConvoType } from '../../../libs/enum-type';
import { Room } from '../../../models/Room'
import { subscribe, publishApi, publishChat, client } from '@/renderer/libs/stomp';
import { v4 } from "uuid";
import { TreeUser } from '../../../models/TreeUser';
import { TreeDept } from '../../../models/TreeDept';

const Store = require('electron-store');
const store = new Store();
// state -> expand, checked 
// props -> Invite, Create
interface inviteProps{
    match: any,
}

interface inviteState{
    uuid: string;
    convoId: string;
    docName: string;
    master: TreeUser;
    checkoutAuthList: TreeUser[],
    checkoutDeptAuthList: TreeDept[],
    viewAuthList: TreeUser[],
    viewDeptAuthList: TreeDept[],
    members: TreeUser[],
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
            checkoutAuthList : [],
            checkoutDeptAuthList: [],
            viewAuthList: [],
            viewDeptAuthList: [],
            members:[]
        })
    }
    componentDidMount(){
        client.onConnect = () => {
            //subscribe
            subscribe(client, store.get("username"), this.state.uuid, (obj:any) => {
                let payload = obj.payload;
              
                if(payload){
                    console.log("pppppppppppppppppppppppppp")
                    console.log(payload)
                    if(payload.Room){
                        this.setState({
                            docName: payload.Room.name
                        })
                        console.log(this.state.docName);
                    }
                    if(payload.SyncInfo){
                        this.setState({
                            master : payload.SyncInfo.master,
                            checkoutAuthList : payload.SyncInfo.checkoutAuthList,
                            checkoutDeptAuthList : payload.SyncInfo.checkoutDeptAuthList,
                            viewAuthList : payload.SyncInfo.viewAuthList,
                            viewDeptAuthList : payload.SyncInfo.viewDeptAuthList,
                        })
                        console.log("SyncInfo!!!!!!!!!!!!!!!!!11")
                        console.log(this.state.checkoutAuthList)
                        console.log(this.state.checkoutDeptAuthList)
                        console.log(this.state.viewAuthList)
                        console.log(this.state.viewDeptAuthList)
                    }
                    if(payload.Members){
                        this.setState({
                            members : payload.Members
                        })
                        console.log("member!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                        console.log(this.state.members)
                    }// 채팅방 참여자
                }else{
                   
                }// payload없으면...

            });
            publishApi(client, 'api.conversation.view', store.get("username"), this.state.uuid, { 'convoId': this.state.convoId });
        }
    }

    render(){
        let aside, viewModeClass;
        return(
            aside = <React.Fragment>
                <div id="wrapmsgr" className="ng-scope">
                    <div id="wrapmsgr_body" ng-controller="WrapMsgrController" className="wrapmsgr_container ng-scope" data-ws="ws://ecm.dev.fasoo.com:9500/ws" data-vhost="/wrapsody-oracle" data-fpns-enabled="true" data-weboffice-enabled="true">
                        {/* <div className="wrapmsgr_popup_container active" ng-class="{active: activePopup}"> */}
                            <div className="wrapmsgr_popup manage_doc_room" ng-class="{disabled: !loggedIn}" ng-show="activePopup == 'manage_doc_room'"> 
                                <Header docName = "" headerType={HeaderType.INVITE}/>
                                <form name="manageDocRoomForm" ng-submit="submitDocRoom()" className="ng-pristine ng-valid">
                                    <div className="wrapmsgr_popup_body">
                                        <InfoHeader convoType= {ConvoType.IC} memberCount = {this.state.members.length} docName = {this.state.docName}/>
                                        <div className="group">
                                            <div className="wrapmsgr_organ_tree ng-scope angular-ui-tree" ui-tree="organTreeOptions" data-clone-enabled="true" data-nodrop-enabled="true" data-drag-delay="100">
                                                <MemberList memberListType = {MemberListType.SELECT}/>
                                            </div>    
                                            <div className="wrapmsgr_organ_tree right-list-col ng-scope angular-ui-tree" ui-tree="inviteTreeOptions">
                                                {/* <MemberList memberListType = {MemberListType.SELECTED} members = {members} groups = {groups}/> */}
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

// const treeData= [
//     {
//       key: 'Fasso',
//       label: 'Fasso',
//       nodes: [
//         {
//           key: 'Wrapsody',
//           label: 'Wrapsody',
//           nodes: [
//             {
//               key: 'employee',
//               label: 'employee',
//               nodes: []
//             },
//           ],
//         },
//       ],
//     },
//     {
//       key: 'Sparrow',
//       label: 'Sparrow',
//     },
// ];