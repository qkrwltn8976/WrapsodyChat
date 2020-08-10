package com.fasoo.wrapsody.commandserver.model;

import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class ConversationViewMessage {
    private String senderId;
    private String locale;
    private Object payload;
    private String Spayload;

    protected ConversationViewMessage(){}

    public ConversationViewMessage(String senderId, String locale, String convoId) throws ParseException {
        this.senderId = senderId;
        this.locale = locale;
        this.Spayload = "{\"convoId\": \""+ convoId +"\"}";
        JSONParser jp = new JSONParser();
        this.payload = jp.parse(this.Spayload);
    }

    @Override
    public String toString(){
        return "{"+
                "senderId: "+ senderId+", "+
                "locale: "+ locale + ", "+
                "payload: "+ payload+
                "}"
                ;
    }

    public String getSenderId(){return senderId;}
    public String getLocale(){return locale;}
    public Object getPayload(){return payload;}
}
