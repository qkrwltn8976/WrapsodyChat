import * as React from 'react';
import ReactDOM from 'react-dom';
import { ConvoType, InfoHeaderType} from "../../libs/enum-type"
import { getDocType } from '../../libs/messengerLoader'
import { client, subscribe, publishApi} from '@/renderer/libs/stomp';
import {v4} from "uuid"
const Store = require('electron-store')
const store = new Store()

const { remote }  = require('electron')
const { BrowserWindow } = remote

interface Props{ 
    convoType: number,
    convoId?:string,
    // infoheaderType: string;
    memberCount: number;
    docName: string,
    notificationType?: number;
}

interface ShowState{
    isShow: boolean;
    wrapmsgr_dropdown_menu:string;
    ngScope: string;
    iconPlus: string;
    leaveClass: string;
    iconLogOut: string;
    invite: string;
    leave: string;
    //Inivite and Create
    participants: number;
    notificationType:number;
    uuid:string;
    bellCnt:number;
}

class InfoHeader extends React.Component<Props, ShowState>{
    client: any;
    payload: any;
    convoId: string = "98f7e404-f6b7-4513-84b4-31aa1647bc6d";
    constructor(props: Props){
        super(props);     

        this.state = {
            isShow: false,
            wrapmsgr_dropdown_menu: "",
            ngScope: "",
            iconPlus: "",
            leaveClass: "",
            iconLogOut: "",
            invite: "",
            leave: "",
            participants: this.props.memberCount, // 처음엔 참가자수 멤버수 동일
            notificationType: this.props.notificationType,
            uuid:v4(),
            bellCnt:0
        };
    }
    
    showClick = (e) => {
        e.preventDefault();
        if(this.state.isShow == false){
            this.setState({
                isShow : true,
                wrapmsgr_dropdown_menu: "wrapmsgr_dropdown_menu",
                ngScope: "ng-scope",
                iconPlus: "icon_plus",
                leaveClass: "ng-scope ng-enter-prepare",
                iconLogOut: "icon_log_out",
                leave: "Leave",
                invite:"Invite",
            })
        }
        else{
            this.setState({
                isShow: false,
                wrapmsgr_dropdown_menu: "",
                ngScope: "",
                iconPlus: "",
                leaveClass: "",
                iconLogOut: "",
                leave: "",
                invite: "",
          })
        }
    }

    showInvite = (e) => {
        e.preventDefault();
        var currentWindow = remote.getCurrentWindow()
        var size = currentWindow.getSize()
        var width = size[0] * 0.9;
        var height = size[1] * 0.9;
        let inviteWindow = new BrowserWindow({
            width: width,
            height: height,
            minWidth: 370,
            minHeight: 370,
            maxWidth: 700,
            maxHeight: 585,
            parent: currentWindow,
            modal: true,
            show: false,
            frame: false,
        })
        inviteWindow.loadURL(
            __dirname + "/index.html#/invite/"+this.convoId
        );
        inviteWindow.show();
    }

    //icon_bell 클릭시 notificationType 수정
    setNoti = (e) => {
        e.preventDefault();
        if(this.state.notificationType===0 ){
            this.setState({notificationType:1})
            publishApi(client, "api.conversation.notification",store.get("username"),this.state.uuid, {"convoId":this.props.convoId, "type": 1})
            if(this.state.bellCnt===0&& this.props.notificationType!==0){
                this.setState({notificationType:0})
            publishApi(client, "api.conversation.notification",store.get("username"),this.state.uuid, {"convoId":this.props.convoId, "type": 0})
            }
        }
        else{
            this.setState({notificationType:0})
            publishApi(client, "api.conversation.notification",store.get("username"),this.state.uuid, {"convoId":this.props.convoId, "type": 0})
        }

        this.setState({bellCnt: this.state.bellCnt+1})
        
        console.log(this.state.notificationType)
            
    }
    //notificationType 에 따라 icon_bell 아이콘의 모양 결정
    getBellIcon(){
        if(this.state.notificationType===0){
            if(this.state.bellCnt===0&& this.props.notificationType!==0){
                return "icon_bell"
            }
            return "icon_bell_off";
        }
            
        else {
            return "icon_bell";
        } 
    }

    componentDidMount(){
        this.setState({notificationType: this.props.notificationType})
    }
   
