import { Component, Fragment, useContext } from 'react';
import React from 'react';
import { client, subscribe, publishApi} from '@/renderer/libs/stomp';
import { v4 } from "uuid"
import { getConvoDate } from '@/renderer/libs/timestamp-converter';
import {getDocType} from '@/renderer/libs/messengerLoader'
import { Conversation } from '@/renderer/models/Conversation';
import { sortConvos } from '@/renderer/libs/sort';
import { sendNotification } from '@/renderer/libs/notification';

const {remote, webContents} = require('electron')
const Store = require('electron-store')
const store = new Store()
const {BrowserWindow} = remote

interface ChatListState {
    convos: Conversation[],
    len: number,
    uuid: string,
}

interface ChatListProps {
    search: string
}

class Chat extends Component<ChatListProps, ChatListState> {
    _isMounted: boolean = false;
    roomName: [] = [];
    roomDate: [] = [];
    roomRead: [] = [];
    roomOpened: []=[]
    payload: any;
    search: string = "";
    state: any = { 
        payload: [],
    };
    convoId: string = "";
    uuid: string = v4();
    chatBotImgPath = "http://ecm.dev.fasoo.com:9400/images/icon_bot_wrapsody.png"
    

    getConvo = (convoId: string, name:string) => (event: any) => {

        
        const chatWindow = new BrowserWindow(
            {
                titleBarStyle: "hidden",
                frame:false,
                width:800,
                height:700,
                minHeight: 200,
                minWidth: 400,
                maxHeight:700,
                // maxWidth:800,
                hasShadow:true,
                icon: __dirname + './public/icon_bot_wrapsody.png'
            }
        )
        // // and load the index.html of the app.
        chatWindow.loadURL(
            __dirname+"/index.html#/chatroom/"+convoId          
        );

        chatWindow.setTitle(name)
        chatWindow.show();

        const index = this.state.convos.findIndex(convo => convo.convoId === convoId),
        convos = [...this.state.convos] // important to create a copy, otherwise you'll modify state outside of setState call
        convos[index].unread = 0;
        convos[index].browserId = chatWindow.id;
        convos[index].isOpened = true;
        this.setState({ convos });
        // console.log(chatWindow.isDestroyed())
        
    }

    isBrowserOpened = (id: number) => {
        if(id) {
            let window = BrowserWindow.fromId(id);
            if(window && !window.isDestroyed())
                return true;
        }
        return false;
    }

    stompConnection = () => {
    
        let obj = {};
        client.onConnect = () => {
            subscribe(client, store.get("username"), this.state.uuid, (obj: any) => {
                let payload = obj.payload;
                console.log(payload)
                if (payload) {
                    if (payload.Conversations) {
                        //채팅방 시간순 정렬
                        this.setState(
                            {
                                convos: sortConvos(payload.Conversations),
                                len: payload.Conversations.length
                            },
                        )

                    }
                    if(payload.type){
                        const index = this.state.convos.findIndex(convo => convo.convoId === payload.convoId)
                        this.setState(state => {
                            state.convos[index].notificationType = payload.type

                            return{
                                
                            }
                        })
                    }
                } else {
                    if (obj.body || obj.messageId) {
                        console.log(obj.sendUserId + ' ' + obj.notificationType)
                        // if(obj.sendUserId !==  store.get("username"))
                        //     sendNotification('새로운 메세지가 도착했습니다',obj.sendUserId, obj.body||obj.messageId);
                        // if((obj.sendUserId !==  store.get("username")) && (obj.notificationType === 1)) {
                            
                        //     sendNotification('새로운 메세지가 도착했습니다', obj.sendUserId, obj.body||obj.messageId);                 
                        // }
                        const index = this.state.convos.findIndex(convo => convo.convoId === obj.recvConvoId),
                            convos = [...this.state.convos] // important to create a copy, otherwise you'll modify state outside of setState call
                            convos[index].latestMessage = obj.body;
                            if(obj.sendUserId!==store.get("username")){ 
                                if(this.isBrowserOpened(convos[index].browserId)) {
                                    // 윈도우 창이 열려있는 경우
                                    convos[index].unread = 0;
                                }
                                else {
                                    // 윈도우 창이 닫혀있는 경우
                                    convos[index].unread += 1;
                                    if(convos[index].notificationType === 1){
                                        var win = remote.getCurrentWindow()
                                        sendNotification('새로운 메세지가 도착했습니다', obj.sendUserId, obj.body||obj.messageId);
                                        win.once('focus', () => win.flashFrame(false))
                                        win.flashFrame(true)
                                    }
                                                         
                                }
                            }
                            convos[index].latestMessageAt = obj.updatedAt;
                            this.setState({ convos:sortConvos(convos) });
                            // convos[index].isOpened ? convos[index].unread = 0 : convos[index].unread += 1;}
                    }
                    
                }
            });
            publishApi(client, 'api.conversation.list', store.get("username"), this.state.uuid, {});
        }
        client.activate();
    }

    constructor(props: ChatListProps) {
        super(props);
        this.state = ({
            uuid: v4(),
            convos: [],
            len: 0
        })

    }

    componentDidMount() {
        this.stompConnection();
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    checkInclude = (name:string)=>{
        if(name!==undefined){
            if(name.toLowerCase().includes(this.state.search.toLowerCase()))
            return true
        }
        return false;
    }

    getBellIcon(state: any){
        if(state===0){
            return "icon_bell_off";
        }
            
        else {
            return "";
        } 
    }

    
    render() {
        let convos = this.state.convos;
        
        if (convos != undefined) {
            return (
                <Fragment>
                    {convos.map((item: any) =>
                    <Fragment>
                        {/* <Link to = {"/document/"+item.convoId}> */}
                        {/* 검색 활성화 */}
                        { item.name && (this.props.search === null || item.name.toLowerCase().includes(this.props.search.toLowerCase()))?
                        <li onClick={this.getConvo(item.convoId, item.name)} className="ng-scope">
                        {/* /챗봇, 문서채팅방의 아이콘 표시/ */}
                        {item.convoType ===2? 
                            <span className = "user-photo" style = {{backgroundImage:'url(http://ecm.dev.fasoo.com:9400/images/icon_bot_wrapsody.png)'}}></span>:
                            <document-icon className="ng-scope ng-isolate-scope">
                            <i className= {getDocType(item.name)}>
                                <span className="path1"></span>         <span className="path2"></span>         <span className="path3"></span>         <span className="path4"></span>         <span className="path5"></span>         <span className="path6"></span>         <span className="path7"></span>         <span className="path8"></span>         <span className="path9"></span>         <span className="path10"></span>            <span className="path11"></span>            
                            </i>
                            </document-icon>
                        }
                        <div className="title_h5" id="title_5">
                            <span className="chatroom-name">{item.name}</span>
                            <span className="chatroom-user-cnt">{item.memberCount}</span>
                            <i className = {this.getBellIcon(item.notificationType)}></i>
                            <span className="chatroom-message-contents">{item.latestMessage}</span>
                        </div>
                        <div className="wrapmsgr_right">
                            <span className="chatroom-date">{getConvoDate(item.latestMessageAt)}</span>
                            {/* 조건부 unread 메세지 표시 */}
                            {item.unread===0 ? null:
                                <span className="wrapmsgr_unread_outer">
                                    <span className="wrapmsgr_unread">{item.unread}</span>
                                </span>
                            }
                        </div>
                    </li>
                    :
                    <Fragment></Fragment>
                        }
                        {/* </Link> */}
                        </Fragment>
                        )
                    }
                </Fragment>)
        }
    return (<div>{this.props.search}</div>)
    }
}
export default Chat;