package com.wrapsody.messaging.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ResultCode implements IntegerCodeEnum {
	SUCCESS(0),
	FAIL(1),
	ILLEGAL_ROUTING_KEY(2),
	ILLEGAL_ARGUMENT(3),
	UNKNOWN_REQUEST(4),
	ALREADY_EXISTS(5),
	NOT_EXIST(6),
	NO_PERMISSION(7),
	WEB_SERVER_API_FAILED(8),
	;
	
	private int code;
	
	ResultCode(int code) {
		this.code = code;
	}
	
	@Override
	@JsonValue
	public int getCode() {
		return code;
	}
}
