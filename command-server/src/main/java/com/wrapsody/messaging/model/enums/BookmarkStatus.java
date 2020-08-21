package com.wrapsody.messaging.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum BookmarkStatus implements StringCodeEnum {
	NORMAL("N"),
	MAKING("M"),
	DELETED("D"),
	;
	
	private String code;
	
	BookmarkStatus(String code) {
		this.code = code;
	}
	
	@Override
	@JsonValue
	public String getCode() {
		return code;
	}

}
