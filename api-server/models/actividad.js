'use strict'

var mongoose = require('mongoose');
//var Ejercicio = require('./ejercicio');
var Schema = mongoose.Schema;

var ActividadSchema = Schema({

    titulo: String,
    id_profesor: String,
	profesor: String,
    fecha_creacion: Date,
    nivel: String,
    ejercicios: [{type:Schema.ObjectId, ref: "Ejercicio"}],
    visible: Boolean,
    propuesta: Boolean,
    fecha_prop_fin: Date


});

module.exports= mongoose.model('Actividad', ActividadSchema, 'actividades');