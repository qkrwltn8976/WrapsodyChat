import * as React from 'react';
import { MsgList, MsgInput, Header, MemberList, InfoHeader, SearchBar, Footer } from '../../components';
import { HeaderType, MemberListType, RoomType, InfoHeaderType, CIType, ConvoType } from '../../../libs/enum-type';
import { Room } from '../../../models/Room'

// state -> expand, checked 
// props -> Invite, Create
interface inviteProps{
    match: any,
}

const treeData= [
    {
      key: 'Fasso',
      label: 'Fasso',
      nodes: [
        {
          key: 'Wrapsody',
          label: 'Wrapsody',
          nodes: [
            {
              key: 'employee',
              label: 'employee',
              nodes: []
            },
          ],
        },
      ],
    },
    {
      key: 'Sparrow',
      label: 'Sparrow',
    },
];


class Invite extends React.Component<inviteProps>{
    constructor(props:inviteProps){
        super(props);
    }

    render(){
        const { convoId } = this.props.match.params.convo;
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
                                        <InfoHeader convoType= {ConvoType.IC} memberCount = {5} docName = {"dfawe rawerew.txt"}/>
                                        <div className="group">
                                            <div className="wrapmsgr_organ_tree ng-scope angular-ui-tree" ui-tree="organTreeOptions" data-clone-enabled="true" data-nodrop-enabled="true" data-drag-delay="100">
                                                <MemberList memberListType = {MemberListType.SELECT} treeData = {treeData}/>
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





