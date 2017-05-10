'use strict'

var mongoose = require('mongoose');
//var Ejercicio = require('./ejercicio');
var Schema = mongoose.Schema;

var SolucionSchema = Schema({

    id_actividad:{type: Schema.ObjectId, ref: "Actividad"},
    nombreAlumno: String,
    //id_alumno: {type:Schema.ObjectId, ref: "Alumno"}, (cuando tengamos id de usario se podra meter)
    id_ejercicios: [{type:Schema.ObjectId, ref: "Ejercicio"}],
    calificacion: [Number],
    msgCalificacion: [String],
    respuesta: [String],
    notaFinal: Number,
    terminado: Boolean,

});

module.exports= mongoose.model('Solucion', SolucionSchema, 'soluciones');