package com.wrapsody.messaging.model;

public class Config {

	private String code;
	private String value;
	
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	
	public Config() { }
	public Config(String code, String value) {
		this.code = code;
		this.value = value;
	}
	
}
