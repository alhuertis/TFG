'use strict'

var User= require('../models/user');
var Registro= require('../models/registro');
var Alumno= require('../models/alumno');
var Profesor= require('../models/profesor');
var service = require('./tokenService');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var multer = require("multer");
	

function guardarUsuario(req, res){
    
        var user = new User();
        var params = req.body;
        user.usuario= params.usuario;
        user.nombre = params.nombre;
        user.apellidos = params.apellidos;
        user.password= params.password;
        /*user.dni = params.dni;*/
        user.email = params.email;
        /*user.fecha_nacimiento = params.fecha_nacimiento;*/
        user.institucion_educativa= params.institucion_educativa;
        user.role= params.role;
        
        User.findOne({usuario: req.body.usuario, password: req.body.password}, function(err, userDB) {
            
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
     User.findOne({usuario: req.body.usuario}, function(err, user) {
        // Comprobar si hay errores
        // Si el usuario existe o no
        // Y si la contraseña es correcta

        if(err){
            console.log("EL ERROR ESTA DANDO EN MONGO");
			res.status(500).send({message:'Error al devolver el usuario'});
		}else if(!user){
            console.log("NO SE ESTA ENCONTRANDO EL USER");
            res.status(200).send({token:''});
        }
		else{   
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (err) throw err;
                console.log(req.body.password + ": ", isMatch); // -&gt; Password123: true
                if(!isMatch){
                    res.status(200).send({token:''});
                }else{
                    return res.status(200).send({token: service.createToken(user), user: user});
                }
            });
        }     
    });
}

function registro(req, res){
    
        var registro = new Registro();
        var params = req.body;
        registro.usuario= params.usuario;
        registro.nombre = params.nombre;
        registro.apellidos = params.apellidos;
        registro.password= params.password;
        /*registro.dni = params.dni;*/
        registro.email = params.email;
        /*registro.fecha_nacimiento = params.fecha_nacimiento;*/
        registro.institucion_educativa= params.institucion_educativa;
        registro.role= params.role;
        
        Registro.findOne({usuario: req.body.usuario, password: req.body.password}, function(err, userDB) {
            
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

    function borrarUsuario(req, res){
        var params = req.body;

        User.findByIdAndRemove(params._id, function (err, registro) {
            if(err){
                res.status(500).send({message:'Error al borrar el usuario.', respuesta:'ko'});
            }

            if(!registro)
                res.status(400).send({message:'No existe un usuario con ese id', respuesta: 'ko'});
            else{
                res.status(200).send({message:'Usuario borrado correctamente', respuesta: 'ok'});
            }
        }); 
    }

    function getListaUsers(req, res){
        User.find({'role':'alumno'}).sort('-nombre').exec((err, usuarios)=>{
            if(err){
                res.status(500).send({message:'Error al devolver los registros'});
            }
            else{

                if(!usuarios){
                    res.status(404).send({message:'No hay usuarios'});
                }
                else{
                    res.status(200).send({usuarios});
                }	
            }
         });

    }

    function getAllUsers(req, res){
        User.find({}).sort('-nombre').exec((err, usuarios)=>{
            if(err){
                res.status(500).send({message:'Error al devolver los registros'});
            }
            else{

                if(!usuarios){
                    res.status(404).send({message:'No hay usuarios'});
                }
                else{
                    res.status(200).send({usuarios});
                }	
            }
         });

    }

    function updateUserPass(req, res) {
        var update = req.body;
        
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
            bcrypt.hash(req.body.password, salt, function(err, hash){
                update.password = hash;
                User.findByIdAndUpdate(update._id, update, (err, usuariodUpdated) => {

                    if (err)
                        res.status(500).send({message: "Error al actualizar el usuario"});
                    else 
                        res.status(200).send({respuesta:'ok', usuariodUpdated});
                });
            });
        });
    }

    function updateUsuario(req, res) {
        var update = req.body;
        console.log(update.apellidos);
        

        User.findByIdAndUpdate(update._id, update, (err, usuariodUpdated) => {

            if (err)
                res.status(500).send({message: "Error al actualizar el usuario"});
            else 
                res.status(200).send({respuesta:'ok', usuariodUpdated});
        });
    }

    function buscarUsuario(req, res){
        let criteria= req.body;
        

        var find= {};

        if(criteria.usuario != null && criteria.usuario != "")
            find.usuario=new RegExp(criteria.usuario, "i");

        if(criteria.nombre != null && criteria.nombre != "")
            find.nombre=new RegExp(criteria.nombre, "i");

        if(criteria.apellidos != null && criteria.apellidos != "")
            find.apellidos=new RegExp(criteria.apellidos, "i");
        
        console.log("Busqueda:" + find);

        User.find(find).sort('-nombre').exec((err, usuarios)=>{
            if(err){
                res.status(500).send({message:'Error al devolver los usuarios'});
            }
            else{

                if(!usuarios){
                    res.status(404).send({respuesta: 'ko', message:'No hay usuarios'});
                }
                else{
                    res.status(200).send({respuesta: 'ok', usuarios});
                    
                }	
            }

	    });

    }

    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, '../client-web/assets/guias/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null,  'guia-profesor.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
    });

    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');

    function uploadFile(req,res){
        upload(req,res,function(err){
            console.log(req.file);
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        });
    }

    var storageAlum = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, '../client-web/assets/guias/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null,  'guia-alumno.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
    });

    var uploadAlum = multer({ //multer settings
                    storage: storageAlum
                }).single('file');

    function uploadFileAlum(req,res){
        uploadAlum(req,res,function(err){
            console.log(req.file);
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        });
    }




module.exports= {
	guardarUsuario,
    login,
    registro,
    getRegistros,
    borrarRegistro,
    getListaUsers,
    getAllUsers,
    updateUserPass,
    updateUsuario,
    borrarUsuario,
    buscarUsuario,
    uploadFile,
    uploadFileAlum,
}