    render(){
        console.log(this.props.notificationType)
        console.log(this.state.notificationType)

        const {convoType} = this.props;
        if( convoType === ConvoType.DOC){
            return (
                <div className="wrapmsgr_header">
                    <div className="wrapmsgr_header_title ng-scope" id = "forDocIcon">
                        <document-icon name="current.convo.name" className="ng-isolate-scope">
                            <i className={getDocType(this.props.docName)}>            <span className="path1"></span>         <span className="path2"></span>         <span className="path3"></span>         <span className="path4"></span>         <span className="path5"></span>         <span className="path6"></span>         <span className="path7"></span>         <span className="path8"></span>         <span className="path9"></span>         <span className="path10"></span>            <span className="path11"></span>            </i>
                        </document-icon>
                        <div className="chatroom-name ng-binding" title="Sample Text .DotInMiddle.txt">{this.props.docName}</div>
                        <div className="chatroom-size ng-binding">3.5KB</div>
                    </div>
                    <div className="chatroom-user">
                        <i className="icon_users"></i>
                        <span className="chatroom-user-cnt ng-binding">{this.props.memberCount} 명</span>
                    </div>
                    {/* <div className="chatroom-user">
                        <div className="chatroom-user-list ng-hide" >
                            <ul>
                                <li className="ng-binding ng-scope">administrator</li>
                            </ul>
                        </div>
                    </div> */}
                    <div className="wrapmsgr_right">
                        <a href=""><i className="icon_eye" title="미리보기"></i></a>
                        <a href="" ><i className="icon_download" title="다운로드"></i></a>
                        <a href=""><i className={this.getBellIcon()} onClick={this.setNoti}></i></a>
                        <div className="ng-isolate-scope">
                            <a href=""><i className="icon_ellipsis_h" title="더 보기" onClick = {this.showClick}></i></a>
                             <div className={this.state.wrapmsgr_dropdown_menu} style={{position: "absolute"}}>
                                <div title="대화 상대 초대" className={this.state.ngScope} onClick = {this.showInvite}>
                                    <i className={this.state.iconPlus}></i>{this.state.invite} 
                                </div>
                                <div title="나가기" className={this.state.leaveClass}>
                                    <i className={this.state.iconLogOut}></i>{this.state.leave}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        if(convoType === ConvoType.DEP){
            return (
                <div className="wrapmsgr_header">
                        {/* <div className="wrapmsgr_header_title ng-scope">
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
                        </div> */}
                    </div>
            );
        }
        if(convoType === ConvoType.BOT){
            return (<React.Fragment></React.Fragment>)
        }
        //     return (
        //         <div className="wrapmsgr_chatbot-info_div">
        //                     <p className="ng-binding">Wrapsody Chatbot에게 무엇이든 물어보세요!</p>
        //                     <a href=""><i title="알림 수신" className="icon_bell_off"></i></a>
        //         </div>
        //     );
        // }
        // if(infoheaderType === InfoHeaderType.CREATE || InfoHeaderType.INVITE){
        //     return (
        //         <div className="doc-chatroom-info_div">
        //             <document-icon name="docInfo.detail.contentName" class="ng-isolate-scope"><i className="icon_txt">          <span className="path1"></span>         <span className="path2"></span>         <span className="path3"></span>         <span className="path4"></span>         <span className="path5"></span>         <span className="path6"></span>         <span className="path7"></span>         <span className="path8"></span>         <span className="path9"></span>         <span className="path10"></span>            <span className="path11"></span>            </i></document-icon>
        //                 <div className="doc-name ng-binding">새 텍스트 문서 (2).txt</div>
        //                     <div>
        //                         <span className="ng-binding">문서 권한 보유자 3 명 / 대화 상대 1 명</span>                       
        //                 </div>
        //         </div>
        //     )
        // }
        if(convoType == ConvoType.IC){
            return (
                <div className="doc-chatroom-info_div">
                    <document-icon name="docInfo.detail.contentName" class="ng-isolate-scope"><i className="icon_txt">          <span className="path1"></span>         <span className="path2"></span>         <span className="path3"></span>         <span className="path4"></span>         <span className="path5"></span>         <span className="path6"></span>         <span className="path7"></span>         <span className="path8"></span>         <span className="path9"></span>         <span className="path10"></span>            <span className="path11"></span>            </i></document-icon>
                    <div className="doc-name ng-binding">{this.props.docName}</div>
                    <div>
                        <span className="ng-binding">문서 권한 보유자 {this.props.memberCount} 명 / 대화 상대 {this.state.participants} 명</span>                       
                    </div>
                </div>
            )
        }
        return (
            <div></div>
        );

    }

}

export default InfoHeader;