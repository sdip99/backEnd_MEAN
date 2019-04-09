var User = require('../models/User');
var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = {
    register : function(req, resp){
        User.findOne({email: req.body.email}, function(err, existingU){
            if(existingU){
                return resp.status(409).send({message: "User alredy registered"});
            }
            else {
                var userDetail = new User(req.body);
                userDetail.save(function(err, results){
                    if(err)
                        resp.status(500).send({message: err.message});
                    resp.status(200).send({token: createToken(results)});
                });
            }   
        });
    },

    login : function(req,resp){
        User.findOne({email: req.body.email}, function(err, user){
            if(!user){
                return resp.status(409).send({message: "Email or Password is invalid"});
            }
            if(req.body.pwd == User.pwd)
                return resp.send({token: createToken(user)});
            else
                return resp.status(401).send({message: "Email or Password is invalid"});
        });
    }
}

function createToken(userDetail){
    var payload = {
        sub: userDetail._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }
    return jwt.encode(payload, 'secret');
}