package com.fasoo.wrapsody.commandserver.model;

import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class SystemMessage {

    private String sendUserId;
    private String recvConvoId;
    private String body;
    private int messageType;
    private int cmdType;
    private Object oBody;

    protected SystemMessage(){}

    public SystemMessage(String recvConvoId, String body, int cmdType) throws ParseException {
        this.sendUserId = "@SYS@";
        this.recvConvoId = recvConvoId;
        this.body = "{\"body\": \""+body+"\", \"cmdType\":"+cmdType+"}";
        JSONParser jp = new JSONParser();
        this.oBody = jp.parse(this.body);
        this.messageType = 240;

    }

    @Override
    public String toString(){
        return"{"+
                "sendUserId: '"+sendUserId+"',"+
                "recvConvoId: '"+ recvConvoId+"',"+
                body+
                "messageType:"+messageType+
                "}";
    }


    public String getSendUserId(){
        return sendUserId;
    }
    public String getRecvConvoId(){
        return recvConvoId;
    }
    public Object getBody(){
        return body;
    }
    public int getMessageType(){
        return messageType;
    }
}
