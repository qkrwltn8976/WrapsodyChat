import { time } from "console";
import { Message } from 'src/models/Message';

export function getTime(timestamp: number) {
    // let unix_timestamp = 1549312452
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(timestamp);
    // Hours part from the timestamp
    let hours: number = date.getHours();
    let cov_hours: string;

    if (hours >= 12) {
        if (hours > 12) {
            hours -= 12;
        }
        cov_hours = "오후 " + hours;
    } else {
        cov_hours = "오전 " + hours;
    }
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    // var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    let formattedTime = cov_hours + ':' + minutes.substr(-2);

    // console.log(formattedTime);
    return formattedTime;
}

export function getDate(timestamp: number) {
    let date = new Date(timestamp);
    let week = ['일', '월', '화', '수', '목', '금', '토'];

    let month = date.getMonth() + 1 + '월';
    let day = date.getDate() + '일';
    let weekday = week[date.getDay()] + '요일';

    let formattedDate = month + ' ' + day + ' (' + weekday + ')';
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
