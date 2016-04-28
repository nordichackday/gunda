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

app.listen(port, function(){
  console.log('I am listening....');
});
