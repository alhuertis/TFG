'use strict'

var mongoose = require('mongoose');
//var Ejercicio = require('./ejercicio');
var Schema = mongoose.Schema;

var SolucionSchema = Schema({

    _id: Schema.ObjectId,
    id_actividad:{type:Schema.ObjectId, ref: "Actividad"},
    id_alumno: {type:Schema.ObjectId, ref: "Alumno"},
    nombreAlumno: String,
    id_ejercicios: [{type:Schema.ObjectId, ref: "Ejercicio"}],
    calificacion: [Number],
    msgCalificacion: [String],
    respuesta: [String],
    notaFinal: Number,
    terminado: Boolean,

});

module.exports= mongoose.model('Solucion', SolucionSchema, 'soluciones');