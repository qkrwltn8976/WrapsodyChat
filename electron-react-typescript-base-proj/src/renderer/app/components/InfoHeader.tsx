import * as React from 'react';
import { ConvoType, InfoHeaderType} from "../../libs/enum-type"
import { getDocType } from '../../libs/messengerLoader'
import {client} from "@/renderer/libs/stomp"
import {v4} from "uuid"
import language from "@/renderer/language/language.json"
import { publishApi } from '@/renderer/libs/stomp';
import { TreeMember } from '../../models/TreeMember';
import store from '../../../store'

const Store = require('electron-store')
const electronStore = new Store()

const { remote, ipcRenderer }  = require('electron')
const { BrowserWindow } = remote

interface Props{ 
    convoType: number;
    convoId?:string;
    // infoheaderType: string;
    memberCount: number;
    docName: string;
    notificationType?: number;
    setNotification?:any
    tempMembers?: TreeMember[],
}

interface ShowState{
    isShow: boolean;
    uuid:string; 
    tempMembers : TreeMember[];  
}


class InfoHeader extends React.Component<Props, ShowState>{
    payload: any;
    convoId: string;
    
    constructor(props: Props, state: {}){
        super(props, state);
        this.state = ({
            isShow: false,
            uuid: v4(),
            tempMembers : store.getState().tempMembers
        }); 
        store.subscribe(function(this: InfoHeader){
            this.setState({ tempMembers : store.getState().tempMembers})
        }.bind(this));
        
    }

    showBookmarks = (e) => {
        e.preventDefault();

        var currentWindow = remote.getCurrentWindow()
        var size = currentWindow.getSize()
        // var width = size[0] * 0.9;
        // var height = size[1] * 0.9;
        let bookmarkWindow = new BrowserWindow({
            width: 700,
            height: 585,
            minWidth: 370,
            minHeight: 370,
            // maxWidth: 700,
            // maxHeight: 585,
            parent: currentWindow,
            modal: true,
            show: false,
            frame: false,
        })
        bookmarkWindow.loadURL(
            __dirname + "/index.html#/bookmark/"+this.props.convoId
        );
        bookmarkWindow.show();
    }

    showPreview = (e) =>{
        e.preventDefault();
        var win = new BrowserWindow()
        win.loadURL("http://ecm.dev.fasoo.com:9099/filesync/document/preview.do?id="+this.convoId)
    }

    //실제로 사용되어야할 주소
    //downloadFile ="http://ecm.dev.fasoo.com:9099/filesync/down.do?id="+ this.props.convoId
    downloadFile = (e) =>{
        e.preventDefault()
        var win = new BrowserWindow()
        win.loadURL("http://wrapsody.fasoo.com:7066/filesync/document/download.do?syncId=20161123064228b6a713b403d7495eb7909a74eb2f9733")
        console.log("다운로드해라")
        // ipcRenderer.send("download",{
        //     url: "http://ecm.dev.fasoo.com:9099/filesync/document/download.do?syncId="+this.convoId,
        //     properties: {directory: __dirname}
        // })
    }

    showClick = (e) => {
        e.preventDefault();
        if(this.state.isShow == false){
            var i, l:string
            if(electronStore.get("language")==="ko-KR"){
                i = language.ko.invite
                l = language.ko.exit
            }
            
            if(electronStore.get("language")==="en-US"){
                i = language.en.invite
                l = language.
                en.exit
            }
        }
        this.setState({
            isShow: !this.state.isShow
        })
    }

    showInvite = (e) => {
        e.preventDefault();
        this.setState({
            isShow: !this.state.isShow
        })
        var currentWindow = remote.getCurrentWindow()
        var size = currentWindow.getSize()
        // var width = size[0] * 0.9;
        // var height = size[1] * 0.9;
        let inviteWindow = new BrowserWindow({
            width: 700,
            height: 585,
            minWidth: 370,
            minHeight: 370,
            // maxWidth: 700,
            // maxHeight: 585,
            parent: currentWindow,
            modal: true,
            show: false,
            frame: false,
        })
        inviteWindow.loadURL(
            __dirname + "/index.html#/invite/"+this.props.convoId
        );
        inviteWindow.show();
    }

    leaveRoom = (e)=>{
        e.preventDefault();
        publishApi(client, "api.room.leave", electronStore.get("username"), this.state.uuid, {convoId: this.props.convoId})
        console.log("나가?")
        var win = remote.getCurrentWindow()
        win.close()
    }

    //notificationType 에 따라 icon_bell 아이콘의 모양 결정
    getBellIcon(){
        if(this.props.notificationType===0){
            return "icon_bell_off";
        }
            
        else {
            return "icon_bell";
        } 
    }
    
    render(){

        ipcRenderer.on("download progress", (event, progress) => {
            console.log(progress); // Progress in fraction, between 0 and 1
            const progressInPercentages = progress * 100; // With decimal point and a bunch of numbers
            const cleanProgressInPercentages = Math.floor(progress * 100); // Without decimal point
        });
        var pNum:string;
        if(electronStore.get("language") === "ko-KR")
            pNum = language.ko.pNum
        if(electronStore.get("language") === "en-US")
            pNum = language.en.pNum

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
                        <span className="chatroom-user-cnt ng-binding">{this.props.memberCount} {pNum}</span>
                    </div>
                    {/* <div className="chatroom-user">
                        <div className="chatroom-user-list ng-hide" >
                            <ul>
                                <li className="ng-binding ng-scope">administrator</li>
                            </ul>
                        </div>
                    </div> */}
                    <div className="wrapmsgr_right">
                        <a href=""><i className="icon_bookmark" title="북마크" onClick = {this.showBookmarks}></i></a>
                        <a href=""><i className="icon_eye" title="미리보기" onClick = {this.showPreview}></i></a>
                        <a href= "" ><i className="icon_download" title="다운로드" onClick = {this.downloadFile}></i></a>
                        <a href=""><i className={this.getBellIcon()} onClick= {(e) =>{
                            e.preventDefault();
                            this.props.setNotification(this.props.notificationType)}}></i></a>
                        <div className="ng-isolate-scope">
                            <a href=""><i className="icon_ellipsis_h" title="더 보기" onClick = {this.showClick}></i></a>
                             <div className={ this.state.isShow ? 'wrapmsgr_dropdown_menu' : 'wrapmsgr_dropdown_menu hidden'} style={{position: "absolute"}}>
                                <div title= "대화 상대 초대" className= "ng-scope" onClick = {this.showInvite}>
                                    <i className= "icon_plus"></i>Invite
                                </div>
                                <div title="나가기" className="ng-scope ng-enter-prepare" onClick= {this.leaveRoom}>
                                    <i className="icon_log_out"></i>Leave
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
        if(convoType === ConvoType.IC){
            return (
                <div className="doc-chatroom-info_div">
                    <document-icon name="docInfo.detail.contentName" class="ng-isolate-scope"><i className="icon_txt">          <span className="path1"></span>         <span className="path2"></span>         <span className="path3"></span>         <span className="path4"></span>         <span className="path5"></span>         <span className="path6"></span>         <span className="path7"></span>         <span className="path8"></span>         <span className="path9"></span>         <span className="path10"></span>            <span className="path11"></span>            </i></document-icon>
                    <div className="doc-name ng-binding">{this.props.docName}</div>
                    <div>
                        <span className="ng-binding">문서 권한 보유자 {this.props.memberCount} 명 / 대화 상대 {this.props.memberCount + this.state.tempMembers.length} 명</span>                       
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