'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port',(process.env.PORT || 5000))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Routes
app.get('/',function(req,res){
        res.send("Hi I am a chatbot")
        })

//Facebook
token ="EAAWAawPhAwwBAOrro8GZBxe8NW8EJ02NNmNiZCPH3MmBRFMsZAHPm1aQDiFNY1XrZCmkOsveWurtgkEJsAKePLd6CRxOAY4AykFnD9tf2fDLUTj7SS4M3DnJNHgymRHGZAe9gZA453itTavfL9xBePrkxZBGYe0IseIWznCZAn1YnxaXXC9bZBMRnR6il9uirs4sZD"
app.get('/webhook/',function(req,res){
    if(req.query['hub.verify_token']=="richman"){
        res.send(req.query['hub.challenge'])
    }
    res.send("Wrong token")
})

app.post('/webhook/', function(req,res){
let messaging_events = req.body.entry[0].messaging_events
    for(let i=0; i < messaging_events.length; i++){
        let event = messaging_events[i];
        let sender = event.sender.id;
        if(event.message && event.message.text){
            let text = event.message.text;
            sendText(sender, "Text echo: " + text.substring(0,100))
        }
    }
    res.sendStatus(200)
})

function sendText(send, text){
    let messageData = {text: text}
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: {access_token, token},
        method: "POST",
        json: {
            receipt: {id: sender},
            message: messageData,
        }
     }, function(error, response, body){
         if(error){
             console.log("sending error")         
         } 
         else if (response.body.error)
         {
             console.log("response body error")
         }     
    })
}

app.listen(app.get('port'),function(){
    console.log("running: port");
})