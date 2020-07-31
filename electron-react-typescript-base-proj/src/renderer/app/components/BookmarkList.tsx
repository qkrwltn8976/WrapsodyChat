import * as React from 'react';
import { Bookmark } from '@/renderer/models/Bookmark';

const Store = require('electron-store')
const store = new Store()

interface BookmarkListProps {
    bookmarks: Bookmark[],
    getMsgs: any
}

interface BookmarkListState {
    bookmark: Bookmark,
}

class BookmarkList extends React.Component<BookmarkListProps, BookmarkListState> {
    getMsgs = (bookmark: Bookmark) => (e) => {
        this.props.getMsgs(bookmark);
    }

    constructor(props: BookmarkListProps, state: {}) {
        super(props, state);
    }

    render() {
        return (<React.Fragment>
            <div className="wrapmsgr_chatbot-info_div">
                <p className="ng-binding">북마크를 선택해주세요</p>
            </div>
            <ul className="question-list">
                {this.props.bookmarks.map(item => {
                    return (<li className="ng-scope" key={item.bookmarkId}>
                        <div className="ng-binding" onClick={this.getMsgs(item)}>{item.name}</div>
                    </li>
                    )
                })};

            </ul>
        </React.Fragment>)
    }
}

export default BookmarkList;