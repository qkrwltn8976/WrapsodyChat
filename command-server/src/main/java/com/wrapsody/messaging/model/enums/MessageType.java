package com.wrapsody.messaging.model.enums;
//import org.apache.ibatis.type.TypeException;
import org.springframework.util.StringUtils;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum MessageType implements IntegerCodeEnum {
	SHORT(0x00, "short"),
	SHORT_COMMAND(0x01, "short.command"),
	SHORT_BOT(0x02, "short.bot"),
	LONG(0x10, "long"),
	INDICATOR(0xE0, "indicator"),
	INDICATOR_BROKEN(0xE1, "indicator.broken"),
	INDICATOR_TYPING(0xE2, "indicator.typing"),
	SYSTEM(0xF0, "system"),
	SYSTEM_REVISION(0xF1, "system.revision"),
	;
	
	private int code;
	private String key;
	
	MessageType(int code, String key) {
		this.code = code;
		this.key = key;
	}
	
	@JsonValue
	public int getCode() {
		return code;
	}
	
	@JsonCreator
	public static MessageType fromCode(int code) {
		for (MessageType type : MessageType.values()) {
			if (type.getCode() == code) {
				return type;
			}
		}
		
//		throw new TypeException("Illegal code '" + code + "' for MessageType");
		return null;
	}
	
	public String toRoutingKey() {
		return "chat." + key;
	}
	public String toRoutingKey(String destination) {
		if (StringUtils.hasText(destination)) {
			return "chat." + key + "." + destination;
		} else {
			return toRoutingKey();
		}
	}
	public String toRoutingKey(DestinationType destination, String destinationId) {
		if (destination != null) {
			return "chat." + key + "." + destination.toRoutingKey(destinationId);
		} else {
			return toRoutingKey();
		}
	}
}
