package com.fasoo.wrapsody.commandserver.model;

import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.sql.Timestamp;

public class PropertyUpdateMessage {
    private String senderId = "wrapsody";
    private String locale = "ko-KR";
    private Object payload;
    private String sPayload;

    protected PropertyUpdateMessage(){}

    public PropertyUpdateMessage(String convoId, String name, String value) throws ParseException {
        this.sPayload =
                        "{\"convoId\": \""+ convoId +"\"," +
                        "\"name\": \""+name+"\","+
                        "\"value\":\"" + value + "\"}";
        JSONParser jp = new JSONParser();
        this.payload = jp.parse(this.sPayload);
    }

    public PropertyUpdateMessage(String convoId, String name, Timestamp value) throws ParseException {
        this.sPayload =
                "{\"convoId\": \""+ convoId +"\"," +
                        "\"name\": \""+name+"\","+
                        "\"value\":\"" + value.toString() + "\"}";
        JSONParser jp = new JSONParser();
        this.payload = jp.parse(this.sPayload);
    }

    public String getSenderId(){return senderId;}
    public String getLocale(){return locale;}
    public Object getPayload(){return payload;}
}
