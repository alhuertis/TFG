'use strict'

var mongoose = require('mongoose');
//var Ejercicio = require('./ejercicio');
var Schema = mongoose.Schema;

var ActividadSchema = Schema({

    id_profesor: String,
	profesor: String,
    fecha_creacion: Date,
    nivel: String,
    ejercicios: [{type:Schema.ObjectId, ref: "Ejercicio"}]

});

module.exports= mongoose.model('Actividad', ActividadSchema, 'actividades');