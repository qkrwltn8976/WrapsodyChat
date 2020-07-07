import * as React from 'react';

function MsgInput() {
    return (
        <div className="wrapmsgr_footer">
            <form ng-submit="chat()" className="ng-pristine ng-valid ng-valid-maxlength">
                <span className="wrapmsgr_full_width_text_span">
                    <textarea id="wrapmsgr_message_input" className="wrapmsgr_full_width_text ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength"  placeholder="메시지를 입력하십시오." ng-model="input.message" ng-keydown="submitOnEnter($event)" ng-disabled="!loggedIn"></textarea>
                </span>
                <button type="submit" className="wrapmsgr_submit" value="보내기" title="보내기" ng-disabled="!loggedIn">
                    <i className="icon_paper_plane"></i>
                </button>
            </form>

        </div>
    );
}

export default MsgInput;