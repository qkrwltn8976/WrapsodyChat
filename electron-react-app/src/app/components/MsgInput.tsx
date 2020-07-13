import * as React from 'react';
import { createClient, publishChat, subscribe } from 'src/libs/stomp';
import { Client } from '@stomp/stompjs';
import { GetMsgs } from 'src/app/components/MsgList';
interface MsgInputState {
    message: string;
}

interface MsgInputProps {
    uuid: string;
    convoId: string;
}

class MsgInput extends React.Component<MsgInputProps, MsgInputState> {
    uuid: string;
    convoId: string;
    client: Client;

    handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            message: e.target.value
        })
    }

    handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        this.setState({
            message: ''
        });
    }

    handleKeyPressed = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        console.log(e.keyCode === 13)
        if (e.keyCode === 13) {
            this.sendMsg();
            this.setState({
                message: ''
            });
        }
    }

    sendMsg = () => {
        console.log('chat')
        let msg = {
            sendUserId: 'admin',
            recvConvoId: this.convoId,
            body: this.state.message
        }

        publishChat(this.client, 'chat.short.convo', this.uuid, msg);

        // GetMsgs.addMsgs(msg);
    }

    constructor(props: MsgInputProps) {
        super(props);
        this.state = {
            message: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.uuid = props.uuid;
        this.convoId = props.convoId;
        this.client = createClient("admin", "1111");
        this.client.onConnect = () => {
            console.log("connected to Stomp");

            subscribe(this.client, 'admin', this.convoId, (payload: any) => {

                console.log(payload)
            });

        }
    }

// interface MsgState {
//     message: string;
// }

// interface MsgProps {
//     sendMessage: any;
// }

// class MsgInput extends React.Component<{}, MsgState> {
//     handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
//         this.setState({
//             message: e.target.value
//         })
//     }

//     handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
//         e.preventDefault()
//         // sendMessage(this.state.message)
        
//         this.setState({
//           message: ''
//         })
//     }

//     constructor() {
//         super({});
//         this.state = {
//             message: ''
//         }
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this)
//     }
    render() {
        return (
            <div className="wrapmsgr_footer">
                <form onSubmit={this.handleSubmit} ng-submit="chat()" className="ng-pristine ng-valid ng-valid-maxlength">
                    <span className="wrapmsgr_full_width_text_span">
                        <textarea id="wrapmsgr_message_input" className="wrapmsgr_full_width_text ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength" placeholder="메시지를 입력하십시오." ng-model="input.message" ng-keydown="submitOnEnter($event)" ng-disabled="!loggedIn"
                        onChange={this.handleChange} value={this.state.message}></textarea>
                    </span>
                    <button type="submit" className="wrapmsgr_submit" value="보내기" title="보내기" ng-disabled="!loggedIn">
                        <i className="icon_paper_plane"></i>
                    </button>
                </form>

            </div>
        );
    }
}

export default MsgInput;