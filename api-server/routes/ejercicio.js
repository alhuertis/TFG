//Fichero de rutas para configurar el controlador. Se llama igual que el controlador al que hara referencia. Puede llamarse como se quiera
'use strict'

//Cargamos express
var express= require('express');
//cargamos el controlador
var EjercicioController = require('../controllers/ejercicio');

//Cargamos el router de express
var api= express.Router();

api.get('/ejercicio/:id', EjercicioController.getEjercicio); //Con esto puedo dirigir al controlador cuando llamemos a favrito.
api.get('/ejercicios', EjercicioController.getEjercicios);
api.post('/ejercicio', EjercicioController.saveEjercicio);
api.put('/ejercicio/:id', EjercicioController.updateEjercicio);
api.delete('/ejercicio/:id', EjercicioController.deleteEjercicio);

module.exports= api;