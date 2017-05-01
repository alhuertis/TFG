//Fichero de rutas para configurar el controlador. Se llama igual que el controlador al que hara referencia. Puede llamarse como se quiera
'use strict'

//Cargamos express
var express= require('express');
//cargamos el controlador
var ProfesorController = require('../controllers/profesor');

//Cargamos el router de express
var api= express.Router();

api.get('/profesor/:id', ProfesorController.getProfesor); //Con esto puedo dirigir al controlador cuando llamemos a favrito.
api.get('/profesores', ProfesorController.getProfesores);
api.post('/profesor', ProfesorController.saveProfesor);
api.delete('/profesor/:id', ProfesorController.deleteProfesor);
api.put('/profesor/:id', ProfesorController.updateProfesor);



module.exports= api;