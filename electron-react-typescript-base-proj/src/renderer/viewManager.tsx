import React, {Component, Fragment} from 'react'
import {
    BrowserRouter,
    Route 
} from 'react-router-dom'
import {ChatList, DocumentChatRoom} from './app/pages'

interface props{
    name:string
}

class ViewManager extends Component{

    // constructor(props: props) {
    //     super(props);
    // }

    static Views(){
        return {
            chatList: <ChatList/>,
            chatRoom: <DocumentChatRoom convoId = "960f622c0c6e448d8e8f5516b95c55ed"/>
            }
    }

    static View(props:any){
        let name = props.name;
        let view = ViewManager.Views()[name];
        console.log(name)
        
        if(view == null) 
            view = ViewManager.Views()['chatList']
            console.log(window.location.href)
        return view;
    }

    render(){
        return(
            <BrowserRouter>
                <div>
                    <Route path='/' component = {ViewManager.View}/>
                </div>
            </BrowserRouter>
        )
    }
    
    
}
export default ViewManager