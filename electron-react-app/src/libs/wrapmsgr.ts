// var wrapMsgrModule = angular.module('WrapMsgrApp', ['wrapmsgrComponents', 'ui.tree', 'angular-inview', 'ngLocale', 'ngSanitize', 'ngAnimate']);

// wrapMsgrModule.config(function($locationProvider) {
//     $locationProvider.html5Mode({
//         enabled: true,
//         requireBase: false
//     });
// });

// wrapMsgrModule.controller('WrapMsgrController', WrapsodyMessengerController);
// WrapsodyMessengerController.$inject = ['$scope', '$http', '$timeout', '$filter', 'WrapMsgrService'];

// function WrapsodyMessengerController($scope, $http, $timeout, $filter, wrapMsgrService) {
	
// 	$scope.MESSAGE_TYPE_SYSTEM = 0xF0;
// 	$scope.MESSAGE_TYPE_SYSTEM_REVISION = 0xF1;
	
// 	$scope.viewMode = 'full';
// 	$scope.viewModeClass = 'wrapmsgr_viewmode_full';
// 	$scope.chatroomState = 'wrapmsgr_state_normalize';
	
// 	$scope.notificationEnabled = false;
// 	$scope.browserNotificationEnabled = false;
// 	$scope.fpnsNotificationEnabled = false;
// 	$scope.webOfficeEnabled = false;
	
// 	$scope.user = {
// 			id: undefined,
// 			info: {},
// 	};
// 	$scope.unread = 0;
// 	$scope.users = [];
// 	$scope.convos = [];
// 	$scope.organ = [];
// 	$scope.current = {
// 			convo: undefined,
// 			messages: [],
// 			members: [],
// 			docInfo: undefined,
// 			bot: {},
// 			botIntentGroup: [],
// 			brokenMessage: undefined,
// 			hasLatestMessage: false,
// 			latestMessage: undefined
// 	};
// 	$scope.input = {message : ""};
// 	$scope.search = {user : ""};
// 	$scope.docInfo = {};
// 	$scope.selectedMembers = [];
// 	$scope.inviteMembers = [];
	
// 	$scope.loggedIn = true;
// 	$scope.receiveQueue = "";
	
// 	$scope.isMinimize = true;
// 	$scope.isMaximize = false;
	
// 	$scope.showChatListBtn = true;
// 	$scope.showChatList = false;
// 	$scope.activePopup = undefined;
// 	$scope.manageMethod = undefined;
// 	$scope.lastCalledAPI = undefined;
// 	$scope.retry = 0;
	
// 	$scope.initialConvoId = undefined;
// 	$scope.unreadContainerId = undefined;
	
// 	$scope.init = function() {

// 		// 뷰모드 결정
// 		var view = getParameter("view");
// 		switch (view) {
// 		case 'chat':
// 			$scope.viewMode = view;
// 			$scope.chatroomState = 'wrapmsgr_state_maximize';
			
// 			$scope.docInfo.syncId = getParameter("syncId");
// 			break;
			
// 		case 'full':
// 		default:
// 			$scope.viewMode = 'full';
// 			break;
// 		}
// 		$scope.viewModeClass = 'wrapmsgr_viewmode_' + $scope.viewMode;
		
// 		var listBtn = getParameter("listBtn");
// 		$scope.showChatListBtn = (listBtn != undefined)? listBtn === "true" : true;
		
// 		var user = getParameter("user");
// 		var host = getParameter("host");
		
// 		if (host == undefined) {
// 			var hostIndex = location.href.indexOf( location.host ) + location.host.length;
// 			host = location.href.substring( 0, location.href.indexOf('/', hostIndex + 1) );
// 		}
		
// 		$scope.host = host;
		
// 		// RabbitMQ 접속
// 		$scope.rabbitmq_ws = angular.element('#wrapmsgr_body').attr('data-ws');
// 		$scope.vhost = angular.element('#wrapmsgr_body').attr('data-vhost');
		
// 		if (user != undefined) {
// 			$scope.user.id = user;
// 			$scope.login();
// 		}
		
// 		// 이벤트리스너 등록
// 		angular.element('.wrapmsgr_messages').bind('scroll', $scope.messages_on_scroll);
		
// 		if ('serviceWorker' in navigator) {
// 			navigator.serviceWorker.register('/filesync/resources/js/fs-service-worker.js', { scope: '/' }).then(function(registration) {
// 				console.log('ServiceWorker registration successful with scope: ', registration.scope);
				
// 				$scope.serviceWorker = registration;
// 				navigator.serviceWorker.addEventListener('message', function(event) {
// 					$scope.sendApi("api.conversation.view", {"convoId":event.data.convoId});
// 				});
				
// 				// 브라우저 노티피케이션 설정
// 				if ('Notification' in window) {
// 					if (Notification.permission == "default") {
// 						Notification.requestPermission(function (permission) {
// 							if (permission == "granted") {
// 								$scope.browserNotificationEnabled = true;
// 							}
// 						});
// 					} else if (Notification.permission == "granted") {
// 						$scope.browserNotificationEnabled = true;
// 					}
// 				}
// 			}).catch(function(err) {
// 				console.log('ServiceWorker registration failed: ', err);
// 			});
// 		}
		
// 		$scope.fpnsNotificationEnabled = angular.element('#wrapmsgr_body').attr('data-fpns-enabled') == 'true';
// 		$scope.notificationEnabled = $scope.browserNotificationEnabled || $scope.fpnsNotificationEnabled;
		
// 		$scope.webOfficeEnabled = angular.element('#wrapmsgr_body').attr('data-weboffice-enabled') == 'true';
		
// 		// push로 접속했을때 채팅창 열기
// 	    var match = RegExp('[?&]convoId=([^&#/]*)').exec(window.location.search);
// 	    $scope.initialConvoId = match && decodeURIComponent(match[1].replace(/\+/g, ' '));

	    
// 	    $scope.unreadContainerId = getParameter("unreadId");
		
// 		if ($scope.unreadContainerId) {
// 			$scope.$watch('unread', function(newValue, oldValue) {
// 				$('#' + $scope.unreadContainerId).text(newValue);
// 			});
// 		}

// 	};
	
// 	$scope.login = function() {
// 		$scope.getLoginToken(function(pw) {
// 			if (!$scope.client) {
// 				var ws = new WebSocket($scope.rabbitmq_ws);
// 				$scope.client = Stomp.over(ws);
// 				//$scope.client.debug = undefined;
// 				$scope.client.onreceive = $scope.stomp_on_receive;
// 			}
			
// 			$scope.client.connect($scope.user.id, pw, $scope.stomp_on_connect, $scope.stomp_on_error, $scope.vhost);
// 		});
// 	};
	
// 	// not use - service worker로 이관됨
// 	$scope.notification_on_click = function(event) {
// 		if (!event.target.data) {
// 			var convoId = event.target.tag.substring('WrapMsgr'.length);
// 			for (var i = 0; i < $scope.convos.length; i++) {
// 				if ($scope.convos[i].convoId == convoId) {
// 					$scope.showOrReplaceConvo($scope.convos[i]);
// 					break;
// 				}
// 			}
// 		} else {
// 			$scope.showOrReplaceConvo(event.target.data);
// 		}
// 	};
	
	
// 	// RabbitMQ 이벤트리스너
// 	$scope.stomp_on_connect = function() {
// 		$scope.$apply(function() {
// 			$scope.retry = 0;
// 			$scope.loggedIn = true;
			
// 			if ($scope.receiveQueue == "") {
// 				$scope.receiveQueue = "user-" + $scope.user.id + "-" + $scope.uuidv4();
// 			}
// 			$scope.client.subscribe("/exchange/user-" + $scope.user.id, $scope.stomp_on_message, {"x-queue-name":$scope.receiveQueue});
			
// 			$scope.getUserInfo($scope.user.id);
			
// 			switch($scope.viewMode) {
// 			case 'full':
// 				$scope.sendApi("api.user.info");
// 				$scope.sendApi("api.conversation.list");
// 				break;
				
// 			case 'chat':
// 				break;
// 			}
// 		});
		
// 		if ($scope.initialConvoId) {
// 			$scope.sendApi("api.conversation.view", {"convoId":$scope.initialConvoId});
// 			$scope.initialConvoId = undefined;
// 		}
// 	};

// 	$scope.stomp_on_error = function(e) {
// 		if (!$scope.client.connected) {
// 			$scope.loggedIn = false;
// 			$scope.$apply();
// 			if ($scope.retry == 0) {
// 				base.showMsg($scope.messages.cannot_connect_to_server);
// 			}
			
// 			$scope.retry++;
			
// 			var reAccessRefused = new RegExp('^Access refused', 'i');
// 			var reLostConnection = new RegExp('^Whoops! Lost connection to', 'i');
// 			if ("ERROR" == e.command && reAccessRefused.test(e.body))
// 			{
// 				$scope.client.disconnect();
// 				$scope.client = undefined;
// 			} else if (reLostConnection.test(e)) {
// 				$scope.client = undefined;
// 			}
			
