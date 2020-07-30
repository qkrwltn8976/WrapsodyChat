import * as React from 'react';
import BookmarkList from '../../components/BookmarkList';
import { Header, MsgList } from '../../components';
import * as type from '@/renderer/libs/enum-type';
import { Message } from '../../../models/Message';
import { subscribe, publishApi, publishChat, client } from '../../../libs/stomp';
import { Bookmark } from '@/renderer/models/Bookmark';
import { v4 } from 'uuid';

const Store = require('electron-store')
const store = new Store()

interface BookmarkProps {
    match: any,
}

interface BookmarkState {
    bookmarks: Bookmark[]
    // msgs: Message[]
    convoId: String,
    msgs: Message[],
    uuid: string
}

class BookmarkPage extends React.Component<BookmarkProps, BookmarkState> {

    getMsgs = (bookmark: Bookmark) => {
        console.log('aaa')
        publishApi(client, 'api.message.list', store.get("username"), this.state.uuid, {
            convoId: bookmark.convoId,
            afterAt: bookmark.startAt,
            direction: "forward"
        });
    }

    constructor(props: BookmarkProps) {
        super(props);
        this.state = ({
            convoId: this.props.match.params.convo,
            msgs: [],
            uuid: v4(),
            bookmarks: [{ bookmarkId: '1112', startAt: 1596089051633, stopAt: 1123123, convoId: "04f9520d62fc402da7f2947a285c0abd", name: "주간회의" },
            { bookmarkId: '1113', startAt: 1596088304234, stopAt: 1123123, convoId: "831685fc97984932bc3839b73a7c9ae5", name: "주간회의2" },
            { bookmarkId: '1114', startAt: 1595920241000, stopAt: 1123123, convoId: "831685fc97984932bc3839b73a7c9ae5", name: "주간회의3" }
            ]
        })

    }

    componentDidMount() {
        client.onConnect = () => {
            subscribe(client, store.get("username"), this.state.uuid, (obj: any) => {
                console.log(obj);
                let payload = obj.payload;
                if (payload) {
                    console.log(payload.Messages)
                    if (payload.Messages && payload.direction === 'forward') {
                        this.setState({
                            msgs: payload.Messages,
                        });
                    }
                }
            });
        }
    }

    render() {
        return (<React.Fragment>
            <div id="wrapmsgr" className="ng-scope">
                <div id="wrapmsgr_body" ng-controller="WrapMsgrController" className="wrapmsgr_container ng-scope" data-ws="ws://ecm.dev.fasoo.com:9500/ws" data-vhost="/wrapsody-oracle" data-fpns-enabled="true" data-weboffice-enabled="true">
                    <div className="wrapmsgr_chat wrapmsgr_state_normalize wrapmsgr_viewmode_full" ng-class="[chatroomState, viewModeClass, {false: 'disabled'}[loggedIn]]" ng-show="current.convo">
                        <Header convoId={this.state.convoId} docName="북마크" headerType={type.HeaderType.CHAT} />
                        <div className="wrapmsgr_content  wrapmsgr_viewmode_full wrapmsgr_chatbot">
                            <div className="wrapmsgr_aside" ng-hide="viewMode == 'chat' || current.convo.convoType == 2">
                                <BookmarkList bookmarks={this.state.bookmarks} getMsgs={this.getMsgs} />

                            </div>
                            <div className="wrapmsgr_article wrapmsgr_viewmode_full" ng-class="viewModeClass" id="DocumentChat">
                                <MsgList msgs={this.state.msgs} isBookmark={true}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>)
    }
}

export default BookmarkPage;