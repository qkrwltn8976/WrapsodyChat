export function userHandler(apis, response) {
    switch(apis[2]) {
		case 'info':
			$scope.unread = response.payload.unread;
			break;
			
	}
}

export function conversationHandler(apis, response) {
    switch(apis[2]) {
		case 'list':
			(function() {
				// joined eventë¡œ ê°œë³„ ëŒ€í™”ë°© ì •ë³´ë¥¼ ìš”ì²­í•œ ê²½ìš°
				if (apis.length > 3 && apis[3] == 'convoid') {
					if (response.payload.Conversations.length > 0) {
						var found = false;
						var convo = response.payload.Conversations[0];
						
						for (var i = 0; i < $scope.convos.length; i++) {
							if ($scope.convos[i].convoId == convo.convoId) {
								found = true;
								break;
							}
						}
						
						if (!found) {
							$scope.convos.unshift(convo);
						}
					} else {
						
					}
				} else {
					$scope.convos = response.payload.Conversations;
				}
			});
			break;
			
		case 'view':
			$scope.$apply(function() {
				// syncidë¡œ viewë¥¼ ìš”ì²­í–ˆì„ ë•Œ, ë°©ì´ ìžë™ìœ¼ë¡œ ìƒì„±ë˜ëŠ” ê²½ìš°ê°€ ìžˆìœ¼ë¯€ë¡œ ì´ ê²½ìš° ì¶”ê°€í•´ì¤€ë‹¤.
				if ((apis.length > 3 && apis[3] == 'syncid') || !$scope.current.convo || $scope.current.convo.convoId != response.payload.Conversation.convoId) {
					var found = false;
					var convo = response.payload.Conversation;
					
					for (var i = 0; i < $scope.convos.length; i++) {
						if ($scope.convos[i].convoId == convo.convoId) {
							$scope.current.convo = $scope.convos[i];
							$scope.search.user = '';
							found = true;
							break;
						}
					}
					
					if (!found) {
						$scope.convos.unshift(convo);
						$scope.current.convo = convo;
						$scope.search.user = '';
					}
				}
				
				$scope.unread -= $scope.current.convo.unread;
				
				$scope.current.messages = response.payload.Messages;
				$scope.current.members = response.payload.Members;
				$scope.current.convo.unread = 0;
				if ($scope.current.convo.latestMessageAt != undefined && ($scope.current.convo.latestMessageAt > response.payload.Conversation.latestMessageAt || response.payload.Conversation.latestMessageAt == undefined)) {
					if (!response.payload.MessageId) {
						var afterAt = $scope.current.messages.length > 0 ? $scope.current.messages[$scope.current.messages.length-1].createdAt : 0;
						$scope.sendApi("api.message.list", {convoId: $scope.current.convo.convoId, afterAt: afterAt, beforeAt: $scope.current.convo.latestMessageAt, direction: "forward"});
					}
				} else {
					$scope.current.convo.latestMessage = response.payload.Conversation.latestMessage;
					$scope.current.convo.latestMessageAt = response.payload.Conversation.latestMessageAt;
					
					$scope.current.hasLatestMessage = !response.payload.hasOwnProperty("MessageId");
					$scope.current.latestMessage = undefined;
				}
				$scope.current.brokenMessage = undefined;
				
				$scope.current.docInfo = undefined;
				if (response.payload.Room) {
					$scope.current.convo.owner = response.payload.Room.owner;
					if (response.payload.Room.syncId > "") {
						$scope.getDocInfo(response.payload.Room.syncId, function(data) {
							$scope.current.docInfo = data;
						});
					}
				} else if (response.payload.Bot) {
					$scope.current.bot = response.payload.Bot;
					$scope.current.botIntentGroup = response.payload.BotIntentGroup;
					
					var bot = $scope.current.bot;
					if (bot.photo) {
						bot.photo = $scope.parseImageUrl(bot.photo);
					}
					
					$scope.users[bot.botUserId] = {
						user: bot.name,
						userId: bot.botUserId,
						userName: bot.name,
						photo: bot.photo
					};
				}
				
				$scope.checkUserInfo();
			});
			
			if (response.payload.MessageId) {
				$timeout(function() {
					var targetMsg = document.querySelector('#message_' + response.payload.MessageId);
					$scope.messagesScrollToMessage(targetMsg);
				});
			} else {
				$timeout($scope.messagesScrollToBottom);
			}
			
			if ($scope.serviceWorker) {
				$scope.serviceWorker.getNotifications({tag: 'WrapMsgr' + $scope.current.convo.convoId}).then(function (notifications) {
					for (var i = 0; i < notifications.length; i++) {
						notifications[i].close();
					}
				})
			}
		}
}

