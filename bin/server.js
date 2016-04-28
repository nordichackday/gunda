var express = require('express');

var app = express();

var port = process.env.PORT || 9090;

app.get('/', function(req, res){
  res.send('How may I be of service');
});

app.get('/policy', function(req, res){
  res.send('This is our privacy policy');
});

app.get('/fb', function(req, res){
  if (req.query['hub.verify_token'] === '5') {
    res.status(200).send(req.query['hub.challenge']);
  }
});

var events, event;
app.post('/fb', function(req, res){
  events = req.body.entry[0].messaging;
  for (var i=0; i < events.length; i++) {
    event = req.body.entry[0].messaging[i];
    console.log('Event', event);
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      console.log('Message', text);
    }
  }
  res.sendStatus(200);
});

app.listen(port, function(){
  console.log('I am listening....');
});
