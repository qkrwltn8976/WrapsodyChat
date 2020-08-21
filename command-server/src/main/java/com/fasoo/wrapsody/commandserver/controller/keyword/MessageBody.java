package com.fasoo.wrapsody.commandserver.controller.keyword;

public class MessageBody {
    private String locale;

    private static String bookmark_start;
    private static String bookmark_end;
    private static String bookmark_name;
    private static String bookmark_already_start;
    private static String bookmark_already_end;
    private static String bookmark_wrong;

    private static String deadline;
    private static String deadline_wrong;

    public MessageBody(String locale){
        this.locale = locale;
    }

    public String getBookmark_start(){
        if(locale.compareTo("ko_KR")==0){
            bookmark_start = "북마크를 시작합니다";
        }
        else if(locale.compareTo("us_EN")==0){
            bookmark_start = "Bookmark start";
        }
        return bookmark_start;
    }

    public String getBookmark_end(){
        if(locale.compareTo("ko_KR")==0){
            bookmark_end = "북마크를 종료합니다";
        }
        else if(locale.compareTo("us_EN")==0){
            bookmark_end = "Bookmark end";
        }
        return bookmark_end;
    }

    public String getBookmark_name(String name){
        if(locale.compareTo("ko_KR")==0){
            bookmark_name = "북마크 이름을 "+ name + "(으)로 설정했습니다";
        }
        else if(locale.compareTo("us_EN")==0){
            bookmark_name = "Bookmark name is "+name;
        }
        return bookmark_name;
    }

    public String getBookmark_already_start(){
        if(locale.compareTo("ko_KR")==0){
            bookmark_already_start = "이미 녹화중입니다";
        }
        else if(locale.compareTo("us_EN")==0){
            bookmark_already_start = "The recording has already begun.";
        }
        return bookmark_already_start;
    }

    public String getBookmark_already_end(){
        if(locale.compareTo("ko_KR")==0){
            bookmark_already_end = "녹화중이 아닙니다";
        }
        else if(locale.compareTo("us_EN")==0){
            bookmark_already_end = "No bookmarks on record";
        }
        return bookmark_already_end;
    }

    public String getBookmark_wrong(){
        if(locale.compareTo("ko_KR")==0){
            bookmark_wrong = "커맨드 형식: '@BOOKMARK START [NAME] / @BOOKMARK STOP [NAME]'";
        }
        else if(locale.compareTo("us_EN")==0){
            bookmark_wrong = "Please enter '@BOOKMARK START [NAME] / @BOOKMARK STOP [NAME]'";
        }
        return bookmark_wrong;
    }

    public String getDeadline(String date){
        if(locale.compareTo("ko_KR")==0){
            deadline = "마감기한이 "+date+" (으)로 설정되었습니다";
        }
        else if(locale.compareTo("us_EN")==0){
            deadline = "deadline is "+date;
        }
        return deadline;
    }

    public String getDeadline_wrong(){
        if(locale.compareTo("ko_KR")==0){
            deadline_wrong = "커맨드 형식: YYYY-MM-DD or YY-MM-DD\n 구분자: . , / - _";
        }
        else if(locale.compareTo("us_EN")==0){
            deadline_wrong = "Please enter deadline YYYY-MM-DD or YY-MM-DD \n You can select delimiter among {. , / - _}";
        }
        return deadline_wrong;
    }
}
