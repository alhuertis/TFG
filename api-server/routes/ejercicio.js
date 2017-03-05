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
api.get('/ejercicios/miColeccion/:id_profesor', EjercicioController.getEjersMiColeccion);
api.get('/ejercicios/miColeccionNivelA/:id_profesor', EjercicioController.getEjersMiColeccionNivelA);
api.get('/ejercicios/miColeccionNivelM/:id_profesor', EjercicioController.getEjersMiColeccionNivelM);
api.get('/ejercicios/miColeccionNivelB/:id_profesor', EjercicioController.getEjersMiColeccionNivelB);
api.get('/ejercicios/miColeccionTipo1/:id_profesor', EjercicioController.getEjersMiColeccionTipo1);
api.get('/ejercicios/miColeccionTipo2/:id_profesor', EjercicioController.getEjersMiColeccionTipo2);
api.get('/ejercicios/miColeccionTipo3/:id_profesor', EjercicioController.getEjersMiColeccionTipo3);
api.get('/ejercicios/miColeccionTipo4/:id_profesor', EjercicioController.getEjersMiColeccionTipo4);
api.post('/ejercicio', EjercicioController.saveEjercicio);
api.put('/ejercicio/:id', EjercicioController.updateEjercicio);
api.delete('/ejercicio/:id', EjercicioController.deleteEjercicio);

module.exports= api;