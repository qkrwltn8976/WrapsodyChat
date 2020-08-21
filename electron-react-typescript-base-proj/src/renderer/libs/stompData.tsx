import store from '@/store'
import { ipcRenderer } from 'electron';
import { Node } from '../models/Node';



export function userHandler(apis, response) {
	switch (apis[2]) {
		case 'info':
		// unread = response.payload.unread;
		// break;

	}
}

export function conversationHandler(apis, response) {
	switch (apis[2]) {
		case 'list':
			// joined eventë¡œ ê°œë³„ ëŒ€í™”ë°© ì •ë³´ë¥¼ ìš”ì²­í•œ ê²½ìš°
			if (apis.length > 3 && apis[3] == 'convoid') {
				if (response.payload.Conversations.length > 0) {
					console.log(apis.length)
					console.log(apis[3])
					var found = false;
					var convo = response.payload.Conversations[0];

				} else {

				}
			}
			else {
				store.dispatch({ type: "setConvoList", convos: response.payload.Conversations });
			}
			break;

		case 'view':
			console.log(apis.length)
			console.log(response)
			store.dispatch({ type: "setRoom", room: response.payload });
		case 'bookmark':
			if (apis[3] === 'list') {
				store.dispatch({ type: "getBookmarks", bookmarks: response.payload.ConversationBookmarks });
			}

	}
}

				// if (payload.BotIntentGroup) {
				// 	this.setState({
				// 		botIntent: payload.BotIntentGroup
				// 	})
				// }
export function roomHandler(apis, response) {
	switch (apis[2]) {
		case 'list':
		// $scope.$apply(function() {
		// 	$scope.rooms = response.payload.Rooms;
		// });
		// break;

		case 'create':
		// 	$scope.$apply(function() {
		// 		var room = response.payload.Room;
		// 		var members = response.payload.Members;
		// 		room.convoType = 1;
		// 		room.unread = 0;
		// 		room.memberCount = members.length;
		// 		room.notificationType = 1;

		// 		$scope.convos.push(room);
		// 		$scope.current.convo = room;
		// 		$scope.current.members = response.payload.Members;
		// 		$scope.current.messages = response.payload.Messages;
		// 		$scope.current.hasBrokenMessage = false;
		// 		$scope.current.brokenMessage = undefined;

		// 		$scope.search.user = '';

		// 		if (room.syncId) {
		// 			if ($scope.docInfo.detail && $scope.docInfo.detail.syncId == room.syncId) {
		// 				$scope.current.docInfo = $scope.docInfo;
		// 			} else {
		// 				$scope.getDocInfo(room.syncId, function(data) {
		// 					$scope.current.docInfo = data;
		// 				});
		// 			}
		// 		}

		// 		for (var i = 0; i < $scope.current.members.length; i++) {
		// 			var member = $scope.current.members[i];
		// 			if ($scope.users[member.userId] == undefined) {
		// 				$scope.getUserInfo(member.userId, function() { member.userName = $scope.users[member.userId].userName; });
		// 			} else {
		// 				member.userName = $scope.users[member.userId].userName;
		// 			}
		// 		}

		// 		$scope.hidePopup();

		// 		$scope.checkUserInfo();
		// 	});
		// 	break;

		// case 'invite':
		// 	$scope.$apply(function() {
		// 		$scope.hidePopup();
		// 	});
		// 	break;

		// case 'leave':
		// 	// room_left ì´ë²¤íŠ¸ì—ì„œ ì²˜ë¦¬í•¨
		// 	break;
	}
}

export function oneToOneHandler(apis, response) {
	// switch(apis[2]) {
	// 	case 'list':
	// 		$scope.$apply(function() {
	// 			$scope.oneToOne = response.payload.OneToOnes;
	// 		});
	// 		break;
	// 	case 'remove':
	// 		$scope.$apply(function() {
	// 			for(var i = 0; i < $scope.convos.length; i++) {
	// 				if ($scope.convos[i].convoId == response.payload.convoId) {
	// 					$scope.convos.splice(i, 1);
	// 				}
	// 			}
	// 		});
	// 		break;
	// 	}
}

export function messageHandler(apis, response) {
	switch (apis[2]) {
		case 'list':
			let messages = response.payload.Messages;
			console.log(messages)
			console.log(response.payload.direction)
			if (messages.length >= 0) {



				let direction = response.payload.direction;



				if (direction === "forward") {
					console.log("forasdfasdf")
					if (response.payload.beforeAt)
						store.dispatch({ type: "concatMsgs", msgs: messages })
					else
						store.dispatch({ type: "getMsgs", msgs: messages })

				} else {
					store.dispatch({ type: "getMsgsBackward", msgs: messages });
				}
			}
	}

}

export function botHandler(apis, response) {
	console.log(apis)
	console.log(response)
	switch (apis[2]) {
		case 'command':
			if (apis.length > 3 && apis[3] == 'list') {
				let botUserId = response.payload.botUserId;
				let groupId = response.payload.groupId;
				let commands = response.payload.BotCommands;
				store.dispatch({ type: "getBotCommands", commands: response.payload.BotCommands });
			}
			break;
	}
}

export function eventHandler(apis, response) {
	// /exchange/event/event.conversation.bookmark.deleted.room.
	// /exchange/chat/chat.short.room.8954b0fc574d4423adc422b0017cfc3e"
	// console.log(response.body)
	let type = response.type;
	switch (type) {
		case 'CONVERSATION_BOOKMARK_DELETED':
			store.dispatch({type: "deleteBookmark", bookmark: response.payload });
	}
}

export function chatHandler(apis, response) {
	console.log(apis)
	console.log(response)
	switch (apis[1]) {
		case 'short':
			// 수신되는 메세지 처리
			if (response.body || response.messageId) {
				console.log(response)
				store.dispatch({ type: "recvMsg", msg: response });
			}
			break;
		case 'system':
			store.dispatch({ type: "sysMsg", msg: response })
	}
}

export function organHandler(apis, response){
	switch(apis[2]){
		case 'tree':
			store.dispatch({type : "setChildNodes", childNodes : response.payload.Nodes}) // childNodes는 store에 dispatch해서 tempMember로 넣기 위한 변수
			let newNodeList = [];
			response.payload.Nodes.map(node=>{
				newNodeList = newNodeList.concat([{"name": node.columnText , "id" : node.value, "hasChildren" : node.hasChildren, "isExpanded": false, "status": "select", "type": node.type, parentCode : node.parentCode}])   
			})
			store.dispatch({type: "setNodeList", nodeList: newNodeList})
	}
}

export function setNewNodeList(){
	return 0
}


// subscribe(client, electronStore.get("username"), this.state.uuid, (obj:any) => {
//     let payload = obj.payload;
//     if(payload){
//         if(payload.Nodes){
//             this.setState({
//                 childNodes : payload.Nodes,
//             })
//             let newNodeList : Node[];
//             newNodeList = [];
//             this.state.childNodes.map(node =>{
//                 newNodeList =  newNodeList.concat([{"name": node.columnText , "id" : node.value, "hasChildren" : node.hasChildren, "isExpanded": false, "status": "select", "type": node.type, parentCode : node.parentCode}])   
//             })
//             this.setState({
//                 nodeList:newNodeList
//             }, 
//             ()=>{
//                 if(this.state.isChecked){
//                     this.setState({
//                         isChecked: !this.state.isChecked
//                     }, ()=> this.afterClick())
//                 }
//             })
//         }
//     }
// })
		
