//Fichero de rutas para configurar el controlador. Se llama igual que el controlador al que hara referencia. Puede llamarse como se quiera
'use strict'

//Cargamos express
var express= require('express');
//cargamos el controlador
var AuthController = require('../controllers/auth');

//Cargamos el router de express
var api= express.Router();

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
 

module.exports= api;