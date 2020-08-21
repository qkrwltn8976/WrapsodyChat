package com.wrapsody.messaging.model;

public class BotContext extends ModelBase {

	private int contextId;
	private String botUserId;
	private String convoId;
	private int intentId;
	private String payload;
	private int retries;
	
	public int getContextId() {
		return contextId;
	}
	public void setContextId(int contextId) {
		this.contextId = contextId;
	}
	public String getBotUserId() {
		return botUserId;
	}
	public void setBotUserId(String botUserId) {
		this.botUserId = botUserId;
	}
	public String getConvoId() {
		return convoId;
	}
	public void setConvoId(String convoId) {
		this.convoId = convoId;
	}
	public int getIntentId() {
		return intentId;
	}
	public void setIntentId(int intentId) {
		this.intentId = intentId;
	}
	public String getPayload() {
		return payload;
	}
	public void setPayload(String payload) {
		this.payload = payload;
	}
	public int getRetries() {
		return retries;
	}
	public void setRetries(int retries) {
		this.retries = retries;
	}
	
	public BotContext() { super(); }
	public BotContext(String botUserId, String convoId, int intentId, String payload) {
		this.botUserId = botUserId;
		this.convoId = convoId;
		this.intentId = intentId;
		this.payload = payload;
	}
}
