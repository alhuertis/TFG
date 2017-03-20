//Controlador de la aplicacio de favoritos
//Aqui vamos a tener las funcones de rutas
'use strict'

var Actividad= require('../models/actividad')


//Recuperar un ejercicio
function getActividad(req, res){

	var actividadId= req.params.id;

	Actividad.findById(actividadId, function(err, actividad){

		if(err){
			res.status(500).send({message:'Error al devolver el ejercicio'});
		}
		else{

			if(!actividad){
				res.status(404).send({message:'No hay ejercicio'});	
			}
			else{
				res.status(200).send({actividad});
			}

		
		}
	});	
}

function saveActividad(req, res){
	var actividad = new Actividad();
	var params = req.body;
	actividad.profesor = params.profesor;
	actividad.nivel = params.nivel;

	actividad.save((err, actividadStored)=>{
		if(err){
			res.status(500).send({message:'error al guardar'});

		}
		else{
			res.status(200).send({actividad:actividadStored});
		}
	});


}
function getActividades(req, res){

	Actividad.find({}).sort('-_id').exec((err, actividades)=>{
		if(err){
			res.status(500).send({message:'Error al devolver los actividades'});
		}
		else{

			if(!actividades){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				res.status(200).send({actividades});
			}	
		}

	}); //El primer parametro equivaldria al where, pero no pasamos nada. Despues una cuncion de callback


}

//Exportamos las funciones que tengamos, para poder usar en routes
module.exports= {
	getActividad,
	getActividades,
	saveActividad,

}