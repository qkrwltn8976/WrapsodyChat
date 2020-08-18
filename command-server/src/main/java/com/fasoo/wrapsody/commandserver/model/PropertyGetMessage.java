package com.fasoo.wrapsody.commandserver.model;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
public class PropertyGetMessage {
    private String senderId;
    private String locale;
    private String convoId;
    private String name;
    private Object payload;
    private String sPayload;
    protected PropertyGetMessage(){}
    public PropertyGetMessage(String senderId, String locale,String convoId) throws ParseException {
        this.senderId = "wrapsody";
        this.locale = locale;
        this.convoId = convoId;
        this.name = "bookmark";
        this.sPayload = "{\"convoId\": \""+ convoId +"\"," +
                "\"name\": \"bookmark\"}";
        JSONParser jp = new JSONParser();
        this.payload = jp.parse(this.sPayload);
    }
    public String getSenderId(){return senderId;}
    public String getLocale(){return locale;}
    public Object getPayload(){return payload;}
}