import * as React from 'react';

function SearchBar(props: any) {
    const searchType = props.type;
    if(searchType === "ChatRoomList"){
        return (
            <div className = "wrapmsgr_chatroom_search_div">
                <input type = "text" placeholder = "Enter a document or group room."></input>
                <i className = "icon_search"></i>
            </div>
        );
    }
    return (
        <div>
            <div className = "search_div">
                <input type = "text" placeholder = "Enter a user name or ID."></input>
                <i className = "icon_search"></i>
            </div>
        </div>
    );
}

export default SearchBar;