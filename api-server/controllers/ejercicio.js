//Controlador de la aplicacio de favoritos
//Aqui vamos a tener las funcones de rutas
'use strict'

//Importamos el modelo
var Ejercicio= require('../models/ejercicio')



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


//Exportamos las funciones que tengamos, para poder usar en routes
module.exports= {
	getEjercicio,
	getEjercicios,
	saveEjercicio,
	updateEjercicio,
	deleteEjercicio


}