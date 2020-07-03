import * as React from 'react';

interface Props{
    docName: string;
    headerType: string;
}
// header가 받는 Props설정
// 기존 javascript에서의 react props? 재사용을 위해서 내가 커스텀을 진행할 수 있도록 값을 props로 전달
// typescript에서는 PropTypes를 통해서 런터임에서 props검증
// 타입, 문서제목 필요
class Header extends React.Component<Props>{
    constructor(props: Props){
        super(props);
    } // 생성자
    
    render() {
        const {docName, headerType} = this.props;
        return (
            <div>
                if(headerType == 'chatRoom'){
                     <div className = "wrapmsgr_header">
                        <h1 className = "wrapmsgr_title">
                            <span className = "ng-scope">{headerType}-</span>
                            <span className = "ng-binding" title = {docName}>{docName}</span>
                        </h1>
                        <div className = "wrapmsgr-header-icon-wrap">
                            <a href = "">
                                <i className = "icon_times" title = "Close"></i>
                            </a>
                        </div>
                    </div>
                }else if(headerType == 'createChatRoom'){
                    <div className = "wrapmsgr_popup_header">
                        <h2 className = "title_h2">
                        <span>{headerType}</span>
                        </h2>
                        <a href = "">
                            <i className = "icon_times">
                            </i>
                        </a>
                    </div>
                }
                else{
                    <div className = "wrapmsgr_header">
                        <h1 className = "wrapmsgr_title">
                            <span className = "ng-scope">{headerType}</span>
                        </h1>
                        <div className = "wrapmsgr-header-icon-wrap">
                            <a href = "">
                                <i className = "icon_times" title = "Close"></i>
                            </a>
                        </div>
                    </div>
                } // Wrapsody Chat Bot, Wrapsody Chat
            </div>
        );
    }
}

export default Header;
