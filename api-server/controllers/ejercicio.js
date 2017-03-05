//Controlador de la aplicacio de favoritos
//Aqui vamos a tener las funcones de rutas
'use strict'
//mi comentario d emierda!!!!
var Ejercicio= require('../models/ejercicio')


//Recuperar un ejercicio
function getEjercicio(req, res){

	var ejercicioId= req.params.id;

	Ejercicio.findById(ejercicioId, function(err, ejercicio){

		if(err){
			res.status(500).send({message:'Error al devolver el ejercicio'});
		}
		else{

			if(!ejercicio){
				res.status(404).send({message:'No hay ejercicio'});	
			}
			else{
				res.status(200).send({ejercicio});
			}

		
		}
	});	
}

function getEjercicios(req, res){

	Ejercicio.find({}).sort('-_id').exec((err, ejercicios)=>{
		if(err){
			res.status(500).send({message:'Error al devolver los ejercicios'});
		}
		else{

			if(!ejercicios){
				res.status(404).send({message:'No hay ejercicios'});
			}
			else{
				res.status(200).send({ejercicios});
			}	
		}

	}); //El primer parametro equivaldria al where, pero no pasamos nada. Despues una cuncion de callback


}

function saveEjercicio(req, res){
	var ejercicio= new Ejercicio();

	var params= req.body; //Recoge todos los parametros
	ejercicio.id_profesor= params.id_profesor;
	ejercicio.titulo= params.titulo;
	ejercicio.nivel= params.nivel;
	ejercicio.tipo= params.tipo;
	ejercicio.autor= params.autor;
	ejercicio.institucion_profesor= params.institucion_profesor;
	ejercicio.fechaCreacion= new Date();
	ejercicio.fechaModificacion= new Date();
	ejercicio.enunciado= params.enunciado;
	ejercicio.fraseATraducir= params.fraseATraducir;
	ejercicio.solucionFLogico= params.solucionFLogico;
	ejercicio.solucionFPatron= params.solucionFPatron;
	ejercicio.solucionPEspanol= params.solucionPEspanol;
	ejercicio.solucionPLatin= params.solucionPLatin;

	ejercicio.save((err, ejercicio) => {
		if(err){
			res.status(500).send({message: 'Error al guardar el ejercicio'});
		}
		else{
			res.status(200).send({ejercicio});
		}

	});
}

function updateEjercicio(req, res){
	var ejercicioId= req.params.id;
	var update= req.body; //Recoge todos los parametros

	//Busca un objeto y lo actualiza
	//Recibe el id a actualizar, los datos nuevos y despues una función calback
	Ejercicio.findByIdAndUpdate(ejercicioId, update, (err, ejercicioUpdated) =>{

		if(err)
			res.status(500).send({message: 'Error al actualizar el ejercicio'});
		else
			res.status(200).send({ejercicioUpdated});//favoritoUpdated no devuelve los datos actualizados pero en base de datos si estará actualizado
	});
	
}

function deleteEjercicio(req, res){

	var ejercicioId= req.params.id;

	Ejercicio.findById(ejercicioId, function(err, ejercicio){

		if(err){
			res.status(500).send({message:'Error al devolver el ejercicio'});
		}

		if(!ejercicio){
			res.status(404).send({message:'No hay ejercicio'});	
		}
		else
			ejercicio.remove(err =>{

			if(err)
				res.status(500).send({message:'Error al borrar el ejercicio'});
			else
				res.status(200).send({message:'Ejercicio borrado correctamente'});
		})



	});
}

function getEjersMiColeccion(req, res){
	var id_profesor= req.params.id_profesor;
	
	Ejercicio.find({"id_profesor":id_profesor}).exec(function(err, miColeccion){

		if(err){
			res.status(500).send({message:'Error al devolver la coleccion por id'});
		}
		else{

			if(!miColeccion){
				res.status(404).send({message:'No hay ejers de tu coleccion'});	
			}
			else{
				res.status(200).send({miColeccion});
			}
		}
	});	
}


function getEjersMiColeccionNivelA(req, res){
	var id_profesor= req.params.id_profesor;
	
	Ejercicio.find({"id_profesor":id_profesor, "nivel":"Avanzado"}).exec(function(err, miColeccionNivelA){

		if(err){
			res.status(500).send({message:'Error al devolver la coleccion por id con nivel avanzado'});
		}
		else{

			if(!miColeccionNivelA){
				res.status(404).send({message:'No hay ejers de tu coleccion con nivel Avanzado'});	
			}
			else{
				res.status(200).send({miColeccionNivelA});
			}
		}
	});	
}

