//Controlador de la aplicacio de favoritos
//Aqui vamos a tener las funcones de rutas
'use strict'

var Solucion= require('../models/solucion')


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
	solucion.actividad=params.id_actividad;
	solucion.notaFinal= params.notaFinal;
	solucion.alumno=params.id_alumno;
	solucion.ejercicios=params.id_ejercicios;
	solucion.calificaciones=params.calificaciones;
	solucion.msgCalificaciones=params.msgCalificaciones;
	solucion.respuestas=params.respuestas;
	solucion.terminado= params.terminado;

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
			res.status(200).send(solucionUpdated._id);//favoritoUpdated no devuelve los datos actualizados pero en base de datos si estará actualizado
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

function getTerminadasById(req, res){

	

	Solucion.find({alumno: req.body._id, terminado: true}).sort('-_id').exec((err, soluciones)=>{
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
}

function getSinTerminarById(req, res){

	Solucion.find({alumno: req.body.id_alumno, terminado: false}).sort('-_id').exec((err, soluciones)=>{
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
}


//Exportamos las funciones que tengamos, para poder usar en routes
module.exports= {
	getSolucion,
	getSoluciones,
	saveSolucion,
	updateSolucion,
	getTerminadasById,
	getSinTerminarById,

}