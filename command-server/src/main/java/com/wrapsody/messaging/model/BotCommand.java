package com.wrapsody.messaging.model;

import com.wrapsody.messaging.model.enums.BotIntentType;

public class BotCommand extends ModelBase {
	private String botUserId;
	private int intentId;
	private String command;
	private int priority;
	private int catalogOrder;
	
	private BotIntentType intentType;
	
	public String getBotUserId() {
		return botUserId;
	}
	public void setBotUserId(String botUserId) {
		this.botUserId = botUserId;
	}
	public int getIntentId() {
		return intentId;
	}
	public void setIntentId(int intentId) {
		this.intentId = intentId;
	}
	public String getCommand() {
		return command;
	}
	public void setCommand(String command) {
		this.command = command;
	}
	public int getPriority() {
		return priority;
	}
	public void setPriority(int priority) {
		this.priority = priority;
	}
	public int getCatalogOrder() {
		return catalogOrder;
	}
	public void setCatalogOrder(int catalogOrder) {
		this.catalogOrder = catalogOrder;
	}
	
	public BotIntentType getIntentType() {
		return intentType;
	}
	public void setIntentType(BotIntentType intentType) {
		this.intentType = intentType;
	}
}
