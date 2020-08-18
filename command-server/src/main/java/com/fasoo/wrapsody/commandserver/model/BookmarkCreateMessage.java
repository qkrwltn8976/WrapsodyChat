package com.fasoo.wrapsody.commandserver.model;

import org.json.JSONObject;

public class BookmarkCreateMessage {
    private String senderId = "wrapsody";
    private String locale = "ko-KR";
    private JSONObject payloadJson = new JSONObject();
    private Object payload;

    protected BookmarkCreateMessage(){}

    public BookmarkCreateMessage(String convoId, String name, long startAt, long endAt){
        payloadJson.put("convoId", convoId);
        payloadJson.put("name", name);
        payloadJson.put("startAt", startAt);
        payloadJson.put("endAt", endAt+10000);

        System.out.println(payloadJson.toString());

        this.payload = payloadJson;
    }

    public String getSenderId(){return senderId;}
    public String getLocale(){return locale;}
    public Object getPayload(){return payload;}
}
