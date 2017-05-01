'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfesorSchema = Schema({

    _id: String,
	nombre: String,
	apellidos: String,
	dni: String,
    email: String,
    fecha_nacimiento: Date,
    institucion_educativa: String,
});

module.exports= mongoose.model('Profesor', ProfesorSchema, 'profesores');