package com.fasoo.wrapsody.commandserver.service;

import com.fasoo.wrapsody.commandserver.util.SyntaxAnalyzer;
import com.fasoo.wrapsody.commandserver.model.CustomMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageListener;
import org.springframework.stereotype.Service;

import java.text.ParseException;

@Service
public class RabbitMQListener implements MessageListener {
    SyntaxAnalyzer analyzer;
    private CustomMessage msg;
    ObjectMapper objectMapper = new ObjectMapper();

    public void onMessage(Message message) {
        System.out.println("Consuming Message - ");
        System.out.println();

        msg = MessageService.setMessage(new String(message.getBody()));
        try {
            analyzer = new SyntaxAnalyzer(msg.getBody());
            System.out.println(msg.getBody());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        System.out.println(analyzer.getType());
        System.out.println(analyzer.isCommand());
    }

}
