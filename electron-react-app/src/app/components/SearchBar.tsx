import * as React from 'react';
import {SearchType} from "src/libs/enum-type"

function SearchBar(props: any) {
    const searchType = props.type;
    if(searchType === SearchType.ROOM){
        return (
            <div className = "wrapmsgr_chatroom_search_div">
                <input type = "text" placeholder = "Enter a document or group room."></input>
                <i className = "icon_search"></i>
            </div>
        );
    }
    return (
        <div className = "search_div">
            <input type = "text" placeholder = "Enter a user name or ID."></input>
            <i className = "icon_search"></i>
        </div>
    );
}

export default SearchBar;