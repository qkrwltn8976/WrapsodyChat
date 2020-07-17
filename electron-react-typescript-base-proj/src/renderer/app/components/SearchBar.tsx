import * as React from 'react';
import {SearchType} from "@/renderer/libs/enum-type"
import { useState } from 'react';

function SearchBar(props: any) {
    const searchType = props.type;  
    var search = props.search
    var setSearch = props.setSearch
    if(searchType === SearchType.ROOM){
        return (
            <div className = "wrapmsgr_chatroom_search_div">
                <input type = "text" placeholder = "Enter a document or group room." value = {search} 
                onChange={({target:{value}}) => setSearch(value)}></input>
                <i className = "icon_search"></i>
            </div>
        );
    }
    return (
        <div className = "search_div">
            <input type = "text" placeholder = "Enter a user name or ID."value = {search} 
            onChange={({target:{value}}) => setSearch(value)}></input>
            <i className = "icon_search"></i>
        </div>
    );
}

export default SearchBar;