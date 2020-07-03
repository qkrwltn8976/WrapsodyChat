import * as React from 'react';
import {SearchType} from "../../libs/enum-type";

function SearchBar(props: any) {
    if(props.enum === SearchType.ROOM){
        return (
            <div className = "wrapmsgr_chatroom_search_div">
                <input type = "text" placeholder = "Enter a document or group room."></input>
                <i className = "icon_search"></i>
            </div>
        );
    }
    if(props.enum === SearchType.USER){
        return (
            <div>
                <div className = "search_div">
                    <input type = "text" placeholder = "Enter a user name or ID."></input>
                    <i className = "icon_search"></i>
                </div>
            </div>
        );
    }
    return (
        <div>
            <div className = "search_div">
                <input type = "text" placeholder = "Enter..."></input>
                <i className = "icon_search"></i>
            </div>
        </div>
    );
    
}

export default SearchBar;