package com.fasoo.wrapsody.commandserver.service;
import com.fasoo.wrapsody.commandserver.model.Employee;
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
    public void send(String company) {
        rabbitTemplate.convertAndSend(exchange, routingkey, company);
        System.out.println("Send msg = " + company);
    }
}