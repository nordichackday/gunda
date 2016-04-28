var express = require('express');

var app = express();

var port = process.env.PORT || 9090;

app.get('/', function(req, res){
  res.send('How may I be of service');
});
app.get('/fb', function(req, res){
  console.log('FB Request', req);
  res.status(200).send('1772547061');
});

app.listen(port, function(){
  console.log('I am listening....');
});
