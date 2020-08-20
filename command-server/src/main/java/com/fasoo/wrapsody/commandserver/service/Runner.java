package com.fasoo.wrapsody.commandserver.service;

import com.fasoo.wrapsody.commandserver.model.BookmarkStartMessage;
import com.fasoo.wrapsody.commandserver.model.CustomMessage;
import com.fasoo.wrapsody.commandserver.model.PropertyUpdateMessage;
import com.fasoo.wrapsody.commandserver.model.SystemMessage;
import com.wrapsody.messaging.model.ApiResponse;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

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

    //client에 system message를 보낼 때 사용
    public void send (String exchange, String routingKey, SystemMessage message) {
        System.out.println("Sending message...");
        rabbitTemplate.convertAndSend(exchange, routingKey, message, m->{
            m.getMessageProperties().setUserId("wrapsody");
            m.getMessageProperties().getHeaders().put("__TypeId__", "com.wrapsody.messaging.model.Message");
            return m;
        });
    }

    //북마크 시작 or 중단 요청 보낼때 사용
    public int send (String exchange, String routingKey, BookmarkStartMessage message, String correlationId){
        System.out.println("Sending message...");
        CorrelationData correlationData = new CorrelationData(correlationId);

        ApiResponse answer = (ApiResponse) rabbitTemplate.convertSendAndReceive(exchange, routingKey, message, m->{
            m.getMessageProperties().setUserId("wrapsody");
            m.getMessageProperties().setReplyTo("api-answer");
            return m;
        },correlationData );

        return (answer.getResultCode().getCode());
    }

    public void send(String exchange, String routingKey, PropertyUpdateMessage message){
        System.out.println("Sending message...");
        rabbitTemplate.convertAndSend(exchange, routingKey, message, m->{
            m.getMessageProperties().setUserId("wrapsody");
            return m;
        });
    }
}