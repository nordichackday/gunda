var express = require('express');
var bodyParser = require('body-parser');
var answers = require('./answers')

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static('src/views'));

var port = process.env.PORT || 9090;
app.get('/policy', function(req, res){
  res.send('This is our privacy policy');
});

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get('/fb', function(req, res){
  console.log('/fb', req.headers, req.body, req.query);
  if (req.query['hub.verify_token'] === '5') {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
});

var answers = require('./answers');

function onMessage(message, answerIndex, callback) {
  callback(null, answers[answerIndex]);
}

app.post('/gunda', function(req, res){
  onMessage(req.body.message, req.body.answer, function(err, response){
    res.status(200).send(response);
  });
});


var request = require('request');
var events, event;
app.post('/fb', function(req, res){
  console.log('/fb');
  events = req.body.entry[0].messaging;
  for (var i=0; i < events.length; i++) {
    event = req.body.entry[0].messaging[i];
    console.log('Event', event);
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      onMessage(text, 0, function(err, response){
        console.log('Let us reply');
        sendMessage({text: answers[getRandomInt(0, answers.length)].answer});
        sendMessage(createButtonedReply());
      });
    }
  }
	res.status(200).send();
});

function sendMessage(messageContent) {
  request({
    method: 'POST',
    url: 'https://graph.facebook.com/v2.6/me/messages?access_token=EAAWSBqak7scBAGKsZBjm7vDjpl4SA03wZC4YNntw8xI4px3ckYEcK0qS2uGE5358amCkALSb5trMPoA8IujjF1i77r15IZAEZBiDhu6Wjz0mDMPegQ9oz9Ikx2YvSRBGKsVhQj7rFdhxPbAW8Y8MK5XC9SkP4PtJJ4bYnQJ3tgZDZD',
    json: true,
    body: {
      recipient: {
        id: event.sender.id
      },
      message: messageContent
    }
  }, function(error, resp, body){
    console.log(error);
    console.log(body);
  });
}

function createButtonedReply(){
  return {
    attachment: {
      type: "template",
      payload: {
        template_type: 'generic',
        elements: [
          {
            title: 'Va tycker du?',
            subtitle: 'Tycker du at vi svarade bra på frågan?',
            buttons: [{
              type: 'postback',
              title: 'Ja! :)',
              payload: {
                ok: 'yes'
              }
            }, {
              type: 'postback',
              title: 'Neij :(',
              payload: {
                ok: 'no'
              }
            }]
          }
        ]
      }
    }
  }
}

app.listen(port, function(){
  console.log('I am listening....' + port);
});
