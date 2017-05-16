'use strict'

var User= require('../models/user');
var Registro= require('../models/registro');
var Alumno= require('../models/alumno');
var Profesor= require('../models/profesor');
var service = require('./tokenService');

function guardarUsuario(req, res){
    
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
                        res.status(500).send({message:'Error al guardar el usuario', resultado:'ko'});
                    }
                    else{
                        return res.status(200).send({message:'Usuario guardado correctamente', resultado:'ok'});
                    }
                 });	
            }else{
                return res.status(200).send({message:'El usuario ya existe', resultado:'ko'});
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

    function getRegistros(req, res){
        Registro.find({}).sort('-_id').exec((err, registros)=>{
            if(err){
                res.status(500).send({message:'Error al devolver los registros'});
            }
            else{

                if(!registros){
                    res.status(404).send({message:'No hay registros'});
                }
                else{
                    res.status(200).send({registros});
                }	
            }
         });
    }

    function borrarRegistro(req, res){
        var user= new User();
        var params = req.body;

        Registro.findByIdAndRemove(params._id, function (err, registro) {
            if(err){
                res.status(500).send({message:'Error al borrar el registro.', resultado:'ko'});
            }

            if(!registro)
                res.status(400).send({message:'No existe un registro con ese id', resultado: 'ko'});
            else{
                res.status(200).send({message:'Registro borrado correctamente', resultado: 'ok'});
            }
        });     
                  
    
      
    }


module.exports= {
	guardarUsuario,
    login,
    registro,
    getRegistros,
    borrarRegistro,
}