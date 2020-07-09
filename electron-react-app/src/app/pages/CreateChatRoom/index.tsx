import * as React from 'react';
import { MsgList, MsgInput, Header, MemberList, InfoHeader, SearchBar, Footer } from '../../components';
import { HeaderType, MemberListType, RoomType, InfoHeaderType } from '../../../libs/enum-type';
import "src/assets/css/wrapmsgr.css";
import "src/assets/css/wrapmsgr-components.css";
import "src/assets/css/wrapmsgr-icons.css";


function CreateChatRoom() {
    interface Member{
        longName: string;
        shortName: string;
        dept: string;
    }

    let members: Array<Member>;

    members = [
        { longName: "administrator", shortName: "ad", dept: "랩소디"},
        { longName: "administrator", shortName: "ad", dept: "GS"},
        { longName: "administrator", shortName: "ad", dept: "디지털 페이지"},
    ];
        
    interface Group{
        longName: string;
        shortName: string;
    }

    let groups: Array<Group>;

    groups = [
        {longName: "품질관리", shortName: "품질"},
        {longName: "인재 개발팀", shortName: "인재"},
        {longName: "개발팀", shortName: "개발"},

    ]


    return (
        <React.Fragment>
            <div id="wrapmsgr" className="ng-scope">
                <div id="wrapmsgr_body" ng-controller="WrapMsgrController" className="wrapmsgr_container ng-scope" data-ws="ws://ecm.dev.fasoo.com:9500/ws" data-vhost="/wrapsody-oracle" data-fpns-enabled="true" data-weboffice-enabled="true">
                    <div className="wrapmsgr_popup_container active" ng-class="{active: activePopup}">
                        <div className="wrapmsgr_popup manage_doc_room" ng-class="{disabled: !loggedIn}" ng-show="activePopup == 'manage_doc_room'">
                            <Header docName = "" headerType={HeaderType.CREATE}/>
                            <form name="manageDocRoomForm" ng-submit="submitDocRoom()" className="ng-pristine ng-valid">
                                <div className="wrapmsgr_popup_body">
                                    <InfoHeader props = {InfoHeaderType.CREATE}/>
                                    <div className="group">
                                        <div className="wrapmsgr_organ_tree ng-scope angular-ui-tree" ui-tree="organTreeOptions" data-clone-enabled="true" data-nodrop-enabled="true" data-drag-delay="100">
                                            <MemberList memberListType = {MemberListType.SELECT} members = {members} groups = {groups}/>
                                        </div>    
                                        <div className="wrapmsgr_organ_tree right-list-col ng-scope angular-ui-tree" ui-tree="inviteTreeOptions">
                                            <MemberList memberListType = {MemberListType.SELECTED} members = {members} groups = {groups}/>
                                        </div>
                                    </div>
                                </div>
                                <Footer />
                            </form>
                        </div>
		            </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default CreateChatRoom;




