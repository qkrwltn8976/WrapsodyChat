package com.fasoo.wrapsody.commandserver.service;
import com.fasoo.wrapsody.commandserver.model.CustomMessage;
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

}