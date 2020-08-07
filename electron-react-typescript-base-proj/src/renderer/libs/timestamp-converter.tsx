import { time } from "console";
import language from "@/renderer/language/language.json"
const Store = require('electron-store')
const store = new Store()

export function getTime(timestamp: number) {
    // let unix_timestamp = 1549312452
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(timestamp);
    // Hours part from the timestamp
    let hours: number = date.getHours();
    let cov_hours: string;
    var lang = store.get("language")
    var am = true

    if (hours >= 12) {
        if (hours > 12) {
            hours -= 12;
        }
        am = false;
    }
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    // var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    let formattedTime: string
    if(lang === "ko-KR" && am)
        formattedTime = language.ko.am + hours + ':' + minutes.substr(-2);
    if(lang === "ko-KR" && !am)
        formattedTime = language.ko.pm + hours + ':' + minutes.substr(-2);

    if(lang === "en-US" && am)
        formattedTime = hours + ':' + minutes.substr(-2) + language.en.am;
    if(lang === "en-US" && !am)
        formattedTime = hours + ':' + minutes.substr(-2) + language.en.pm;
    // console.log(formattedTime);
    return formattedTime;
}

export function getDate(timestamp: number) {
    var lang = store.get("language")
    let date = new Date(timestamp);
    let week, month, day, weekday, formattedDate
    if(lang === "ko-KR"){
        week = language.ko.week
        month = date.getMonth() + 1 + '월';
        day = date.getDate() + '일';
        weekday = week[date.getDay()] + '요일';
    }
    if(lang === "en-US"){
        week = language.en.week
        month = date.getMonth() + 1 + " /"
        day = date.getDate()
        weekday = week[date.getDay()]
    }


    formattedDate = month + ' ' + day + ' (' + weekday + ')';
    return formattedDate;
}

export function getConvoDate(timestamp: number) {
    if (timestamp) {
        let date = new Date(timestamp);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let formattedDate = year + '-' + month + '-' + day;

        if (date.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) {
            return getTime(timestamp);
        } else {
            return formattedDate;
        }
    }
}

export function dDayCounter(datestring: string) {
    let date = new Date(datestring);
    let now = new Date();
    let distance = date.getTime()-now.getTime();
    let d = Math.floor(distance / (1000 * 60 * 60 * 24)) + 1;//일

    let h = Math.floor((distance / (1000*60*60)) % 24);//시간
    let m = Math.floor((distance / (1000*60)) % 60);//분
    let s = Math.floor((distance / 1000) % 60);//초

    if (distance <= 0) {//당일넘어섰을때, dday로 변경
        // return h + ":" + m + ":" + s;
        return "D-day"
    } else {
        return "D-" + d;
    }
}