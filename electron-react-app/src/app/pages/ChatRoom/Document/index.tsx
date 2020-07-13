import * as React from 'react';
import { MsgList, MsgInput, Header, MemberList, InfoHeader, SearchBar } from '../../../components';
import { HeaderType, MemberListType, RoomType, InfoHeaderType } from '../../../../libs/enum-type';
import { Message } from 'src/models/Message';
import { User } from 'src/models/User';
import "src/assets/css/wrapmsgr.css";
import "src/assets/css/wrapmsgr-components.css";
import "src/assets/css/wrapmsgr-icons.css";

interface RoomProps {
    convoId: string,
    uuid: string,
    msgs: Message[],
    members: User[]
}

class DocumentChatRoom extends React.Component<RoomProps, {}> {
    constructor(props: RoomProps, state: {}) {
        super(props, state);
        
        // this.props.msgs = props.msgs;
    }

    componentDidMount() {

    }

    render() {
        return (
            <React.Fragment>
                <div id="wrapmsgr" className="ng-scope">
                    <div id="wrapmsgr_body" ng-controller="WrapMsgrController" className="wrapmsgr_container ng-scope" data-ws="ws://ecm.dev.fasoo.com:9500/ws" data-vhost="/wrapsody-oracle" data-fpns-enabled="true" data-weboffice-enabled="true">
                        <div className="wrapmsgr_chat wrapmsgr_state_normalize wrapmsgr_viewmode_full" ng-class="[chatroomState, viewModeClass, {false: 'disabled'}[loggedIn]]" ng-show="current.convo">
                            <Header convoId = {this.props.convoId} docName = "" headerType = {HeaderType.CHAT} />
                            <div className="wrapmsgr_content  wrapmsgr_viewmode_full doc-chatroom" ng-class="[{1: 'doc-chatroom', 2: 'wrapmsgr_chatbot'}[current.convo.convoType], viewModeClass]">     
                                <InfoHeader convoId = {this.props.convoId} infoheaderType = {InfoHeaderType.DOC} />
                                <div className="wrapmsgr_aside" ng-hide="viewMode == 'chat' || current.convo.convoType == 2">
                                    <SearchBar/>
                                    <MemberList convoId = {this.props.convoId} memberListType = {MemberListType.CHAT} />
                                </div>   
                                <div className="wrapmsgr_article wrapmsgr_viewmode_full" ng-class="viewModeClass" id="DocumentChat">
                                    {/* <MsgList convoId={props.convoId} uuid={props.uuid} msgs={null}/> */}
                                    <MsgInput convoId={this.props.convoId} uuid={this.props.uuid}/>
                                </div>       
                            </div>
                        </div>
                    </div>
                </div>    
               
            </React.Fragment>
        )
    } 
}

export default DocumentChatRoom;
