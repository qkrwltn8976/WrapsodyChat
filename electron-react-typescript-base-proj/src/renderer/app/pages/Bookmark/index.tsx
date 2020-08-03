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
    msgs: Message[],
    uuid: string,
    bookmark: Bookmark;
}

class BookmarkPage extends React.Component<BookmarkProps, BookmarkState> {

    getTopMsgs = (bookmark: Bookmark) => {
        this.setState({bookmark});
        publishApi(client, 'api.message.list', store.get("username"), this.state.uuid, {
            convoId: bookmark.convoId,
            afterAt: bookmark.startAt,
            direction: "forward"
        });
    }

    getBottomMsgs = () => {
        
        publishApi(client, 'api.message.list', store.get("username"), this.state.uuid, {
            convoId: this.state.bookmark.convoId,
            afterAt: this.state.msgs[this.state.msgs.length-1].createdAt,
            beforeAt: this.state.bookmark.stopAt+1,
            direction: "forward"
        });
    }

    constructor(props: BookmarkProps) {
        super(props);
        this.state = ({
            msgs: [],
            uuid: v4(),
            bookmarks: [{ bookmarkId: '1112', startAt: 1537353662791, stopAt: 1595406890309, convoId: "575278f3d2b044b5878bafa090fda89c", name: "주간회의" },
            { bookmarkId: '1113', startAt: 1572934291874, stopAt: 1596434666008, convoId: "f190777042544acc8d57e6e186472bbf", name: "주간회의2" },
            { bookmarkId: '1114', startAt: 1545036452927, stopAt: 1594685339030, convoId: "75884945f8334afeb011dbc9fc374b57", name: "주간회의3" }
            ],
            bookmark: {convoId:this.props.match.params.convo,bookmarkId:"1", startAt:0, stopAt:0}
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
                            msgs: (payload.beforeAt ? this.state.msgs.concat(payload.Messages) :  payload.Messages),
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
                        <Header convoId={this.state.bookmark.convoId} docName="북마크" headerType={type.HeaderType.CHAT} />
                        <div className="wrapmsgr_content  wrapmsgr_viewmode_full wrapmsgr_chatbot">
                            <div className="wrapmsgr_aside" ng-hide="viewMode == 'chat' || current.convo.convoType == 2">
                                <BookmarkList bookmarks={this.state.bookmarks} getMsgs={this.getTopMsgs} />

                            </div>
                            <div className="wrapmsgr_article wrapmsgr_viewmode_full" ng-class="viewModeClass" id="DocumentChat">
                                <MsgList msgs={this.state.msgs} isBookmark={true} getBottomMsgs={this.getBottomMsgs} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>)
    }
}

export default BookmarkPage;