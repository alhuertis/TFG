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
api.post('/soluciones-terminadasId', SolucionController.getTerminadasById);
api.post('/soluciones-sinTerminarId', SolucionController.getSinTerminarById);

module.exports= api;