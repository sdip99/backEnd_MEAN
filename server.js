var express = require('express');
var mongoose = require('mongoose');
var Message = require('./models/Message');
var User = require('./models/User');
var authCntrl = require('./controllers/auth')
var msg = require('./controllers/message')
var checkAuthenticated = require('./services/checkAuthenticated');
var cors = require('./services/cors');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors);

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
app.post('/auth/login', authCntrl.login);
