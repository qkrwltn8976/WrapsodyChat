package com.wrapsody.messaging.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.wrapsody.messaging.model.enums.ConversationType;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Conversation extends ModelBase {

	private String convoId;
	private ConversationType convoType;

//	@JsonSerialize(using=ConversationPropertiesSerializer.class)
	@JsonSerialize()
	private List<ConversationProperty> properties;
	
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
	
	public List<ConversationProperty> getProperties() {
		return properties;
	}
	public void setProperties(List<ConversationProperty> properties) {
		this.properties = properties;
	}
	
	public Conversation() { }
	public Conversation(ConversationType convoType) {
		this.convoType = convoType;
	}
}
