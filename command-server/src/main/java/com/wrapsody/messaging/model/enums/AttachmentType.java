package com.wrapsody.messaging.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum AttachmentType implements IntegerCodeEnum {
	FILE(0),
	IMAGE(1),
	VIDEO(2),
	SOUND(3),
	SCRAP(4),
	ACTION(5),
	;
	
	private int code;
	
	AttachmentType(int code) {
		this.code = code;
	}
	
	@Override
	@JsonValue
	public int getCode() {
		return code;
	}
}
