package com.fasoo.wrapsody.commandserver.service;

import com.fasoo.wrapsody.commandserver.controller.keyword.Bookmark;
import com.fasoo.wrapsody.commandserver.controller.keyword.Command;
import com.fasoo.wrapsody.commandserver.model.BookmarkStartMessage;
import com.fasoo.wrapsody.commandserver.model.CustomMessage;
import com.fasoo.wrapsody.commandserver.model.SystemMessage;
import org.json.simple.parser.ParseException;
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

    @RabbitListener(queues = "spring-boot")
    public void receiveMessage(final CustomMessage message) throws ParseException {
        String body, exchange, routingKey;
        String []cmd;
        Command type = null;
        boolean iscommand = false;
        boolean isWrong = false;

        System.out.println(message.getBody());
        body = message.getBody();

        //문자 '@'로 시작하면 공백을 기준으로 나누어 배열에 저장.
        if(body.length() !=0 &&body.charAt(0)=='@'){
            body = body.substring(1);
            cmd = body.split(" ");
            exchange = "request";
            routingKey = "chat.short.convo.";
            Runner runner = new Runner(rabbitTemplate);

            //첫번째 단어가 Command 열거형에 있는 name 중 하나와 일치하면 type에 명령어를 저장하고 iscommand를 참으로 반환한다
            for (Command command : Command.values()) {
                if (cmd[0].compareTo(command.getName()) == 0) {
                    type = command;
                    iscommand = true;
                    break;
                }
            }

            if(iscommand){

                //BOOKMARK
                if(type==Command.BOOKMARK && cmd.length==1){  //@bookmark 만 입력했을때
                    isWrong = true;
                }

                else if(type==Command.BOOKMARK && cmd.length!=1){  //@bookmark + alpha
                    String c = cmd[1].toLowerCase();    //@bookmark 뒤에 처음 오는 단어

                    if(c.compareTo(Bookmark.START.getKey())==0){

                        //이름이 있다면 지정
                        String cmdName="";
                        for(int i = 2;i <cmd.length;i++){
                            cmdName+= cmd[i];
                        }

                        BookmarkStartMessage bcm = new BookmarkStartMessage(message.getRecvConvoId(), cmdName);
                        int result = runner.send("request", "api.conversation.bookmark.start", bcm, message.getRecvConvoId());

                        System.out.println(result);

                        //SUCCESS
                        if(result ==0){
                            SystemMessage sm = new SystemMessage(message.getRecvConvoId(),"북마크를 시작합니다", 5);
                            runner.send(exchange,routingKey+message.getRecvConvoId(),sm);
                            if(cmdName!=""){
                                SystemMessage sm1 = new SystemMessage(message.getRecvConvoId(), "북마크 이름을 "+cmdName+"(으)로 설정했습니다",7);
                                runner.send(exchange,routingKey+message.getRecvConvoId(),sm1);
                            }
                        }
                        //ALREADY_EXISTS
                        else if(result ==3){
                            SystemMessage sm = new SystemMessage(message.getRecvConvoId(),"이미 녹화중입니다", 100);
                            runner.send(exchange,routingKey+message.getRecvConvoId(),sm);
                        }
                    }

                    else if(c.compareTo(Bookmark.STOP.getKey())==0){
                        //이름이 있다면 지정
                        String cmdName="";
                        for(int i = 2;i <cmd.length;i++){
                            cmdName+= cmd[i];
                        }

                        BookmarkStartMessage bcm = new BookmarkStartMessage(message.getRecvConvoId(), cmdName);
                        int result = runner.send("request", "api.conversation.bookmark.end", bcm, message.getRecvConvoId());

                        //SUCCESS
                        if(result ==0){
                            SystemMessage sm = new SystemMessage(message.getRecvConvoId(),"북마크를 끝냅니다", 6);
                            runner.send(exchange,routingKey+message.getRecvConvoId(),sm);
                            if(cmdName!=""){
                                SystemMessage sm1 = new SystemMessage(message.getRecvConvoId(), "북마크 이름을 "+cmdName+"(으)로 설정했습니다",7);
                                runner.send(exchange,routingKey+message.getRecvConvoId(),sm1);
                            }
                        }
                        //ALREADY_EXISTS
                        else if(result ==3){
                            SystemMessage sm = new SystemMessage(message.getRecvConvoId(),"녹화중이 아닙니다", 100);
                            runner.send(exchange,routingKey+message.getRecvConvoId(),sm);
                        }
                    }
                    //@bookmark + 잘못된 입력일때
                    else{
                        isWrong = true;
                    }
                }

                //잘못된 입력 처리
                if(type == Command.BOOKMARK && isWrong){
                    SystemMessage sm = new SystemMessage(message.getRecvConvoId(), "커맨드 형식: @BOOKMARK START [NAME] / @BOOKMARK STOP [NAME]",100);
                    runner.send(exchange,routingKey+message.getRecvConvoId(),sm);
                }


                //DEADLINE
                if(type==Command.DEADLINE && cmd.length==1) {   //@deadline 만 입력했을 때
                    isWrong = true;
                }

                else if(type==Command.DEADLINE && cmd.length!=1) {  //@daedline + alpha
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
                            msg = date.get(0)+"-"+date.get(1)+"-"+date.get(2);

                            SystemMessage sm = new SystemMessage(message.getRecvConvoId(), msg,cmdType);
                            runner.send(exchange,routingKey+message.getRecvConvoId(), sm);
                        }
                        else {
                            isWrong = true;
                        }
                    }

                }

                //잘못된 입력 처리
                if(type == Command.DEADLINE && isWrong){
                    String msg = "Please enter deadline YYYY-MM-DD or YY-MM-DD \n You can select delimiter among {. , / - _}";
                    SystemMessage sm = new SystemMessage(message.getRecvConvoId(), msg,100);
                    runner.send(exchange,routingKey+message.getRecvConvoId(),sm);
                }

                //REVISION
                if(type == Command.REVISION){

                }
            }


        }

    }

}