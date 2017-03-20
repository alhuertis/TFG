//Fichero de rutas para configurar el controlador. Se llama igual que el controlador al que hara referencia. Puede llamarse como se quiera
'use strict'

//Cargamos express
var express= require('express');
//cargamos el controlador
var ActividadController = require('../controllers/actividad');

//Cargamos el router de express
var api= express.Router();

api.get('/actividad/:id', ActividadController.getActividad); //Con esto puedo dirigir al controlador cuando llamemos a favrito.
api.get('/actividades', ActividadController.getActividades);
api.post('/actividad', ActividadController.saveActividad);


module.exports= api;