// 			if ($scope.retry <= 6) {
// 				$timeout($scope.login, 10000 * $scope.retry);
// 			} else {
// 				$timeout($scope.login, 60000);
// 			}
// 		} else {
// 			console.log('error');
// 		}
// 	};
	
// 	$scope.stomp_on_message = function(message) {
// 		var typeId = message.headers.__TypeId__
// 		var typeArray = typeId.split('.');
// 		var type = typeArray[typeArray.length - 1];
		
// 		if (type == "Message") {
// 			var msg = JSON.parse(message.body);
			
// 			if ($scope.current.convo != undefined && msg.recvConvoId == $scope.current.convo.convoId) {
// 				if ($scope.current.messages.length == 0 || msg.messageId != $scope.current.messages[$scope.current.messages.length-1].messageId) {
// 					$scope.$apply(function() {
// 						if (!$scope.current.hasLatestMessage && $scope.current.messages.length > 0) {
// 							var broken = {broken: true, after: msg, before: $scope.current.messages[$scope.current.messages.length-1]};
							
// 							$scope.current.messages.push(broken);
							
// 							$scope.current.brokenMessage = broken;
// 						}
						
// 						$scope.current.messages.push(msg);
// 						$scope.current.convo.latestMessage = msg.body;
// 						$scope.current.convo.latestMessageAt = msg.createdAt;

// 						var messages = document.querySelector('.wrapmsgr_messages');
// 						if (messages.scrollTop + messages.offsetHeight < messages.scrollHeight) {
// 							$scope.current.latestMessage = msg;
// 						} else {
// 							$timeout(function() {
// 								var last = document.querySelector('.wrapmsgr_messages li:last-child');
// 								$scope.messagesScrollToMessage(last);
// 							});
// 						}
// 					});
					
					
// 					if ($scope.user.id != msg.sendUserId) {
// 						$scope.sendApi("api.conversation.read", {convoId : $scope.current.convo.convoId});
// 					}
// 				}
// 			} else if (msg.messageType < $scope.MESSAGE_TYPE_SYSTEM) {
// 				$scope.$apply(function() {
// 					for (var i = 0; i < $scope.convos.length; i++) {
// 						if ($scope.convos[i].convoId == msg.recvConvoId) {
// 							var convo = $scope.convos[i];

// 							if (msg.sendUserId != $scope.user.id) {
// 								convo.unread++;
// 							}
// 							convo.latestMessage = msg.body;
// 							convo.latestMessageAt = msg.createdAt;
							
// 							if ($scope.browserNotificationEnabled && $scope.viewMode == 'full' && convo.notificationType == 1 && msg.sendUserId != $scope.user.id) {
// 								var sendNotification = function() {
// 									var options = {
// 											icon: $scope.urls.imgUrl + '/icon_notification.png', 
// 											body: msg.body,
// 											data: {
// 												convoId : convo.convoId,
// 												url : location.href
// 											},
// 											tag: 'WrapMsgr'+msg.recvConvoId,
// 											renotify: true,
// 											requireInteraction: true
// 									};
// 									$scope.serviceWorker.showNotification(convo.name + ' ' + $scope.users[msg.sendUserId].userName + ':', options);
// 								}
								
// 								if ($scope.users[msg.sendUserId]) {
// 									sendNotification();
// 								} else {
// 									$scope.getUserInfo(msg.sendUserId, sendNotification);
// 								}
// 							}
// 							break;
// 						}
// 					}
					
// 					if (msg.sendUserId != $scope.user.id) {
// 						$scope.unread++;
// 					}
// 				});
// 			}
// 		} else if (type == "Event") {
// 			var evt = JSON.parse(message.body);
			
// 			switch(evt.type) {
// 			case "ROOM_JOINED":
// 				var member = evt.payload.JoinedConversation;
				
// 				if (member.userId == $scope.user.id && ('api.room.create' == $scope.lastCalledApi || 'api.conversation.view.syncid' == $scope.lastCalledApi )) {
// 					return;
// 				}
				
// 				$scope.$apply(function() {
// 					if ($scope.current.convo != undefined && member.convoId == $scope.current.convo.convoId) {
// 						for (var i = 0; i < $scope.current.members.length; i++) {
// 							var found = false;
// 							if ($scope.current.members[i].userId == member.userId) {
// 								found = true;
// 								break;
// 							}
// 						}
						
// 						if (!found) {
// 							$scope.current.members.push(member);
// 							$scope.current.convo.memberCount++;
// 						}
// 					} else {
// 						var found = false;
						
// 						for (var i = 0; i < $scope.convos.length; i++) {
// 							if ($scope.convos[i].convoId == member.convoId) {
// 								$scope.convos[i].memberCount++;
// 								found = true;
// 								break;
// 							}
// 						}
						
// 						if (!found) {
// 							$scope.sendApi("api.conversation.list.convoid", {convoId : member.convoId});
// 						}
// 					}
					
// 					var userId = member.userId;
// 					if ($scope.users[userId] == undefined) {
// 						$scope.getUserInfo(userId, function() { member.userName = $scope.users[userId].userName; });
// 					} else {
// 						member.userName = $scope.users[userId].userName;
// 					}
// 				});
// 				break;
				
// 			case "ROOM_LEFT":
// 				var convoId = evt.payload.convoId;
// 				var userId = evt.payload.userId;
// 				$scope.$apply(function() {
// 					if ($scope.user.id == userId) {
// 						if ($scope.current.convo.convoId == convoId) {
// 							$scope.current.convo = undefined;
// 						}
						
// 						for(var i = 0; i < $scope.convos.length; i++) {
// 							if ($scope.convos[i].convoId == convoId) {
// 								$scope.convos.splice(i, 1);
// 								break;
// 							}
// 						}
// 					} else {
// 						if ($scope.current.convo != undefined && convoId == $scope.current.convo.convoId) {
// 							for (var i = 0; i < $scope.current.members.length; i++) {
// 								if ($scope.current.members[i].userId == userId) {
// 									$scope.current.members.splice(i, 1);
// 									$scope.current.convo.memberCount--;
// 								}
// 							}
// 						} else {
// 							for (var i = 0; i < $scope.convos.length; i++) {
// 								if ($scope.convos[i].convoId == convoId) {
// 									$scope.convos[i].memberCount--;
// 									break;
// 								}
// 							}
// 						}
// 					}
// 				});
// 				break;
				
// 			case "NOTIFICATION_UPDATED":
// 				var convoId = evt.payload.convoId;
// 				var userId = evt.payload.userId;
// 				var notificationType = evt.payload.type;
// 				$scope.$apply(function() {
// 					if ($scope.current.convo != undefined && convoId == $scope.current.convo.convoId) {
// 						$scope.current.convo.notificationType = notificationType;
// 					} else {
// 						for (var i = 0; i < $scope.convos.length; i++) {
// 							if ($scope.convos[i].convoId == convoId) {
// 								$scope.convos[i].notificationType = notificationType;
// 								break;
// 							}
// 						}
// 					}
// 				});
// 				break;
// 			}
// 		}
// 	};
	
// 	$scope.stomp_on_receive = function(message) {
// 		var response = JSON.parse(message.body);
		
// 		var sub = message.headers.subscription;
// 		var api = sub.substring(sub.indexOf('/api.')+1);
// 		if (response.success) {
			
// 			var apis = api.split('.');
// 			switch(apis[1]) {
// 			case 'user':
// 				$scope.userHandler(apis, response);
// 				break;
// 			case 'conversation':
// 				$scope.conversationHandler(apis, response);
// 				break;
// 			case 'room':
// 				$scope.roomHandler(apis, response);
// 				break;
// 			case 'oneToOne':
// 				$scope.oneToOneHandler(apis, response);
// 				break;
// 			case 'message':
// 				$scope.messageHandler(apis, response);
// 				break;
// 			case 'bot':
// 				$scope.botHandler(apis, response);
// 				break;
// 			}
// 		} else {
// 			if (api == "api.conversation.view.syncid" && response.resultCode == 6) {
// 				$scope.showCreateDocRoom(response.payload.syncId);
// 			}
// 		}
		
// 		$scope.lastCalledApi = undefined;
// 	};

// 	$scope.userHandler = function(apis, response) {
// 		switch(apis[2]) {
// 		case 'info':
// 			$scope.unread = response.payload.unread;
// 			break;
			
// 		}
// 	};
	
// 	$scope.conversationHandler = function(apis, response) {
// 		switch(apis[2]) {
// 		case 'list':
// 			$scope.$apply(function() {
// 				// joined event로 개별 대화방 정보를 요청한 경우
// 				if (apis.length > 3 && apis[3] == 'convoid') {
// 					if (response.payload.Conversations.length > 0) {
// 						var found = false;
// 						var convo = response.payload.Conversations[0];
						
