package com.wrapsody.messaging.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.wrapsody.messaging.config.Constant;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

public class ApiRequest {
	
	private String senderId;
	private Locale locale;
	private Map<String, Object> payload;
	

	public String getSender() {
		return senderId;
	}
	public void setSender(String senderId) {
		this.senderId = senderId;
	}
	public Map<String, Object> getPayload() {
		return payload;
	}
	public void setPayload(Map<String, Object> payload) {
		this.payload = payload;
	}
	public Locale getLocale() {
		return locale;
	}
	public void setLocale(Locale locale) {
		this.locale = locale;
	}
	
	@JsonCreator()
	public ApiRequest(@JsonProperty("senderId") String senderId, @JsonProperty("locale") Locale locale, @JsonProperty("payload") Map<String, Object> payload) {
		this.senderId = senderId;
		this.payload = payload;
		this.locale = locale;
	}
	
	public ApiRequest(String senderId, ModelBase payload) {
		this(senderId, Constant.defaultLocale, payload);
	}
	public ApiRequest(String senderId, Locale locale, ModelBase paylaod) {
		this.senderId = senderId;
		this.payload = new HashMap<String, Object>(1);
		this.payload.put(payload.getClass().getSimpleName(), payload);
		this.locale = locale;
	}
	
}
