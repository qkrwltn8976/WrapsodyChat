package com.fasoo.wrapsody.commandserver.util;

import com.fasoo.wrapsody.commandserver.controller.keyword.Bookmark;
import com.fasoo.wrapsody.commandserver.controller.keyword.Deadline;
import com.fasoo.wrapsody.commandserver.controller.keyword.Revision;
import com.fasoo.wrapsody.commandserver.model.CustomMessage;
import com.fasoo.wrapsody.commandserver.service.Runner;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.ParseException;


public class SyntaxAnalyzer {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    CustomMessage message;
    String body;
    String recvConvoId;
    long createdAt;
    String []cmd;
    Command type;
    boolean iscommand = false;

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

    public SyntaxAnalyzer(CustomMessage message){
        //메세지가 '@' 으로 시작하면 구문분석한다
//        System.out.println(message);
//        this.body = message.getBody();
//        this.createdAt = message.getCreatedAt();
//        this.recvConvoId = message.getRecvConvoId();
//        if(body.charAt(0)=='@') {
//            this.message = message;
//
//            //기호 '@' 제거 후 공백문자로 split 하여 배열 cmd에 저장
//            body = body.substring(1);
//            cmd = body.split(" ");
//
//            //첫번째 단어가 Command 열거형에 있는 name 중 하나와 일치하면 type에 명령어를 저장하고 iscommand를 참으로 반환한다
//            for (Command command : Command.values()) {
//                if (cmd[0].compareTo(command.getName()) == 0) {
//                    type = command;
//                    iscommand = true;
//                    break;
//                }
//            }
//
//            if(type == Command.BOOKMARK && cmd.length!=1){
//                String c = cmd[1].toLowerCase();
//                if(c.compareTo(Bookmark.Function.START.getName())==0){
//                    System.out.println("bookmark start");
////                systemMessage = new SystemMessage(1,"me",recvConvoId,createdAt,0);
//                    CustomMessage customMessage = new CustomMessage(1,"2",recvConvoId,"ddd",1,createdAt,0);
//                    Runner runner = new Runner(rabbitTemplate);
//
////                sender.send(a);
////                rabbitTemplate.convertAndSend("chat", "chat.bookmark.command", a);
//                }
//                else if(c.compareTo(Bookmark.Function.STOP.getName())==0){
//                    System.out.println("bookmark stop");
//                    Runner runner = new Runner(rabbitTemplate);
////                runner.send();
//                }
//                else{
//                    System.out.println("You can enter start / stop");
//                }
//            }
//
//
//        }
//
////        if(iscommand && type!=null) {
////            this.dodo();
////        }
    }

    public void dodo(){
//        if(type == Command.BOOKMARK && cmd.length!=1){
//            String c = cmd[1].toLowerCase();
//            if(c.compareTo(Bookmark.Function.START.getName())==0){
//                System.out.println("bookmark start");
////                systemMessage = new SystemMessage(1,"me",recvConvoId,createdAt,0);
//                CustomMessage customMessage = new CustomMessage(1,"2",recvConvoId,"ddd",1,createdAt,0);
//                Runner runner = new Runner(rabbitTemplate);
//
////                sender.send(a);
////                rabbitTemplate.convertAndSend("chat", "chat.bookmark.command", a);
//            }
//            else if(c.compareTo(Bookmark.Function.STOP.getName())==0){
//                System.out.println("bookmark stop");
//                Runner runner = new Runner(rabbitTemplate);
////                runner.send();
//            }
//            else{
//                System.out.println("You can enter start / stop");
//            }
//        }
//        if(type == Command.DEADLINE){
//            Deadline d = new Deadline(cmd);
//        }
//        if(type == Command.REVISION){
//            Revision r = new Revision(cmd);
//        }
    }

    public boolean isCommand(){
        return iscommand;
    }

    public Command getType(){
        return type;
    }

}