// 						for (var i = 0; i < $scope.convos.length; i++) {
// 							if ($scope.convos[i].convoId == convo.convoId) {
// 								found = true;
// 								break;
// 							}
// 						}
						
// 						if (!found) {
// 							$scope.convos.unshift(convo);
// 						}
// 					} else {
						
// 					}
// 				} else {
// 					$scope.convos = response.payload.Conversations;
// 				}
// 			});
// 			break;
			
// 		case 'view':
// 			$scope.$apply(function() {
// 				// syncid로 view를 요청했을 때, 방이 자동으로 생성되는 경우가 있으므로 이 경우 추가해준다.
// 				if ((apis.length > 3 && apis[3] == 'syncid') || !$scope.current.convo || $scope.current.convo.convoId != response.payload.Conversation.convoId) {
// 					var found = false;
// 					var convo = response.payload.Conversation;
					
// 					for (var i = 0; i < $scope.convos.length; i++) {
// 						if ($scope.convos[i].convoId == convo.convoId) {
// 							$scope.current.convo = $scope.convos[i];
// 							$scope.search.user = '';
// 							found = true;
// 							break;
// 						}
// 					}
					
// 					if (!found) {
// 						$scope.convos.unshift(convo);
// 						$scope.current.convo = convo;
// 						$scope.search.user = '';
// 					}
// 				}
				
// 				$scope.unread -= $scope.current.convo.unread;
				
// 				$scope.current.messages = response.payload.Messages;
// 				$scope.current.members = response.payload.Members;
// 				$scope.current.convo.unread = 0;
// 				if ($scope.current.convo.latestMessageAt != undefined && ($scope.current.convo.latestMessageAt > response.payload.Conversation.latestMessageAt || response.payload.Conversation.latestMessageAt == undefined)) {
// 					if (!response.payload.MessageId) {
// 						var afterAt = $scope.current.messages.length > 0 ? $scope.current.messages[$scope.current.messages.length-1].createdAt : 0;
// 						$scope.sendApi("api.message.list", {convoId: $scope.current.convo.convoId, afterAt: afterAt, beforeAt: $scope.current.convo.latestMessageAt, direction: "forward"});
// 					}
// 				} else {
// 					$scope.current.convo.latestMessage = response.payload.Conversation.latestMessage;
// 					$scope.current.convo.latestMessageAt = response.payload.Conversation.latestMessageAt;
					
// 					$scope.current.hasLatestMessage = !response.payload.hasOwnProperty("MessageId");
// 					$scope.current.latestMessage = undefined;
// 				}
// 				$scope.current.brokenMessage = undefined;
				
// 				$scope.current.docInfo = undefined;
// 				if (response.payload.Room) {
// 					$scope.current.convo.owner = response.payload.Room.owner;
// 					if (response.payload.Room.syncId > "") {
// 						$scope.getDocInfo(response.payload.Room.syncId, function(data) {
// 							$scope.current.docInfo = data;
// 						});
// 					}
// 				} else if (response.payload.Bot) {
// 					$scope.current.bot = response.payload.Bot;
// 					$scope.current.botIntentGroup = response.payload.BotIntentGroup;
					
// 					var bot = $scope.current.bot;
// 					if (bot.photo) {
// 						bot.photo = $scope.parseImageUrl(bot.photo);
// 					}
					
// 					$scope.users[bot.botUserId] = {
// 						user: bot.name,
// 						userId: bot.botUserId,
// 						userName: bot.name,
// 						photo: bot.photo
// 					};
// 				}
				
// 				$scope.checkUserInfo();
// 			});
			
// 			if (response.payload.MessageId) {
// 				$timeout(function() {
// 					var targetMsg = document.querySelector('#message_' + response.payload.MessageId);
// 					$scope.messagesScrollToMessage(targetMsg);
// 				});
// 			} else {
// 				$timeout($scope.messagesScrollToBottom);
// 			}
			
// 			if ($scope.serviceWorker) {
// 				$scope.serviceWorker.getNotifications({tag: 'WrapMsgr' + $scope.current.convo.convoId}).then(function (notifications) {
// 					for (var i = 0; i < notifications.length; i++) {
// 						notifications[i].close();
// 					}
// 				})
// 			}
// 		}
// 	};
	
// 	$scope.roomHandler = function(apis, response) {
// 		switch(apis[2]) {
// 		case 'list':
// 			$scope.$apply(function() {
// 				$scope.rooms = response.payload.Rooms;
// 			});
// 			break;
			
// 		case 'create':
// 			$scope.$apply(function() {
// 				var room = response.payload.Room;
// 				var members = response.payload.Members;
// 				room.convoType = 1;
// 				room.unread = 0;
// 				room.memberCount = members.length;
// 				room.notificationType = 1;
				
// 				$scope.convos.push(room);
// 				$scope.current.convo = room;
// 				$scope.current.members = response.payload.Members;
// 				$scope.current.messages = response.payload.Messages;
// 				$scope.current.hasLatestMessage = true;
// 				$scope.current.hasBrokenMessage = false;
// 				$scope.current.brokenMessage = undefined;
				
// 				$scope.search.user = '';

// 				if (room.syncId) {
// 					if ($scope.docInfo.detail && $scope.docInfo.detail.syncId == room.syncId) {
// 						$scope.current.docInfo = $scope.docInfo;
// 					} else {
// 						$scope.getDocInfo(room.syncId, function(data) {
// 							$scope.current.docInfo = data;
// 						});
// 					}
// 				}
				
// 				for (var i = 0; i < $scope.current.members.length; i++) {
// 					var member = $scope.current.members[i];
// 					if ($scope.users[member.userId] == undefined) {
// 						$scope.getUserInfo(member.userId, function() { member.userName = $scope.users[member.userId].userName; });
// 					} else {
// 						member.userName = $scope.users[member.userId].userName;
// 					}
// 				}
				
// 				$scope.hidePopup();
				
// 				$scope.checkUserInfo();
// 			});
// 			break;
			
// 		case 'invite':
// 			$scope.$apply(function() {
// 				$scope.hidePopup();
// 			});
// 			break;
			
// 		case 'leave':
// 			// room_left 이벤트에서 처리함
// 			break;
// 		}
// 	};
	
// 	$scope.oneToOneHandler = function(apis, response) {
// 		switch(apis[2]) {
// 		case 'list':
// 			$scope.$apply(function() {
// 				$scope.oneToOne = response.payload.OneToOnes;
// 			});
// 			break;
// 		case 'remove':
// 			$scope.$apply(function() {
// 				for(var i = 0; i < $scope.convos.length; i++) {
// 					if ($scope.convos[i].convoId == response.payload.convoId) {
// 						$scope.convos.splice(i, 1);
// 					}
// 				}
// 			});
// 			break;
// 		}
// 	};
	
// 	$scope.messageHandler = function(apis, response) {
// 		switch(apis[2]) {
// 		case 'list':
// 			var messages = response.payload.Messages;
			
// 			if (messages.length > 0) {
// 				for(var i = 0; i < messages.length; i++) {
// 					var userId = messages[i].sendUserId;
// 					if ($scope.users[userId] == undefined) {
// 						$scope.getUserInfo(userId);
// 					}
// 				}
				
// 				var direction = response.payload.direction;

// 				var index = $scope.current.messages.length-1;
// 				if (response.payload.position) {
// 					for (var i = index; i >= 0; i--) {
// 						if ($scope.current.messages[i].messageId == response.payload.position) {
// 							index = i;
// 							break;
// 						}
// 					}
// 				} else {
// 					index = -1;
// 				}
				
// 				if (direction === "forward") {
// 					$scope.$apply(function() {
// 						if (index >= 0) {
// 							$scope.current.messages.splice.apply($scope.current.messages, [index+1, 0].concat(messages));
// 						} else {
// 							$scope.current.messages = $scope.current.messages.concat(messages);
// 						}
// 					});
					
// 					if ($scope.current.brokenMessage) {
// 						$scope.current.brokenMessage.before = messages[messages.length-1];
// 					}
// 				} else {
// 					var first;
// 					$scope.$apply(function() {
// 						if (index >= 0) {
// 							first = document.querySelector('#message_' + response.payload.position);
							
// 							$scope.current.messages.splice.apply($scope.current.messages, [index, 0].concat(messages));
// 						} else {
// 							first = document.querySelector('.wrapmsgr_messages li');
							
// 							$scope.current.messages = messages.concat($scope.current.messages);
// 						}
						
// 						if ($scope.current.brokenMessage) {
// 							$scope.current.brokenMessage.after = messages[0];
// 						}
// 					});
					
