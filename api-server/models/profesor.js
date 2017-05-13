'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfesorSchema = Schema({

    alias: String,
	nombre: String,
	apellidos: String,
    password: String,
	dni: String,
    email: String,
    fecha_nacimiento: Date,
    institucion_educativa: String,
    role: String,
});

module.exports= mongoose.model('Profesor', ProfesorSchema, 'profesores');