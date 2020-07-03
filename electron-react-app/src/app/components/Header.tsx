import * as React from 'react';

function Header(props: any) {
    const type = props.type;
    if(type === "ChatRoomList"){
        return (
            <div className="wrapmsgr_header">
				<h1 className="wrapmsgr_title">Wrapsody Chat</h1>
				<div className="wrapmsgr-header-icon-wrap">
			 		<a href=""><i className="icon_times" title="Close"></i></a>
			 	</div>
			</div>
        );
    }
    if(type === "ChatRoom"){
        return (
            <div className="wrapmsgr_header" ng-hide="viewMode == 'chat'">
				<h1 className="wrapmsgr_title">
                    <span ng-attr-title="{{current.convo.name}}" className="ng-binding" title="Wrapsody Chatbot">{props.RoomName}</span>
				</h1>
			
				<div className="wrapmsgr-header-icon-wrap">
			 		<a href=""><i className="icon_window_max ng-scope" title="maximize"></i></a>
			 		<a href=""><i className="icon_times" title="Close" ng-click="current.convo = undefined"></i></a>
			 	</div>
			</div>
        )
    }
    if(type === "Invite"){
        return (
            <div className="wrapmsgr_popup_header">
				 	<h2 className="title_h2">
				 		<span ng-if="manageMethod == 'invite'" className="ng-scope">Invite</span>
				 	</h2>
				 	<a href=""><i className="icon_times" ng-click="hidePopup($event)"></i></a>
			</div>
        )
    }
    if(type === "Create"){
        return(
            <div className="wrapmsgr_popup_header">
				 	<h2 className="title_h2">
				 		<span ng-if="manageMethod == 'invite'" className="ng-scope">Create Document Chat Room</span>
				 	</h2>
				 	<a href=""><i className="icon_times" ng-click="hidePopup($event)"></i></a>
			</div>
        )
    }
    return(
        <div className="wrapmsgr_popup_header">
                 <h2 className="title_h2">
                     <span ng-if="manageMethod == 'invite'" className="ng-scope">Default</span>
                 </h2>
                 <a href=""><i className="icon_times" ng-click="hidePopup($event)"></i></a>
        </div>
    )

}

export default Header;