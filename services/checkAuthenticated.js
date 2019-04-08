var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = function checkAuthenticated(req, resp, next){
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
