#!/bin/bash

AUTHORIZE_KEY=$1

http POST https://fcm.googleapis.com/fcm/send \
    Content-Type:application/json \
    Authorization:key=${AUTHORIZE_KEY} \
    < message.json