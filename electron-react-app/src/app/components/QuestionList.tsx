import * as React from 'react';

function QuestionList() {
    return (
        <ul className="question-list">
            <li ng-className="{active: intentGroup.active}" ng-repeat="intentGroup in current.botIntentGroup" ng-init="intentGroup.active = false" className="ng-scope">
                <div ng-click="toggleIntentGroup(intentGroup)" className="ng-binding">
                    Wrapsody 사용법
								<i className="icon_triangle wrapmsgr_collapse" ng-className="{true: 'wrapmsgr_expand', false: 'wrapmsgr_collapse'}[intentGroup.active]"></i>
                </div>
                <ul className="question-sub-list ng-hide" ng-show="intentGroup.active">

                </ul>
            </li><li ng-className="{active: intentGroup.active}" ng-repeat="intentGroup in current.botIntentGroup" ng-init="intentGroup.active = false" className="ng-scope">
                <div ng-click="toggleIntentGroup(intentGroup)" className="ng-binding">
                    신규 및 주요 기능
								<i className="icon_triangle wrapmsgr_collapse" ng-className="{true: 'wrapmsgr_expand', false: 'wrapmsgr_collapse'}[intentGroup.active]"></i>
                </div>
                <ul className="question-sub-list ng-hide" ng-show="intentGroup.active">

                </ul>
            </li><li ng-className="{active: intentGroup.active}" ng-repeat="intentGroup in current.botIntentGroup" ng-init="intentGroup.active = false" className="ng-scope">
                <div ng-click="toggleIntentGroup(intentGroup)" className="ng-binding">
                    공지 사항
								<i className="icon_triangle wrapmsgr_collapse" ng-className="{true: 'wrapmsgr_expand', false: 'wrapmsgr_collapse'}[intentGroup.active]"></i>
                </div>
                <ul className="question-sub-list ng-hide" ng-show="intentGroup.active">

                </ul>
            </li>
        </ul>
    );
}

export default QuestionList;