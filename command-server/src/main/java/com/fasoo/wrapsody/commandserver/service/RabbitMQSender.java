package com.fasoo.wrapsody.commandserver.service;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQSender {
    @Autowired
    private AmqpTemplate rabbitTemplate;
    @Value("${fasoo.wrapsody.rabbitmq.exchange}")
    private String exchange;
    @Value("${fasoo.wrapsody.rabbitmq.routingkey}")
    private String routingkey;

    private String msg;
    public void send(String message) {
        rabbitTemplate.convertAndSend(exchange, routingkey, message);
        System.out.println("Send msg = " + message);
        this.msg = message;
    }

    public String getMsg() {
        return this.msg;
    }
}