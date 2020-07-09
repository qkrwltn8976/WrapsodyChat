import * as React from 'react';
import {InfoHeaderType} from "src/libs/enum-type"
import { Client, Message, StompSubscription, Stomp, StompConfig, IMessage } from "@stomp/stompjs";
import { createClient, subscribe, publish } from 'src/libs/stomp';

interface Props{ 
    headerType: string;
}

class InfoHeader extends React.Component{
    client: any;
    payload: any;
   
    stompConnection = () => {
        this.client = createClient("admin", "1111");
        let obj = {};
        this.client.onConnect = () => {
            console.log("connected to Stomp");

            subscribe(this.client, 'admin', '98f7e404-f6b7-4513-84b4-31aa1647bc6d');
            publish(this.client, 'api.conversation.view', 'admin', '98f7e404-f6b7-4513-84b4-31aa1647bc6d', {});   
        }
        this.client.activate();
    }

    constructor(props: Props){
        super(props);
        this.stompConnection();
    }

    render(){
        const headerType = this.props;
        if( headerType=== InfoHeaderType.DOC){
            return (
                <div className="wrapmsgr_header">
                    <div className="wrapmsgr_header_title ng-scope">
                        <document-icon name="current.convo.name" className="ng-isolate-scope">
                            <i className="icon_txt">            <span className="path1"></span>         <span className="path2"></span>         <span className="path3"></span>         <span className="path4"></span>         <span className="path5"></span>         <span className="path6"></span>         <span className="path7"></span>         <span className="path8"></span>         <span className="path9"></span>         <span className="path10"></span>            <span className="path11"></span>            </i></document-icon>
                        <div>
                            <div className="chatroom-name ng-binding" title="Sample Text .DotInMiddle.txt">Sample Text .DotInMiddle.txt</div>
                            <div className="chatroom-size ng-binding">3.5KB</div>
                        </div>
                    </div>
                    <div className="chatroom-user">
                        <i className="icon_users"></i>
                        <span className="chatroom-user-cnt ng-binding">3 명</span>
                    </div>
                    <div className="chatroom-user">
                        <div className="chatroom-user-list ng-hide" >
                            <ul>
                                <li className="ng-binding ng-scope">administrator</li>
                            </ul>
                        </div>
                    </div>
                    <div className="wrapmsgr_right">
                        <a href=""><i className="icon_eye" title="미리보기"></i></a>
                        <a href="" ><i className="icon_download" title="다운로드"></i></a>
                        <a href=""><i className="icon_bell"></i></a>
                        <div className="ng-isolate-scope">
                            <a href=""><i className="icon_ellipsis_h" title="더 보기"></i></a>
                            <div className="wrapmsgr_dropdown_menu">
                                <div title="대화 상대 초대" className="ng-scope" >
                                    <i className="icon_plus"></i>
                                </div>
                                <div title="나가기" className="ng-scope ng-enter-prepare">
                                    <i className="icon_log_out"></i>나가기
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        if(headerType ===InfoHeaderType.DEP){
            return (
                <div className="wrapmsgr_header">
                        <div className="wrapmsgr_header_title ng-scope">
                        <span className="user-photo ng-binding ng-isolate-scope group no-photo red">랩소</span>
                            <div>
                                <div className="chatroom-name ng-binding" title="Sample Text .DotInMiddle.txt">Sample Text .DotInMiddle.txt</div>
                                <div className="chatroom-size ng-binding">3.5KB</div>
                            </div>
                        </div>
                        <div className="chatroom-user">
                            <i className="icon_users"></i>
                            <span className="chatroom-user-cnt ng-binding">3 명</span>
                        </div>
                        <div className="chatroom-user">
                            <div className="chatroom-user-list ng-hide" >
                                <ul>
                                    <li className="ng-binding ng-scope">administrator</li>
                                </ul>
                            </div>
                        </div>
                        <div className="wrapmsgr_right">
                            <a href=""><i className="icon_bell"></i></a>
                        </div>
                    </div>
            );
        }
        if(headerType === InfoHeaderType.BOT){
            return (
                <div className="wrapmsgr_chatbot-info_div">
                            <p className="ng-binding">Wrapsody Chatbot에게 무엇이든 물어보세요!</p>
                            <a href=""><i title="알림 수신" className="icon_bell_off"></i></a>
                </div>
            );
        }
        if(headerType === InfoHeaderType.CREATE || InfoHeaderType.INVITE){
            return (
                <div className="doc-chatroom-info_div">
                    <document-icon name="docInfo.detail.contentName" class="ng-isolate-scope"><i className="icon_txt">          <span className="path1"></span>         <span className="path2"></span>         <span className="path3"></span>         <span className="path4"></span>         <span className="path5"></span>         <span className="path6"></span>         <span className="path7"></span>         <span className="path8"></span>         <span className="path9"></span>         <span className="path10"></span>            <span className="path11"></span>            </i></document-icon>
                        <div className="doc-name ng-binding">새 텍스트 문서 (2).txt</div>
                            <div>
                                <span className="ng-binding">문서 권한 보유자 3 명 / 대화 상대 1 명</span>                       
                        </div>
                </div>
            )
        }
        return (
            <div className="wrapmsgr_chatbot-info_div">
                <p className="ng-binding">Default</p>
                <a href=""><i title="알림 수신" className="icon_bell_off"></i></a>
            </div>
        );

    }


}

export default InfoHeader;