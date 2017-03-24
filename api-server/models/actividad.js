'use strict'

var mongoose = require('mongoose');
//var Ejercicio = require('./ejercicio');
var Schema = mongoose.Schema;

var ActividadSchema = Schema({

    //_id: String,
	profesor: String
    //fecha_creacion: Date,
    //nivel: String,
 /*   ejercicios: Ejercicio[], /*[{  
        //Campo de los ejercicios
        //ejercicio: Ejercicio,
        id_profesor: String,
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
    }]*/

});

module.exports= mongoose.model('Actividad', ActividadSchema);