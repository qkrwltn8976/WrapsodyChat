package com.wrapsody.messaging.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum BotIntentType implements IntegerCodeEnum {
	DEFAULT(0),
	WELCOME(1),
	UNKNOWN(2),
	CHOOSE(3),
	COMMAND(10),
	SMALL_TALK(11),
	BUSINESS(12),
	;
	
	private int code;
	
	BotIntentType(int code) {
		this.code = code;
	}
	
	@Override
	@JsonValue
	public int getCode() {
		return code;
	}
}
