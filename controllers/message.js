var Message = require('../models/Message');
module.exports ={
    getMessages : function(req,resp){
        Message.find({}).populate('user','-pwd').exec(function(err, results){
            resp.send(results);
        });
    },
    addMessage : function(req,resp){
        console.log(req.body, req.user);
        req.body.user = req.user;
        var message = new Message(req.body);
        message.save();
        resp.status(200);  
    }

}