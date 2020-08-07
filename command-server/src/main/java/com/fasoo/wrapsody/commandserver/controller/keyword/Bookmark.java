package com.fasoo.wrapsody.commandserver.controller.keyword;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;

public class Bookmark {


    @Autowired
    private RabbitTemplate rabbitTemplate;

    public enum Function{
        START("start"),
        STOP("stop"),
        NAME("name");

        final private String name;
        private Function(String name){this.name = name;}
        public String getName (){return name;}
    }

    public Bookmark(String[] cmd, long createdAt, String recvConvoId){
//        if(cmd.length!=1){
//            String c = cmd[1].toLowerCase();
//            if(c.compareTo(Function.START.getName())==0){
//                System.out.println("bookmark start");
////                systemMessage = new SystemMessage(1,"me",recvConvoId,createdAt,0);
////                customMessage = new CustomMessage(1,"2",recvConvoId,"ddd",1,createdAt,0);
//                Runner runner = new Runner(rabbitTemplate);
//
////                sender.send(a);
////                rabbitTemplate.convertAndSend("chat", "chat.bookmark.command", a);
//            }
//            else if(c.compareTo(Function.STOP.getName())==0){
//                System.out.println("bookmark stop");
//                Runner runner = new Runner(rabbitTemplate);
////                runner.send();
//            }
//            else{
//                System.out.println("You can enter start / stop");
//            }
//        }
//
//        else{
//            System.out.println("You can enter start / stop");
//        }

    }
}
