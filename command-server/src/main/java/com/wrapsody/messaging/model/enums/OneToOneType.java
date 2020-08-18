package com.wrapsody.messaging.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum OneToOneType implements IntegerCodeEnum {
	USER(0),
	BOT(1);
	
	private int code;
	
	OneToOneType(int code) {
		this.code = code;
	}
	
	@Override
	@JsonValue
	public int getCode() {
		return code;
	}
}
