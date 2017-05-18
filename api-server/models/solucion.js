'use strict'

var mongoose = require('mongoose');
//var Ejercicio = require('./ejercicio');
var Schema = mongoose.Schema;

var SolucionSchema = Schema({

    actividad:{type: Schema.ObjectId, ref: "Actividad"},
    alumno: {type: Schema.ObjectId, ref: "User"},
    ejercicios: [{type:Schema.ObjectId, ref: "Ejercicio"}],
    calificaciones: [Number],
    msgCalificaciones: [String],
    respuestas: [String],
    notaFinal: Number,
    terminado: Boolean,

});

module.exports= mongoose.model('Solucion', SolucionSchema, 'soluciones');