import { Component, Fragment } from 'react';
import React from 'react';
import { createClient, subscribe, publishApi } from '@/renderer/libs/stomp';
import ReactDOM from 'react-dom';
import DocumentChatRoom from '../ChatRoom/Document';
import { v4 } from "uuid"
import { getConvoDate } from '@/renderer/libs/timestamp-converter';
import {getDocType} from '@/renderer/libs/messengerLoader'

interface IState {
    msgs: any;
    members: any;
    convos: any;
    payload: any;
    len:number;
    search: string;
}

interface props{
    search:string
}

class Chat extends Component<props> {
    _isMounted: boolean = false;
    roomName: [] = [];
    roomDate: [] = [];
    roomRead: [] = [];
    client: any;
    payload: any;
    search: string = "";
    state: any = { 
        payload: [],
    };
    convoId: string = "";
    uuid: string = "";
    chatBotImgPath = "http://ecm.dev.fasoo.com:9400/images/icon_bot_wrapsody.png"


    

    getConvo = (convoId: string) => (event: any) => {
        console.log(this.state.payload)
        this.convoId = convoId;

        ReactDOM.render(<DocumentChatRoom convoId={this.convoId} uuid={this.uuid} client={this.client} />, document.getElementById('root'));
    }

    stompConnection = () => {
        this.client = createClient("admin", "1111");
        let obj = {};
        this.uuid = v4();
        this.client.onConnect = () => {
            console.log("connected to Stomp");

            subscribe(this.client, 'admin', this.uuid, (payload: any) => {
                console.log(this._isMounted)
                if (payload) {
                    if (payload.Conversations) {

                        //채팅방 시간순 정렬
                        for(var outer = payload.Conversations.length-1;outer>0;--outer){
                            for(var inner = 0;inner<outer;++inner){
                                if(payload.Conversations[inner].updatedAt<payload.Conversations[inner+1].updatedAt){
                                    var tmp = payload.Conversations[inner]
                                    payload.Conversations[inner] = payload.Conversations[inner+1]
                                    payload.Conversations[inner+1] = tmp
                                }
                            }
                        }
                        
                        this.setState(
                            {   convos: payload.Conversations,
                                len: payload.Conversations.length
                            },
                        )
                    }
                }
            });
            publishApi(this.client, 'api.conversation.list', 'admin', this.uuid, {});
        }
        this.client.activate();
    }

    constructor(props: props) {
        super(props);


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

    
    render() {

        let convos = this.state.convos
            
        if (convos != undefined) {

            return (
                <Fragment>
                    {convos.map((item: any) =>
                    <Fragment>
                        {/* 검색 활성화 */}
                        {this.props.search === null || item.name.toLowerCase().includes(this.props.search.toLowerCase())?
                        <li onClick={this.getConvo(item.convoId)} className="ng-scope">
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
                            <i></i>
                            <span className="chatroom-message-contents">{item.latestMessage}</span>
                        </div>
                        <div className="wrapmsgr_right">
                            <span className="chatroom-date">{getConvoDate(item.updatedAt)}</span>
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
                        
                        </Fragment>
                        )
                    }
                </Fragment>)
        }
    return (<div>{this.props.search}</div>)
    }
}
export default Chat;