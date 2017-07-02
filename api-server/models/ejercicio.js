'use strict'

var mongoose= require('mongoose');
var Schema= mongoose.Schema; //Nos permite definir y trabajar con Schemas de mongo

var EjercicioSchema= Schema({
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
	fraseLematizada: String,
	solucionFLogico: String,
	solucionFPatron: String,
	solucionPEspanol: String,
	solucionPLatin: String
});

//Lo exportamos para poder usar como 'Ejercicio'
//Cuando hagamos un new Favorito, sera de tipo FavoritoSchema.
//Como tercer parametro podemos decirle como queremos que se llame la colecion en BD. Si no , la llamara en plural (ejercicios en este caso)
module.exports= mongoose.model('Ejercicio', EjercicioSchema);