// 					if (first) {
// 						$scope.messagesScrollToMessage(first);
// 					}
// 				}
// 			} else if ($scope.current.brokenMessage) {
// 				for (var i = 0; i < $scope.current.messages.length; i++) {
// 					if ($scope.current.messages[i].hasOwnProperty("broken")) {
// 						$scope.$apply(function() {
// 							$scope.current.messages.splice(i, 1);
// 							$scope.current.brokenMessage = undefined;
// 						});
// 						break;
// 					}
// 				}
// 			}
// 			break;
			
// 		case 'unread':
// 			$scope.$apply(function() {
				
// 			});
// 			break;
// 		}
// 	};
	
// 	$scope.botHandler = function(apis, response) {
// 		switch(apis[2]) {
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
// 	};
	
// 	$scope.sendApi = function(api, payload) {
// 		// 처리되기 전에 UI에서 여러번 호출 방지
// 		if (api == $scope.lastCalledApi) {
// 			return;
// 		}
		
// 		if (!payload) {
// 			payload = {};
// 		}
		
// 		var locale = navigator.language || navigator.userLanguage || 'ko-kr';
		
// 		$scope.client.send(
// 				"/exchange/request/" + api, 
// 				{"reply-to": "/temp-queue/" + api, "content-type" : "application/json"}, 
// 				JSON.stringify({senderId : $scope.user.id, locale: locale, payload : payload}));
		
// 		$scope.lastCalledApi = api;
// 	};
	
	
// 	// 이벤트리스너
// 	$scope.messages_on_scroll = function(event) {
// 		var elem = event.target;
		
// 		var isFullScreen = document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen;
// 		if (!isFullScreen) {
// 			if ($scope.current.messages.length > 0 && elem.scrollTop != $scope.messagesPrevScrollTop) {
// 				if (elem.scrollTop == 0) {
// 					$scope.sendApi("api.message.list", {convoId: $scope.current.convo.convoId, beforeAt: $scope.current.messages[0].createdAt, direction: "backward"});
// 				} else if (elem.offsetHeight + elem.scrollTop == elem.scrollHeight) {
// 					$scope.$apply(function() {
// 						$scope.current.latestMessage = undefined;
// 					});
// 					$scope.sendApi("api.message.list", {convoId: $scope.current.convo.convoId, afterAt: $scope.current.messages[$scope.current.messages.length - 1].createdAt, direction: "forward"});
// 				} else if ($scope.current.brokenMessage) {
// 					var broken = document.querySelector('.wrapmsgr_msg_broken');
					
// 					console.log('scroll', broken.offsetTop, broken.offsetHeight, elem.scrollTop, elem.offsetHeight);
					
// 					if (broken.offsetTop < elem.offsetHeight + elem.scrollTop && elem.scrollTop < broken.offsetTop + broken.offsetHeight) {
// 						if (elem.scrollTop > $scope.messagesPrevScrollTop) {
// 							$scope.sendApi("api.message.list", {
// 								convoId: $scope.current.convo.convoId, 
// 								afterAt: $scope.current.brokenMessage.before.createdAt, 
// 								beforeAt: $scope.current.brokenMessage.after.createdAt, 
// 								direction: "forward",
// 								position: $scope.current.brokenMessage.before.messageId
// 							});
// 						} else {
// 							$scope.sendApi("api.message.list", {
// 								convoId: $scope.current.convo.convoId, 
// 								afterAt: $scope.current.brokenMessage.before.createdAt, 
// 								beforeAt: $scope.current.brokenMessage.after.createdAt, 
// 								direction: "backward",
// 								position: $scope.current.brokenMessage.after.messageId
// 							});
// 						}
// 					}
// 				}
// 			}
			
// 			$scope.messagesPrevScrollTop = elem.scrollTop;
// 		}
// 	};
	
// 	$scope.onFullscreenOut = function(event) {
// 		$('.wrapmsgr_messages').scrollTop(function() { return $scope.messagesPrevScrollTop; });
// 	};
	
// 	$scope.outOfView = function($event) {
// 		$event.inViewTarget.pause();
// 	};
	
// 	$scope.onAttachmentButton = function(button) {
// 		switch(button.action) {
// 		case 'link':
// 			window.open(button.value, '_blank');
// 			break;
// 		case 'command':
// 			$scope.sendBotCommand(button.value);
// 			break;
// 		case 'api':
// 			break;
// 		}
// 	};
	
// 	$scope.onAttachmentLoaded = function() {
// 		if ($scope.messagesAddedScrollTop = $scope.messagesPrevScrollTop) {
// 			var msgs = document.querySelector('.wrapmsgr_messages');
			
// 			if ($scope.scrolledMessage) {
// 				$scope.messagesScrollToMessage($scope.scrolledMessage);
// 			} else {
// 				$scope.messagesScrollToBottom();
// 			}
// 		}
// 	};
	
// 	$scope.messagesScrollToMessage = function(msg) {
// 		var msgs = document.querySelector('.wrapmsgr_messages');
		
// 		msg.scrollIntoView({behavior: 'auto', inline: 'start'});
		
// 		$scope.messagesAddedScrollTop = $scope.messagesPrevScrollTop = msgs.scrollTop;
// 		$scope.scrolledMessage = msg;
// 	};
	
// 	$scope.messagesScrollToBottom = function() {
// 		var msgs = document.querySelector('.wrapmsgr_messages');
		
// 		msgs.scrollTop = msgs.scrollHeight;
// 		$scope.messagesAddedScrollTop = $scope.messagesPrevScrollTop = msgs.scrollTop;
// 		$scope.scrolledMessage = undefined;
// 		$scope.current.latestMessage = undefined;
// 	};
	
// 	$scope.messagesScrollToLatestMessage = function() {
// 		var msgs = document.querySelector('.wrapmsgr_messages');
		
// 		angular.element('.wrapmsgr_messages').unbind('scroll', $scope.messages_on_scroll);
		
// 		document.querySelector('#message_' + $scope.current.latestMessage.messageId).scrollIntoView({behavior: 'auto', inline: 'start'});
		
// 		angular.element('.wrapmsgr_messages').bind('scroll', $scope.messages_on_scroll);
		
// 		$scope.messagesAddedScrollTop = $scope.messagesPrevScrollTop = msgs.scrollTop;
// 		$scope.scrolledMessage = undefined;
// 		$scope.current.latestMessage = undefined;
		
// 		$scope.sendApi("api.message.list", {
// 			convoId: $scope.current.convo.convoId, 
// 			afterAt: $scope.current.brokenMessage.before.createdAt, 
// 			beforeAt: $scope.current.brokenMessage.after.createdAt, 
// 			direction: "backward",
// 			position: $scope.current.brokenMessage.after.messageId
// 		});
// 	};
	
// 	$scope.restore = function() {
// 		if ($scope.isMinimize) {
// 			if ($scope.isMaximize) {
// 				$scope.maximize();
// 			} else {
// 				$scope.normalize();
// 			}
// 		} else if ($scope.isMaximize) {
// 			$scope.normalize();
// 		}
// 	};
	
// 	$scope.minimize = function() {
// 		if (!$scope.isMinimize && !$scope.isMaximize) {
// 			$scope.restoreX = $('.wrapmsgr_chat').prop('offsetLeft');
// 			$scope.restoreY = $('.wrapmsgr_chat').prop('offsetTop');
// 		}
// 		$scope.isMinimize = true;
// 		$('.wrapmsgr_chat').css({"top": "", "left": ""});
// 		$scope.chatroomState = 'wrapmsgr_state_minimize';
// 	};
	
// 	$scope.normalize = function() {
// 		$scope.isMinimize = false;
// 		$scope.isMaximize = false;
// 		$('.wrapmsgr_chat').css({"top": $scope.restoreY, "left": $scope.restoreX});
// 		$scope.chatroomState = 'wrapmsgr_state_normalize';
// 	};

// 	$scope.maximize = function() {
// 		if (!$scope.isMinimize && !$scope.isMaximize) {
// 			$scope.restoreX = $('.wrapmsgr_chat').prop('offsetLeft');
// 			$scope.restoreY = $('.wrapmsgr_chat').prop('offsetTop');
// 		}
// 		$scope.isMinimize = false;
// 		$scope.isMaximize = true;
// 		$('.wrapmsgr_chat').css({"top": "", "left": ""});
// 		$scope.chatroomState = 'wrapmsgr_state_maximize';
// 	};
	
// 	$scope.isContinuous = function(before, after) {
// 		if (!before || !after) {
// 			return false;
// 		}
		
// 		if (before.sendUserId != after.sendUserId) {
// 			return false;
// 		}
		
// 		var diff = after.createdAt - before.createdAt;
// 		var afterDate = new Date(after.createdAt);
// 		var beforeDate = new Date(before.createdAt);
		
// 		return diff < 60 * 1000 && beforeDate.getMinutes() == afterDate.getMinutes();
// 	};
	
