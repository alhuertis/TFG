'use strict'

var mongoose= require('mongoose');
var Schema= mongoose.Schema; //Nos permite definir y trabajar con Schemas de mongo

var FavoritoSchema= Schema({

	title: String,
	descripcion: String,
	url: String
});

//Lo exportamos para poder usar como 'Favorito'
//Cuando hagamos un new Favorito, sera de tipo FavoritoSchema.
//Como tercer parametro podemos decirle como queremos que se llame la colecion en BD. Si no , la llamara en plural (favoritos en este caso)
module.exports= mongoose.model('Favorito', FavoritoSchema);