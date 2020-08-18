package com.wrapsody.messaging.model;

import com.wrapsody.messaging.model.enums.ConversationType;
import com.wrapsody.messaging.model.enums.NotificationType;
import com.wrapsody.messaging.model.enums.PresenceType;

import java.util.Date;

public class JoinedConversation extends ModelBase {
	private String userId;
	private String convoId;
	private ConversationType convoType;
	private Date readAt;
	private NotificationType notificationType;
	
	private String userName;
	private PresenceType presenceType;
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getConvoId() {
		return convoId;
	}
	public void setConvoId(String convoId) {
		this.convoId = convoId;
	}
	public ConversationType getConvoType() {
		return convoType;
	}
	public void setConvoType(ConversationType convoType) {
		this.convoType = convoType;
	}
	public Date getReadAt() {
		return readAt;
	}
	public void setReadAt(Date readAt) {
		this.readAt = readAt;
	}
	public NotificationType getNotificationType() {
		return notificationType;
	}
	public void setNotificationType(NotificationType notificationType) {
		this.notificationType = notificationType;
	}
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public PresenceType getPresenceType() {
		return presenceType;
	}
	public void setPresenceType(PresenceType presenceType) {
		this.presenceType = presenceType;
	}
	
	public JoinedConversation() { super(); }
	public JoinedConversation(String userId, String convoId) {
		this.userId = userId;
		this.convoId = convoId;
	}
	public JoinedConversation(String userId, String convoId, ConversationType convoType) {
		this.userId = userId;
		this.convoId = convoId;
		this.convoType = convoType;
		this.readAt = new Date();
		this.notificationType = NotificationType.ALWAYS;
	}
}
