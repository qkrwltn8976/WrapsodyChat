package com.wrapsody.messaging.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum RoomType implements IntegerCodeEnum {
	PUBLIC(0),
	PRIVATE(1),
	DEPT(2),
	DOC(3);
	
	private int code;
	
	RoomType(int code) {
		this.code = code;
	}
	
	@Override
	@JsonValue
	public int getCode() {
		return code;
	}
}
