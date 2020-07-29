package com.fasoo.wrapsody.commandserver.controller.keyword;


public class Bookmark {
    public enum Function{
        START("start"),
        STOP("stop");

        final private String name;
        private Function(String name){this.name = name;}
        public String getName (){return name;}
    }

    public Bookmark(String[] cmd){
        if(cmd.length!=1){
            String c = cmd[1].toLowerCase();
            if(c.compareTo(Function.START.getName())==0){
                System.out.println("bookmark start");
            }
            else if(c.compareTo(Function.STOP.getName())==0){
                System.out.println("bookmark stop");
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
