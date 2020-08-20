import * as React from 'react';
import { BotIntent } from '@/renderer/models/BotIntent';
import { publishApi, publishChat, subscribe, client } from '@/renderer/libs/stomp';
import { v4 } from 'uuid';
import { BotCommand } from '@/renderer/models/BotCommand';
import { Message } from '@/renderer/models/Message';
import store from '@/store';

const Store = require('electron-store')
const electronStore = new Store()

interface IntentProps {
    intent: BotIntent,
    convoId: string,
    sendMsg: any,
    getCommands: any
}

interface IntentState {
    active: boolean,
    uuid: string,
    commands: BotCommand[]
}

class Intent extends React.Component<IntentProps, IntentState>{
    sendBotCommand = (command: string) => (e: any) => {
        let msg : Message = {
            messageId: 0,
            sendUserId: electronStore.get("username"),
            recvConvoId: this.props.convoId,
            body: command,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            messageType: 1
        }

        this.props.sendMsg(msg, 'chat.short.command.convo');
    }

    getCommand = (command: BotCommand) => {
        return (
            <li ng-repeat="command in intentGroup.commands" onClick={this.sendBotCommand(command.command)} ng-mouseenter="active = true" ng-mouseleave="active = false" ng-className="{active: active}" className="ng-binding ng-scope">{command.command}</li>
        )
    }

    toggleIntentGroup = (e: BotIntent) => {
        if (this.state.active) {
            this.setState({ active: false })
        } else {
            this.setState({ active: true });
            this.props.getCommands(e); 
        }
    }


    constructor(props: IntentProps) {
        super(props);

        this.state = {
            active: false,
            uuid: v4(),
            commands: []
        }

    }


    componentDidMount() {
        // subscribe(client, electronStore.get("username"), this.state.uuid);
        store.subscribe(function (this:any) {
            this.setState({
                commands: store.getState().commands
            })
        }.bind(this));
    }


    render() {
        return (<li className="ng-scope">
            <div className="ng-binding"  onClick={(e) => this.toggleIntentGroup(this.props.intent)}>
                {this.props.intent.name}
                <i className={this.state.active ? 'icon_triangle wrapmsgr_expand' : 'icon_triangle wrapmsgr_collapse'}></i>
            </div>
            <ul className={this.state.active ? 'question-sub-list ' : 'question-sub-list hidden'}>
                {
                this.state.commands.map((command: BotCommand) => {
                    return (this.getCommand(command))
                })
                }
            </ul></li>)
    }
}

export default Intent;