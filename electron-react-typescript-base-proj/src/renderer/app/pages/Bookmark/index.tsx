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
    eom: boolean;
}

class BookmarkPage extends React.Component<BookmarkProps, BookmarkState> {

    getTopMsgs = (bookmark: Bookmark) => {
        this.setState({ bookmark });
        publishApi(client, 'api.message.list', store.get("username"), this.state.uuid, {
            convoId: bookmark.convoId,
            afterAt: bookmark.startAt,
            direction: "forward"
        });
    }

    getBottomMsgs = () => {

        publishApi(client, 'api.message.list', store.get("username"), this.state.uuid, {
            convoId: this.state.bookmark.convoId,
            afterAt: this.state.msgs[this.state.msgs.length - 1].createdAt,
            beforeAt: this.state.bookmark.endAt + 1,
            direction: "forward"
        });
    }

    deleteBookmark = (bookmarkId: string) => {
        publishApi(client, 'api.conversation.bookmark.delete', store.get("username"), this.state.uuid, {
            bookmarkId
        });
    }

    constructor(props: BookmarkProps) {
        super(props);
        this.state = ({
            msgs: [],
            uuid: v4(),
            bookmarks: [],
            bookmark: { convoId: this.props.match.params.convo, bookmarkId: "1", startAt: 0, endAt: 0, createdAt: 0, updatedAt: 0 },
            eom: false
        });

    }

    componentDidMount() {
        client.onConnect = () => {
            // subscribe(client, store.get("username"), this.state.uuid, (obj: any) => {
            //     console.log(obj);
            //     let payload = obj.payload;
            //     if (payload) {
            //         console.log(payload.Messages)
            //         if (payload.Messages && payload.direction === 'forward') {
            //             let eom = false;
            //             if(payload.Messages.length < 20) {
            //                 eom = true;
            //             }
            //             this.setState({
            //                 msgs: (payload.beforeAt ? this.state.msgs.concat(payload.Messages) : payload.Messages),
            //                 eom
            //             });
            //         }
            //         console.log(payload.ConversationBookmarks)
            //         if(payload.ConversationBookmarks) {

            //             this.setState({
            //                 bookmarks: payload.ConversationBookmarks
            //             });
            //         }

            //         if(obj.type && obj.type==='CONVERSATION_BOOKMARK_DELETED') {
            //             // console.log(payload.bookmarkId)

            //             let found = this.state.bookmarks.find(element => element.bookmarkId === payload.bookmarkId);
            
            //             let index = this.state.bookmarks.indexOf(found);
            //             console.log(index)
            //             this.state.bookmarks.splice(index, 1);
            //             this.setState({
            //                 bookmarks: this.state.bookmarks
            //             });
            //         }
            //     }
            // });

            publishApi(client, 'api.conversation.bookmark.list', store.get("username"), this.state.uuid, {
                convoId: this.props.match.params.convo
            });
        }
    }

    render() {
        console.log(this.state.bookmarks)
        return (<React.Fragment>
            <div id="wrapmsgr" className="ng-scope">
                <div id="wrapmsgr_body" ng-controller="WrapMsgrController" className="wrapmsgr_container ng-scope" data-ws="ws://ecm.dev.fasoo.com:9500/ws" data-vhost="/wrapsody-oracle" data-fpns-enabled="true" data-weboffice-enabled="true">
                    <div className="wrapmsgr_chat wrapmsgr_state_normalize wrapmsgr_viewmode_full" ng-class="[chatroomState, viewModeClass, {false: 'disabled'}[loggedIn]]" ng-show="current.convo">
                        <Header convoId={this.state.bookmark.convoId} docName="북마크" headerType={type.HeaderType.BOOKMARK} />
                        <div className="wrapmsgr_content  wrapmsgr_viewmode_full wrapmsgr_chatbot">
                            <div className="wrapmsgr_aside" ng-hide="viewMode == 'chat' || current.convo.convoType == 2">
                                <BookmarkList bookmarks={this.state.bookmarks} getMsgs={this.getTopMsgs} deleteBookmark={this.deleteBookmark}/>

                            </div>
                            <div className="wrapmsgr_article wrapmsgr_viewmode_full" ng-class="viewModeClass" id="DocumentChat">
                                <MsgList msgs={this.state.msgs} isBookmark={true} getBottomMsgs={this.getBottomMsgs} eom={this.state.eom} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>)
    }
}

export default BookmarkPage;