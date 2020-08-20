import { Component, Fragment, useContext } from 'react';
import React from 'react';
import {  subscribe, publishApi, client} from '@/renderer/libs/stomp';
import { v4 } from "uuid"
import { getConvoDate } from '@/renderer/libs/timestamp-converter';
import {getDocType} from '@/renderer/libs/messengerLoader'
import { Conversation } from '@/renderer/models/Conversation';
import { sortConvos } from '@/renderer/libs/sort';
import { sendNotification } from '@/renderer/libs/notification';
import store from '@/store';
import { Client } from '@stomp/stompjs';
const {remote, webContents} = require('electron')
const Store = require('electron-store')
const electronStore = new Store()
const {BrowserWindow} = remote
import { connect } from 'react-redux'
interface ChatListState {
    convos: Conversation[],
    len: number,
    uuid: string,
    client: Client
}

interface ChatListProps {
    search: string
}

class ChatList extends Component<ChatListProps, ChatListState> {
    _isMounted: boolean = false;
    roomName: [] = [];
    roomDate: [] = [];
    roomRead: [] = [];
    roomOpened: Map<string, number> = new Map()
    payload: any;
    search: string = "";
    state: any = { 
        payload: [],
    };
    convoId: string = "";
    uuid: string = electronStore.get("uuid");
    chatBotImgPath = "http://ecm.dev.fasoo.com:9400/images/icon_bot_wrapsody.png"
    

    getConvo = (convoId: string, name:string, unread: number, readAt: number) => (event: any) => {

        //이미 열려있는 창이라면 포커스만 주고 새로 띄우지않는다.
        if(this.roomOpened.has(convoId)===true){
            console.log("already opened")
            this.roomOpened.get(convoId)
            let window = BrowserWindow.fromId(this.roomOpened.get(convoId));
            window.focus()
            return;
        }      
        
        
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
            "file://"+__dirname+"/index.html#/chatroom/"+convoId+"/"+unread+"/"+readAt          
        );

        chatWindow.setTitle(name)
        chatWindow.show();

        //창이 닫히면 roomOpened 배열에서 제거
        chatWindow.on('close', () => {
            this.roomOpened.delete(convoId)
        })

        this.roomOpened.set(convoId, chatWindow.id)

        

        const index = this.state.convos.findIndex(convo => convo.convoId === convoId),
        convos = [...this.state.convos] // important to create a copy, otherwise you'll modify state outside of setState call
        convos[index].unread = 0;
        convos[index].browserId = chatWindow.id;
        convos[index].isOpened = true;
        convos[index].readAt = Date.now();
        this.setState({ convos });
        
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
        // let client = this.state.client;
        // client = store.getState().client
       
        client.onConnect = () => {
            
            subscribe(client, electronStore.get("username"), this.state.uuid);
            publishApi(client, 'api.conversation.list', electronStore.get("username"), this.state.uuid, {});
        }
        client.activate();
    }

    constructor(props: ChatListProps) {
        super(props);
        this.state = ({
            uuid: electronStore.get("uuid"),
            convos: [],
            len: 0,
            client: JSON.parse(electronStore.get("stmp"))
        });
        // console.log(electronStore.get("stmp"))
        // console.log()
        let stmp:Client = JSON.parse(electronStore.get("stmp"))
        console.log(stmp)
    }
    

    componentDidMount() {
        this.stompConnection();
        this._isMounted = true;
        store.dispatch({ type: "setElectron", electron: this });
        // store.dispatch({ type: "setClient" , client });
        store.subscribe(function(this: any){
            this.setState({ 
            electron: store.getState().electron,
            convos : sortConvos(store.getState().convos),
            msg: store.getState().msg });

        }.bind(this));

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
                        <li onClick={this.getConvo(item.convoId, item.name, item.unread, item.readAt)} className="ng-scope">
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
export default connect()(ChatList);