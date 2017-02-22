//Controlador de la aplicacio de favoritos
//Aqui vamos a tener las funcones de rutas
'use strict'

//Importamos el modelo
var Favorito= require('../models/favorito')

 function prueba(req, res){

	if(req.params.nombre)
		var nombre= req.params.nombre;
	else
		var nombre= "SIN NOMBRE";

	res.status(200).send({
		data: [2,3,4],
		message:"Hola mundo con nodejs y express " + nombre, 
	});
}


function getFavorito(req, res){

	var favoritoId= req.params.id;

	Favorito.findById(favoritoId, function(err, favorito){

		if(err){
			res.status(500).send({message:'Error al devolver el marcador'});
		}
		else{

			if(!favorito){
				res.status(404).send({message:'No hay marcadore'});	
			}
			else{
				res.status(200).send({favorito});
			}

		
		}
	});	
}

function getFavoritos(req, res){

	Favorito.find({}).sort('-_id').exec((err,favoritos)=>{
		if(err){
			res.status(500).send({message:'Error al devolver los marcadores'});
		}
		else{

			if(!favoritos){
				res.status(404).send({message:'Noa hay marcadores'});
			}
			else{
				res.status(200).send({favoritos});
			}	
		}

	}); //El primer parametro equivaldria al where, pero no pasamos nada. Despues una cuncion de callback


}

function saveFavorito(req, res){
	var favorito= new Favorito();

	var params= req.body; //Recoge todos los parametros
	favorito.title= params.title;
	favorito.descripcion= params.descripcion;
	favorito.url= params.url;


	favorito.save((err, favorito) => {
		if(err){
			res.status(500).send({mesage: 'Error al guardar el marcador'});
		}
		else{
			res.status(200).send({favorito});
		}

	});
}

function updateFavorito(req, res){
	var favoritoId= req.params.id;
	var update= req.body; //Recoge todos los parametros

	//Busca un objeto y lo actualiza
	//Recibe el id a actualizar, los datos nuevos y despues una función calback
	Favorito.findByIdAndUpdate(favoritoId, update, (err, favoritoUpdated) =>{

		if(err)
			res.status(500).send({mesage: 'Error al actualizar el marcador'});
		else
			res.status(200).send({favorito: favoritoUpdated});//favoritoUpdated no devuelve los datos actualizados pero en base de datos si estará actualizado
	});
	
}

function deleteFavorito(req, res){

	var favoritoId= req.params.id;

	Favorito.findById(favoritoId, function(err, favorito){

		if(err){
			res.status(500).send({message:'Error al devolver el marcador'});
		}

		if(!favorito){
			res.status(404).send({message:'No hay marcadore'});	
		}
		else
			favorito.remove(err =>{

			if(err)
				res.status(500).send({message:'Error al borrar el marcador'});
			else
				res.status(200).send({message:'Marcador borrado correctamente'});
		})



	});
}


//Exportamos las funciones que tengamos, para poder usar en routes
module.exports= {
	prueba,
	getFavorito,
	getFavoritos,
	saveFavorito,
	updateFavorito,
	deleteFavorito


}