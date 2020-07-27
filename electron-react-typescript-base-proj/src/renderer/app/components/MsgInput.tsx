import * as React from 'react';
import { Message } from '../../models/Message';
import language from "@/renderer/language/language.json"
const Store = require('electron-store')
const store = new Store()

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
            messageId: 0,
            sendUserId: store.get("username"),
            recvConvoId: this.convoId,
            body: this.state.message,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            messageType: 0,
            attachments: []
        }
        this.props.sendMsg(msg, 'chat.short.convo');
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
        var inputText:string
        var lang = store.get("language")
        if(lang === "ko-KR")
            inputText = language.ko.input_message
        if(lang === "en-US")
            inputText = language.en.input_message
        return (
            <div className="wrapmsgr_footer">
                <form onSubmit={this.handleSubmit} ng-submit="chat()" className="ng-pristine ng-valid ng-valid-maxlength">
                    <span className="wrapmsgr_full_width_text_span">
                        <textarea id="wrapmsgr_message_input" className="wrapmsgr_full_width_text ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength" placeholder= {inputText} ng-model="input.message" onKeyDown={this.handleKeyPressed} ng-disabled="!loggedIn"
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