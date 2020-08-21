package com.wrapsody.messaging.model;

import java.util.Locale;

public class UserInfo extends ModelBase {

	private String userId;
	private String latestConvoId;
	private Locale locale;
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getLatestConvoId() {
		return latestConvoId;
	}
	public void setLatestConvoId(String latestConvoId) {
		this.latestConvoId = latestConvoId;
	}
	public Locale getLocale() {
		return locale;
	}
	public void setLocale(Locale locale) {
		this.locale = locale;
	}
}
