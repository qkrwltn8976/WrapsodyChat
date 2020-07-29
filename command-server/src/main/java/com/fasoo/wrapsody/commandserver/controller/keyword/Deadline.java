package com.fasoo.wrapsody.commandserver.controller.keyword;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Deadline {
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Date date;
    long timestamp;

    public Deadline(String[] cmd) throws ParseException {
        String delimiter = "\\.\\,\\-\\_\\:\\;";
        String date [] = cmd[1].split(delimiter);
        if(date.length == 3){
            String d = date[0]+"-"+date[1]+"-"+date[2];
            this.date = format.parse(d + " 11:59:59");
            timestamp = this.date.getTime();
            System.out.println(this.date);
        }
        else {
            System.out.println(date.length);
            System.out.println("print enter deadline YYYY-MM-DD or YY-MM-DD");
            System.out.println("You can select delimiter among {. , / - _}");
        }
    }
}