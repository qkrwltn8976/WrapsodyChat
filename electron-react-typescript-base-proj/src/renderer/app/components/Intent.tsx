import * as React from 'react';
import { BotIntent } from '@/renderer/models/BotIntent';
import { client, publishApi, subscribe } from '@/renderer/libs/stomp';
import { v4 } from 'uuid';
// import StompClient from '@/renderer/libs/stompClient';

interface IntentProps {
    intent: BotIntent
}

interface IntentState {
    active: boolean,
    uuid: string
}

class Intent extends React.Component<IntentProps, IntentState>{

    getQuestion = () => {
        console.log('asdf')
        return(<ul className={"question-sub-list "}>
           <li ng-repeat="command in intentGroup.commands" ng-click="sendBotCommand(command.command)" ng-mouseenter="active = true" ng-mouseleave="active = false" ng-className="{active: active}" className="ng-binding ng-scope" >다른 사용자가 관리 중인 문서의 내용을 복사해서 내 문서로 만들고 싶어요.</li><li ng-repeat="command in intentGroup.commands" ng-click="sendBotCommand(command.command)" ng-mouseenter="active = true" ng-mouseleave="active = false" ng-className="{active: active}" className="ng-binding ng-scope">열람 권한은 어떻게 요청할 수 있나요?</li><li ng-repeat="command in intentGroup.commands" ng-click="sendBotCommand(command.command)" ng-mouseenter="active = true" ng-mouseleave="active = false" ng-className="{active: active}" className="ng-binding ng-scope">Wrapsody 문서는 어떻게 공유할 수 있나요?</li><li ng-repeat="command in intentGroup.commands" ng-click="sendBotCommand(command.command)" ng-mouseenter="active = true" ng-mouseleave="active = false" ng-className="{active: active}" className="ng-binding ng-scope">문서에 의견을 남기고 싶어요.</li><li ng-repeat="command in intentGroup.commands" ng-click="sendBotCommand(command.command)" ng-mouseenter="active = true" ng-mouseleave="active = false" ng-className="{active: active}" className="ng-binding ng-scope">누가 내 문서를 사용했는지 알고 싶어요.</li>
         </ul>)
    }

    toggleIntentGroup = (e: BotIntent) => {
        if(this.state.active) {
            this.setState({active:false})
        } else {
            this.setState({active:true});
            publishApi(client, 'api.bot.command.list', 'admin', this.state.uuid, { 'botUserId': e.botUserId, 'groupId': e.groupId });
        }
        
        console.log({botUserId: e.botUserId, groupId: e.groupId})
        
        console.log(this.state.active)
    }

    constructor(props: IntentProps){
        super(props);
        this.state = {
            active: false,
            uuid: v4()
        }
    }


    componentDidMount() {
        client.onConnect = () => {
            subscribe(client, 'admin', this.state.uuid, (obj:any) => {
                console.log(obj)
                let payload = obj.payload;
                if (payload) {
                    console.log(payload)
                }
            });

            // publishApi(client, 'api.bot.command.list', 'admin', this.state.uuid, { 'botUserId': "@BOT@wrapsody", 'groupId': 1 });
        }
    }


    render() {
        console.log(this.state.active)
        return(<li className="ng-scope" onClick={(e) => this.toggleIntentGroup(this.props.intent)}>
        <div className="ng-binding">
            {this.props.intent.name}
            <i className={this.state.active ? 'icon_triangle wrapmsgr_expand' : 'icon_triangle wrapmsgr_collapse'}></i>
        </div><ul className={this.state.active ? 'question-sub-list ' : 'question-sub-list hidden'}>
           <li ng-repeat="command in intentGroup.commands" ng-click="sendBotCommand(command.command)" ng-mouseenter="active = true" ng-mouseleave="active = false" ng-className="{active: active}" className="ng-binding ng-scope" >다른 사용자가 관리 중인 문서의 내용을 복사해서 내 문서로 만들고 싶어요.</li><li ng-repeat="command in intentGroup.commands" ng-click="sendBotCommand(command.command)" ng-mouseenter="active = true" ng-mouseleave="active = false" ng-className="{active: active}" className="ng-binding ng-scope">열람 권한은 어떻게 요청할 수 있나요?</li><li ng-repeat="command in intentGroup.commands" ng-click="sendBotCommand(command.command)" ng-mouseenter="active = true" ng-mouseleave="active = false" ng-className="{active: active}" className="ng-binding ng-scope">Wrapsody 문서는 어떻게 공유할 수 있나요?</li><li ng-repeat="command in intentGroup.commands" ng-click="sendBotCommand(command.command)" ng-mouseenter="active = true" ng-mouseleave="active = false" ng-className="{active: active}" className="ng-binding ng-scope">문서에 의견을 남기고 싶어요.</li><li ng-repeat="command in intentGroup.commands" ng-click="sendBotCommand(command.command)" ng-mouseenter="active = true" ng-mouseleave="active = false" ng-className="{active: active}" className="ng-binding ng-scope">누가 내 문서를 사용했는지 알고 싶어요.</li>
         </ul></li>)
    }
}

export default Intent;