package com.wrapsody.messaging.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.wrapsody.messaging.model.enums.MessageType;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Message extends ModelBase {
	private long messageId;
	private String sendUserId;
	private String recvConvoId;
	private String title;
	private String body;
	private MessageType messageType;
	private Long parentMessageId;
	private boolean isNotice;
	
	private List<? extends Attachment> attachments;
	
	public long getMessageId() {
		return messageId;
	}
	public void setMessageId(long messageId) {
		this.messageId = messageId;
	}
	public String getSendUserId() {
		return sendUserId;
	}
	public void setSendUserId(String sendUserId) {
		this.sendUserId = sendUserId;
	}
	public String getRecvConvoId() {
		return recvConvoId;
	}
	public void setRecvConvoId(String recvConvoId) {
		this.recvConvoId = recvConvoId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	public MessageType getMessageType() {
		return messageType;
	}
	public void setMessageType(MessageType messageType) {
		this.messageType = messageType;
	}
	public Long getParentMessageId() {
		return parentMessageId;
	}
	public void setParentMessageId(Long parentMessageId) {
		this.parentMessageId = parentMessageId;
	}
	public boolean getIsNotice() {
		return isNotice;
	}
	public void setIsNotice(boolean isNotice) {
		this.isNotice = isNotice;
	}
	public List<? extends Attachment> getAttachments() {
		return attachments;
	}
	public void setAttachments(List<? extends Attachment> attachments) {
		this.attachments = attachments;
	}
}
