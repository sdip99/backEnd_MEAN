var express = require('express');
var mongoose = require('mongoose');
var Message = mongoose.model('Message',{
    msg: String
});


var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(function(req,resp,next){
    resp.header("Access-Control-Allow-Origin","*");
    resp.header("Access-Control-Allow-Headers","Content-Type, Authorization");
    next();
});

mongoose.connect('mongodb://localhost:27017/test', function(err, db){
    if(!err){
        console.log('Connected!!');
        
    }
});

app.get('/api/message', getMessages)
app.post('/api/message', function(req,resp){
    console.log(req.body);
    var message = new Message(req.body);
    message.save();
    resp.status(200);
    
});

function getMessages(req,resp){
    Message.find({}).exec(function(err, results){
        console.log(results);
        resp.send(results);
    });
}
var server = app.listen(5000, function(){
    console.log("listening on port", server.address().port);
});