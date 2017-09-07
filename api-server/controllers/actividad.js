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
				Ejercicio.populate(actividad, {path:"ejercicios"}, function(err,actividad){
					res.status(200).send({actividad});
				});
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

	actividad.save((err, actividadStored)=>{
		if(err){
			res.status(500).send({message:'Error al guardar la actividad'});
		}
		else{
			res.status(200).send({respuesta: 'ok'});
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
				Ejercicio.populate(actividades, {path:"ejercicios"}, function(err,actividades){
					res.status(200).send({actividades});
				});
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
			res.status(200).send({respuesta:'ok',actividadUpdated});
	});
}

function deleteActividad(req, res) {

	var actividadId = req.params.id;

	Actividad.findById(actividadId, function(err, actividad) {

		if (err)
			res.status(500).send({message: "Error al devolver la actividad"});
		if(!actividad)
			res.status(404).send({message:'No existe la actividad'});	
		else{ 
			actividad.remove(err => {
				if(err)
					res.status(500).send({respuesta: 'ko', message:'Error al borrar la actividad'});
				else{
					res.status(200).send({respuesta: 'ok', message:'Actividad borrada correctamente'});
				}
			})
		}
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
				Ejercicio.populate(actividades, {path:"ejercicios"}, function(err,actividades){
					res.status(200).send({actividades});
				});
			}	
		}

	});

}

function getDisponiblesNInicial(req, res){

	Actividad.find({"visible": "true", "nivel":"Inicial","propuesta": "false"}).exec((err, actividades)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{

			if(!actividades){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				Ejercicio.populate(actividades, {path:"ejercicios"}, function(err,actividades){
					res.status(200).send({actividades});
				});
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
				Ejercicio.populate(actividades, {path:"ejercicios"}, function(err,actividades){
					res.status(200).send({actividades});
				});
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
				Ejercicio.populate(actividades, {path:"ejercicios"}, function(err,actividades){
					res.status(200).send({actividades});
				});
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
				Ejercicio.populate(actividades, {path:"ejercicios"}, function(err,actividades){
					res.status(200).send({actividades});
				});
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
				Ejercicio.populate(actividades, {path:"ejercicios"}, function(err,actividades){
					res.status(200).send({actividades});
				});
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
				Ejercicio.populate(actividades, {path:"ejercicios"}, function(err,actividades){
					res.status(200).send({actividades});
				});
			}	
		}

	});

}

function getByIdProfesorDisp(req, res){

	var id= req.params.id;
	Actividad.find({"id_profesor": id, "visible": "true"}).exec((err, actividades)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades del profesor por id'});
		}
		else{

			if(!actividades){
				res.status(404).send({message:'No hay actividades disponibles con ese id'});
			}
			else{
				Ejercicio.populate(actividades, {path:"ejercicios"}, function(err,actividades){
					res.status(200).send({actividades});
				});
			}	
		}

	});

}

function getByIdProfesorProp(req, res){

	var id= req.params.id;
	Actividad.find({"id_profesor": id, "propuesta": "true", "visible":"true"}).exec((err, actividades)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades del profesor por id'});
		}
		else{

			if(!actividades){
				res.status(404).send({message:'No hay actividades disponibles con ese id'});
			}
			else{
				Ejercicio.populate(actividades, {path:"ejercicios"}, function(err,actividades){
					res.status(200).send({actividades});
				});
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
				Ejercicio.populate(miColeccionAct, {path:"ejercicios"}, function(err,miColeccionAct){
					res.status(200).send({miColeccionAct});
				});
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
				Ejercicio.populate(miColeccionNivelAAct, {path:"ejercicios"}, function(err,miColeccionNivelAAct){
					res.status(200).send({miColeccionNivelAAct});
				});
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
				Ejercicio.populate(miColeccionNivelMAct, {path:"ejercicios"}, function(err,miColeccionNivelMAct){
					res.status(200).send({miColeccionNivelMAct});
				});
			}	
		}

	});

}

function getActsMiColeccionNivelB(req, res){

	var id_profesor= req.params.id_profesor;

	Actividad.find({"id_profesor": id_profesor, "nivel":"Inicial"}).exec((err, miColeccionNivelBAct)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{

			if(!miColeccionNivelBAct){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				Ejercicio.populate(miColeccionNivelBAct, {path:"ejercicios"}, function(err,miColeccionNivelBAct){
					res.status(200).send({miColeccionNivelBAct});
				});
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
				Ejercicio.populate(visibles, {path:"ejercicios"}, function(err,visibles){
					res.status(200).send({visibles});
				});
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
				Ejercicio.populate(visiblesNivelAAct, {path:"ejercicios"}, function(err,visiblesNivelAAct){
					res.status(200).send({visiblesNivelAAct});
				});
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
				Ejercicio.populate(visiblesNivelMAct, {path:"ejercicios"}, function(err,visiblesNivelMAct){
					res.status(200).send({visiblesNivelMAct});
				});
			}	
		}

	});

}

