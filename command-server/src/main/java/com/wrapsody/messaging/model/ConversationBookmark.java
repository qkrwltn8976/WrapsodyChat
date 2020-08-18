package com.wrapsody.messaging.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.wrapsody.messaging.model.enums.BookmarkStatus;

import java.util.Date;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ConversationBookmark extends ModelBase {

	private long bookmarkId;
	private String convoId;
	private String name;
	private BookmarkStatus status;
	private Date startAt;
	private Date endAt;
	
	public long getBookmarkId() {
		return bookmarkId;
	}
	public void setBookmarkId(long bookmarkId) {
		this.bookmarkId = bookmarkId;
	}
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
	public BookmarkStatus getStatus() {
		return status;
	}
	public void setStatus(BookmarkStatus status) {
		this.status = status;
	}
	public Date getStartAt() {
		return startAt;
	}
	public void setStartAt(Date startAt) {
		this.startAt = startAt;
	}
	public Date getEndAt() {
		return endAt;
	}
	public void setEndAt(Date endAt) {
		this.endAt = endAt;
	}
	
	public ConversationBookmark() { }
	public ConversationBookmark(String convoId, String name, BookmarkStatus status, Date startAt, Date endAt) {
		this.convoId = convoId;
		this.name = name;
		this.status = status;
		this.startAt = startAt;
		this.endAt = endAt;
	}
}
