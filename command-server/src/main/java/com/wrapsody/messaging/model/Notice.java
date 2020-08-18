package com.wrapsody.messaging.model;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Notice extends ModelBase {
	private String convoId;
	private int messageId;
	
	public String getConvoId() {
		return convoId;
	}
	public void setConvoId(String convoId) {
		this.convoId = convoId;
	}
	public int getMessageId() {
		return messageId;
	}
	public void setMessageId(int messageId) {
		this.messageId = messageId;
	}
	
	public Notice() { super(); }
	public Notice(String convoId, int messageId) {
		this.convoId = convoId;
		this.messageId = messageId;
	}
}