// 	$scope.diffDays = function(before, after) {
// 		if (before == undefined) {
// 			return 1;
// 		} else {
// 			var diff = after - before;
// 			var afterDate = new Date(after);
// 			var todayMilliseconds = ((((afterDate.getHours() * 60) + afterDate.getMinutes()) * 60 + afterDate.getSeconds()) * 1000);
// 			return Math.floor((diff + (24 * 60 * 60 * 1000) - todayMilliseconds) / (24 * 60 * 60 * 1000));
// 		}
// 	};
	
// 	$scope.createRoom = function() {
// 		var userIds = $.map($scope.inviteMembers, function(elem) {
// 			return !elem.disabled ? elem.userId : undefined;
// 		});
// 		var payload = {
// 				"Room": {
// 					"name":$scope.input.roomName,
// 					"owner":$scope.user.id,
// 					"roomType":$scope.input.roomType,
// 					"syncId":$scope.input.syncId,
// 				}, 
// 				"userIds":userIds
// 		};
		
// 		$scope.sendApi("api.room.create", payload);
// 	};
	
// 	$scope.inviteRoom = function() {
// 		var userIds = $.map($scope.inviteMembers, function(elem) {
// 			return !elem.disabled ? elem.userId : undefined;
// 		});
		
// 		if (0 == userIds.length) {
// 			$scope.hidePopup();
// 			return;
// 		}
		
// 		var payload = {
// 				"convoId":$scope.current.convo.convoId,
// 				"userIds":userIds
// 		};
		
// 		$scope.sendApi("api.room.invite", payload);
// 	};
	
// 	$scope.leaveRoom = function() {
// 		$scope.sendApi("api.room.leave", {"convoId":$scope.current.convo.convoId});
// 	};
	
// 	$scope.showOrReplaceConvo = function(convo) {
// 		$scope.current.convo = convo;
// 		$scope.search.user = '';
// 		$scope.sendApi("api.conversation.view", {"convoId":convo.convoId});
// 	};
	
// 	$scope.removeOneToOne = function(oneToOne) {
// 		$scope.sendApi("api.oneToOne.remove", {"convoId":oneToOne.convoId});
// 	};
	
// 	$scope.submitOnEnter = function(event) {
// 		if (event.keyCode == 13 && !event.shiftKey) {
// 			if (event.altKey || event.ctrlKey) {
// 				event.preventDefault();
				
// 				var target = event.currentTarget;
// 				var before = target.value.substring(0, target.selectionStart);
// 				var after = target.value.substr(target.selectionEnd);
// 				target.value = before + "\r\n" + after;
// 				target.selectionStart = target.selectionEnd = before.length + 1;
				
// 				target.blur();
// 				target.focus();
// 			} else {
// 				event.preventDefault();
// 				$scope.chat();
// 			}
// 		}
// 	};
	
// 	$scope.chat = function() {
// 		if ($scope.input.message.length == 0) {
// 			return;
// 		}
		
// 		var request = {"sendUserId":$scope.user.id, "recvConvoId":$scope.current.convo.convoId, "body":$scope.input.message, "messageType":0};
// 		$scope.client.send(
// 				"/exchange/request/chat.short.convo." + $scope.current.convo.convoId, 
// 				{"content-type" : "application/json", "__TypeId__" :	"com.wrapsody.messaging.model.Message"}, 
// 				JSON.stringify(request));
		
// 		$scope.input.message = "";
// 	};
	
// 	$scope.downloadDocument = function(revisionNo) {
// 		var detail = $scope.current.docInfo.detail;
// 		if (!revisionNo) {
// 			revisionNo = detail.revisionNo;
// 		}
		
// 		window.location.href = $scope.host + '/document/download.do?syncId=' + encodeURIComponent(detail.syncId) + '&revisionNo='+ revisionNo;
// 	};
	
// 	$scope.previewDocument = function() {
// 		var popupId = 'preview'+ new Date().getTime();
// 		window.open($scope.host +'/document/preview.do?syncId='+ encodeURIComponent($scope.current.docInfo.detail.syncId),
// 			popupId, 'scrollbars=yes, toolbar=no, status=no, resizable=yes, menubar=no');
// 	};
	
// 	$scope.toggleNotification = function() {
// 		$scope.current.convo.notificationType = Math.abs($scope.current.convo.notificationType - 1);
// 		$scope.sendApi("api.conversation.notification", {convoId: $scope.current.convo.convoId, type: $scope.current.convo.notificationType});
// 	};
	
// 	$scope.showCreateRoom = function() {
// 		$scope.input.roomName = "";
// 		$scope.input.syncId = "";
// 		$scope.input.roomType = 0;
// 		$scope.$broadcast('angular-ui-tree:collapse-all');
// 		$scope.inviteMembers = [{userName: $scope.user.info.userName, userId: $scope.user.info.userId, disabled: true}];
// 		$scope.selectedMembers = [];
		
// 		if ($scope.organ.length == 0) {
// 			$scope.getOrganTree(true, undefined, $scope.organ);
// 		}
		
// 		$scope.activePopup = 'manage_room';
// 	};
	
// 	$scope.showCreateDocRoom = function(syncId) {
// 		$scope.manageMethod = 'create';
		
// 		$scope.docInfo = {};
// 		$scope.getDocInfo(syncId, function(data) {
// 			$scope.docInfo = data;
// 			$scope.docInfo.organ = [];
// 			$scope.docInfo.users = 0;
			
// 			$scope.input.roomName = $scope.docInfo.detail.contentName;
			
// 			// 채팅창 모드에서는 생성창을 띄우지 않고 바로 생성한다
// 			if ($scope.viewMode == 'chat') {
// 				$scope.createRoom();
// 				return;
// 			}
			
// 			var result = $scope.createDocPermissionOrgan(data.authList);
// 			$scope.docInfo.organ = result.organ;
// 			$scope.docInfo.users = result.users;
			
// 			$scope.activePopup = 'manage_doc_room';
// 		});
// 		$scope.input.syncId = syncId;
// 		$scope.input.roomType = 3;
// 		$scope.inviteMembers = [{userName: $scope.user.info.userName, userId: $scope.user.info.userId, disabled: true}];
// 		$scope.selectedMembers = [];
// 	};
	
// 	$scope.showInviteDocRoom = function() {
// 		if (!$scope.current) {
// 			return;
// 		}
		
// 		$scope.manageMethod = 'invite';
		
// 		$scope.input.roomName = $scope.current.docInfo.detail.contentName;
// 		$scope.input.roomType = 3;
// 		$scope.inviteMembers = [];
		
// 		$scope.docInfo = $scope.current.docInfo;
// 		var result = $scope.createDocPermissionOrgan($scope.docInfo.authList, $scope.current.members);
// 		$scope.docInfo.organ = result.organ;
// 		$scope.docInfo.users = result.users;

// 		for(var i = 0; i < $scope.current.members.length; i++) {
// 			var member = $scope.current.members[i];
// 			var authType = 'V';
			
// 			for (var j = 0; j < $scope.docInfo.authList.length; j++) {
// 				var auth = $scope.docInfo.authList[j];
// 				if (auth.userId == member.userId || ($scope.users[member.userId] && auth.deptCode == $scope.users[member.userId].deptCode)) {
// 					authType = auth.authType;
// 					if ('R' == authType) {
// 						break;
// 					}
// 				}
// 			}
			
// 			$scope.inviteMembers.push({userName: member.userName, userId: member.userId, authType: authType, disabled: true});
// 		}
		
// 		$scope.activePopup = 'manage_doc_room';
// 	};

// 	$scope.showRoomList = function() {
// 		$scope.showChatList = true;
// 	};
	
// 	$scope.showDocumentRoom = function(syncId) {
// 		$scope.sendApi("api.conversation.view.syncid", {"syncId":syncId});
// 	};
	
// 	$scope.showDocumentRoomAndJumpToMessage = function(syncId, messageId) {
// 		$scope.current.hasLatestMessage = false;
// 		$scope.sendApi("api.conversation.view.syncid", {"syncId":syncId, "messageId":messageId});
// 	};
	
	
	
// 	$scope.createDocPermissionOrgan = function(authList, disabledUsers) {
// 		var organ = [];
// 		var users = 0;
		
// 		var hasAllUsers = false;
// 		var allUsersAuthType;
		
// 		for (var i = 0; i < authList.length; i++) {
// 			var auth = authList[i];
// 			if (auth.code == '%%ALLUSERS%%' || auth.userId == '%%ALLUSERS%%') {
// 				hasAllUsers = true;
// 				allUsersAuthType = auth.authType;
// 			} else if (auth.codeType == 'user') {
// 				var disabled = false;
// 				if (disabledUsers) {
// 					for (var j = 0; j < disabledUsers.length; j++) {
// 						if (disabledUsers[j].userId == auth.code) {
// 							disabled = true;
// 							break;
// 						}
// 					}
// 				}
				
