package com.fasoo.wrapsody.commandserver.service;

import com.fasoo.wrapsody.commandserver.model.CustomMessage;
import org.springframework.amqp.core.Message;
import org.json.JSONObject;

public class MessageService {
    private static CustomMessage message;

    public static CustomMessage setMessage(String body) {
        JSONObject obj = new JSONObject(body);
        System.out.println(obj.getString("body"));
        message = new CustomMessage(obj.getLong("createdAt"),(obj.getLong("updatedAt")), obj.getLong("messageId"), obj.getString("sendUserId"), obj.getString("recvConvoId"), obj.getString("body"), obj.getInt("messageType"));
        return message;

    }




}
