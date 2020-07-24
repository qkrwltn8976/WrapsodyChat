import * as React from 'react';
import {SearchType} from "@/renderer/libs/enum-type"
import language from '@/renderer/language/language.json';
const Store = require('electron-store')
const store = new Store()


function SearchBar(props: any) {
    const searchType = props.type;  
    var search = props.search
    var setSearch = props.setSearch
    let lang = store.get("language")

    var inputText:string

    if(searchType === SearchType.ROOM){
        if(lang==="ko-KR")
            inputText = language.ko.chat_list_search
        if(lang === "en-US")
            inputText = language.en.chat_list_search
        return (
            <div className = "wrapmsgr_chatroom_search_div">
                <input type = "text" placeholder = {inputText} value = {search} 
                onChange={({target:{value}}) => setSearch(value)}></input>
                <i className = "icon_search"></i>
            </div>
        );
    }

    if(lang==="ko-KR")
        inputText = language.ko.member_list_search
    if(lang === "en-US")
        inputText = language.en.member_list_search

    return (
        
        <div className = "search_div">
            <input type = "text" placeholder = {inputText} value = {search} 
            onChange={({target:{value}}) => setSearch(value)}></input>
            <i className = "icon_search"></i>
        </div>
    );
}

export default SearchBar;