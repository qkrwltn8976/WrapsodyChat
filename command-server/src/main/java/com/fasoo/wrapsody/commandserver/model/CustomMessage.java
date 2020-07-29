package com.fasoo.wrapsody.commandserver.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@id", scope = CustomMessage.class)
public class CustomMessage {

    private long createdAt;
    private long updatedAt;
    private long messageId;
    private String sendUserId;
    private String recvConvoId;
    private String body;
    private int messageType;
    private boolean isNotice;
    //  attachments?: Attachment[]
    public String getBody() {
        return body;
    }
    public CustomMessage (long messageId, String sendUserId, String recvConvoId, String body, int messageType, long createdAt, long updatedAt) {
        this.messageId = messageId;
        this.sendUserId = sendUserId;
        this.recvConvoId = recvConvoId;
        this.body = body;
        this.messageType = messageType;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    @Override
    public String toString() {
        return "Message [sendUserId=" + this.sendUserId + ", body=" + this.body+"]";
    }
}