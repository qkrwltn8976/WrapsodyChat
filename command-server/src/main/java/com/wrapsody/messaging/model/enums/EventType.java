package com.wrapsody.messaging.model.enums;

import org.springframework.util.StringUtils;

public enum EventType {

	
	CONVERSATION("conversation"),
	CONVERSATION_READ("conversation.read"),
	CONVERSATION_TYPING_START("conversation.typing.start"),
	CONVERSATION_TYPING_STOP("conversation.typing.stop"),
	CONVERSATION_PROPERTY_UPDATED("conversation.property.updated"),
	CONVERSATION_BOOKMARK_CREATED("conversation.bookmark.created"),
	CONVERSATION_BOOKMARK_UPDATED("conversation.bookmark.updated"),
	CONVERSATION_BOOKMARK_DELETED("conversation.bookmark.deleted"),

	ROOM("room"),
	ROOM_CREATED("room.created"),
	ROOM_UPDATED("room.updated"),
	ROOM_JOINED("room.joined"),
	ROOM_LEFT("room.left"),
	
	NOTIFICATION_UPDATED("notification.updated"),
	
	PRESENCE("presence"),
	PRESENCE_ONLINE("presence.online"),
	PRESENCE_OFFLINE("presence.offline"),
	
	BOT("bot"),
	BOT_START("bot.start"),
	BOT_REOPEN("bot.reopen"),
	;
	
	private String key;
	
	EventType(String key) {
		this.key = key;
	}
	
	public String toRoutingKey() {
		return "event." + key;
	}
	public String toRoutingKey(String destination) {
		if (StringUtils.hasText(destination)) {
			return "event." + key + "." + destination;
		} else {
			return toRoutingKey();
		}
	}
	public String toRoutingKey(DestinationType destination, String destinationId) {
		if (destination != null) {
			return "event." + key + "." + destination.toRoutingKey(destinationId);
		} else {
			return toRoutingKey();
		}
	}
}
