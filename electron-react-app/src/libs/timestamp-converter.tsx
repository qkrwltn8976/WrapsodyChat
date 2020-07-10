import { time } from "console";

export function getTime(timestamp: number) {
    // let unix_timestamp = 1549312452
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(timestamp);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    // var seconds = "0" + date.getSeconds();
    
    // Will display time in 10:30:23 format
    let formattedTime = hours + ':' + minutes.substr(-2);
    
    // console.log(formattedTime);
    return formattedTime;
}

export function getDate(timestamp: number) {
    let date = new Date(timestamp);
    let week = ['일', '월', '화', '수', '목', '금', '토'];

    let month = date.getMonth()+1 + '월';
    let day = date.getDate() + '일';
    let weekday = week[date.getDay()] + '요일';

    let formattedDate = month +' '+ day + ' (' + weekday + ')';
    return formattedDate;
}

export function getConvoDate(timestamp:number) {
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();

    let formattedDate = year + '-' + month + '-' + day;
    return formattedDate 
}