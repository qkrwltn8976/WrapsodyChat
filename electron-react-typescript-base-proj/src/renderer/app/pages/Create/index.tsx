import * as React from 'react';
import { MsgList, MsgInput, Header, MemberList, InfoHeader, SearchBar, Footer } from '../../components';
import { HeaderType, MemberListType, RoomType, InfoHeaderType, CIType, ConvoType } from '../../../libs/enum-type';
import { Room } from '../../../models/Room'

// state -> expand, checked 
// props -> Invite, Create
interface createProps{
    match: any,
}


class Create extends React.Component<createProps>{
    constructor(props:createProps){
        super(props);
    }

    render(){
        const { convoId } = this.props.match.params.convo;
        return(
            <React.Fragment>
                <div id="wrapmsgr" className="ng-scope">
                    <div id="wrapmsgr_body" ng-controller="WrapMsgrController" className="wrapmsgr_container ng-scope" data-ws="ws://ecm.dev.fasoo.com:9500/ws" data-vhost="/wrapsody-oracle" data-fpns-enabled="true" data-weboffice-enabled="true">
                        <div className="wrapmsgr_popup_container active" ng-class="{active: activePopup}">
                            <div className="wrapmsgr_popup manage_doc_room" ng-class="{disabled: !loggedIn}" ng-show="activePopup == 'manage_doc_room'">
                                <Header docName = "" headerType={HeaderType.CREATE}/>
                                <form name="manageDocRoomForm" ng-submit="submitDocRoom()" className="ng-pristine ng-valid">
                                    <div className="wrapmsgr_popup_body">
                                        <InfoHeader convoType= {ConvoType.IC} memberCount = {5} docName = {"dfawe rawerew.txt"}/>
                                        <div className="group">
                                            <div className="wrapmsgr_organ_tree ng-scope angular-ui-tree" ui-tree="organTreeOptions" data-clone-enabled="true" data-nodrop-enabled="true" data-drag-delay="100">
                                                {/* <MemberList memberListType = {MemberListType.SELECT} members = {members} groups = {groups}/> */}
                                            </div>    
                                            <div className="wrapmsgr_organ_tree right-list-col ng-scope angular-ui-tree" ui-tree="inviteTreeOptions">
                                                {/* <MemberList memberListType = {MemberListType.SELECTED} members = {members} groups = {groups}/> */}
                                            </div>
                                        </div>
                                    </div>
                                    <Footer convoId = {"ddd"}/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        ); 
    }
}

export default Create;
