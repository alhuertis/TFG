//Controlador de la aplicacio de favoritos
//Aqui vamos a tener las funcones de rutas
'use strict'

var Actividad= require('../models/actividad')


//Recuperar una actividad
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
	actividad.id_profesor = params.id_profesor;
	actividad.fecha_creacion = new Date();
	actividad.nivel = params.nivel;
	actividad.ejercicios = params.ejercicios;
	actividad.titulo= params.titulo;
	actividad.visible= params.visible;
	actividad.propuesta= params.propuesta;
	actividad.fecha_prop_fin= params.fecha_prop_fin;
	console.log(actividad);

	actividad.save((err, actividadStored)=>{
		if(err){
			res.status(500).send({message:'Error al guardar la actividad'});
			console.log("Error al guardar");
		}
		else{
			res.status(200).send({respuesta: 'ok'});
			console.log("Guardado");
		}
	});


}
function getActividades(req, res){

	Actividad.find({}).sort('-_id').exec((err, actividades)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
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

function updateActividad(req, res) {
	var actividadId = req.params.id;
	var update = req.body;

	Actividad.findByIdAndUpdate(actividadId, update, (err, actividadUpdated) => {

		if (err)
			res.status(500).send({message: "Error al actualizar la actividad"});
		else 
			res.status(200).send({actividadUpdated});
	});
}

function deleteActividad(req, res) {

	var actividadId = req.params.id;

	Actividad.findById(actividadId, function(err, actividad) {

		if (err)
			res.status(500).send({message: "Error al devolver la actividad"});
		if(!actividad)
			res.status(404).send({message:'No existe la actividad'});	
		else 
			actividad.remove(err => {
				if(err)
					res.status(500).send({message:'Error al borrar la actividad'});
				else
					res.status(200).send({message:'Actividad borrado correctamente'});
			})
	});
}

function getActividadesResueltas(req, res) {
	var id_alumno = req.params.id_alumno;

	Actividad.find({"id_alumno":id_alumno,})

}

function getDisponibles(req, res){

	Actividad.find({"visible": "true"}).exec((err, actividades)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{

			if(!actividades){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				res.status(200).send({actividades});
			}	
		}

	});

}

function getDisponiblesNBajo(req, res){

	Actividad.find({"visible": "true", "nivel":"Bajo"}).exec((err, actividades)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{

			if(!actividades){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				res.status(200).send({actividades});
			}	
		}

	});

}

function getDisponiblesNMedio(req, res){

	Actividad.find({"visible": "true", "nivel":"Medio"}).exec((err, actividades)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{

			if(!actividades){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				res.status(200).send({actividades});
			}	
		}

	});

}

function getDisponiblesNAlto(req, res){

	Actividad.find({"visible": "true", "nivel":"Avanzado"}).exec((err, actividades)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{

			if(!actividades){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				res.status(200).send({actividades});
			}	
		}

	});

}



//Exportamos las funciones que tengamos, para poder usar en routes
module.exports= {
	getActividad,
	getActividades,
	saveActividad,
	getDisponibles,
	getDisponiblesNBajo,
	getDisponiblesNMedio,
	getDisponiblesNAlto,

}