export function roomHandler(apis, response) {
    switch(apis[2]) {
		case 'list':
			$scope.$apply(function() {
				$scope.rooms = response.payload.Rooms;
			});
			break;
			
		case 'create':
			$scope.$apply(function() {
				var room = response.payload.Room;
				var members = response.payload.Members;
				room.convoType = 1;
				room.unread = 0;
				room.memberCount = members.length;
				room.notificationType = 1;
				
				$scope.convos.push(room);
				$scope.current.convo = room;
				$scope.current.members = response.payload.Members;
				$scope.current.messages = response.payload.Messages;
				$scope.current.hasBrokenMessage = false;
				$scope.current.brokenMessage = undefined;
				
				$scope.search.user = '';

				if (room.syncId) {
					if ($scope.docInfo.detail && $scope.docInfo.detail.syncId == room.syncId) {
						$scope.current.docInfo = $scope.docInfo;
					} else {
						$scope.getDocInfo(room.syncId, function(data) {
							$scope.current.docInfo = data;
						});
					}
				}
				
				for (var i = 0; i < $scope.current.members.length; i++) {
					var member = $scope.current.members[i];
					if ($scope.users[member.userId] == undefined) {
						$scope.getUserInfo(member.userId, function() { member.userName = $scope.users[member.userId].userName; });
					} else {
						member.userName = $scope.users[member.userId].userName;
					}
				}
				
				$scope.hidePopup();
				
				$scope.checkUserInfo();
			});
			break;
			
		case 'invite':
			$scope.$apply(function() {
				$scope.hidePopup();
			});
			break;
			
		case 'leave':
			// room_left ì´ë²¤íŠ¸ì—ì„œ ì²˜ë¦¬í•¨
			break;
		}
}

export function oneToOneHandler(apis, response) {
	switch(apis[2]) {
		case 'list':
			$scope.$apply(function() {
				$scope.oneToOne = response.payload.OneToOnes;
			});
			break;
		case 'remove':
			$scope.$apply(function() {
				for(var i = 0; i < $scope.convos.length; i++) {
					if ($scope.convos[i].convoId == response.payload.convoId) {
						$scope.convos.splice(i, 1);
					}
				}
			});
			break;
		}
}

export function messageHandler(apis, response) {
	switch(apis[2]) {
		case 'list':
			var messages = response.payload.Messages;
			
			if (messages.length > 0) {
				for(var i = 0; i < messages.length; i++) {
					var userId = messages[i].sendUserId;
					if ($scope.users[userId] == undefined) {
						$scope.getUserInfo(userId);
					}
				}
				
				var direction = response.payload.direction;

				var index = $scope.current.messages.length-1;
				if (response.payload.position) {
					for (var i = index; i >= 0; i--) {
						if ($scope.current.messages[i].messageId == response.payload.position) {
							index = i;
							break;
						}
					}
				} else {
					index = -1;
				}
				
				if (direction === "forward") {
					$scope.$apply(function() {
						if (index >= 0) {
							$scope.current.messages.splice.apply($scope.current.messages, [index+1, 0].concat(messages));
						} else {
							$scope.current.messages = $scope.current.messages.concat(messages);
						}
					});
					
					if ($scope.current.brokenMessage) {
						$scope.current.brokenMessage.before = messages[messages.length-1];
					}
				} else {
					var first;
					$scope.$apply(function() {
						if (index >= 0) {
							first = document.querySelector('#message_' + response.payload.position);
							
							$scope.current.messages.splice.apply($scope.current.messages, [index, 0].concat(messages));
						} else {
							first = document.querySelector('.wrapmsgr_messages li');
							
							$scope.current.messages = messages.concat($scope.current.messages);
						}
						
						if ($scope.current.brokenMessage) {
							$scope.current.brokenMessage.after = messages[0];
						}
					});
					
					if (first) {
						$scope.messagesScrollToMessage(first);
					}
				}
			} else if ($scope.current.brokenMessage) {
				for (var i = 0; i < $scope.current.messages.length; i++) {
					if ($scope.current.messages[i].hasOwnProperty("broken")) {
						$scope.$apply(function() {
							$scope.current.messages.splice(i, 1);
							$scope.current.brokenMessage = undefined;
						});
						break;
					}
				}
			}
			break;
			
		case 'unread':
			$scope.$apply(function() {
				
			});
			break;
		}
}

export function botHandler(apis, response) {
    switch(apis[2]) {
		case 'command':
			if (apis.length > 3 && apis[3] == 'list') {
				var botUserId = response.payload.botUserId;
				var groupId = response.payload.groupId;
				var commands = response.payload.BotCommands;
				
				if ($scope.current.bot.botUserId == botUserId) {
					for (var i = 0; i < $scope.current.botIntentGroup.length; i++) {
						if ($scope.current.botIntentGroup[i].groupId == groupId) {
							$scope.$apply(function() {
								$scope.current.botIntentGroup[i].commands = commands;
							});
						}
					}
				}
			}
			break;
		}
}