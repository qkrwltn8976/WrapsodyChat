package com.wrapsody.messaging.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ConversationType implements IntegerCodeEnum {
	ROOM(1),
	ONE_TO_ONE(2),
	;
	
	private int code;
	
	ConversationType(int code) {
		this.code = code;
	}
	
	@Override
	@JsonValue
	public int getCode() {
		return code;
	}
}
