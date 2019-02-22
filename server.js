var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(function(req,resp,next){
    resp.header("Access-Control-Allow-Origin","*");
    resp.header("Access-Control-Allow-Headers","Content-Type, Authorization");
    next();
});

app.post('/api/message', function(req,resp){
    console.log(req.body);
    resp.status(200);
});
var server = app.listen(5000, function(){
    console.log("listening on port", server.address().port);
});