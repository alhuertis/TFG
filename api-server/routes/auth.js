//Fichero de rutas para configurar el controlador. Se llama igual que el controlador al que hara referencia. Puede llamarse como se quiera
'use strict'

//Cargamos express
var express= require('express');
//cargamos el controlador
var AuthController = require('../controllers/auth');

//Cargamos el router de express
var api= express.Router();

api.post('/auth/signup', AuthController.emailSignup);  
api.post('/auth/login', AuthController.emailLogin);

module.exports= api;