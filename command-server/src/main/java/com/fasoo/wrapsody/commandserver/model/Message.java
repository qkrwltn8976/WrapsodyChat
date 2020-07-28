package com.fasoo.wrapsody.commandserver.model;

public class Message {
    private long messageId;
    private String sendUserId;
    private String recConvoId;
    private String title;
    private String body;
    private long messageType;
    private long parent_message_id;
    private long createdAt;
    private long updatedAt;
//  attachments?: Attachment[]
}
