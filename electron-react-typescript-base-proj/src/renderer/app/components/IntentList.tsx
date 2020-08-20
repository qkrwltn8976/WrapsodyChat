import * as React from 'react';
import { Bot } from '@/renderer/models/Bot';
import { BotIntent } from '@/renderer/models/BotIntent';
import Intent from './Intent';

interface IntentProps {
    bot: Bot,
    botIntent: BotIntent[],
    convoId: string,
    notificationType: number,
    setNotification: any,
    sendMsg: any
}

interface IntentState {
    bot: Bot,
    botIntent: BotIntent[],
}

interface toggleState {
    active: boolean
}

class IntentList extends React.Component<IntentProps, IntentState> {

    constructor(props: IntentProps) {
        super(props);

    }

    getBellIcon(){
        if(this.props.notificationType===0){
            return "icon_bell_off";
        }
            
        else {
            return "icon_bell";
        } 
    }

    render() {
        this.state = {
            bot: this.props.bot,
            botIntent: this.props.botIntent,
        }

        if (this.state.botIntent) {
            let len = this.state.botIntent.length
            
            return (
                <React.Fragment>
                    <div className="wrapmsgr_chatbot-info_div">
                        <p className="ng-binding">{this.state.bot.description}</p>
                        <a href=""><i className={this.getBellIcon()} onClick= {(e) =>{
                            e.preventDefault();
                            this.props.setNotification(this.props.notificationType)}}></i></a>
                    </div>
                    <ul className="question-list">

                        {this.state.botIntent.map((intent: any) => {
                            return (
                                <Intent intent={intent} convoId={this.props.convoId} sendMsg={this.props.sendMsg}/>
                            )
                        })}

                    </ul></React.Fragment>
            );
        } else {
            return (<div></div>)
        }

    }

}

export default IntentList;