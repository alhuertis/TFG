//Controlador de la aplicacio de favoritos
//Aqui vamos a tener las funcones de rutas
'use strict'

var Actividad= require('../models/actividad')


//Recuperar un ejercicio
function getActividad(req, res){

	var actividadId= req.params.id;

	Actividad.findById(actividadId, function(err, actividad){

		if(err){
			res.status(500).send({message:'Error al devolver la actividad'});
		}
		else{

			if(!actividad){
				res.status(404).send({message:'No hay actividad'});	
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

	console.log(actividad);

	actividad.save((err, actividadStored)=>{
		if(err){
			res.status(500).send({message:'error al guardar la actividad'});

		}
		else{
			res.status(200).send({actividadStored});
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

function updateActividad(req, res){
	var actividadId= req.params.id;
	var update= req.body; //Recoge todos los parametros

	//Busca un objeto y lo actualiza
	//Recibe el id a actualizar, los datos nuevos y despues una función calback
	Actividad.findByIdAndUpdate(actividadId, update, (err, actividadUpdated) =>{

		if(err)
			res.status(500).send({message: 'Error al actualizar la actividad'});
		else
			res.status(200).send({actividadUpdated});//favoritoUpdated no devuelve los datos actualizados pero en base de datos si estará actualizado
	});
	
}

function deleteActividad(req, res){

	var actividadId= req.params.id;

	Actividad.findById(actividadId, function(err, actividad){

		if(err){
			res.status(500).send({message:'Error al devolver la actividad'});
		}

		if(!actividad){
			res.status(404).send({message:'No hay actividad'});	
		}
		else
			actividad.remove(err =>{

			if(err)
				res.status(500).send({message:'Error al borrar la actividad'});
			else
				res.status(200).send({message:'Actividad borrada correctamente'});
		})



	});
}

function getActsResueltas(req, res){
	var id_alumno= req.params.id_alumno;
	
	Actividad.find({"id_alumno":id_alumno, "resuelta":true}).exec(function(err, actsResueltas){

		if(err){
			res.status(500).send({message:'Error al devolver las actividades por id'});
		}
		else{

			if(!actsResueltas){
				res.status(404).send({message:'No hay actividades resueltas'});	
			}
			else{
				res.status(200).send({actsResueltas});
			}
		}
	});	
}

function getActividadesNivelA(req, res){
	var id_profesor= req.params.id_profesor;
	
	Ejercicio.find({"id_profesor":id_profesor, "nivel":"Avanzado"}).exec(function(err, actividadesNivelA){

		if(err){
			res.status(500).send({message:'Error al devolver las actividades por id con nivel avanzado'});
		}
		else{

			if(!miColeccionNivelA){
				res.status(404).send({message:'No hay actividades con nivel Avanzado'});	
			}
			else{
				res.status(200).send({miColeccionNivelA});
			}
		}
	});	
}

//Exportamos las funciones que tengamos, para poder usar en routes
module.exports= {
	getActividad,
	getActividades,
	saveActividad,

}