package com.fasoo.wrapsody.commandserver.service;

import com.fasoo.wrapsody.commandserver.controller.keyword.Bookmark;
import com.fasoo.wrapsody.commandserver.controller.keyword.Command;
import com.fasoo.wrapsody.commandserver.model.BookmarkCreateMessage;
import com.fasoo.wrapsody.commandserver.model.CustomMessage;
import com.fasoo.wrapsody.commandserver.model.PropertyGetMessage;
import com.fasoo.wrapsody.commandserver.model.SystemMessage;
import org.json.simple.parser.ParseException;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class CustomMessageListener {
    @Autowired
    private RabbitTemplate rabbitTemplate;



    String uuid = UUID.randomUUID().toString();
    String body, exchange, routingKey;
    String []cmd;
    Command type;
    boolean iscommand = false;

    @RabbitListener(queues = "spring-boot")
    public void receiveMessage(final CustomMessage message) throws ParseException {
        System.out.println(message.getBody());
        body = message.getBody();


        if(body.length() !=0 &&body.charAt(0)=='@'){
            body = body.substring(1);
            cmd = body.split(" ");
            Runner runner = new Runner(rabbitTemplate);
            exchange = "request";
            routingKey = "chat.short.convo.";

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
                    if(c.compareTo(Bookmark.START.getKey())==0){
                        PropertyGetMessage tm = new PropertyGetMessage("wrapsody", "ko-KR", message.getRecvConvoId());
                        System.out.print(tm);
//                        runner.send("request", "api.conversation.property.get", tm, message.getRecvConvoId());
                        BookmarkCreateMessage bcm = new BookmarkCreateMessage(message.getRecvConvoId(), "null", message.getCreatedAt(), message.getUpdatedAt());
                        runner.send("request", "api.conversation.bookmark.create", bcm, message.getRecvConvoId());
                    }
                    else if(c.compareTo(Bookmark.STOP.getKey())==0){
                        SystemMessage sm = new SystemMessage(message.getRecvConvoId(),"북마크를 끝냅니다", 6);
                        runner.send(exchange,routingKey+message.getRecvConvoId(),sm);
                    }
                    else if(c.compareTo(Bookmark.NAME.getKey())==0 && cmd.length>=3){
                            String cmdName="";
                            for(int i = 2;i <cmd.length;i++)
                                cmdName+= cmd[i];
                            SystemMessage sm = new SystemMessage(message.getRecvConvoId(), "북마크 이름을 "+cmdName+"(으)로 설정했습니다",7);
                            runner.send(exchange,routingKey+message.getRecvConvoId(),sm);

                    }
                    else{
                        SystemMessage sm = new SystemMessage(message.getRecvConvoId(), "커맨드 형식: @BOOKMARK START / @BOOKMARK STOP / @BOOKMARK NAME name",100);
                        runner.send(exchange,routingKey+message.getRecvConvoId(),sm);
                    }
                }

                if(type==Command.BOOKMARK && cmd.length==1){
                    SystemMessage sm = new SystemMessage(message.getRecvConvoId(), "커맨드 형식: @BOOKMARK START / @BOOKMARK STOP",100);
                    runner.send(exchange,routingKey+message.getRecvConvoId(),sm);
                }


                //DEADLINE
            if(type==Command.DEADLINE && cmd.length!=1) {
                int cmdType=10;
                if(cmd.length!= 1){
                    String msg="";

                    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    Date dt;
                    long timestamp;

                    List<String> date = new ArrayList<String>();

                    StringTokenizer st = new StringTokenizer(cmd[1], ".|,|-|_|/| ");
                    while(st.hasMoreTokens()){
                        //숫자만 추출하여 저장
                        date.add(st.nextToken().replaceAll("[^0-9]",""));
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
                    else {
                        msg = "Please enter deadline YYYY-MM-DD or YY-MM-DD \n You can select delimiter among {. , / - _}";
                        cmdType=100;
                    }

                    SystemMessage sm = new SystemMessage(message.getRecvConvoId(), msg,cmdType);
                    runner.send(exchange,routingKey+message.getRecvConvoId(), sm);
                }

                }
                else if(type==Command.DEADLINE && cmd.length==1) {
                    String msg = "Please enter deadline YYYY-MM-DD or YY-MM-DD \n You can select delimiter among {. , / - _}";
                    SystemMessage sm = new SystemMessage(message.getRecvConvoId(), msg,100);
                    runner.send(exchange,routingKey+message.getRecvConvoId(),sm);
                }


                //REVISION
                if(type == Command.REVISION){
                    System.out.println("test");
                    PropertyGetMessage tm = new PropertyGetMessage("wrapsody", "ko-KR", message.getRecvConvoId());
                    System.out.print(tm);
                    runner.send("request", "api.conversation.property.get", tm, uuid);

                }
        }

    }

}