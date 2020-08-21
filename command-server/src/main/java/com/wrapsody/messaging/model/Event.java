package com.wrapsody.messaging.model;

import com.wrapsody.messaging.model.enums.EventType;

import java.util.Date;
import java.util.Map;

public class Event {

	private EventType type;
	private Map<String, Object> payload;
	private Date createdAt;
	
	public EventType getType() {
		return type;
	}
	public void setType(EventType type) {
		this.type = type;
	}
	public Map<String, Object> getPayload() {
		return payload;
	}
	public void setPayload(Map<String, Object> payload) {
		this.payload = payload;
	}
	public Date getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	
	public Event() { }
	public Event(EventType type) {
		super();
		this.type = type;
		this.createdAt = new Date();
	}
	public Event(EventType type, Map<String, Object> payload) {
		super();
		this.type = type;
		this.payload = payload;
		this.createdAt = new Date();
	}
}
