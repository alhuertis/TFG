//Fichero de rutas para configurar el controlador. Se llama igual que el controlador al que hara referencia. Puede llamarse como se quiera
'use strict'

//Cargamos express
var express= require('express');
//cargamos el controlador
var SolucionController = require('../controllers/solucion');

//Cargamos el router de express
var api= express.Router();

api.get('/solucion/:id', SolucionController.getSolucion);
api.get('/soluciones', SolucionController.getSoluciones);
api.post('/solucion', SolucionController.saveSolucion);
api.put('/solucion/:id', SolucionController.updateSolucion);
api.post('/soluciones-terminadasId', SolucionController.getTerminadasById);
api.post('/soluciones-sinTerminarId', SolucionController.getSinTerminarById);
api.post('/soluciones-terminadasIdNB', SolucionController.getTerminadasByIdNB);
api.post('/soluciones-terminadasIdNM', SolucionController.getTerminadasByIdNM);
api.post('/soluciones-terminadasIdNA', SolucionController.getTerminadasByIdNA);
api.post('/soluciones-sinTerminarIdNB', SolucionController.getSinTerminarByIdNB);
api.post('/soluciones-sinTerminarIdNM', SolucionController.getSinTerminarByIdNM);
api.post('/soluciones-sinTerminarIdNA', SolucionController.getSinTerminarByIdNA);
api.post('/soluciones-terminadasByProfesor', SolucionController.getTerminadasByProfesor);
api.post('/soluciones-sinTerminarByProfesor', SolucionController.getSinTerminarByProfesor);
api.put('/soluciones-ejercicio/:id', SolucionController.borrarEjercicio);
api.delete('/solucionByActividad/:id', SolucionController.deleteSolucionByActividad);
api.post('/soluciones-byIdActividad', SolucionController.getSolucionesByIdActividad);
api.post('/soluciones-byCriteria', SolucionController.getSolucionesByCriteria);

module.exports= api;