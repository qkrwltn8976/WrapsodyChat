import store from '@/store'

export function userHandler(apis, response) {
    switch(apis[2]) {
		case 'info':
			// unread = response.payload.unread;
			// break;
			
	}
}

export function conversationHandler(apis, response) {
    console.log(apis)
    switch(apis[2]) {
		case 'list':
                console.log(apis.length)
                console.log(apis[3])
				// joined eventë¡œ ê°œë³„ ëŒ€í™”ë°© ì •ë³´ë¥¼ ìš”ì²­í•œ ê²½ìš°
				if (apis.length > 3 && apis[3] == 'convoid') {
					if (response.payload.Conversations.length > 0) {
                        console.log(apis.length)
                        console.log(apis[3])
						var found = false;
						var convo = response.payload.Conversations[0];
						
						// for (var i = 0; i < $scope.convos.length; i++) {
						// 	if ($scope.convos[i].convoId == convo.convoId) {
						// 		found = true;
						// 		break;
						// 	}
						// }
						
						// if (!found) {
						// 	$scope.convos.unshift(convo);
						// }
					} else {
						
					}
                } 
                else {
                    store.dispatch({type: "setConvoList", convos: response.payload.Conversations});
                    // console.log(response.payload.Conversations)
					// $scope.convos = response.payload.Conversations;
				}
			
			break;
			
		case 'view':
				if (response.payload.Messages && response.payload.direction === 'backward') {
					let oldMsgs = response.payload.Messages;
					let eom = false;

					if(response.payload.Messages.length < 20) {
						eom = true;
					}
					this.setState({
						msgs: oldMsgs.concat(this.state.msgs),
						eom,
						topMsgId: payload.Messages[payload.Messages.length-1].messageId
					});
					store.dispatch({type: "setConversationView", msgs: })
				}
				if(payload.Members) {
					this.setState({
						members: payload.Members
					},() => store.dispatch({type : "setMembers", members: this.state.members}))
				}
				if (payload.Conversation && payload.Messages) {
					// console.log(payload.Conversation)
					let eom = false;
					if(payload.Messages.length < 20) {
						eom = true;
					}
					this.setState({
						convo: {                
							convoId: this.props.match.params.convo,
							convoType: payload.Conversation.convoType,
							roomType: payload.Conversation.roomType,
							name: payload.Conversation.name,
							readAt: this.props.match.params.readAt,
							unread: this.props.match.params.unread,
							memberCount: payload.Conversation.memberCount,
							notificationType: payload.Conversation.notificationType,
							latestMessage: payload.Conversation.lastestMessage,
							latestMessageAt: payload.Conversation.latestMessageAt,
							createdAt: payload.Conversation.createdAt,
							updatedAt: payload.Conversation.updatedAt,
							bookmark: payload.Conversation.properties.bookmark,
							deadline: payload.Conversation.properties.deadline
						},
						msgs: payload.Messages,
						topMsgId: payload.Messages[payload.Messages.length-1].messageId,
						eom
					})
				}

				if (payload.Bot) {
					this.setState({
						bot: payload.Bot
					})
				}

				if (payload.BotIntentGroup) {
					this.setState({
						botIntent: payload.BotIntentGroup
					})
				}
export function roomHandler(apis, response) {
    switch(apis[2]) {
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
	// switch(apis[2]) {
	// 	case 'list':
	// 		var messages = response.payload.Messages;
			
	// 		if (messages.length > 0) {
	// 			for(var i = 0; i < messages.length; i++) {
	// 				var userId = messages[i].sendUserId;
	// 				if ($scope.users[userId] == undefined) {
	// 					$scope.getUserInfo(userId);
	// 				}
	// 			}
				
	// 			var direction = response.payload.direction;

	// 			var index = $scope.current.messages.length-1;
	// 			if (response.payload.position) {
	// 				for (var i = index; i >= 0; i--) {
	// 					if ($scope.current.messages[i].messageId == response.payload.position) {
	// 						index = i;
	// 						break;
	// 					}
	// 				}
	// 			} else {
	// 				index = -1;
	// 			}
				
	// 			if (direction === "forward") {
	// 				$scope.$apply(function() {
	// 					if (index >= 0) {
	// 						$scope.current.messages.splice.apply($scope.current.messages, [index+1, 0].concat(messages));
	// 					} else {
	// 						$scope.current.messages = $scope.current.messages.concat(messages);
	// 					}
	// 				});
					
	// 				if ($scope.current.brokenMessage) {
	// 					$scope.current.brokenMessage.before = messages[messages.length-1];
	// 				}
	// 			} else {
	// 				var first;
	// 				$scope.$apply(function() {
	// 					if (index >= 0) {
	// 						first = document.querySelector('#message_' + response.payload.position);
							
	// 						$scope.current.messages.splice.apply($scope.current.messages, [index, 0].concat(messages));
	// 					} else {
	// 						first = document.querySelector('.wrapmsgr_messages li');
							
	// 						$scope.current.messages = messages.concat($scope.current.messages);
	// 					}
						
	// 					if ($scope.current.brokenMessage) {
	// 						$scope.current.brokenMessage.after = messages[0];
	// 					}
	// 				});
					
	// 				if (first) {
	// 					$scope.messagesScrollToMessage(first);
	// 				}
	// 			}
	// 		} else if ($scope.current.brokenMessage) {
	// 			for (var i = 0; i < $scope.current.messages.length; i++) {
	// 				if ($scope.current.messages[i].hasOwnProperty("broken")) {
	// 					$scope.$apply(function() {
	// 						$scope.current.messages.splice(i, 1);
	// 						$scope.current.brokenMessage = undefined;
	// 					});
	// 					break;
	// 				}
	// 			}
	// 		}
	// 		break;
			
	// 	case 'unread':
	// 		$scope.$apply(function() {
				
	// 		});
	// 		break;
	// 	}
}

export function botHandler(apis, response) {
//     switch(apis[2]) {
// 		case 'command':
// 			if (apis.length > 3 && apis[3] == 'list') {
// 				var botUserId = response.payload.botUserId;
// 				var groupId = response.payload.groupId;
// 				var commands = response.payload.BotCommands;
				
// 				if ($scope.current.bot.botUserId == botUserId) {
// 					for (var i = 0; i < $scope.current.botIntentGroup.length; i++) {
// 						if ($scope.current.botIntentGroup[i].groupId == groupId) {
// 							$scope.$apply(function() {
// 								$scope.current.botIntentGroup[i].commands = commands;
// 							});
// 						}
// 					}
// 				}
// 			}
// 			break;
// 		}
}
