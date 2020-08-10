import * as React from 'react';
import { HeaderType } from '@/renderer/libs/enum-type';

const remote = require('electron').remote;
const os = require('os');

interface Props {
    docName?: string; // 채팅방 생성 헤더에서만 docName필요 나머지는 null
    headerType: string;
    convoId?: String;
    bookmark?: string;
}
// header가 받는 Props설정
// 기존 javascript에서의 react props? 재사용을 위해서 내가 커스텀을 진행할 수 있도록 값을 props로 전달
// typescript에서는 PropTypes를 통해서 런터임에서 props검증
// 타입, 문서제목 필요
class Header extends React.Component<Props>{
    constructor(props: Props) {
        super(props);
    } // 생성자

    getRecordIcon = () => {
        if (this.props.bookmark === "Y") {
            return (
                <span className="record-box"><div className="blob"></div>
                    <h6 className="record">RECORDING...</h6></span>
            )
        }
    }

    getRightBtns = () => {
        // if((os.platform() === "darwin")) {
        //     return(null)
        // } else {
            return(<div className="wrapmsgr-header-icon-wrap">
                <a href="">
                    <i style={{ fontSize: 30 }} onClick={this.minimizeWindow}>-</i>
                </a>
                <a href="">
                    <i className="icon_times" title="Close" onClick={this.closeWindow}></i>
                </a>
            </div>)
        // }
    }

    isMac = () => {
        if((os.platform() === "darwin")) 
            return true;
        else
            return false;
    }

    closeWindow = (event: any) => {
        console.log('bye')
        var win = remote.getCurrentWindow()
        win.close()
    }

    minimizeWindow = (event: any) => {
        event.preventDefault()
        var win = remote.getCurrentWindow()
        win.minimize()
    }

    render() {
        const { docName, headerType } = this.props;
        let record = this.getRecordIcon();
        let btns = this.getRightBtns();
        console.log(headerType)
        console.log(this.isMac())
        let headerText = (this.isMac()) ? "wrapmsgr_title_header center-text" : "wrapmsgr_title_header";
        console.log(headerText)
        if (headerType === HeaderType.CHAT) {
            return (
                <div className={headerText}>
                    <h1 className="wrapmsgr_title" id="forHeaderDocTitle">
                        <span className="ng-binding" title={docName}>{docName}</span>
                        {record}
                    </h1>
                    {(this.isMac()) ? null: btns}
                </div>
            );
        } else if (headerType === HeaderType.CREATE) {
            return (
                <div className="wrapmsgr_popup_header">
                    <h2 className="title_h2">
                        <span ng-if="manageMethod == 'create'" className="ng-scope">{headerType}</span>
                    </h2>
                    <a href="">
                        <i style={{ fontSize: 30 }} onClick={this.minimizeWindow}>-</i>
                    </a>
                    <a href=""><i className="icon_times" onClick={this.closeWindow}></i></a>
                </div>
            );
        }
        else if ((headerType === HeaderType.INVITE) || (headerType === HeaderType.BOOKMARK)) {
            return (
                <div className="wrapmsgr_popup_header">
                    <h2 className="title_h2">
                        <span>{headerType}</span>
                    </h2>
                    {btns}
                </div>
            );
        }
        else if (headerType === HeaderType.LIST) {
            return (
                <div className={headerText}>
                    <h1 className="wrapmsgr_title">Wrapsody Chat</h1>
                    {(this.isMac()) ? null: btns}
                </div>
            )
        }
        else {
            return (
                <div className={headerText}>
                    <h1 className="wrapmsgr_title">{headerType}</h1>
                    {(this.isMac()) ? null: btns}
                </div>
            );
        } // Wrapsody Chat Bot, Wrapsody Chat, invite
    }
}

export default Header;
