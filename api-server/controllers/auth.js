'use strict'

var User= require('../models/user');
var service = require('./tokenService');

function emailSignup(req, res){
     var user = new User({
        username:"berti",
        password: "berti",
        email:"berti@berti.com",
        name: "Alberto"

    });

    user.save(function(err){
        return res
            .status(200)
            .send({token: service.createToken(user)});
    });

}

function emailLogin(req, res){
     User.findOne({email: req.body.email.toLowerCase()}, function(err, user) {
        // Comprobar si hay errores
        // Si el usuario existe o no
        // Y si la contraseña es correcta
        return res
            .status(200)
            .send({token: service.createToken(user)});
    });

}




module.exports= {
	emailSignup,
    emailLogin,

}