// 				organ.push({ columnText: auth.name, value: auth.code, type: 'user', authType: auth.authType, disabled: disabled });
// 				users++;
// 			} else if (auth.codeType == 'dept') {
// 					organ.push({ columnText: auth.name, value: auth.code, type: 'dept', hasChildren: true, subTree: [], authType: auth.authType});
// 			} else if (auth.deptCode) {
// 				organ.push({ columnText: auth.deptName, value: auth.deptCode, type: 'dept', hasChildren: true, subTree: [], authType: auth.authType});
// 			} else if (auth.userName) {
// 				var disabled = false;
// 				if (disabledUsers) {
// 					for (var j = 0; j < disabledUsers.length; j++) {
// 						if (disabledUsers[j].userId == auth.userId) {
// 							disabled = true;
// 							break;
// 						}
// 					}
// 				}
				
// 				organ.push({ columnText: auth.userName, value: auth.userId, type: 'user', authType: auth.authType, disabled: disabled });
// 				users++;
// 			}
// 		}
		
// 		organ = $filter('orderBy')(organ, ['-type', 'columnText']);
		
// 		if (hasAllUsers) {
// 			if ($scope.organ.length > 0) {
// 				Array.prototype.push.apply(organ, $scope.organ);
// 				$scope.organ.authType = allUsersAuthType;
// 			} else {
// 				$scope.getOrganTree(true, undefined, organ, allUsersAuthType);
// 			}
// 		}
		
// 		return {organ: organ, users: users};
// 	};
	
// 	$scope.submitDocRoom = function() {
// 		switch($scope.manageMethod) {
// 		case 'create':
// 			$scope.createRoom();
// 			break;
// 		case 'invite':
// 			$scope.inviteRoom();
// 			break;
// 		}
// 	};
	
// 	$scope.hidePopup = function($event) {
// 		if ($event) {
// 			$event.preventDefault();
// 		}
		
// 		$scope.activePopup = undefined;
// 	};
	
	
	
// 	$scope.organTreeOptions = {
// 		toggle: function(collapsed, sourceNodeScope) {
// 			var node = sourceNodeScope.$modelValue;
			
// 			if (!collapsed && node.hasChildren == true && node.subTree.length == 0) {
// 				$scope.getOrganTree(false, node.value, node, node.authType)
// 				.then(function(subTree) {
// 					subTree.forEach(function(node) {
// 						if (node.type === 'user' && $scope.isInviteMembers(node, true) >= 0) {
// 							node.disabled = true;
// 						}
// 					});
// 				});
// 			} else if (!collapsed) {
// 				for (var i = 0; i < node.subTree.length; i++) {
// 					node.subTree[i].authType = node.authType;
// 				}
// 			}
// 		},
// 		beforeDrag: function(sourceNodeScope) {
// 			return false;
// 			//var node = sourceNodeScope.$modelValue;
			
// 			//return node.type == 'user';
// 		},
// 		dragStart: function(event) {
// 			event.elements.dragging.context.querySelector("ol[ui-tree-nodes]").innerHTML = "";
// 		},
// 		beforeDrop: function(event) {
// 			var model = event.source.cloneModel;
// 			event.source.cloneModel = {userName: model.columnText, userId: model.value};
// 		},
// 	};
	
// 	$scope.inviteTreeOptions = {
// 		beforeDrag: function(sourceNodeScope) {
// 			return false;
// 		}	
// 	};
	
// 	$scope.toggleOrgan = function(node) {
// 		node.toggle();
// 	};
	
	
	
	
// 	$scope.toggleMember = function(node, $event) {
// 		if (node.disabled) {
// 			return;
// 		}
		
// 		switch (node.type) {
// 		case 'user':
// 			var idx = $scope.isInviteMembers(node);
			
// 			if (idx >= 0) {
// 				if (!$scope.inviteMembers[idx].disabled) {
// 					$scope.inviteMembers.splice(idx, 1);
// 				}
// 			} else {
// 				$scope.inviteMembers.push({userName: node.columnText, userId: node.value, type: node.type, authType: node.authType});
// 			}
// 			break;
			
// 		case 'dept':
// 			if ($event.target.checked) {
// 				addChildrenToInviteMembers([node]);
// 			} else {
// 				removeChildrenFromInviteMembers([node]);
// 			}
// 			break;
// 		}
// 	};
	
// 	$scope.isInviteMembers = function(node, disabledOnly) {
// 		switch (node.type) {
// 		case 'user':
// 			for (var i = 0; i < $scope.inviteMembers.length; i++) {
// 				if ($scope.inviteMembers[i].userId == node.value && (!disabledOnly || node.disabled)) {
// 					node.disabled = $scope.inviteMembers[i].disabled; 
// 					return i;
// 				}
// 			}
// 			break;
			
// 		case 'dept':
// 			if (node.hasChildren) {
// 				if (node.subTree && node.subTree.length > 0) {
// 					var invitedAll = node.subTree.every(function(node) {
// 						return $scope.isInviteMembers(node, disabledOnly) >= 0;
// 					});
					
// 					if (invitedAll) {
// 						node.disabled = node.subTree.every(function(node) {
// 							return node.disabled;
// 						});
						
// 						return 0;
// 					}
// 				}
// 			} else {
// 				return 0;
// 			}
// 		}
		
// 		return -1;
// 	};
	
// 	$scope.removeInviteMember = function(member, $event) {
// 		$event.preventDefault();
		
// 		$scope.inviteMembers.splice( $scope.inviteMembers.indexOf(member), 1);
// 	};
	
// 	$scope.checkAllMembers = function() {
// 		if (!$scope.docInfo || !$scope.docInfo.organ) {
// 			return false;
// 		}
		
// 		var result = $scope.docInfo.organ.every(function(node) {
// 			return $scope.isInviteMembers(node, false) >= 0;
// 		});
		
// 		$scope.organTreeOptions.disabled = $scope.docInfo.organ.every(function(node) {
// 			return node.disabled;
// 		});
		
// 		return result;
// 	};
	
// 	$scope.toggleAllMembers = function($event) {
		
// 		if ($event.currentTarget.checked) {
// 			addChildrenToInviteMembers($scope.docInfo.organ);
// 		} else {
// 			$scope.removeAllInviteMembers();
// 		}
		
// 	};
	
	
// 	function addToInviteMembers(node) {
// 		var found = false;
		
// 		for (var i = 0; i < $scope.inviteMembers.length; i++) {
// 			if (node.userId == $scope.inviteMembers[i].userId) {
// 				found = true;
// 				break;
// 			}
// 		}
		
// 		if (!found) {
// 			$scope.inviteMembers.push(node);
// 		}
// 	}
	
// 	function addChildrenToInviteMembers(nodeArray) {
// 		for (var i = 0; i < nodeArray.length; i++) {
// 			var node = nodeArray[i];
			
// 			switch (node.type) {
// 			case 'user':
// 				addToInviteMembers({userName: node.columnText, userId: node.value, type: node.type, authType: node.authType});
// 				break;
				
// 			case 'dept':
// 				if (node.hasChildren) {
// 					if (node.subTree && node.subTree.length > 0) {
// 						addChildrenToInviteMembers(node.subTree);
// 					} else {
// 						$scope.getOrganTree(false, node.value, node, node.authType)
// 						.then(function(subTree) {
// 							subTree.forEach(function(node) {
// 								if (node.type === 'user' && $scope.isInviteMembers(node, true) >= 0) {
// 									node.disabled = true;
// 								}
// 							});

// 							addChildrenToInviteMembers(subTree);
// 						});
// 					}
// 				}
// 			}
// 		}
// 	}	
	
// 	function removeChildrenFromInviteMembers(nodeArray) {
// 		for (var i = 0; i < nodeArray.length; i++) {
// 			var node = nodeArray[i];
			
// 			switch (node.type) {
// 			case 'user':
// 				if (!node.disabled) {
// 					var idx = $scope.isInviteMembers(node);
					
// 					if (idx >= 0 && !$scope.inviteMembers[idx].disabled) {
// 						$scope.inviteMembers.splice(idx, 1);
// 					}
// 				}

// 				break;
				
// 			case 'dept':
// 				if (node.hasChildren && node.subTree) {
// 					removeChildrenFromInviteMembers(node.subTree)
// 				}
// 			}
// 		}
// 	}

	
// 	$scope.checkUserInfo = function() {
// 		for(var i = 0; i < $scope.current.members.length; i++) {
// 			var userId = $scope.current.members[i].userId;
// 			if ($scope.users[userId] == undefined) {
// 				$scope.getUserInfo(userId);
// 			}
// 		}
		
// 		for(var i = 0; i < $scope.current.messages.length; i++) {
// 			var userId = $scope.current.messages[i].sendUserId;
// 			if ($scope.users[userId] == undefined) {
// 				$scope.getUserInfo(userId);
// 			}
// 		}
// 	};
	
	
	
// 	$scope.toggleIntentGroup = function(intentGroup) {
// 		intentGroup.active = !intentGroup.active;
		
