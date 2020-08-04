package com.fasoo.wrapsody.commandserver.service;

import com.fasoo.wrapsody.commandserver.controller.keyword.Bookmark;
import com.fasoo.wrapsody.commandserver.model.CustomMessage;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.StringTokenizer;

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

    String body, exchange, routingKey;
    String []cmd;
    Command type;
    boolean iscommand = false;

    @RabbitListener(queues = "spring-boot")
    @RabbitHandler
    public void receiveMessage(final CustomMessage message) {
        System.out.println(message.getBody());
        body = message.getBody();


        if(body.length() !=0 &&body.charAt(0)=='@'){
            body = body.substring(1);
            cmd = body.split(" ");
            Runner runner = new Runner(rabbitTemplate);
            exchange = "chat";
            routingKey = "chat.short.room.";

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
                        System.out.println("bookmark start");
                        CustomMessage customMessage = new CustomMessage(message, "북마크를 시작합니다",5);
//                        runner.send(exchange,routingKey+message.getRecvConvoId(),customMessage);
                        runner.send("chat",routingKey+message.getRecvConvoId(),customMessage);
                    }
                    else if(c.compareTo(Bookmark.Function.STOP.getName())==0){
                        System.out.println("bookmark stop");
                        CustomMessage customMessage = new CustomMessage(message, "북마크를 끝냅니다",6);
                        runner.send(exchange,routingKey+message.getRecvConvoId(),customMessage);
                    }
                    else{
                        CustomMessage customMessage = new CustomMessage(message, "커맨드 형식: @BOOKMARK START / @BOOKMARK STOP", 10);
                        runner.send(exchange,routingKey+message.getRecvConvoId(),customMessage);
                    }
                }

                if(type==Command.BOOKMARK && cmd.length==1){
                    CustomMessage customMessage = new CustomMessage(message, "커맨드 형식: @BOOKMARK START / @BOOKMARK STOP", 10);
                    runner.send(exchange,routingKey+message.getRecvConvoId(),customMessage);
                }


                //DEADLINE
            if(type==Command.DEADLINE && cmd.length!=1) {
                if(cmd.length!= 1){
                    String msg="";

                    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    Date dt;
                    long timestamp;

                    List <String> date = new ArrayList<String>();

                    StringTokenizer st = new StringTokenizer(cmd[1], ".|,|-|_|/| ");
                    while(st.hasMoreTokens()){
                        date.add(st.nextToken());
                    }

                    //연도 예외처리 yyyy || yy || mm || m || dd || d 형식 확인
                    if(date.size() == 3 && (date.get(0).length()==4 || date.get(0).length()==2) && (date.get(1).length()==1 || date.get(1).length()==2) && (date.get(2).length()==1 || date.get(2).length()==2)){
                        //연도를 두자리로 적었으면 앞에 20을 붙여준다.
                        if(Integer.parseInt(date.get(0))<100){
                            date.set(0,"20"+date.get(0));
                        }
                        String d = date.get(0)+"-"+date.get(1)+"-"+date.get(2);

                        msg = d;
                    }
                    else msg = "Please enter deadline YYYY-MM-DD or YY-MM-DD \n You can select delimiter among {. , / - _}";

                    CustomMessage customMessage = new CustomMessage(message, msg,7);
                    runner.send("chat","chat.short.room."+message.getRecvConvoId(),customMessage);
                }

                }
                else if(type==Command.DEADLINE && cmd.length==1) {
                    String msg = "Please enter deadline YYYY-MM-DD or YY-MM-DD \n You can select delimiter among {. , / - _}";

                    CustomMessage customMessage = new CustomMessage(message, msg,10);
                    runner.send(exchange,routingKey+message.getRecvConvoId(),customMessage);
                }


                //REVISION

        }

    }

}