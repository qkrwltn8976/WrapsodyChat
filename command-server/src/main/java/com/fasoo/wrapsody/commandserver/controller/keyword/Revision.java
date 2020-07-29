package com.fasoo.wrapsody.commandserver.controller.keyword;


public class Revision {
    public enum Function {
        REQUEST("request");

        final private String name;

        private Function(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }
    }

    public Revision(String[] cmd) {
        if (cmd.length != 1) {
            if (cmd[1].toLowerCase().compareTo(Function.REQUEST.getName()) == 0) {
                System.out.println("revision request");
            } else
                System.out.println("you can enter request");
        } else
            System.out.println("you can enter request");

    }
}