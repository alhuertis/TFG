//Controlador de la aplicacio de favoritos
//Aqui vamos a tener las funcones de rutas
'use strict'

var Solucion= require('../models/solucion');
var Actividad= require('../models/actividad');
var User= require('../models/user');


function getSolucion(req, res){

	var solucionId= req.params.id;

	Solucion.findById(solucionId, function(err, solucion){

		if(err){
			res.status(500).send({message:'Error al devolver la solucion'});
		}
		else{

			if(!solucion){
				res.status(404).send({message:'No hay salucion'});	
			}
			else{
				res.status(200).send({solucion});
			}
		}
	});	
}


function saveSolucion(req, res){
	var solucion = new Solucion();
	var params = req.body;
	solucion.actividad=params.actividad;
	solucion.notaFinal= params.notaFinal;
	solucion.alumno=params.id_alumno;
	solucion.nombre_alumno= params.nombre_alumno;
	solucion.ejercicios=params.id_ejercicios;
	solucion.calificaciones=params.calificaciones;
	solucion.msgCalificaciones=params.msgCalificaciones;
	solucion.respuestas=params.respuestas;
	solucion.terminado= params.terminado;
	solucion.nivel= params.nivel;
	solucion.profesor= params.profesor;
	solucion.ejercicios= params.ejercicios;
	solucion.ultima_modificacion= new Date();

	solucion.save((err, solucionStored)=>{
		if(err){
			res.status(500).send({message:'Error al guardar la solucion'});
		}
		else{
			res.status(200).send(solucionStored._id);
		}
	});


}

function updateSolucion(req, res){
	var solucionId= req.params.id;
	var update= req.body; //Recoge todos los parametros

	//Busca un objeto y lo actualiza
	//Recibe el id a actualizar, los datos nuevos y despues una función calback
	Solucion.findByIdAndUpdate(solucionId, update, (err, solucionUpdated) =>{

		if(err)
			res.status(500).send({message: 'Error al actualizar la solucion'});
		else
			res.status(200).send(solucionUpdated._id);
	});
	
}

function getSoluciones(req, res){

	Solucion.find({}).sort('-_id').exec((err, soluciones)=>{
		if(err){
			res.status(500).send({message:'Error al devolver las soluciones'});
		}
		else{

			if(!soluciones){
				res.status(404).send({message:'No hay soluciones'});
			}
			else{
				res.status(200).send({soluciones});
			}	
		}

	}); //El primer parametro equivaldria al where, pero no pasamos nada. Despues una cuncion de callback


}

function getSolucionesByIdActividad(req, res){


	console.log(req.body);
	Solucion.find({actividad: req.body._id}).sort('-_id').exec((err, soluciones)=>{
		Actividad.populate(soluciones, {path: "actividad"}, function(err,soluciones ){
			if(err){
				res.status(500).send({message:'Error al devolver las soluciones'});
			}
			else{

				if(!soluciones){
					res.status(404).send({message:'No hay soluciones'});
				}
				else{
					res.status(200).send({soluciones});
				}	
			}

		});

	}); //El primer parametro equivaldria al where, pero no pasamos nada. Despues una cuncion de callback


}

function getTerminadasById(req, res){

	

	Solucion.find({alumno: req.body._id, terminado: true}).sort('-_id').exec((err, soluciones)=>{
		Actividad.populate(soluciones, {path: "actividad"}, function(err,soluciones ){
			if(err){
				res.status(500).send({message:'Error al devolver las soluciones'});
			}
			else{

				if(!soluciones){
					res.status(404).send({message:'No hay soluciones'});
				}
				else{
					res.status(200).send({soluciones});
				}	
			}

		});
		
	});
}

function getTerminadasByIdNB(req, res){

	Solucion.find({alumno: req.body._id, terminado: true, nivel:'Bajo'}).sort('-_id').exec((err, soluciones)=>{
		Actividad.populate(soluciones, {path: "actividad"}, function(err,soluciones ){
			if(err){
				res.status(500).send({message:'Error al devolver las soluciones'});
			}
			else{

				if(!soluciones){
					res.status(404).send({message:'No hay soluciones'});
				}
				else{
					res.status(200).send({soluciones});
				}	
			}

		});
		
	});
}

function getTerminadasByIdNM(req, res){

	Solucion.find({alumno: req.body._id, terminado: true, nivel:'Medio'}).sort('-_id').exec((err, soluciones)=>{
		Actividad.populate(soluciones, {path: "actividad"}, function(err,soluciones ){
			if(err){
				res.status(500).send({message:'Error al devolver las soluciones'});
			}
			else{

				if(!soluciones){
					res.status(404).send({message:'No hay soluciones'});
				}
				else{
					res.status(200).send({soluciones});
				}	
			}

		});
		
	});
}

function getTerminadasByIdNA(req, res){

	Solucion.find({alumno: req.body._id, terminado: true, nivel:'Avanzado'}).sort('-_id').exec((err, soluciones)=>{
		Actividad.populate(soluciones, {path: "actividad"}, function(err,soluciones ){
			if(err){
				res.status(500).send({message:'Error al devolver las soluciones'});
			}
			else{

				if(!soluciones){
					res.status(404).send({message:'No hay soluciones'});
				}
				else{
					res.status(200).send({soluciones});
				}	
			}

		});
		
	});
}

function getSinTerminarById(req, res){

	Solucion.find({alumno: req.body._id, terminado: false}).sort('-_id').exec((err, soluciones)=>{
		Actividad.populate(soluciones, {path: "actividad"}, function(err,soluciones ){
			if(err){
				res.status(500).send({message:'Error al devolver las soluciones'});
			}
			else{

				if(!soluciones){
					res.status(404).send({message:'No hay soluciones'});
				}
				else{
					res.status(200).send({soluciones});
				}	
			}

		});
		
	});
}

