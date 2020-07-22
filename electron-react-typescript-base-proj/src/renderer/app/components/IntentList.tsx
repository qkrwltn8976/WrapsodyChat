import * as React from 'react';
import { Bot } from '@/renderer/models/Bot';
import { BotIntent } from '@/renderer/models/BotIntent';
import Intent from './Intent';

interface IntentProps {
    bot: Bot,
    botIntent: BotIntent[],
    convoId: string,
    notificationType: number
}

interface IntentState {
    bot: Bot,
    botIntent: BotIntent[],
}

interface toggleState {
    active: boolean
}
class IntentList extends React.Component<IntentProps, IntentState> {

    toggleNotification = (e: BotIntent) => {

        // this.addC
        // $scope.current.convo.notificationType = Math.abs($scope.current.convo.notificationType - 1);
        // $scope.sendApi("api.conversation.notification", {convoId: $scope.current.convo.convoId, type: $scope.current.convo.notificationType});


        // publishApi(client, 'api.conversation.notification', 'admin', this.state.uuid, { convoId: this.props.convoId, notificationType: this.props.notificationType });
    }


    constructor(props: IntentProps) {
        super(props);

    }




    render() {
        this.state = {
            bot: this.props.bot,
            botIntent: this.props.botIntent,
        }

        if (this.state.botIntent) {
            var len = this.state.botIntent.length
            return (
                <React.Fragment>
                    <div className="wrapmsgr_chatbot-info_div">
                        <p className="ng-binding">{this.state.bot.description}</p>
                        <a href=""><i ng-class="{0:'icon_bell_off', 1:'icon_bell'}[current.convo.notificationType]" ng-show="notificationEnabled" ng-click="toggleNotification()" ng-attr-title="{{ current.convo.notificationType > 0 ? '알림 해제' : '알림 수신' }}" title="알림 해제" className="icon_bell"></i></a>
                    </div>
                    <ul className="question-list">

                        {this.state.botIntent.map((intent: any) => {
                            return (
                                <Intent intent={intent} convoId={this.props.convoId}/>
                            )
                        })}

                    </ul></React.Fragment>
            );
        } else {
            return (<div></div>)
        }

    }

}

// destination:/exchange/request/api.bot.command.list
export default IntentList;