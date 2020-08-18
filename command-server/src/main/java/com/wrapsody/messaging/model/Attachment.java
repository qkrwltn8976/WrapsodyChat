package com.wrapsody.messaging.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonRawValue;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.wrapsody.messaging.json.KeepAsJsonDeserialzier;
import com.wrapsody.messaging.model.enums.AttachmentType;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Attachment extends ModelBase {
	private long messageId;
	private Long attachmentId;
	private AttachmentType attachmentType;
	private String title;
	private String uri;
	@JsonRawValue
	@JsonDeserialize(using = KeepAsJsonDeserialzier.class)
	private String payload;
	private int attachmentOrder;
	
	public long getMessageId() {
		return messageId;
	}
	public void setMessageId(long messageId) {
		this.messageId = messageId;
	}
	public Long getAttachmentId() {
		return attachmentId;
	}
	public void setAttachmentId(Long attachmentId) {
		this.attachmentId = attachmentId;
	}
	public AttachmentType getAttachmentType() {
		return attachmentType;
	}
	public void setAttachmentType(AttachmentType attachmentType) {
		this.attachmentType = attachmentType;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getUri() {
		return uri;
	}
	public void setUri(String uri) {
		this.uri = uri;
	}
	public String getPayload() {
		return payload;
	}
	public void setPayload(String payload) {
		this.payload = payload;
	}
	public int getAttachmentOrder() {
		return attachmentOrder;
	}
	public void setAttachmentOrder(int attachmentOrder) {
		this.attachmentOrder = attachmentOrder;
	}
}
