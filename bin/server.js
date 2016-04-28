var express = require('express');

var app = express();

app.get('/fb', function(req, res){
  console.log('FB Request', req);
  res.status(200).send('');
});

app.listen(3030, function(){
  console.log('I am listening....');
});