function getSinTerminarByIdNB(req, res){

	Solucion.find({alumno: req.body._id, terminado: false, nivel:'Bajo'}).sort('-_id').exec((err, soluciones)=>{
		Actividad.populate(soluciones, {path: "actividad"}, function(err,soluciones ){
			if(err){
				res.status(500).send({message:'Error al devolver las soluciones'});
			}
			else{

				if(!soluciones){
					res.status(404).send({message:'No hay soluciones'});
				}
				else{
					res.status(200).send({soluciones});
				}	
			}

		});
		
	});
}


function getSinTerminarByIdNM(req, res){

	Solucion.find({alumno: req.body._id, terminado: false, nivel:'Medio'}).sort('-_id').exec((err, soluciones)=>{
		Actividad.populate(soluciones, {path: "actividad"}, function(err,soluciones ){
			if(err){
				res.status(500).send({message:'Error al devolver las soluciones'});
			}
			else{

				if(!soluciones){
					res.status(404).send({message:'No hay soluciones'});
				}
				else{
					res.status(200).send({soluciones});
				}	
			}

		});
		
	});
}


function getSinTerminarByIdNA(req, res){

	Solucion.find({alumno: req.body._id, terminado: false, nivel:'Avanzado'}).sort('-_id').exec((err, soluciones)=>{
		Actividad.populate(soluciones, {path: "actividad"}, function(err,soluciones ){
			if(err){
				res.status(500).send({message:'Error al devolver las soluciones'});
			}
			else{

				if(!soluciones){
					res.status(404).send({message:'No hay soluciones'});
				}
				else{
					res.status(200).send({soluciones});
				}	
			}

		});
		
	});
}

function getTerminadasByProfesor(req, res){

	Solucion.find({alumno: req.body._id, profesor:req.body.profesor, terminado: true}).sort('-_id').exec((err, soluciones)=>{
		Actividad.populate(soluciones, {path: "actividad"}, function(err,soluciones ){
			if(err){
				res.status(500).send({message:'Error al devolver las soluciones'});
			}
			else{

				if(!soluciones){
					res.status(404).send({message:'No hay soluciones'});
				}
				else{
					res.status(200).send({soluciones});
				}	
			}

		});
		
	});
}

function getSinTerminarByProfesor(req, res){

	Solucion.find({alumno: req.body._id, profesor:req.body.profesor, terminado: false}).sort('-_id').exec((err, soluciones)=>{
		Actividad.populate(soluciones, {path: "actividad"}, function(err,soluciones ){
			if(err){
				res.status(500).send({message:'Error al devolver las soluciones'});
			}
			else{

				if(!soluciones){
					res.status(404).send({message:'No hay soluciones'});
				}
				else{
					res.status(200).send({soluciones});
				}	
			}

		});
		
	});
}

//Borra de todas las actividades un ejer pasado por id
function borrarEjercicio(req, res){
	
	var id = {_id:req.params.id };

	Solucion.update({},{ $pull:{"ejercicios": id}},{multi:true},(err, item)=>{
		if(err){
			res.status(500).send({message:'Error al actualizar las soluciones', respuesta:'ko'});
		}
		else if(!item){
				res.status(404).send({message:'Ninguna solucion contiene ese ejercicio', respuesta:'ko'});	
		}else{
			res.status(200).send({message:'Se han actualizado las soluciones', respuesta:'ok'});
		}
			

	});

}

function deleteSolucionByActividad(req, res){

	var id= req.params.id;
	Solucion.remove({"actividad": id}, function(err, solucion) {

		if (err)
			res.status(500).send({message: "Error al eliminar la solucion"});
	});

}


function getSolucionesByCriteria(req, res){

	let criteria= req.body;
	console.log(criteria);

	var find= {};
	if(criteria.id_actividad != null && criteria.id_actividad != "")
		find.actividad=criteria.id_actividad;

	if(criteria.desde != null && criteria.desde != ""){
		if(criteria.hasta != null && criteria.hasta != ""){
			find.ultima_modificacion= {$gte: criteria.desde,$lte:criteria.hasta };
		}else{
			find.ultima_modificacion= {$gte: criteria.desde};
		}
	}else if(criteria.hasta != null && criteria.hasta != ""){
		find.ultima_modificacion= {$lte: criteria.hasta};
	}

	if(criteria.ids_alumnos!=null && criteria.ids_alumnos.length){
		find.alumno={$in: criteria.ids_alumnos};
	}

	find.terminado="true";

	console.log("nueva busqueda: " + JSON.stringify(find));

	
	Solucion.find(find).sort('-_id').exec((err, soluciones)=>{
		Actividad.populate(soluciones, {path: "actividad"}, function(err,soluciones){
			if(err){
				res.status(500).send({message:'Error al devolver las soluciones'});
			}
			else{

				if(!soluciones){
					res.status(404).send({message:'No hay soluciones'});
				}
				else{
					res.status(200).send({soluciones});
				}	
			}

		});

	});


}





//Exportamos las funciones que tengamos, para poder usar en routes
module.exports= {
	getSolucion,
	getSoluciones,
	saveSolucion,
	updateSolucion,
	getTerminadasById,
	getSinTerminarById,
	getTerminadasByIdNB,
	getTerminadasByIdNM,
	getTerminadasByIdNA,
	getSinTerminarByIdNB,
	getSinTerminarByIdNM,
	getSinTerminarByIdNA,
	getTerminadasByProfesor,
	getSinTerminarByProfesor,
	borrarEjercicio,
	deleteSolucionByActividad,
	getSolucionesByIdActividad,
	getSolucionesByCriteria,


}