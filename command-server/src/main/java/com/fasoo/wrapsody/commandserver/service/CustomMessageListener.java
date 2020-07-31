package com.fasoo.wrapsody.commandserver.service;

import com.fasoo.wrapsody.commandserver.controller.keyword.Bookmark;
import com.fasoo.wrapsody.commandserver.model.CustomMessage;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class CustomMessageListener {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    public enum Command{
        REVISION("revision"),
        BOOKMARK("bookmark"),
        DEADLINE("deadline");

        final private String name;

        private Command(String name){
            this.name = name;
        }
        public String getName(){
            return name;
        }
    }

    CustomMessage message;
    String body;
    String []cmd;
    Command type;
    boolean iscommand = false;

    @RabbitListener(queues = "spring-boot")
    public void receiveMessage(final CustomMessage message) {
        System.out.println(message.getBody());

        body = message.getBody();
        if(body.charAt(0)=='@'){
            body = body.substring(1);
            cmd = body.split(" ");

            //첫번째 단어가 Command 열거형에 있는 name 중 하나와 일치하면 type에 명령어를 저장하고 iscommand를 참으로 반환한다
            for (Command command : Command.values()) {
                if (cmd[0].compareTo(command.getName()) == 0) {
                    type = command;
                    iscommand = true;
                    break;
                }
            }

            //BOOKMARK
            if(type==Command.BOOKMARK && cmd.length!=1){
                    String c = cmd[1].toLowerCase();
                    if(c.compareTo(Bookmark.Function.START.getName())==0){
                        Date date = new Date();
                        System.out.println("bookmark start");
                        CustomMessage customMessage = new CustomMessage(message.getCreatedAt(), message.getUpdatedAt(),50000, "@SYS@",message.getRecvConvoId(), "BOOKMARK START",0);
                        Runner runner = new Runner(rabbitTemplate);
                        runner.send("chat","chat.short.convo."+message.getRecvConvoId(),customMessage);
                    }
                    else if(c.compareTo(Bookmark.Function.STOP.getName())==0){
                        System.out.println("bookmark stop");
                        Runner runner = new Runner(rabbitTemplate);
//                        SystemMessage systemMessage = new SystemMessage(1,"me",message.getRecvConvoId(),message.getCreatedAt(),0);
//                        runner.send("spring-boot-exchange","bookmark",systemMessage);
                    }
                    else{
                        System.out.println("You can enter start / stop");
                    }
                }

                if(type==Command.BOOKMARK && cmd.length==1){
                    System.out.println("You can enter start / stop");
                }

                //DEADLINE

                //REVISION

        }

//        CustomMessage customMessage = new CustomMessage(1,"2","","ddd",1,0,0);
//
//
//        Runner runner = new Runner(rabbitTemplate);
//        runner.send("spring-boot-exchange","bookmark",customMessage);

//        try {
//            SyntaxAnalyzer sa = new SyntaxAnalyzer(message);
//
//        } catch (ParseException e) {
//            e.printStackTrace();
//        }
    }

}