// 		if (intentGroup.active && intentGroup.commands == undefined) {
// 			$scope.sendApi("api.bot.command.list", {botUserId: intentGroup.botUserId, groupId: intentGroup.groupId});
// 		}
// 	};
	
// 	$scope.sendBotCommand = function(command) {
// 		var request = {"sendUserId":$scope.user.id, "recvConvoId":$scope.current.convo.convoId, "body":command, "messageType":1};
// 		$scope.client.send(
// 				"/exchange/request/chat.short.command.convo." + $scope.current.convo.convoId, 
// 				{"content-type" : "application/json", "__TypeId__" :	"com.wrapsody.messaging.model.Message"}, 
// 				JSON.stringify(request));
// 	};
	
	
	
// 	$scope.parseImageUrl = function(url) {
// 		return url.replace(/{{imgUrl}}/i, $scope.urls.imgUrl);
// 	};
	
// 	$scope.wrapsodyErrorCallback = function(response) {
// 		var status = response.status;
// 		var msg;
		
// 		$scope.loggedIn = false;
// 		if (response.status === 401) {
// 			msg = $scope.messages.session_expired;
// 		} else if (status >= 400 || status == 0) {
// 			msg = $scope.messages.cannot_connect_to_server;
// 		}
		
// 		if (base) {
// 			base.showMsg(msg);
// 		}
// 	};
	
// 	$scope.getLoginToken = function(callback) {
// 		var url = $scope.host + "/user/getLoginToken.do";
		
// 		$http.post(url)
// 		.then(function(response) {
// 			if (callback && response.data) {
// 				callback("Token " + response.data.token);
// 			}
// 		}, $scope.wrapsodyErrorCallback);
// 	};
	
// 	$scope.getOrganTree = function(root, deptCode, node, authType) {
// 		var url = $scope.host + "/organ/getTree.do?root=" + (root ? "Y" : "N");
// 		if (deptCode) {
// 			url += "&path=" + deptCode;
// 		}
		
// 		return $http.get(url)
// 		.then(function(response) {
// 			var data = response.data;
			
// 			if (authType) {
// 				for(var i = 0; i < data.length; i++) {
// 					data[i].authType = authType;
// 				}
// 			}
			
// 			if (root) {
// 				$scope.organ = data;
// 				if (node != $scope.organ) {
// 					Array.prototype.push.apply(node, $scope.organ);
// 				}
// 			} else {
// 				node.subTree = data;
// 			}
			
// 			return data;
// 		}, $scope.wrapsodyErrorCallback);
// 	};
	
// 	$scope.getUserInfo = function(userId, callback) {
// 		$http({
// 			method: 'POST',
// 			url: $scope.host + '/user/getInfo.do',
// 			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
// 			transformRequest: $scope.transformRequest,
// 			data: {userId: userId}
// 		}).then(function(response) {
// 			var data = response.data
			
// 			$scope.users[data.userId] = data;
// 			if ($scope.user.id == data.userId) {
// 				$scope.user.info = data;
// 			}
			
// 			if (callback) {
// 				callback();
// 			}
// 		}, $scope.wrapsodyErrorCallback);
// 	};
	
// 	$scope.getDocInfo = function(syncId, callback) {
// 		$http({
// 			method: 'POST',
// 			url: $scope.host + '/document/getInfo.do',
// 			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
// 			transformRequest: $scope.transformRequest,
// 			data: {syncId: syncId, flag: true}
// 		}).then(function(response) {
// 			if (callback && response.data) {
// 				callback(response.data);
// 			}
// 		}, $scope.wrapsodyErrorCallback);
// 	};
	
	
	
	
// 	$scope.transformRequest = function(obj) {
// 		var str = [];
// 		for (var p in obj) {
// 			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
// 		}
// 		return str.join("&");
// 	};
	
// 	$scope.uuidv4 = function() {
// 		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
// 			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
// 			return v.toString(16);
// 		});
// 	};

// 	$scope.urlB64ToUint8Array = function(base64String) {
// 		const padding = '='.repeat((4 - base64String.length % 4) % 4);
// 		const base64 = (base64String + padding)
// 			.replace(/\-/g, '+')
// 			.replace(/_/g, '/');
		
// 		const rawData = window.atob(base64);
// 		const outputArray = new Uint8Array(rawData.length);
		
// 		for (let i = 0; i < rawData.length; ++i) {
// 			outputArray[i] = rawData.charCodeAt(i);
// 		}
		
// 		return outputArray;
// 	};
	
// 	$scope.webOfficeExt = ['ppt', 'pptx', 'ppsm', 'potx', 'potm', 'doc', 'docx', 'dotx', 'dotm', 'xls', 'xlsx', 'xlsm', 'pdf'];
// 	$scope.webOfficeEditExt = ['pptx', 'docx', 'xlsx'];
// 	$scope.isPreviewExt = function(document) {
// 		if (document == null) return false;
// 		if (document.status != 'N') return false;
// 		if (document.contentName == null) {
// 			document.contentName = document.content_name;
// 		}
// 		if (document.contentName == null) return false;
		
// 		var idx = document.contentName.lastIndexOf('.');
// 		if (idx > -1 && document.authType != 'N') {
// 			// web office 확장자 체크
// 			if ($scope.webOfficeExt.indexOf(document.contentName.toLowerCase().substr(idx +1)) > -1) {
// 				// web office 지원 브라우저 체크
// 				if (navigator.userAgent.toLowerCase().match(/edge|firefox|safari|chrome|trident/)) {
// 					var trident = navigator.userAgent.match(/Trident\/(\d)/i);
					
// 					if (trident == null || (trident.length == 2 && parseInt(trident[1]) > 4)) {
// 						return true;
// 					}
// 				}
// 			}
// 		}
		
// 		return false;
// 	};
	
	
	
// 	$scope.init();
	
// 	// legacy ver4 functions
// 	$scope.toggleSelectedMembers = function(node) {
// 		if (node.disabled) {
// 			return;
// 		}
		
// 		var idx = $scope.isSelectedMember(node);
		
// 		if (idx >= 0) {
// 			// 로그인 사용자는 선택해제 불가
// 			if ($scope.user.id != node.value) {
// 				$scope.selectedMembers.splice(idx, 1);
// 			}
// 		} else {
// 			$scope.selectedMembers.push({userName: node.columnText, userId: node.value, type: node.type, authType: node.authType});
// 		}
// 	};
	
// 	$scope.isSelectedMember = function(node) {
// 		for (var i = 0; i < $scope.selectedMembers.length; i++) {
// 			if ($scope.selectedMembers[i].userId == node.value) {
// 				return i;
// 			}
// 		}
		
// 		return -1;
// 	};
	
// 	$scope.addToInviteMembers = function() {
// 		for (var i = 0; i < $scope.selectedMembers.length; i++) {
// 			addToInviteMembers($scope.selectedMembers[i]);
// 		}
// 		$scope.selectedMembers = [];
// 	};
	
// 	$scope.selectAllMembers = function() {
// 		addChildrenToInviteMembers($scope.docInfo.organ);
// 	};
	
// 	$scope.removeAllInviteMembers = function() {
// 		for (var i = $scope.inviteMembers.length-1; i >= 0; i--) {
// 			if (!$scope.inviteMembers[i].disabled) {
// 				$scope.inviteMembers.splice(i, 1);
// 			}
// 		}
// 	};
// }

// wrapMsgrModule.factory('WrapMsgrService', function() {
// 	return {
		
// 	};
// });

// wrapMsgrModule.directive('draggable', ['$document' , function($document) {
// 	return {
// 		restrict: 'A',
// 		link: function(scope, elm, attrs) {
// 			var startX, startY, initialMouseX, initialMouseY;
// 			var options = scope.$eval(attrs.draggable);
// 			var target = (options != undefined && options.target != undefined) ? $(options.target) : elm;
// 			var position = (options != undefined && options.position != undefined) ? $(options.position) : 'absolute';
			
// 			target.css({position: position});
// 			elm.css({cursor: 'move'});

// 			elm.on('mousedown', function($event) {
// 				startX = target.prop('offsetLeft');
// 				startY = target.prop('offsetTop');
// 				initialMouseX = $event.clientX;
// 				initialMouseY = $event.clientY;
// 				$document.on('mousemove', mousemove);
// 				$document.on('mouseup', mouseup);
// 			});
			
// 			function mousemove($event) {
// 				var dx = $event.clientX - initialMouseX;
// 				var dy = $event.clientY - initialMouseY;

// 				var top = Math.max(startY + dy, 0);
// 				var left = Math.max(startX + dx, 0);

// 				target.css({
// 					top:  top + 'px',
// 					left: left + 'px'
// 				});
				
// 				return false;
// 			}

// 			function mouseup() {
// 				$document.off('mousemove', mousemove);
// 				$document.off('mouseup', mouseup);
// 			}
// 		}
// 	};
// }]);

