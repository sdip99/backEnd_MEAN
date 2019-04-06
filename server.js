var express = require('express');
var mongoose = require('mongoose');
var Message = require('./models/Message');
var User = require('./models/User');
var authCntrl = require('./controllers/auth')
var msg = require('./controllers/message')
var jwt = require('jwt-simple');
var moment = require('moment');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(function(req,resp,next){
    resp.header("Access-Control-Allow-Origin","*");
    resp.header("Access-Control-Allow-Headers","Content-Type, Authorization");
    next();
});

function checkAuthenticated(req, resp, next){
    console.log('Inside');
    if(!req.header('Authorization')){
        return resp.status(401).send({message: 'No authentication header'});
    }
    var token = req.header('Authorization').split(' ')[1];
    var pay = jwt.decode(token, 'secret');
    if(pay.exp <= moment.unix()){
        return resp.status(401).send({message:'Token expired'});
    }
    req.user = pay.sub;
    next();
}

mongoose.connect('mongodb://localhost:27017/test', function(err, db){
    if(!err){
        console.log('Connected!!');
    }
});
var server = app.listen(5000, function(){
    console.log("listening on port", server.address().port);
});


app.get('/api/message', msg.getMessages);
app.post('/api/message',checkAuthenticated, msg.addMessage);
app.post('/auth/register', authCntrl.register);
