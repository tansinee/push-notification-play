importScripts('scripts/firebase_init.js');

let messaging = firebase.messaging();

function fetchToken(retry) {
    messaging.getToken()
    .then(function(currentToken){
        if (currentToken) {
            console.log('Token ', currentToken);
            updateUIForPushEnabled(currentToken)
        } else {
            updateUIForPushPermissionRequired()
            if (retry)
                requestPushPermission();
        }
    });
}

function requestPushPermission() {
    messaging.requestPermission()
    .then(function(){
        console.log("Notificaiton permission granted.");
        fetchToken(false);
    })
    .catch(function(err) {
        console.log("Uneable to get permission to notify.", err);
    });
}

messaging.onTokenRefresh(function() {
    messaging.getToken()
        .then(function(refreshedToken) {
            console.log('Token refreshed', refreshedToken);
            updateUIForPushEnabled(currentToken);
        });
});

messaging.onMessage(function(payload){
    console.log('Message received. ', payload);
});

function updateUIForPushEnabled(token) {
    document.getElementById("push-token").innerText = token
}

function updateUIForPushPermissionRequired() {
    document.getElementById("push-token").innerText = "permission is not granted."
}

function prependMessage(messagePayload) {
    let parentElement = document.getElementById("noti-items");
    let firstChild = parentElement.firstChild;
    let innerHtml = document.createElement('li')
    innerHtml.innerText = messagePayload.notification.topic;

    if (firstChild) {
        firstChild.insertBefore(innerHtml)
    } else {
        parentElement.appendChild(innerHtml);
    }
}

fetchToken(true);