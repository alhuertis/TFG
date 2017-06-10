//Fichero de rutas para configurar el controlador. Se llama igual que el controlador al que hara referencia. Puede llamarse como se quiera
'use strict'

//Cargamos express
var express= require('express');
//cargamos el controlador
var ActividadController = require('../controllers/actividad');

//Cargamos el router de express
var api= express.Router();


api.get('/actividad/:id', ActividadController.getActividad); //Con esto puedo dirigir al controlador cuando llamemos a favrito.
api.get('/cargarActividad/:id', ActividadController.cargarActividad);
api.get('/actividades', ActividadController.getActividades);
api.post('/actividad', ActividadController.saveActividad);
api.get('/actividad-disponibles', ActividadController.getDisponibles);
api.get('/actividad-disponiblesNB', ActividadController.getDisponiblesNBajo);
api.get('/actividad-disponiblesNM', ActividadController.getDisponiblesNMedio);
api.get('/actividad-disponiblesNA', ActividadController.getDisponiblesNAlto);
api.get('/actividad-propuestas', ActividadController.getPropuestas);
api.get('/actividad-propuestasByApertura', ActividadController.getPropuestasByApertura);
api.get('/actividad-propuestasByCierre', ActividadController.getPropuestasByCierre);
api.get('/actividad-idProfesorDisp/:id', ActividadController.getByIdProfesorDisp);
api.get('/actividad-idProfesorProp/:id', ActividadController.getByIdProfesorProp);
//Profesores
api.get('/actividad-miColeccion/:id_profesor', ActividadController.getActsMiColeccion);
api.get('/actividad-miColeccionNivelA/:id_profesor', ActividadController.getActsMiColeccionNivelA);
api.get('/actividad-miColeccionNivelM/:id_profesor', ActividadController.getActsMiColeccionNivelM);
api.get('/actividad-miColeccionNivelB/:id_profesor', ActividadController.getActsMiColeccionNivelB);
api.get('/actividad-actVisibles/:id_profesor', ActividadController.getActsVisibles);
api.get('/actividad-actVisiblesNivelA/:id_profesor', ActividadController.getActsVisiblesNivelA);
api.get('/actividad-actVisiblesNivelM/:id_profesor', ActividadController.getActsVisiblesNivelM);
api.get('/actividad-actVisiblesNivelB/:id_profesor', ActividadController.getActsVisiblesNivelB);
api.get('/actividad-actNoVisibles/:id_profesor', ActividadController.getActsNoVisibles);
api.get('/actividad-actNoVisiblesNivelA/:id_profesor', ActividadController.getActsNoVisiblesNivelA);
api.get('/actividad-actNoVisiblesNivelM/:id_profesor', ActividadController.getActsNoVisiblesNivelM);
api.get('/actividad-actNoVisiblesNivelB/:id_profesor', ActividadController.getActsNoVisiblesNivelB);
api.get('/actividad-otrasColecciones/:id_profesor', ActividadController.getActsOtrasColecciones);
api.get('/actividad-otrasColeccionesNivelA/:id_profesor', ActividadController.getActsOtrasColeccionesNivelA);
api.get('/actividad-otrasColeccionesNivelM/:id_profesor', ActividadController.getActsOtrasColeccionesNivelM);
api.get('/actividad-otrasColeccionesNivelB/:id_profesor', ActividadController.getActsOtrasColeccionesNivelB);
api.put('/actividad/:id', ActividadController.updateActividad); 
api.put('/actividad-ejercicio/:id', ActividadController.borrarEjercicio);
api.delete('/actividad/:id', ActividadController.deleteActividad);  

module.exports= api; 