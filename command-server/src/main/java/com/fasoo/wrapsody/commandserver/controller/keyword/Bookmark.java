package com.fasoo.wrapsody.commandserver.controller.keyword;

public enum Bookmark {
        START("start"),
        STOP("stop"),
        NAME("name");

        private String key;
    Bookmark(String key) {this.key = key;}

    public String getKey (){return key;}
    }