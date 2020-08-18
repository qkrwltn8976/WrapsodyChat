package com.wrapsody.messaging.model.result;

public class UnreadCountResult {

	private String convoId;
	private int unread;
	
	public String getConvoId() {
		return convoId;
	}
	public void setConvoId(String convoId) {
		this.convoId = convoId;
	}
	public int getUnread() {
		return unread;
	}
	public void setUnread(int unread) {
		this.unread = unread;
	}
}
