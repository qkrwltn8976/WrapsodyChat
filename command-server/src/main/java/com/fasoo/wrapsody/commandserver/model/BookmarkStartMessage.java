package com.fasoo.wrapsody.commandserver.model;

import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class BookmarkStartMessage {
    private String senderId = "wrapsody";
    private String locale = "ko-KR";
    private Object payload;
    private String sPayload;

    protected BookmarkStartMessage(){}

    public BookmarkStartMessage(String convoId, String name) throws ParseException {
        this.sPayload = "{\"convoId\": \""+ convoId +"\"," +
                "\"name\": \""+name+"\"}";
        JSONParser jp = new JSONParser();
        this.payload = jp.parse(this.sPayload);
    }

    public String getSenderId(){return senderId;}
    public String getLocale(){return locale;}
    public Object getPayload(){return payload;}
}
