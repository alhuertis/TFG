'use strict'

var mongoose = require('mongoose');
var Ejercicio = require('./ejercicio')
var Schema = mongoose.Schema;

var AlumnoSchema = Schema({

    _id: String,
	nombre: String,
	apellidos: String,
	dni: String,
    email: String,
    fecha_nacimiento: String,
    actividades: [{
        actividad: Actividad,
        resuelta: Boolean,
        corregida: Boolean,
        nota: String
        //_id: String,
        //ejercicios:[{
            //Campo de los ejercicios
            //ejercicio: Ejercicio
           /* _id: String,
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
            solucionPLatin: String*/
    }]
});

module.exports= mongoose.model('Alumno', AlumnoSchema);