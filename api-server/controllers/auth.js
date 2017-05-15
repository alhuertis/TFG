'use strict'

var User= require('../models/user');
var Registro= require('../models/registro');
var Alumno= require('../models/alumno');
var Profesor= require('../models/profesor');
var service = require('./tokenService');

function signup(req, res){
    
        var user = new User();
        var params = req.body;
        user.alias= params.alias;
        user.nombre = params.nombre;
        user.apellidos = params.apellidos;
        user.password= params.password;
        user.dni = params.dni;
        user.email = params.email;
        user.fecha_nacimiento = params.fecha_nacimiento;
        user.institucion_educativa= params.institucion_educativa;
        user.role= params.role;
        
        User.findOne({alias: req.body.alias, password: req.body.password}, function(err, userDB) {
            
            if(!userDB){
                user.save((err, userStored)=>{
                    if(err){
                        res.status(500).send({message:'Error al guardar el usuario'});
                    }
                    else{
                        return res.status(200).send({token: service.createToken(user)});
                    }
                 });	
            }else{
                return res.status(200).send({message:'El usuario ya existe'});
            }
    
        });
}

function login(req, res){
     User.findOne({alias: req.body.alias, password: req.body.password}, function(err, user) {
        // Comprobar si hay errores
        // Si el usuario existe o no
        // Y si la contraseña es correcta

        if(err){
			res.status(500).send({message:'Error al devolver el usuario'});
		}
		else{
			if(!user){
				res.status(200).send({token:''});	
			}else{
                return res.status(200).send({token: service.createToken(user), user: user});
            }
        }     
    });
}

function registro(req, res){
    
        var registro = new Registro();
        var params = req.body;
        registro.alias= params.alias;
        registro.nombre = params.nombre;
        registro.apellidos = params.apellidos;
        registro.password= params.password;
        registro.dni = params.dni;
        registro.email = params.email;
        registro.fecha_nacimiento = params.fecha_nacimiento;
        registro.institucion_educativa= params.institucion_educativa;
        registro.role= params.role;
        
        Registro.findOne({alias: req.body.alias, password: req.body.password}, function(err, userDB) {
            
            if(!userDB){
                registro.save((err, userStored)=>{
                    if(err){
                        res.status(500).send({message:'Error al guardar el usuario'});
                    }
                    else{
                        return res.status(200).send({message:'Usuario registrado correctamente. Espere a que el administrador acepte su solicitud'});
                    }
                 });	
            }else{
                return res.status(200).send({message:'El usuario ya existe'});
            }
    
        });
}


module.exports= {
	signup,
    login,
    registro,

}