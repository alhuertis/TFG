//Fichero de rutas para configurar el controlador. Se llama igual que el controlador al que hara referencia. Puede llamarse como se quiera
'use strict'

//Cargamos express
var express= require('express');
//cargamos el controlador
var AuthController = require('../controllers/auth');

//Cargamos el router de express
var api= express.Router();

var multer = require('multer');

/*var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
    });

    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');*/

api.post('/auth/guardarUsuario', AuthController.guardarUsuario);  
api.post('/auth/login', AuthController.login);
api.post('/auth/registro', AuthController.registro);
api.get('/auth/registros', AuthController.getRegistros);
api.post('/auth/borrarRegistro', AuthController.borrarRegistro);
api.get('/auth/listaUsers', AuthController.getListaUsers);
api.get('/auth/allUsers', AuthController.getAllUsers);
api.put('/auth/pass', AuthController.updateUserPass);
api.put('/auth/user', AuthController.updateUsuario);
api.post('/auth/borrarUsuario', AuthController.borrarUsuario);
api.post('/auth/buscarUsuario', AuthController.buscarUsuario);
api.post('/auth/upload', AuthController.uploadFile);
api.post('/auth/uploadAlum', AuthController.uploadFileAlum);
 

module.exports= api;