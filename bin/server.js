var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static('src/views'));

var port = process.env.PORT || 9090;
app.get('/policy', function(req, res){
  res.send('This is our privacy policy');
});

app.get('/fb', function(req, res){
  if (req.query['hub.verify_token'] === '5') {
    res.status(200).send(req.query['hub.challenge']);
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


var events, event;
app.post('/fb', function(req, res){
  events = req.body.entry[0].messaging;
  for (var i=0; i < events.length; i++) {
    event = req.body.entry[0].messaging[i];
    console.log('Event', event);
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      onMessage(text, function(err, response){
        res.status(200).send(response);

      });
    }
  }
});


app.listen(port, function(){
  console.log('I am listening....' + port);
});
