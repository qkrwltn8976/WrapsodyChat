package com.wrapsody.messaging.model.enums;

import org.springframework.util.StringUtils;

public enum DestinationType {

	USER("user"),
	ROOM("room"),
	DEPARTMENT("dept"),
	CONVERSATION("convo");
	
	private String code;
	
	DestinationType(String code) {
		this.code = code;
	}
	
	public String toRoutingKey() {
		return code;
	}
	public String toRoutingKey(String destinationId) {
		if (StringUtils.hasText(destinationId)) {
			return code + "." + destinationId;
		} else {
			return toRoutingKey();
		}
			
	}
}
