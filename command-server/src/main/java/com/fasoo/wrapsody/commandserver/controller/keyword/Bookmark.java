package com.fasoo.wrapsody.commandserver.controller.keyword;

import com.fasoo.wrapsody.commandserver.service.RabbitMQSender;
import org.json.JSONObject;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;

public class Bookmark {
    JSONObject sendPacket = new JSONObject();
    RabbitMQSender sender = new RabbitMQSender();

    @Autowired
    private AmqpTemplate rabbitTemplate;

    public enum Function{
        START("start"),
        STOP("stop");

        final private String name;
        private Function(String name){this.name = name;}
        public String getName (){return name;}
    }

    public Bookmark(String[] cmd, long createdAt, String recvConvoId){
        if(cmd.length!=1){
            String c = cmd[1].toLowerCase();
            if(c.compareTo(Function.START.getName())==0){
                System.out.println("bookmark start");
                sendPacket.put("bookmarkID", "1");
                sendPacket.put("startTime", createdAt);
                sendPacket.put("convoId", recvConvoId);

                String a = sendPacket.toString();
                System.out.println(a);
//                sender.send(a);
                rabbitTemplate.convertAndSend("chat", "chat.bookmark.command", a);
            }
            else if(c.compareTo(Function.STOP.getName())==0){
                System.out.println("bookmark stop");
                sendPacket.put("bookmarkID", "1");
                sendPacket.put("endTime", createdAt);
                sendPacket.put("convoId", recvConvoId);
//                sender.send(sendPacket.toString());
            }
            else{
                System.out.println("You can enter start / stop");
            }
        }

        else{
            System.out.println("You can enter start / stop");
        }

    }
}
