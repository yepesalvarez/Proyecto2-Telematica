'use strict'

var jwt = require ('jwt-simple');
var moment = require('moment');

var secret = 'st0263_topicos_telematica';

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'petición no autorizada'})
    }

    var token = req.headers.authorization.replace(/['"']+/g,'');

    try{
        var payload = jwt.decode(token, secret);

        if(payload.exp <= moment().unix()){
            return res.status(401).send({message: 'el token ha expirado'})
        }
    }catch(ex){
        console.log(ex);
        return res.status(400).send({message: 'token no válido'});
    }

    req.user = payload;

    next();
}