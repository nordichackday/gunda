var express = require('express');

var app = express();

var port = process.env.PORT || 9090;

app.get('/fb', function(req, res){
  console.log('FB Request', req);
  res.status(200).send('');
});

app.listen(port, function(){
  console.log('I am listening....');
});
