'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
            _id: String,
            titulo: String,
            nivel: String,
            tipo: Number,
            autor: String,
            institucion_profesor: String,
            fechaCreacion: Date,
            fechaModificacion: Date,
            enunciado: String,
            fraseATraducir: String,
            solucionFLogico: String,
            solucionFPatron: String,
            solucionPEspanol: String,
            solucionPLatin: String
        }],
        alumnos: [{
            _id: String,
            calificacion: number,
            solucion: string
        }]
    }]

});

module.exports= mongoose.model('Profesor', ProfesorSchema);