package com.wrapsody.messaging.model;

public class Bot extends ModelBase {
	private String botUserId;
	private String name;
	private String descCode;
	private boolean isEnabled;
	private boolean isAutoJoin;
	private String photo;

	private String description;

	public String getBotUserId() {
		return botUserId;
	}
	public void setBotUserId(String botUserId) {
		this.botUserId = botUserId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescCode() {
		return descCode;
	}
	public void setDescCode(String descCode) {
		this.descCode = descCode;
	}
	public boolean isEnabled() {
		return isEnabled;
	}
	public void setEnabled(boolean isEnabled) {
		this.isEnabled = isEnabled;
	}
	public boolean isAutoJoin() {
		return isAutoJoin;
	}
	public void setAutoJoin(boolean isAutoJoin) {
		this.isAutoJoin = isAutoJoin;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}	
}
