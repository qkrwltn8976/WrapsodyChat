package com.wrapsody.messaging.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum BotIntentFlowMatchType implements IntegerCodeEnum {
	ALWAYS(0),
	NEVER(1),
	RETRIES(2),
	UNKNOWN(3),
	EXACTLY(4),
	INCLUDE_ALL(5),
	INCLUDE_ANY(6),
	REGEXP(7),
	FUNCTION(8),
	;
	
	private int code;
	
	BotIntentFlowMatchType(int code) {
		this.code = code;
	}
	
	@Override
	@JsonValue
	public int getCode() {
		return code;
	}
}
