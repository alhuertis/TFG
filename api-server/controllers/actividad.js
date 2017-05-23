//Controlador de la aplicacio de favoritos
//Aqui vamos a tener las funcones de rutas
'use strict'

var Actividad= require('../models/actividad');
var Ejercicio= require('../models/ejercicio');


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

function cargarActividad(req, res){

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
				Ejercicio.populate(actividad, {path:"ejercicios"}, function(err,actividad){
					res.status(200).send({actividad});
				});
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

function getDisponibles(req, res){

	Actividad.find({"visible": "true", "propuesta": "false"}).exec((err, actividades)=>{
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

	Actividad.find({"visible": "true", "nivel":"Bajo","propuesta": "false"}).exec((err, actividades)=>{
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

	Actividad.find({"visible": "true", "nivel":"Medio", "propuesta": "false"}).exec((err, actividades)=>{
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

	Actividad.find({"visible": "true", "nivel":"Avanzado", "propuesta": "false"}).exec((err, actividades)=>{
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

function getPropuestas(req, res){

	Actividad.find({"propuesta": "true", "visible": "true","fecha_prop_fin": {$gt:new Date()}}).exec((err, actividades)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades propuestas'});
		}
		else{

			if(!actividades){
				res.status(404).send({message:'No hay actividades propuestas'});
			}
			else{
				res.status(200).send({actividades});
			}	
		}

	});

}

function getPropuestasByApertura(req, res){

	Actividad.find({"propuesta": "true", "visible": "true","fecha_prop_fin": {$gt:new Date()}}).sort({fecha_creacion:1}).exec((err, actividades)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades propuestas por apertura'});
		}
		else{

			if(!actividades){
				res.status(404).send({message:'No hay actividades propuestas por apertura'});
			}
			else{
				res.status(200).send({actividades});
			}	
		}

	});

}

function getPropuestasByCierre(req, res){

	Actividad.find({"propuesta": "true", "visible": "true","fecha_prop_fin": {$gt:new Date()}}).sort({fecha_prop_fin:1}).exec((err, actividades)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades propuestas por cierre'});
		}
		else{

			if(!actividades){
				res.status(404).send({message:'No hay actividades propuestas por cierre'});
			}
			else{
				res.status(200).send({actividades});
			}	
		}

	});

}

function getByIdProfesorDisp(req, res){

	var id= req.params.id;
	console.log(id);
	Actividad.find({"id_profesor": id, "visible": "true"}).exec((err, actividades)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades del profesor por id'});
		}
		else{

			if(!actividades){
				res.status(404).send({message:'No hay actividades disponibles con ese id'});
			}
			else{
				res.status(200).send({actividades});
			}	
		}

	});

}

function getByIdProfesorProp(req, res){

	var id= req.params.id;
	console.log(id);
	Actividad.find({"id_profesor": id, "propuesta": "true", "visible":"true"}).exec((err, actividades)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades del profesor por id'});
		}
		else{

			if(!actividades){
				res.status(404).send({message:'No hay actividades disponibles con ese id'});
			}
			else{
				res.status(200).send({actividades});
			}	
		}

	});

}

//Profesores

function getActsMiColeccion(req, res){

	var id_profesor= req.params.id_profesor;

	Actividad.find({"id_profesor": id_profesor}).exec((err, miColeccionAct)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{

			if(!miColeccionAct){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				res.status(200).send({miColeccionAct});
			}	
		}

	});

}

function getActsMiColeccionNivelA(req, res){

	var id_profesor= req.params.id_profesor;

	Actividad.find({"id_profesor": id_profesor, "nivel":"Avanzado"}).exec((err, miColeccionNivelAAct)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{

			if(!miColeccionNivelAAct){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				res.status(200).send({miColeccionNivelAAct});
			}	
		}

	});

}

function getActsMiColeccionNivelM(req, res){

	var id_profesor= req.params.id_profesor;

	Actividad.find({"id_profesor": id_profesor, "nivel":"Medio"}).exec((err, miColeccionNivelMAct)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{

			if(!miColeccionNivelMAct){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				res.status(200).send({miColeccionNivelMAct});
			}	
		}

	});

}

function getActsMiColeccionNivelB(req, res){

	var id_profesor= req.params.id_profesor;

	Actividad.find({"id_profesor": id_profesor, "nivel":"Bajo"}).exec((err, miColeccionNivelBAct)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{

			if(!miColeccionNivelBAct){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				res.status(200).send({miColeccionNivelBAct});
			}	
		}

	});

}

function getActsVisibles(req, res){

	var id_profesor= req.params.id_profesor;

	Actividad.find({"id_profesor": id_profesor, "visible": "true"}).exec((err, visibles)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{

			if(!visibles){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				res.status(200).send({visibles});
			}	
		}

	});

}

function getActsVisiblesNivelA(req, res){

	var id_profesor= req.params.id_profesor;

	Actividad.find({"id_profesor": id_profesor, "visible": "true", "nivel": "Avanzado"}).exec((err, visiblesNivelAAct)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{

			if(!visiblesNivelAAct){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				res.status(200).send({visiblesNivelAAct});
			}	
		}

	});

}

