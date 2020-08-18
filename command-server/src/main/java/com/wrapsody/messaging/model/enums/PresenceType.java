package com.wrapsody.messaging.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum PresenceType implements StringCodeEnum {
	ONLINE("online"),
	OFFLINE("offline"),
	;
	
	private String code;
	
	PresenceType(String code) {
		this.code = code;
	}
	
	@Override
	@JsonValue
	public String getCode() {
		return code;
	}

}
