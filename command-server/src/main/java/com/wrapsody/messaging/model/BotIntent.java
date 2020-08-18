package com.wrapsody.messaging.model;

import com.wrapsody.messaging.model.enums.BotIntentType;

public class BotIntent extends ModelBase {
	private String botUserId;
	private Integer groupId;
	private int intentId;
	private BotIntentType intentType;
	private String name;
	private String language;
	private boolean isEnabled;
	
	public String getBotUserId() {
		return botUserId;
	}
	public void setBotUserId(String botUserId) {
		this.botUserId = botUserId;
	}
	public Integer getGroupId() {
		return groupId;
	}
	public void setGroupId(Integer groupId) {
		this.groupId = groupId;
	}
	public int getIntentId() {
		return intentId;
	}
	public void setIntentId(int intentId) {
		this.intentId = intentId;
	}
	public BotIntentType getIntentType() {
		return intentType;
	}
	public void setIntentType(BotIntentType intentType) {
		this.intentType = intentType;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
	public boolean isEnabled() {
		return isEnabled;
	}
	public void setEnabled(boolean isEnabled) {
		this.isEnabled = isEnabled;
	}
}