function getActsVisiblesNivelM(req, res){

	var id_profesor= req.params.id_profesor;

	Actividad.find({"id_profesor": id_profesor, "visible": "true",  "nivel": "Medio"}).exec((err, visiblesNivelMAct)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{

			if(!visiblesNivelMAct){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				res.status(200).send({visiblesNivelMAct});
			}	
		}

	});

}

function getActsVisiblesNivelB(req, res){

	var id_profesor= req.params.id_profesor;

	Actividad.find({"id_profesor": id_profesor, "visible": "true",  "nivel": "Bajo"}).exec((err, visiblesNivelBAct)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{

			if(!visiblesNivelBAct){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				res.status(200).send({visiblesNivelBAct});
			}	
		}

	});

}

function getActsNoVisibles(req, res){

	var id_profesor= req.params.id_profesor;

	Actividad.find({"id_profesor": id_profesor, "visible": "false"}).exec((err, invisibles)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{

			if(!invisibles){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				res.status(200).send({invisibles});
			}	
		}

	});

}

function getActsNoVisiblesNivelA(req, res){

	var id_profesor= req.params.id_profesor;

	Actividad.find({"id_profesor": id_profesor, "visible": "false",  "nivel": "Avanzado"}).exec((err, invisiblesNivelAAct)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{

			if(!invisiblesNivelAAct){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				res.status(200).send({invisiblesNivelAAct});
			}	 
		}

	});

}

function getActsNoVisiblesNivelM(req, res){

	var id_profesor= req.params.id_profesor;

	Actividad.find({"id_profesor": id_profesor, "visible": "false",  "nivel": "Medio"}).exec((err, invisiblesNivelMAct)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{

			if(!invisiblesNivelMAct){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				res.status(200).send({invisiblesNivelMAct});
			}	
		}

	});

}

function getActsNoVisiblesNivelB(req, res){

	var id_profesor= req.params.id_profesor;

	Actividad.find({"id_profesor": id_profesor, "visible": "false",  "nivel": "Bajo"}).exec((err, invisiblesNivelBAct)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{

			if(!invisiblesNivelBAct){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				res.status(200).send({invisiblesNivelBAct});
			}	
		}

	});

}

function getActsOtrasColecciones(req, res){

	var id_profesor= req.params.id_profesor;

	Actividad.find({"id_profesor":{$ne: id_profesor}, "visible": "true"}).exec((err, otrasColeccionesAct)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{

			if(!otrasColeccionesAct){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				res.status(200).send({otrasColeccionesAct});
			}	
		}

	});

}

function getActsOtrasColeccionesNivelA(req, res){

	var id_profesor= req.params.id_profesor;

	Actividad.find({"id_profesor":{$ne: id_profesor}, "nivel":"Avanzado", "visible": "true"}).exec((err, otrasColeccionesNivelAAct)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{

			if(!otrasColeccionesNivelAAct){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				res.status(200).send({otrasColeccionesNivelAAct});
			}	
		}

	});

}

function getActsOtrasColeccionesNivelM(req, res){

	var id_profesor= req.params.id_profesor;

	Actividad.find({"id_profesor":{$ne: id_profesor}, "nivel":"Medio", "visible": "true"}).exec((err, otrasColeccionesNivelMAct)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{

			if(!otrasColeccionesNivelMAct){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				res.status(200).send({otrasColeccionesNivelMAct});
			}	
		}

	});
 
}

function getActsOtrasColeccionesNivelB(req, res){

	var id_profesor= req.params.id_profesor;

	Actividad.find({"id_profesor":{$ne: id_profesor}, "nivel":"Bajo", "visible": "true"}).exec((err, otrasColeccionesNivelBAct)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{
 
			if(!otrasColeccionesNivelBAct){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				res.status(200).send({otrasColeccionesNivelBAct});
			}	
		}

	});

} 

//Borra de todas las actividades un ejer pasado por id
function borrarEjercicio(req, res){
	
	var id = req.params;
	console.log(id);


	Actividad.update({},{ $pull:{"ejercicios": id.id}},{multi:true},(err, item)=>{
		if(err){
			res.status(500).send({message:'Error al actualizar las actividades'});
		}
		else if(!item){
				res.status(404).send({message:'Ninguna actividad contiene ese ejercicio'});	
		}else{
			console.log(item);
			res.status(200).send({message:'Se han actualizado los ejercicios'});
		}
			

	});

}

//Exportamos las funciones que tengamos, para poder usar en routes
module.exports= {
	getActividad,
	cargarActividad,
	getActividades,
	saveActividad,
	getDisponibles,
	getDisponiblesNBajo,
	getDisponiblesNMedio,
	getDisponiblesNAlto,
	getPropuestas,
	getPropuestasByApertura,
	getPropuestasByCierre,
	getByIdProfesorDisp,
	getByIdProfesorProp,
	getActsMiColeccion,
	getActsMiColeccionNivelA,
	getActsMiColeccionNivelB,
	getActsMiColeccionNivelM,
	getActsVisibles,
	getActsVisiblesNivelA,
	getActsVisiblesNivelM,
	getActsVisiblesNivelB,
	getActsNoVisibles,
	getActsNoVisiblesNivelA,
	getActsNoVisiblesNivelB,
	getActsNoVisiblesNivelM,
	getActsOtrasColecciones,
	getActsOtrasColeccionesNivelA,
	getActsOtrasColeccionesNivelB,
	getActsOtrasColeccionesNivelM,
	updateActividad,
	borrarEjercicio
}