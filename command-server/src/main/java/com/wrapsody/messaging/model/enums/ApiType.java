package com.wrapsody.messaging.model.enums;

import org.springframework.util.StringUtils;

public enum ApiType {
	ROOM("room"),
	ROOM_LIST("room.list"),
	ROOM_CREATE("room.crate"),
	
	ONE_TO_ONE("oneToOne"),
	ONE_TO_ONE_LIST("oneToOne.list"),
	
	MESSAGE("message"),
	MESSAGE_LIST("message.list"),
	
	BOT("bot"),
	BOT_CATALOG_LIST("bot.catalog.list"),
	BOT_COMMAND_LIST("bot.command.list"),
	;
	
	private String key;
	
	ApiType(String key) {
		this.key = key;
	}
	
	public String toRoutingKey() {
		return "api." + key;
	}
	public String toRoutingKey(String destination) {
		if (StringUtils.hasText(destination)) {
			return "api." + key + "." + destination;
		} else {
			return toRoutingKey();
		}
	}
	public String toRoutingKey(DestinationType destination, String destinationId) {
		if (destination != null) {
			return "api." + key + "." + destination.toRoutingKey(destinationId);
		} else {
			return toRoutingKey();
		}
	}
	
	@Override
	public String toString() {
		return key;
	}
}
