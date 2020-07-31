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

    protected CustomMessage(){}

    public CustomMessage (long createdAt, long updatedAt, long messageId, String sendUserId, String recvConvoId, String body, int messageType) {
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
        return"{" +
                "createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", messageId=" + messageId +
                ", sendUserId='" + sendUserId +'\'' +
                ", recvConvoId='" + recvConvoId +'\'' +
                ", body='" + body +'\'' +
                ", messageType=" + messageType +
                ", isNotice= false"+
                '}';
    }

    public long getMessageId(){return this.messageId;}
    public String getSendUserId(){return this.sendUserId;}
    public String getRecvConvoId(){return this.recvConvoId;}
    public String getBody(){return this.body;}
    public int getMessageType(){return this.messageType;}
    public long getCreatedAt(){return this.createdAt;}
    public long getUpdatedAt(){return this.updatedAt;}
}