// wrapMsgrModule.directive('script', function() {
// 	return {
// 		restrict: 'E',
// 		scope: false,
// 		link: function(scope, elem, attr) {
// 			if (attr.type=='text/javascript-lazy') {
// 				var code = elem.text();
// 				var f = new Function(code);
// 				f();
// 			}
// 		}
// 	};
// });

// wrapMsgrModule.directive('video', function() {
// 	return {
// 		restrict: 'E',
// 		scope: {
// 			fullscreenOut: '&onFullscreenOut'
// 		},
// 		link: function(scope, elem, attr) {
// 			elem.on('fullscreenchange', onFullscreenChange);
// 			elem.on('webkitfullscreenchange', onFullscreenChange);
// 			elem.on('mozfullscreenchange', onFullscreenChange);
		
// 			function onFullscreenChange(e) {
// 				var state = document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen;
// 				if (!state && scope.fullscreenOut) {
// 					scope.fullscreenOut();
// 				}
// 			};
// 		}
// 	}
// });

// wrapMsgrModule.directive('defaultIcon', function() {
// 	return {
// 		restrict: 'A',
// 		link: function(scope, elem, attr) {
// 			elem.bind('error', function() {
// 				elem.attr('src', attr.defaultIcon);
// 			})
// 		}
// 	};
// });

// wrapMsgrModule.directive('imgLoad', function() {
// 	return {
// 		restrict: 'A',
// 		link: function(scope, elem, attr) {
// 			elem.bind('load', function() {
// 				scope.$apply(attr.imgLoad);
// 			});
// 		}
// 	};
// });

// wrapMsgrModule.filter('documentIcon', function() {
// 	return function(docName) {
// 		if (docName) {
// 			return "icon_" + docName.substr(docName.lastIndexOf('.')+1, 3).toLowerCase() + ".svg";
// 		}
		
// 		return "icon_non.svg";
// 	}
// });

// wrapMsgrModule.filter('dateOrTime', function(dateFilter) {
// 	var language = navigator.language || navigator.userLanguage || 'ko-kr';
// 	language = language.substr(0, 2).toLowerCase();
	
// 	return function(date) {
// 		var dateObj = new Date(date);
		
// 		if (!isNaN(dateObj)) {
// 			var today = new Date();
			
// 			if (today.setHours(0, 0, 0, 0) == dateObj.setHours(0, 0, 0, 0)) {
// 				return dateFilter(date, 'shortTime');			
// 			} else {
// 				var format = (language == 'ko') ? 'yyyy-MM-dd' : 'MM/dd/yyyy';
// 				return dateFilter(date, format);
// 			}
// 		} else {
// 			return '';
// 		}
// 	};
// });

// wrapMsgrModule.filter('dateOrToday', function(dateFilter) {
// 	var language = navigator.language || navigator.userLanguage || 'ko-kr';
// 	language = language.substr(0, 2).toLowerCase();
	
// 	return function(date) {
// 		var dateObj = new Date(date);
		
// 		if (!isNaN(dateObj)) {
// 			var today = new Date();
			
// 			var format = (language == 'ko') ? 'MMMM d일 (EEEE)' : 'MMMM d (EEEE)';
// 			return dateFilter(date, format);
// 		} else {
// 			return '';
// 		}
// 	};
// });

// wrapMsgrModule.filter('limit', function() {
// 	return function(value, limit) {
// 		if (value > limit) {
// 			return limit + "+";
// 		} else {
// 			return value;
// 		}
// 	}
// });

// wrapMsgrModule.filter('fileSize', function() {
// 	return function(size) {
// 		var cnt = 0;
// 		while(size > 1024) {
// 			size = (size /1024).toFixed(1);
// 			cnt++;
// 		}
		
// 		var unit = "B";
// 		switch(cnt) {
// 			case 1:
// 				unit = "KB";
// 				break;
// 			case 2:
// 				unit = "MB";
// 				break;
// 			case 3:
// 				unit = "GB";
// 				break;
// 			case 4:
// 				unit = "TB";
// 				break;
// 			case 5:
// 				unit = "PB";
// 				break;
// 			case 6:
// 				unit = "EB";
// 				break;
// 		}
		
// 		return size + unit;
// 	}
// });

// wrapMsgrModule.filter('memberFilter', function() {
// 	return function(members, keyword, users) {
// 		var filtered = [];
		
// 		keyword = keyword ? keyword.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") : '.*';
// 		var re = new RegExp(keyword, 'i');
// 		for (var i = 0; i < members.length; i++) {
// 			var member = members[i];
// 			var user = users[member.userId];
// 			if (user && re.test(user.user)) {
// 				filtered.push(member);
// 			}
// 		}
				
// 		return filtered;
// 	}
// });

// wrapMsgrModule.filter('linkUrl', function() {
// 	return function(str) {
// 		var re = /<(((\W(?!\|)|\w)\s*)+)\|(https?:\/\/)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)>/;
// 		var result = str.replace(re, '<a href="$2">$1</a>');
// 		console.log(result);
		
// 		return result;
// 	}
// });

// wrapMsgrModule.filter('trustUrl', ['$sce', function($sce) {
// 	return function(url) {
// 		return $sce.trustAsResourceUrl(url);
// 	}
// }]);

// wrapMsgrModule.filter('reverse', function() {
// 	return function(array) {
// 		return array.slice().reverse();
// 	};
// });

// angular.element(document).ready(function() {
// 	var baseUrl = getParameter("url");
// 	var ver = getParameter("ver", "4");
// 	var scripts = [];

// 	scripts.push(baseUrl + "/js/wrapmsgr-components.js?ver=" + ver);
// 	scripts.push(baseUrl + "/webjars/stomp-websocket/lib/stomp.min.js");
// 	scripts.push(baseUrl + "/webjars/angular-animate/angular-animate.js");
// 	scripts.push(baseUrl + "/webjars/angular-ui-tree/dist/angular-ui-tree.min.js");
// 	scripts.push(baseUrl + "/webjars/angular-inview/angular-inview.js");
	
// 	var language = navigator.language || navigator.userLanguage || 'ko-kr';
// 	scripts.push(baseUrl + "/webjars/angular-i18n/angular-locale_" + language.toLowerCase() +".js");
// 	try { angular.module("ngSanitize") } catch(err) { scripts.push(baseUrl + "/webjars/angular-sanitize/angular-sanitize.min.js"); }
	
// 	/*
// 	if (angular.version.full == "1.2.1") {
// 		scripts.push(baseUrl + "/js/angular-animate.min.js");
// 	} else {
// 		scripts.push(baseUrl + "/webjars/angular-animate/angular-animate.min.js");
// 	}
// 	scripts.push(baseUrl + "/webjars/v-accordion/dist/v-accordion.min.js");
// 	*/
	
// 	loadScripts(scripts, bootAngular);
// });

// function bootAngular() {
// 	var divWidget = document.getElementById("wrapmsgr");
	
// 	angular.bootstrap(divWidget, ['WrapMsgrApp']);
	
// 	var container = getParameter("container");
// 	if (container) {
// 		$('#wrapmsgr_body').appendTo('#'+container);
// 	}
	
//     divWidget.removeAttribute("style");
// };

// function loadScript(url, onload) {
//     var script = document.createElement("script");
//     script.type = "text/javascript";
//     if (onload != undefined) {
//     	script.onload = onload;
//     }
//     script.src = url;
//     (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script);
// };

// function loadScripts(urls, onload) {
// 	var loadCount = urls.length;
	
// 	for (var i = 0; i < urls.length; i++) {
// 		loadScript(urls[i], function() {
// 			loadCount--;
// 			if (loadCount == 0) {
// 				onload();
// 			}
// 		});
// 	}
// };

// function getParameter(name, defaultValue) {
// 	return window.wrapmsgrWidgetParameters[name] || defaultValue;
// }

// var WrapMsgr = function() {
	
// 	var scope;
// 	getScope();
	
// 	function getScope() {
// 		scope = angular.element(document.getElementById('wrapmsgr_body')).scope();
// 		if (!scope) {
// 			setTimeout(getScope, 100);
// 		}
// 	};
	
// 	return {
// 		showRoomList: function() {
// 			scope.$apply(function() {
// 				scope.showRoomList();
// 			});
// 		},
// 		showDocumentRoom : function(syncId) {
// 			scope.$apply(function() {
// 				scope.showDocumentRoom(syncId);
// 			});
// 		},
// 		leaveDocumentRoom : function(syncId) {
// 			scope.$apply(function() {
// 				scope.sendApi("api.room.leave", {"syncId":syncId});
// 			});
// 		},
// 		showDocumentRoomAndJumpToMessage: function(syncId, messageId) {
// 			scope.$apply(function() {
// 				scope.showDocumentRoomAndJumpToMessage(syncId, messageId);
// 			});
// 		}
// 	}
// }();
import React, { Component, Fragment } from 'react';