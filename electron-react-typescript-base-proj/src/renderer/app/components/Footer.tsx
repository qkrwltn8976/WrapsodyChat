import * as React from 'react';

const remote = require('electron').remote

var closeWindow = (event:any)=>{
    var win = remote.getCurrentWindow()
    win.close()
}

function Footer() {
    return (
        <div className="wrapmsgr_popup_footer">
            <input type="submit" className="wrapmsgr_button primary wrapmsgr_right" value="OK" onClick = {}ng-disabled="!loggedIn" />
            <input type="button" className="wrapmsgr_button wrapmsgr_right" value="Cancel" ng-disabled="!loggedIn" ng-click="hidePopup($event)" onClick = {closeWindow} />
        </div>
    );
}

export default Footer;

