import * as React from 'react';
import { publishApi, client, subscribe } from '@/renderer/libs/stomp';
import { v4 } from "uuid"
import { TreeMember } from '../../models/TreeMember';
import { Member } from '../../models/Member';
import store from '../../../store';

const Store = require('electron-store')
const electronStore = new Store()

const remote = require('electron').remote


interface Props{
    convoId : string;
}
interface State {
    uuid: string;
    tempMembers: TreeMember[];
    members: Member[];
}
class Footer extends React.Component<Props, State>{
    constructor(props: Props, state: State){
        super(props, state);
        this.state = ({
            uuid: v4(),
            tempMembers: [],
            members : [],
        });
        store.subscribe(function(this: Footer){
            this.setState({ tempMembers : store.getState().tempMembers })
        }.bind(this));
        this.closeWindow = this.closeWindow.bind(this);
        this.invite = this.invite.bind(this);
        this.closeWindowAndUpdate = this.closeWindowAndUpdate.bind(this);
    }

    // addMembers = () => {
    //     console.log("000000000000000000000000000000000000000000000000")
    //     subscribe(client, electronStore.get("username"), this.state.uuid, (obj: any) => {
    //         console.log("111111111111111111111111111111111111111111111111")
    //         console.log(obj)
    //         let payload = obj.payload;
    //         console.log(payload)
    //         if (payload) {
    //             if(payload.successUsers){
    //                 console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~payload~~~~~~~~~~~~~~~~~~~~~~~~")
    //                 console.log(payload.successUsers)
    //                 let newMembers : TreeMember[];
    //                 newMembers = [];
    //                 payload.successUsers.map(user=>{
    //                     let idx = this.state.tempMembers.findIndex( obj => obj.userId === user)
    //                     newMembers = newMembers.concat([{"userId" : user, "userName": this.state.tempMembers[idx].userName, password: null}])
    //                 })
    //                 store.dispatch({type: 'addMembers', members : newMembers})
    //             }
    //         }
    //     });
    // }

    closeWindow = () => {
        var win = remote.getCurrentWindow()
        win.close()
    }
    closeWindowAndUpdate = () => {
        var currentWindow = remote.getCurrentWindow()
        var parentWindow = currentWindow.getParentWindow()
        parentWindow.reload()
        currentWindow.close()
    }

    invite = (e) =>{
        e.preventDefault();
        let userIds = [];
        this.state.tempMembers.map(member=>{
            userIds = userIds.concat([member.userId])
        })
        publishApi(client, "api.room.invite", electronStore.get("username"), this.state.uuid, {convoId: this.props.convoId, userIds:userIds})
        this.closeWindowAndUpdate()
    }

    render(){
        return (
            <div className="wrapmsgr_popup_footer">
                <input type="submit" className="wrapmsgr_button primary wrapmsgr_right" value="OK" onClick = {this.invite} ng-disabled="!loggedIn" />
                <input type="button" className="wrapmsgr_button wrapmsgr_right" value="Cancel" ng-disabled="!loggedIn" ng-click="hidePopup($event)" onClick = {this.closeWindow} />
            </div>
        );
    }
}

export default Footer;

