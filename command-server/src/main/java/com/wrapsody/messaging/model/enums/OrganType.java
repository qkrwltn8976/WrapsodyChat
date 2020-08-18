package com.wrapsody.messaging.model.enums;

public enum OrganType {
	DEPT,
	USER;
	
	@Override
	public String toString() {
		return this.name().toLowerCase();
	}
}
