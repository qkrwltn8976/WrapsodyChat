import * as React from 'react';
import {HeaderType} from '@/renderer/libs/enum-type';

const remote = require('electron').remote

interface Props{
    docName?: string; // 채팅방 생성 헤더에서만 docName필요 나머지는 null
    headerType: string;
    convoId?: String;
}
// header가 받는 Props설정
// 기존 javascript에서의 react props? 재사용을 위해서 내가 커스텀을 진행할 수 있도록 값을 props로 전달
// typescript에서는 PropTypes를 통해서 런터임에서 props검증
// 타입, 문서제목 필요
class Header extends React.Component<Props>{
    constructor(props: Props){
        super(props);
    } // 생성자
    
    closeWindow = (event:any)=>{
        console.log('bye')
        var win = remote.getCurrentWindow()
        win.close()
    }

    minimizeWindow = (event:any)=>{
        var win = remote.getCurrentWindow()
        win.minimize()
    }

    render() {
        const {docName, headerType} = this.props;
        
        if(headerType === HeaderType.CHAT){
            return(
                <div className = "wrapmsgr_title_header">
                    <h1 className = "wrapmsgr_title" id = "forHeaderDocTitle">
                        <span className = "ng-scope">{headerType}-</span>
                        <span className = "ng-binding" title = {docName}>{docName}</span>
                    </h1>
                    <div className = "wrapmsgr-header-icon-wrap">
                        <a href = "">
                            <i style = {{fontSize:30}} onClick = {this.minimizeWindow}>-</i>
                        </a>
                        <a href = "">
                            <i className = "icon_times" title = "Close" onClick={this.closeWindow}></i>
                        </a>
                    </div>
                </div>
            );
        }else if(headerType === HeaderType.CREATE){
            return(
                <div className="wrapmsgr_popup_header">
                    <h2 className="title_h2">
                        <span ng-if="manageMethod == 'create'" className="ng-scope">{headerType}</span>
                    </h2>
                        <a href = "">
                            <i style = {{fontSize:30}} onClick = {this.minimizeWindow}>-</i>
                        </a>
                    <a href=""><i className="icon_times" onClick={this.closeWindow}></i></a>
                </div>
            );    
        }
        else if(headerType === HeaderType.INVITE){
            return(
                <div className = "wrapmsgr_popup_header">
                    <h2 className = "title_h2">
                        <span>{headerType}</span>
                    </h2>
                    <div className = "wrapmsgr-header-icon-wrap">
                        <a href = "">
                            <i style = {{fontSize:30}} onClick = {this.minimizeWindow}>-</i>
                        </a>
                        <a href ="">
                            <i className = "icon_times" title = "Close" onClick={this.closeWindow}></i>
                        </a>
                    </div>    
                </div>
            );    
        }
        else if(headerType === HeaderType.LIST){
            return(
                <div className="wrapmsgr_title_header">
				    <h1 className="wrapmsgr_title">Wrapsody Chat</h1>
				        <div className="wrapmsgr-header-icon-wrap">
                        <a href = "">
                            <i style = {{fontSize:30}} onClick = {this.minimizeWindow}>-</i>
                        </a>
			 		        <a href=""><i className="icon_times" title="닫기" onClick={this.closeWindow}></i></a>
			 	    </div>
			</div>
            )
        }
        else{
            return(
                <div className = "wrapmsgr_title_header">
                    <h1 className = "wrapmsgr_title">{headerType}</h1>
                    <div className = "wrapmsgr-header-icon-wrap">
                        <a href = "">
                            <i style = {{fontSize:30}} onClick = {this.minimizeWindow}>-</i>
                        </a>
                        <a href = ""><i className = "icon_times" title = "Close" onClick={this.closeWindow}></i></a>
                    </div>
                </div>
            );
        } // Wrapsody Chat Bot, Wrapsody Chat, invite
    }
}

export default Header;
