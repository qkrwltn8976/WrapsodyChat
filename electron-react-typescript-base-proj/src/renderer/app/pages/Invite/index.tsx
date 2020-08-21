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
import store from '../../../../store';

const Store = require('electron-store');
const electronStore = new Store();

interface inviteProps{
    match: any,
}

interface inviteState{
    uuid: string,
    convoId: string,
    tempMembers: TreeMember[],
    docName: string,
    master: TreeMember,
    viewAuthAllUsers: boolean,
    oldMembers: TreeMember[],
    nodeList: Node[],
}

class Invite extends React.Component<inviteProps, inviteState>{
    constructor(props:inviteProps, state:{}){
        super(props,state);
        this.state = ({
            uuid: v4(),
            convoId: this.props.match.params.convo,
            tempMembers: [],
            docName: "",
            master: {
                userId : "",
                userName: "",
                password: "",
            },
            viewAuthAllUsers: false,
            oldMembers: [],
            nodeList:[],
        })
        store.subscribe(function(this: Invite){
            this.setState({
                docName: store.getState().name,
                master : store.getState().master,
                viewAuthAllUsers: store.getState().viewAuthAllUsers,
                oldMembers: store.getState().members,
                nodeList: store.getState().nodeList
            })
        }.bind(this));
        console.log(store.getState())   
       
    }

    stompConnection = () => {
        client.onConnect = () => {
            subscribe(client, electronStore.get("username"), this.state.uuid);
            publishApi(client, 'api.conversation.view', electronStore.get("username"), this.state.uuid, { 'convoId': this.state.convoId });
        }
        client.activate()
    }

    componentDidMount(){
       this.stompConnection();
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
                                        <InfoHeader convoType= {ConvoType.IC} docName = {this.state.docName}/>
                                        <div className="group">
                                            <div className="wrapmsgr_organ_tree ng-scope angular-ui-tree" ui-tree="organTreeOptions" data-clone-enabled="true" data-nodrop-enabled="true" data-drag-delay="100" style = {organ_tree_calc_width}>
                                                <MemberList memberListType = {MemberListType.SELECT}  />
                                            </div>    
                                            <div className="wrapmsgr_organ_tree right-list-col ng-scope angular-ui-tree" ui-tree="inviteTreeOptions">
                                                <MemberList memberListType = {MemberListType.SELECTED}/>
                                            </div>
                                        </div>
                                    </div>
                                    <Footer convoId = {this.state.convoId}/>
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

