# buzzPost.io listener for ServiceNow

This is an example of a simple message listener for ServiceNow built with React.

The app listens to a specific [buzzPost](https://buzzpost.io) channel and displays an alert when there is a new message.

Channel name defined as follows: `serviceNow_instance_URL/user_sys_id`

## How it works

The application receives two parameters from ServiceNow to identify the channel name to subscribe:

1. **Instance URL** - this param should be passed to the app in `window.prefixID` variable.
2. **User sys_id** - this param the application retrieves from out-of-the-box ServiceNow object `window.NOW.user.userID`

Incoming message is always a *string*. 

The application expects that the message is a stringified JSON object that conforms to the following format:
```json
{
    "intent":"danger",        // none, primary, warning, danger, success
    "icon":"flag",            // blueprintjs.com/docs/#icons
    "adsf" :"top-right",      // top, top-right, top-left, bottom, bottom-right, bottom-left
    "timeout":"0",            // milliseconds, 0 means no timeout
    "message": "Hello World!" // text of the message
}
```

## How to build and deploy

Build the app: `npm run build`. That command creates a single javascript file in a **Dist** folder.

To deploy the app into ServiceNow you need to perform a few steps.

First - save the content of javascript file as a style sheet (`content_css` table) and write down `sys_id` of a newly created record. 

>You can now run the app just by navigating to `<servicenow_url>/<sys_id>.cssdbx`.

#### ServiceNow Native UI (UI16)
For ServiceNow native UI (UI16) you load the application with the following gloabal UI script ("Global" set to "true"):
```javascript
function init(){
	var top = window.top;
	if (typeof top.isListenerLoaded != 'undefined' || top.NOW.user_name=="guest") {
		return;
	}
	top.buzzPostBroker = "https://hub11.dev-labs.io";
	top.prefixID = location.hostname;
	injectJS();
}

function injectJS(){
	var appScript = document.createElement('script');
	appScript.src = "6e84be251bca181001e1751bdd4bcbeb.cssdbx"; // here goes your sys_id of the style sheet/app
	top.document.getElementsByTagName('head')[0].appendChild(appScript);
	console.log('%c buzzPost: dependencies injected into global scope','color:blue');
	var checkGlobalFlag = window.top;
	checkGlobalFlag.isListenerLoaded = true;	
}
init();
```
### Service Portal

To run the app in Service Portal you just need to load the app (javascript file) as a part of Service Portal theme or widget.


