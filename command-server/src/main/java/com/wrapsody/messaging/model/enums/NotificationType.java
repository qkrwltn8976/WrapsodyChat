package com.wrapsody.messaging.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum NotificationType implements IntegerCodeEnum {
	OFF(0),
	ALWAYS(1),
	;

	private int code;
	
	NotificationType(int code) {
		this.code = code;
	}
	
	@Override
	@JsonValue
	public int getCode() {
		return code;
	}

}
