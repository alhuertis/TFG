'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Ejercicio= require('./ejercicio');
var ProfesorSchema = Schema({

    _id: String,
	nombre: String,
	apellidos: String,
	dni: String,
    email: String,
    fecha_nacimiento: String,
    actividades: [{
        _id: String,
        ejercicios:[{
            //Campo de los ejercicios
            Ejercicio
        }],
        alumnos: [{
            _id: String,
            calificacion: number,
            solucion: string
        }]
    }]

});

module.exports= mongoose.model('Profesor', ProfesorSchema);