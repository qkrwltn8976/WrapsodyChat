package com.fasoo.wrapsody.commandserver.service;

import com.fasoo.wrapsody.commandserver.model.BookmarkCreateMessage;
import com.fasoo.wrapsody.commandserver.model.CustomMessage;
import com.fasoo.wrapsody.commandserver.model.PropertyGetMessage;
import com.fasoo.wrapsody.commandserver.model.SystemMessage;
import com.wrapsody.messaging.model.ApiResponse;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.LinkedHashMap;

@Component
public class Runner{

    private static final String topicExchange = "chat";

    private final RabbitTemplate rabbitTemplate;

    public Runner(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void send (String exchange, String routingKey, CustomMessage message) {
        System.out.println("Sending message...");
        rabbitTemplate.convertAndSend(exchange, routingKey, message);
    }

    public void send (String exchange, String routingKey, SystemMessage message) {
        System.out.println("Sending message...");
        rabbitTemplate.convertAndSend(exchange, routingKey, message, m->{
            m.getMessageProperties().setUserId("wrapsody");
            m.getMessageProperties().getHeaders().put("__TypeId__", "com.wrapsody.messaging.model.Message");
            return m;
        });
    }

    public void send (String exchange, String routingKey, PropertyGetMessage message, String correlationId){
        System.out.println("Sending message to get property...");
        CorrelationData correlationData = new CorrelationData(correlationId);
        ApiResponse answer = (ApiResponse) rabbitTemplate.convertSendAndReceive(exchange, routingKey, message, m->{
            m.getMessageProperties().setUserId("wrapsody");
            m.getMessageProperties().setReplyTo("api-answer");
            return m;
        },correlationData );

        ArrayList arr = (ArrayList) answer.getPayload().get("ConversationProperties");
        LinkedHashMap lh = (LinkedHashMap) arr.get(0);

        System.out.println(lh.get("value"));
    }

    public void send (String exchange, String routingKey, BookmarkCreateMessage message, String correlationId){
        System.out.println("Sending message to get property...");
        CorrelationData correlationData = new CorrelationData(correlationId);
//        ApiResponse answer = (ApiResponse) rabbitTemplate.convertSendAndReceive(exchange, routingKey, message, m->{
//            m.getMessageProperties().setUserId("wrapsody");
//            m.getMessageProperties().setReplyTo("api-answer");
//            return m;
//        },correlationData );

        rabbitTemplate.convertAndSend(exchange, routingKey, message, m->{
            m.getMessageProperties().setUserId("wrapsody");
            m.getMessageProperties().setReplyTo("api-answer");
            return m;
        });

//        System.out.println(answer.isSuccess());
//        System.out.println(answer.getResultCode());
    }
}