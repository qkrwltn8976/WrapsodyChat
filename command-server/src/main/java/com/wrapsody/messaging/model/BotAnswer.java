package com.wrapsody.messaging.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

public class BotAnswer extends ModelBase {
	private String botUserId;
	private int intentId;
	private int answerId;
	private String answer;
	private String postMethod;
	private String language;
	private String country;
	
	private List<BotAnswerAttachment> attachments;
	
	@JsonIgnore
	private int hit;
	
	public String getBotUserId() {
		return botUserId;
	}
	public void setBotUserId(String botUserId) {
		this.botUserId = botUserId;
	}
	public int getIntentId() {
		return intentId;
	}
	public void setIntentId(int intentId) {
		this.intentId = intentId;
	}
	public int getAnswerId() {
		return answerId;
	}
	public void setAnswerId(int answerId) {
		this.answerId = answerId;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	public String getPostMethod() {
		return postMethod;
	}
	public void setPostMethod(String postMethod) {
		this.postMethod = postMethod;
	}
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public List<BotAnswerAttachment> getAttachments() {
		return attachments;
	}
	public void setAttachments(List<BotAnswerAttachment> attachments) {
		this.attachments = attachments;
	}
	
	public int getHit() {
		return hit;
	}
	public void setHit(int hit) {
		this.hit = hit;
	}
}
