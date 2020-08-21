package com.wrapsody.messaging.model;

import com.wrapsody.messaging.model.enums.BotIntentFlowMatchType;

public class BotIntentFlow extends ModelBase {

	private String botUserId;
	private int intentId;
	private int nextIntentId;
	private int matchOrder;
	private BotIntentFlowMatchType matchType;
	private String matchText;
	
	
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
	public int getNextIntentId() {
		return nextIntentId;
	}
	public void setNextIntentId(int nextIntentId) {
		this.nextIntentId = nextIntentId;
	}
	public int getMatchOrder() {
		return matchOrder;
	}
	public void setMatchOrder(int matchOrder) {
		this.matchOrder = matchOrder;
	}
	public BotIntentFlowMatchType getMatchType() {
		return matchType;
	}
	public void setMatchType(BotIntentFlowMatchType matchType) {
		this.matchType = matchType;
	}
	public String getMatchText() {
		return matchText;
	}
	public void setMatchText(String matchText) {
		this.matchText = matchText;
	}
}
