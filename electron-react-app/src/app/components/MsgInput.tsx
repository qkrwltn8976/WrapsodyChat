import * as React from 'react';
import { createClient, publishChat, subscribe } from 'src/libs/stomp';
import { Client } from '@stomp/stompjs';
import { Message } from 'src/models/Message';

interface MsgInputState {
    message: string;
}

interface MsgInputProps {
    uuid: string;
    convoId: string;
    sendMsg: any;
}

class MsgInput extends React.Component<MsgInputProps, MsgInputState> {
    uuid: string;
    convoId: string;

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
        if (e.keyCode === 13) {
            this.sendMsg();
            this.setState({
                message: ''
            });
            e.preventDefault();
        }
    }

    sendMsg = () => {
        console.log(this.state.message)
        let msg : Message = {
            id:'',
            sendUserId: 'admin',
            recvConvoId: this.convoId,
            body: this.state.message,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            messageType: 0
        }
        this.props.sendMsg(msg);
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
    }

    render() {
        return (
            <div className="wrapmsgr_footer">
                <form onSubmit={this.handleSubmit} ng-submit="chat()" className="ng-pristine ng-valid ng-valid-maxlength">
                    <span className="wrapmsgr_full_width_text_span">
                        <textarea id="wrapmsgr_message_input" className="wrapmsgr_full_width_text ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength" placeholder="메시지를 입력하십시오." ng-model="input.message" onKeyDown={this.handleKeyPressed} ng-disabled="!loggedIn"
                        onChange={this.handleChange} value={this.state.message}></textarea>
                    </span>
                    <button type="submit" className="wrapmsgr_submit" value="보내기" title="보내기" ng-disabled="!loggedIn" onClick={this.sendMsg}>
                        <i className="icon_paper_plane"></i>
                    </button>
                </form>

            </div>
        );
    }
}

export default MsgInput;