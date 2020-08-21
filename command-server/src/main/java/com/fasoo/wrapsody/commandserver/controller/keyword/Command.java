package com.fasoo.wrapsody.commandserver.controller.keyword;

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