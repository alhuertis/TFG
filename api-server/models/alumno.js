'use strict'

var mongoose = require('mongoose');
var Ejercicio = require('./ejercicio')
var Schema = mongoose.Schema;

var AlumnoSchema = Schema({

    usuario: String,
    password: String,
	nombre: String,
	apellidos: String,
	//dni: String,
    email: String,
    //fecha_nacimiento: Date,
    institucion_educativa: String,
    role: String,
});

module.exports= mongoose.model('Alumno', AlumnoSchema, 'alumnos');