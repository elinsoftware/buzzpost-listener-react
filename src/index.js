import React from "react";
import ReactDOM from "react-dom";
import "./app.css";
import App from './app'
import {FocusStyleManager} from '@blueprintjs/core'

var div = document.createElement('div');
div.setAttribute("id", "buzzPost-root");
document.body.appendChild(div);

// update these props to test in DEV mode locally
if (process.env.NODE_ENV === 'development') {
    window.buzzPostBroker = "https://hub11.dev-labs.io"
    window.NOW = {
        "user":{
            "userID":"4154a8a9db313200cc38f7fdbf961907",
            "name":"Alex Moreno"
        }
    }
    window.prefixID = "ven01994.service-now.com"
}

if (window.NOW.user!=undefined && window.NOW.user.name!=undefined && window.NOW.user.name!="guest")  {
    if (window.buzzPostBroker!=undefined && window.buzzPostBroker!='') {
        window.buzzPostUserID = window.NOW.user.userID
        FocusStyleManager.onlyShowFocusOnTabs()
        ReactDOM.render(<App />, document.getElementById("buzzPost-root"))
    } else {
        console.log('%cbuzzPost: message broker server is not defined. Please provide message broker url in window.buzzPostBroker','color:blue')
    }
} else if (window.NOW.user_id!=undefined && window.NOW.user_name!=undefined && window.NOW.user_name!="guest") {
    if (window.buzzPostBroker!=undefined && window.buzzPostBroker!='') {
        window.buzzPostUserID = window.NOW.user_id
        FocusStyleManager.onlyShowFocusOnTabs()
        ReactDOM.render(<App />, document.getElementById("buzzPost-root"))
    }
     else {
        console.log('%cbuzzPost: message broker server is not defined. Please provide message broker url in window.buzzPostBroker','color:blue')
    }
}