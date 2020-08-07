package com.fasoo.wrapsody.commandserver.service;
import com.fasoo.wrapsody.commandserver.model.CustomMessage;
import com.fasoo.wrapsody.commandserver.model.SystemMessage;
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

    public void send (String exchange, String routingKey, SystemMessage message) {
        System.out.println("Sending message...");
        rabbitTemplate.convertAndSend(exchange, routingKey, message, m->{
            m.getMessageProperties().setUserId("wrapsody");
            m.getMessageProperties().getHeaders().put("__TypeId__", "com.wrapsody.messaging.model.Message");
//            m.getMessageProperties().getHeaders().put("user-id","@SYS@");


//            m.getMessageProperties().getHeaders().put("destination","/exchange/request/chat.short.convo."+message.getRecvConvoId());
            return m;
        });
    }
}