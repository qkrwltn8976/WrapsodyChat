package com.wrapsody.messaging.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.wrapsody.messaging.model.enums.RoomType;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Room extends ModelBase {
	
	private String convoId;
	private String name;
	private String subject;
	private String owner;
	private RoomType roomType;
	private String dept;
	private String syncId;
	
	@JsonIgnore
	private List<JoinedConversation> members;

	public String getConvoId() {
		return convoId;
	}
	public void setConvoId(String convoId) {
		this.convoId = convoId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getOwner() {
		return owner;
	}
	public void setOwner(String owner) {
		this.owner = owner;
	}
	public RoomType getRoomType() {
		return roomType;
	}
	public void setRoomType(RoomType roomType) {
		this.roomType = roomType;
	}
	public String getDept() {
		return dept;
	}
	public void setDept(String dept) {
		this.dept = dept;
	}
	public String getSyncId() {
		return syncId;
	}
	public void setSyncId(String syncId) {
		this.syncId = syncId;
	}
	
	public List<JoinedConversation> getMembers() {
		return members;
	}
	public void setMembers(List<JoinedConversation> members) {
		this.members = members;
	}
}