function getEjersMiColeccionNivelM(req, res){
	var id_profesor= req.params.id_profesor;
	
	Ejercicio.find({"id_profesor":id_profesor, "nivel":"Medio"}).exec(function(err, miColeccionNivelM){

		if(err){
			res.status(500).send({message:'Error al devolver la coleccion por id con nivel medio'});
		}
		else{

			if(!miColeccionNivelM){
				res.status(404).send({message:'No hay ejers de tu coleccion con nivel Medio'});	
			}
			else{
				res.status(200).send({miColeccionNivelM});
			}
		}
	});	
}

function getEjersMiColeccionNivelB(req, res){
	var id_profesor= req.params.id_profesor;
	
	Ejercicio.find({"id_profesor":id_profesor, "nivel":"Bajo"}).exec(function(err, miColeccionNivelB){

		if(err){
			res.status(500).send({message:'Error al devolver la coleccion por id con nivel bajo'});
		}
		else{

			if(!miColeccionNivelB){
				res.status(404).send({message:'No hay ejers de tu coleccion con nivel Bajo'});	
			}
			else{
				res.status(200).send({miColeccionNivelB});
			}
		}
	});	
}


function getEjersMiColeccionTipo1(req, res){
	var id_profesor= req.params.id_profesor;
	
	Ejercicio.find({"id_profesor":id_profesor, "tipo":1}).exec(function(err, miColeccionTipo1){

		if(err){
			res.status(500).send({message:'Error al devolver la coleccion por id de tipo 1'});
		}
		else{

			if(!miColeccionTipo1){
				res.status(404).send({message:'No hay ejers de tu coleccion de tipo 1'});	
			}
			else{
				res.status(200).send({miColeccionTipo1});
			}
		}
	});	
}

function getEjersMiColeccionTipo2(req, res){
	var id_profesor= req.params.id_profesor;
	
	Ejercicio.find({"id_profesor":id_profesor, "tipo":2}).exec(function(err, miColeccionTipo2){

		if(err){
			res.status(500).send({message:'Error al devolver la coleccion por id de tipo 2'});
		}
		else{

			if(!miColeccionTipo2){
				res.status(404).send({message:'No hay ejers de tu coleccion de tipo 2'});	
			}
			else{
				res.status(200).send({miColeccionTipo2});
			}
		}
	});	
}

function getEjersMiColeccionTipo3(req, res){
	var id_profesor= req.params.id_profesor;
	
	Ejercicio.find({"id_profesor":id_profesor, "tipo":3}).exec(function(err, miColeccionTipo3){

		if(err){
			res.status(500).send({message:'Error al devolver la coleccion por id de tipo 3'});
		}
		else{

			if(!miColeccionTipo3){
				res.status(404).send({message:'No hay ejers de tu coleccion de tipo 3'});	
			}
			else{
				res.status(200).send({miColeccionTipo3});
			}
		}
	});	
}

function getEjersMiColeccionTipo4(req, res){
	var id_profesor= req.params.id_profesor;
	
	Ejercicio.find({"id_profesor":id_profesor, "tipo":4}).exec(function(err, miColeccionTipo4){

		if(err){
			res.status(500).send({message:'Error al devolver la coleccion por id de tipo 4'});
		}
		else{

			if(!miColeccionTipo4){
				res.status(404).send({message:'No hay ejers de tu coleccion de tipo 4'});	
			}
			else{
				res.status(200).send({miColeccionTipo4});
			}
		}
	});	
}

//Exportamos las funciones que tengamos, para poder usar en routes
module.exports= {
	getEjercicio,
	getEjercicios,
	saveEjercicio,
	updateEjercicio,
	deleteEjercicio,
	getEjersMiColeccion,
	getEjersMiColeccionNivelA,
	getEjersMiColeccionNivelM,
	getEjersMiColeccionNivelB,
	getEjersMiColeccionTipo1,
	getEjersMiColeccionTipo2,
	getEjersMiColeccionTipo3,
	getEjersMiColeccionTipo4,


}