function getActsVisiblesNivelB(req, res){

	var id_profesor= req.params.id_profesor;

	Actividad.find({"id_profesor": id_profesor, "visible": "true",  "nivel": "Inicial"}).exec((err, visiblesNivelBAct)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{

			if(!visiblesNivelBAct){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				Ejercicio.populate(visiblesNivelBAct, {path:"ejercicios"}, function(err,visiblesNivelBAct){
					res.status(200).send({visiblesNivelBAct});
				});
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
				Ejercicio.populate(invisibles, {path:"ejercicios"}, function(err,invisibles){
					res.status(200).send({invisibles});
				});
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
				Ejercicio.populate(invisiblesNivelAAct, {path:"ejercicios"}, function(err,invisiblesNivelAAct){
					res.status(200).send({invisiblesNivelAAct});
				});
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
				Ejercicio.populate(invisiblesNivelMAct, {path:"ejercicios"}, function(err,invisiblesNivelMAct){
					res.status(200).send({invisiblesNivelMAct});
				});
			}	
		}

	});

}

function getActsNoVisiblesNivelB(req, res){

	var id_profesor= req.params.id_profesor;

	Actividad.find({"id_profesor": id_profesor, "visible": "false",  "nivel": "Inicial"}).exec((err, invisiblesNivelBAct)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{

			if(!invisiblesNivelBAct){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				Ejercicio.populate(invisiblesNivelBAct, {path:"ejercicios"}, function(err,invisiblesNivelBAct){
					res.status(200).send({invisiblesNivelBAct});
				});
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
				Ejercicio.populate(otrasColeccionesAct, {path:"ejercicios"}, function(err,otrasColeccionesAct){
					res.status(200).send({otrasColeccionesAct});
				});
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
				Ejercicio.populate(otrasColeccionesNivelAAct, {path:"ejercicios"}, function(err,otrasColeccionesNivelAAct){
					res.status(200).send({otrasColeccionesNivelAAct});
				});
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
				Ejercicio.populate(otrasColeccionesNivelMAct, {path:"ejercicios"}, function(err,otrasColeccionesNivelMAct){
					res.status(200).send({otrasColeccionesNivelMAct});
				});
			}	
		}

	});
 
}

function getActsOtrasColeccionesNivelB(req, res){

	var id_profesor= req.params.id_profesor;

	Actividad.find({"id_profesor":{$ne: id_profesor}, "nivel":"Inicial", "visible": "true"}).exec((err, otrasColeccionesNivelBAct)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{
 
			if(!otrasColeccionesNivelBAct){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				Ejercicio.populate(otrasColeccionesNivelBAct, {path:"ejercicios"}, function(err,otrasColeccionesNivelBAct){
					res.status(200).send({otrasColeccionesNivelBAct});
				});
			}	
		}

	});

} 

//Borra de todas las actividades un ejer pasado por id
function borrarEjercicio(req, res){
	
	var id = req.params;

	Actividad.update({},{ $pull:{"ejercicios": id.id}},{multi:true},(err, item)=>{
		if(err){
			res.status(500).send({message:'Error al actualizar las actividades', respuesta:'ko'});
		}
		else if(!item){
				res.status(404).send({message:'Ninguna actividad contiene ese ejercicio', respuesta:'ko'});	
		}else{
			res.status(200).send({message:'Se han actualizado los ejercicios', respuesta:'ok'});
		}
			

	});

}

function getActividadesByCriteria(req, res){

	let criteria= req.body;
	console.log(criteria);

	var find= {};
	if(criteria.titulo != null && criteria.titulo != "")
		find.titulo=new RegExp(criteria.titulo, "i");

	if(criteria.nivel != null && criteria.nivel != "")
		find.nivel=criteria.nivel;

	if(criteria.visible != null && criteria.visible != "")
		find.visible=criteria.visible;

	if(criteria.propuesta != null && criteria.propuesta != "")
		find.propuesta=criteria.propuesta;

	if(criteria.fecha_propuesta != null && criteria.fecha_propuesta != ""){	
		find.fecha_prop_fin= {$lte: criteria.fecha_propuesta};
	}

	if(criteria.desde != null && criteria.desde != ""){
		if(criteria.hasta != null && criteria.hasta != ""){
			find.fecha_creacion= {$gte: criteria.desde,$lte:criteria.hasta };
		}else{
			find.fecha_creacion= {$gte: criteria.desde};
		}
	}else if(criteria.hasta != null && criteria.hasta != ""){
		find.fecha_creacion= {$lte: criteria.hasta};
	}



	console.log("nueva busqueda de actividades: " + JSON.stringify(find));

	
	Actividad.find(find).sort('-_id').exec((err, actividades)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las actividades'});
		}
		else{

			if(!actividades){
				res.status(404).send({message:'No hay actividades'});
			}
			else{
				Ejercicio.populate(actividades, {path:"ejercicios"}, function(err,actividades){
					res.status(200).send({actividades});
				});
			}	
		}

	});

}

function borrarColeccion(req, res){
	
	Actividad.remove({},(err, item)=>{
		if(err){
			res.status(500).send({message:'Error al borrar la coleccion', respuesta:'ko'});
		}else{
			res.status(200).send({message:'Se ha eliminado la coleccion con exito', respuesta:'ok'});
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
	getDisponiblesNInicial,
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
	borrarEjercicio,
	deleteActividad,
	getActividadesByCriteria,
	borrarColeccion,
}