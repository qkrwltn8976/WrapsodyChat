package com.wrapsody.messaging.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.wrapsody.messaging.config.Constant;
import com.wrapsody.messaging.model.enums.OneToOneType;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class OneToOne extends ModelBase {
	
	private String convoId;
	private String userId1;
	private String userId2;
	private OneToOneType otoType;

	public String getConvoId() {
		return convoId;
	}
	public void setConvoId(String convoId) {
		this.convoId = convoId;
	}
	public String getUserId1() {
		return userId1;
	}
	public void setUserId1(String userId1) {
		this.userId1 = userId1;
	}
	public String getUserId2() {
		return userId2;
	}
	public void setUserId2(String userId2) {
		this.userId2 = userId2;
	}
	public OneToOneType getOtoType() {
		return otoType;
	}
	public void setOtoType(OneToOneType otoType) {
		this.otoType = otoType;
	}
	
	public OneToOne() { super(); }
	public OneToOne(String userId1, String userId2) {
		setUserIds(userId1, userId2);
	}
	
	public void setUserIds(String userId1, String userId2) {
		if ((userId1.compareToIgnoreCase(userId2) > 0 && !userId2.startsWith(Constant.botPrefix)) || userId1.startsWith(Constant.botPrefix)) {
			this.userId1 = userId2;
			this.userId2 = userId1;
		} else {
			this.userId1 = userId1;
			this.userId2 = userId2;
		}
	}
}
