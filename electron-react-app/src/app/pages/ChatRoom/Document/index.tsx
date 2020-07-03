
import React, { Component } from 'react';
import * as etype from '../../../../libs/enum-type';
// import En

class DocumentChatRoom extends Component {

    constructor(props:any) {
        super(props);
        console.log(etype.RoomType.BOT)
    }

    render() {
        return (
            <div>
                <h3>문서ㄴ리스트</h3>
            </div>
        )
    }

}


export default DocumentChatRoom;