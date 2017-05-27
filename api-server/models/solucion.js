'use strict'

var mongoose = require('mongoose');
//var Ejercicio = require('./ejercicio');
var Schema = mongoose.Schema;

var SolucionSchema = Schema({

    actividad:{type: Schema.ObjectId, ref: "Actividad"},
    alumno: {type: Schema.ObjectId, ref: "User"},
    ejercicios: [{ _id:{type:Schema.ObjectId, ref: "Ejercicio"}, calificacion:Number, msgCalificacion:String, respuesta:String}],
    notaFinal: Number,
    nivel: String,
    terminado: Boolean,
    profesor: {type: Schema.ObjectId, ref: "User"},

});

module.exports= mongoose.model('Solucion', SolucionSchema, 'soluciones');