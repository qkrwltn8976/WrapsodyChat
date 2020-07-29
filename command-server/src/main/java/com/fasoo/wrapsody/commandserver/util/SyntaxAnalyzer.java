package com.fasoo.wrapsody.commandserver.util;

public class SyntaxAnalyzer {
    String message;
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

    public SyntaxAnalyzer(String message){
        //메세지가 '@' 으로 시작하면 구문분석한다
        if(message.indexOf(0)=='@') {
            this.message = message;

            //기호 '@' 제거 후 공백문자로 split 하여 배열 cmd에 저장
            message = message.substring(1);
            cmd = message.split(" ");

            //첫번째 단어가 Command 열거형에 있는 name 중 하나와 일치하면 type에 명령어를 저장하고 iscommand를 참으로 반환한다
            for (Command command : Command.values()) {
                if (cmd[0].compareTo(command.getName()) == 0) {
                    type = command;
                    iscommand = true;
                    break;
                }
            }
        }
    }

    public boolean isCommand(){
        return iscommand;
    }

    public Command getType(){
        return type;
    }

}
