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
     User.findOne({username: req.body.username}, function(err, user) {
        // Comprobar si hay errores
        // Si el usuario existe o no
        // Y si la contraseña es correcta
        console.log("userrrr: " + user);

        if(err){
			res.status(500).send({message:'Error al devolver el ejercicio'});
		}
		else{
			if(!user){
				res.status(404).send({token:''});	
			}else{
                return res.status(200).send({token: service.createToken(user)});
            }
        }    
        
        
    });

}




module.exports= {
	emailSignup,
    emailLogin,

}