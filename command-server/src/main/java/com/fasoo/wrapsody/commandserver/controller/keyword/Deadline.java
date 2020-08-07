package com.fasoo.wrapsody.commandserver.controller.keyword;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.StringTokenizer;

public class Deadline {


    public String Deadline(String[] cmd){
        //서버에 데드라인 정보 보낼때 사용
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date dt;
        long timestamp;

        List <String> date = new ArrayList<String>();
        sliceDate(cmd[1], date);
        if(date.size() == 3){
            //연도를 두자리로 적었으면 앞에 20을 붙여준다.
            if(Integer.parseInt(date.get(0))<100){
                date.set(0,"20"+date.get(0));
            }
            String d = date.get(0)+"-"+date.get(1)+"-"+date.get(2);

            return(d);
        }
        else {
            return(null);
        }
    }

    public void sliceDate(String cmd, List date){
        StringTokenizer st = new StringTokenizer(cmd, ".|,|-|_|/");
        while(st.hasMoreTokens()){
            date.add(st.nextToken());
        }
    }
}