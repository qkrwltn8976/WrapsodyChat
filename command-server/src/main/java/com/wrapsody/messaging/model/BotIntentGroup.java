package com.wrapsody.messaging.model;

import com.wrapsody.messaging.model.enums.BotIntentType;

public class BotIntentGroup extends ModelBase {
	private String botUserId;
	private int groupId;
	private BotIntentType intentType;
	private String nameCode;
	private boolean isCatalog;
	private int catalogOrder;
	
	private String name;
	
	public String getBotUserId() {
		return botUserId;
	}
	public void setBotUserId(String botUserId) {
		this.botUserId = botUserId;
	}
	public int getGroupId() {
		return groupId;
	}
	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}
	public BotIntentType getIntentType() {
		return intentType;
	}
	public void setIntentType(BotIntentType intentType) {
		this.intentType = intentType;
	}
	public String getNameCode() {
		return nameCode;
	}
	public void setNameCode(String nameCode) {
		this.nameCode = nameCode;
	}
	public boolean isCatalog() {
		return isCatalog;
	}
	public void setCatalog(boolean isCatalog) {
		this.isCatalog = isCatalog;
	}
	public int getCatalogOrder() {
		return catalogOrder;
	}
	public void setCatalogOrder(int catalogOrder) {
		this.catalogOrder = catalogOrder;
	}	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}