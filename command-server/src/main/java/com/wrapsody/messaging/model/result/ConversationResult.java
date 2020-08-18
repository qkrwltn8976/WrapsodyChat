package com.wrapsody.messaging.model.result;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.wrapsody.messaging.model.Conversation;
import com.wrapsody.messaging.model.enums.NotificationType;
import com.wrapsody.messaging.model.enums.OneToOneType;
import com.wrapsody.messaging.model.enums.RoomType;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ConversationResult extends Conversation {

	private RoomType roomType;
	private OneToOneType otoType;

	private String name;
	private String relationId;
	private Date readAt;
	private int unread;
	private int memberCount;
	private NotificationType notificationType;
	private String latestMessage;
	private Date latestMessageAt;
	
	private String thumbnail;
	
	public RoomType getRoomType() {
		return roomType;
	}
	public void setRoomType(RoomType roomType) {
		this.roomType = roomType;
	}
	public OneToOneType getOtoType() {
		return otoType;
	}
	public void setOtoType(OneToOneType otoType) {
		this.otoType = otoType;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getRelationId() {
		return relationId;
	}
	public void setRelationId(String relationId) {
		this.relationId = relationId;
	}
	public Date getReadAt() {
		return readAt;
	}
	public void setReadAt(Date readAt) {
		this.readAt = readAt;
	}
	public int getUnread() {
		return unread;
	}
	public void setUnread(int unread) {
		this.unread = unread;
	}
	public int getMemberCount() {
		return memberCount;
	}
	public void setMemberCount(int memberCount) {
		this.memberCount = memberCount;
	}
	public NotificationType getNotificationType() {
		return notificationType;
	}
	public void setNotificationType(NotificationType notificationType) {
		this.notificationType = notificationType;
	}
	public String getLatestMessage() {
		return latestMessage;
	}
	public void setLatestMessage(String latestMessage) {
		this.latestMessage = latestMessage;
	}
	public Date getLatestMessageAt() {
		return latestMessageAt;
	}
	public void setLatestMessageAt(Date latestMessageAt) {
		this.latestMessageAt = latestMessageAt;
	}
	public String getThumbnail() {
		return thumbnail;
	}
	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}
	
	public ConversationResult() {
		super();
	}
	public ConversationResult(Conversation convo) {
		this.setConvoId(convo.getConvoId());
		this.setConvoType(convo.getConvoType());
		this.setProperties(convo.getProperties());
		this.setCreatedAt(convo.getCreatedAt());
		this.setUpdatedAt(convo.getUpdatedAt());
	}
}
